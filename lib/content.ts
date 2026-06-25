// Server-side Sanity content loader.
// Reads the `siteContent` singleton so pages can render CMS data into their HTML
// (server-rendered) instead of relying on the client `site-data.js` hydration.

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'ymrsfmvq';
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = 'v2021-10-21';

// Cache tag for the site content. /api/save purges this tag after a write so
// published edits appear on the very next request — no 60s wait, no redeploy.
export const SITE_CONTENT_TAG = 'site-content';

export type Project = {
  _key?: string;
  name?: string;
  location?: string;
  units?: string;
  scope?: string;
  type?: string;
  slug?: string;
  image?: string;
};

export type Hero = {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export type Stat = { _key?: string; label?: string; value?: string };

export type Statement = {
  headline?: string;
  paragraphs?: string[];
  stats?: Stat[];
};

export type Cta = { title?: string; linkLabel?: string; linkHref?: string };

export type Member = { _key?: string; name?: string; role?: string; image?: string };

export type Article = { _key?: string; date?: string; title?: string; image?: string };

export type Brand = {
  name?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  office?: string;
  copyright?: string;
  logo?: string;
};

export type Contact = {
  title?: string;
  lead?: string;
  linkLabel?: string;
  email?: string;
  phone?: string;
  office?: string;
};

export type Invest = { title?: string; intro?: string; email?: string };

export type Services = {
  headline?: string;
  note?: string;
  audienceLabel?: string;
  audienceFigure?: string;
  audienceFigureLabel?: string;
  audienceGroups?: string[];
  localEconomyFigure?: string;
  localEconomyText?: string;
};

export type SiteContent = {
  portfolio?: { projects?: Project[]; title?: string; mapPlaceholder?: string };
  home?: {
    hero?: Hero;
    statement?: Statement;
    cta?: Cta;
    projectsHeading?: string;
    [key: string]: unknown;
  };
  people?: { title?: string; members?: Member[] };
  news?: { title?: string; articles?: Article[] };
  services?: Services;
  contact?: Contact;
  invest?: Invest;
  brand?: Brand;
  [key: string]: unknown;
};

export async function getSiteContent(): Promise<SiteContent | null> {
  const query = '*[_id == "siteContent"][0]';
  // Read from the LIVE API (not the CDN). The CDN can lag a few seconds behind a
  // publish, which is exactly what breaks "real-time" updates right after a save.
  // Next.js caches this result under SITE_CONTENT_TAG, so the live endpoint is
  // only hit on a cache miss or after /api/save invalidates the tag — fast reads,
  // instant freshness.
  const url =
    `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  try {
    const headers: Record<string, string> = {};
    if (process.env.SANITY_API_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SANITY_API_TOKEN}`;
    }
    const r = await fetch(url, { headers, next: { tags: [SITE_CONTENT_TAG] } });
    if (!r.ok) return null;
    const data = await r.json();
    return (data.result as SiteContent) || null;
  } catch {
    return null;
  }
}

// All portfolio projects that have a usable name, in CMS order.
export async function getProjects(): Promise<Project[]> {
  const content = await getSiteContent();
  const all = content?.portfolio?.projects ?? [];
  return all.filter((p) => p && p.name && String(p.name).trim());
}

// Sanity stores image paths relative ("media/foo.png"); normalize to a root-
// absolute path so they resolve from any route. Full URLs pass through.
export function projectImage(src?: string): string {
  if (!src) return '';
  if (/^https?:\/\//i.test(src) || src.startsWith('/')) return src;
  return '/' + src.replace(/^\.?\//, '');
}

// A media value points at a video (vs. an image) — used to decide whether to
// render <video> or <img> for backgrounds.
export function isVideoUrl(src?: string): boolean {
  return !!src && /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(src);
}
