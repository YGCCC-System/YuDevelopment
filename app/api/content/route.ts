// GET /api/content
// Reads the singleton `siteContent` document from Sanity and returns it.
// Same-origin proxy so the browser never needs a token or a CORS allowlist entry.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Admin needs uncached, freshly-published data; public site can use the CDN.
  const fresh = searchParams.get('fresh') === '1' || searchParams.get('fresh') === 'true';
  const host = fresh ? `${PROJECT_ID}.api.sanity.io` : `${PROJECT_ID}.apicdn.sanity.io`;
  const query = '*[_id == "siteContent"][0]';
  const url = `https://${host}/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const headers: Record<string, string> = {};
    // A token is only needed if the dataset is private; harmless to send if present.
    if (fresh && process.env.SANITY_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SANITY_API_TOKEN}`;
    }
    const r = await fetch(url, { headers, cache: 'no-store' });
    if (!r.ok) {
      const body = await r.text();
      return NextResponse.json({ error: 'Sanity read failed', status: r.status, body }, { status: 502 });
    }
    const data = await r.json();
    // Cache published content at the edge; admin (fresh) responses stay private.
    const cacheControl = fresh
      ? 'no-store'
      : 's-maxage=60, stale-while-revalidate=300';
    return NextResponse.json(data.result || null, {
      status: 200,
      headers: { 'Cache-Control': cacheControl },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}
