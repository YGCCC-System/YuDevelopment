// POST /api/save
// Body: { password, content }
// Validates the admin password, then writes the whole `siteContent` document
// back to Sanity using the server-side write token (never exposed to the client).

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 8e6) req.destroy(); });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.SANITY_API_TOKEN) {
    return res.status(500).json({ error: 'Server not configured: SANITY_API_TOKEN missing' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Server not configured: ADMIN_PASSWORD missing' });
  }

  let body;
  try { body = await readJsonBody(req); }
  catch { return res.status(400).json({ error: 'Invalid JSON body' }); }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const content = body.content;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Missing content object' });
  }

  // Force the singleton id/type; strip server-managed fields.
  const doc = { ...content, _id: 'siteContent', _type: 'siteContent' };
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
      return res.status(502).json({ error: 'Sanity write failed', detail: data });
    }
    return res.status(200).json({ ok: true, result: data });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
