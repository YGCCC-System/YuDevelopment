// POST /api/save
// Body: { password, content }
// Validates the admin password, then writes the whole `siteContent` document
// back to Sanity using the server-side write token (never exposed to the client).
import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SITE_CONTENT_TAG } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

export async function POST(req: Request) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: 'Server not configured: SANITY_API_TOKEN missing' }, { status: 500 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Server not configured: ADMIN_PASSWORD missing' }, { status: 500 });
  }

  let body: { password?: string; content?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }

  const content = body.content;
  if (!content || typeof content !== 'object') {
    return NextResponse.json({ error: 'Missing content object' }, { status: 400 });
  }

  // Force the singleton id/type; strip server-managed fields.
  const doc: Record<string, unknown> = { ...(content as object), _id: 'siteContent', _type: 'siteContent' };
  delete doc._rev;
  delete doc._createdAt;
  delete doc._updatedAt;

  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
    });
    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: 'Sanity write failed', detail: data }, { status: 502 });
    }
    // Purge Next.js caches so the edit is live on the next request. The tag
    // covers every page that reads getSiteContent(); the explicit paths cover
    // the Full Route Cache for the CMS-driven routes.
    revalidateTag(SITE_CONTENT_TAG);
    revalidatePath('/');
    revalidatePath('/projects');
    return NextResponse.json({ ok: true, result: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}
