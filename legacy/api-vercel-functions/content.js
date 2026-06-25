// GET /api/content
// Reads the singleton `siteContent` document from Sanity and returns it.
// Same-origin proxy so the browser never needs a token or a CORS allowlist entry.

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Admin needs uncached, freshly-published data; public site can use the CDN.
  const fresh = req.query && (req.query.fresh === '1' || req.query.fresh === 'true');
  const host = fresh ? `${PROJECT_ID}.api.sanity.io` : `${PROJECT_ID}.apicdn.sanity.io`;
  const query = '*[_id == "siteContent"][0]';
  const url = `https://${host}/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const headers = {};
    // A token is only needed if the dataset is private; harmless to send if present.
    if (fresh && process.env.SANITY_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SANITY_API_TOKEN}`;
    }
    const r = await fetch(url, { headers });
    if (!r.ok) {
      const body = await r.text();
      return res.status(502).json({ error: 'Sanity read failed', status: r.status, body });
    }
    const data = await r.json();
    // Cache published content at the edge; admin (fresh) responses stay private.
    if (fresh) {
      res.setHeader('Cache-Control', 'no-store');
    } else {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    }
    return res.status(200).json(data.result || null);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
};
