// POST /api/upload?password=...&filename=...
// Raw image bytes in the body. Uploads to Sanity's asset store with the write
// token and returns { url } — the CDN URL, matching how `image` fields are stored.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';
const MAX_BYTES = 100e6;

export async function POST(req: Request) {
  if (!process.env.SANITY_API_TOKEN || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  if (searchParams.get('password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }

  const arrayBuf = await req.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (25MB max)' }, { status: 413 });
  }
  if (!buf.length) {
    return NextResponse.json({ error: 'Empty body' }, { status: 400 });
  }

  const filename = encodeURIComponent(searchParams.get('filename') || 'upload');
  const contentType = req.headers.get('content-type') || 'application/octet-stream';
  // Sanity's image endpoint only accepts images; video (and anything else)
  // must go to the generic file-asset endpoint. Both return document.url.
  const assetType = contentType.startsWith('image/') ? 'images' : 'files';
  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/assets/${assetType}/${DATASET}?filename=${filename}`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: buf,
    });
    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: 'Upload failed', detail: data }, { status: 502 });
    }
    const assetUrl = data && data.document && data.document.url;
    return NextResponse.json({ ok: true, url: assetUrl, asset: data.document }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}
