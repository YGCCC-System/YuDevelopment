// POST /api/upload?password=...&filename=...
// Raw image bytes in the body. Uploads to Sanity's asset store with the write
// token and returns { url } — the CDN URL, matching how `image` fields are stored.

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 25e6) { req.destroy(); return reject(new Error('File too large (25MB max)')); }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.SANITY_API_TOKEN || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Server not configured' });
  }
  const q = req.query || {};
  if (!q.password || q.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  let buf;
  try { buf = await readRawBody(req); }
  catch (e) { return res.status(413).json({ error: String(e.message || e) }); }
  if (!buf || !buf.length) return res.status(400).json({ error: 'Empty body' });

  const filename = encodeURIComponent(q.filename || 'upload');
  const contentType = req.headers['content-type'] || 'application/octet-stream';
  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/assets/images/${DATASET}?filename=${filename}`;

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
    if (!r.ok) return res.status(502).json({ error: 'Upload failed', detail: data });
    const assetUrl = data && data.document && data.document.url;
    return res.status(200).json({ ok: true, url: assetUrl, asset: data.document });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
