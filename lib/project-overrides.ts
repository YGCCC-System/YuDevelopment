// Per-project front-end overrides for portfolio cards.
//
// The Sanity `Project` model has no field for an external listing URL, and some
// projects need a local image before they're set in the CMS. This map lets us
// attach an image and/or an outbound link to a specific project by name until
// that data lives in Sanity. Keyed by the project's name, lower-cased & trimmed.
export type ProjectOverride = { image?: string; link?: string };

const OVERRIDES: Record<string, ProjectOverride> = {
  'platform at osigian way': {
    image: '/media/platform-osigian-way.jpg',
    link: 'https://www.apartments.com/the-platform-at-osigian-way-warner-robins-ga/0xxj2c1/',
  },
  'platform douglas': {
    link: 'https://www.apartments.com/platform-douglas-douglas-ga/m0s6cwh/',
  },
  'platform dothan': {
    link: 'https://www.apartments.com/platform-dothan-dothan-al/xc8d3rp/',
  },
  'platform flint river': {
    link: 'https://www.apartments.com/platform-flint-river-bainbridge-ga/vy9r43f/',
  },
  'platform dublin': {
    image: '/media/platform-dublin.jpg',
    link: 'https://www.apartments.com/platform-dublin-dublin-ga/jepvnm4/',
  },
  'platform americus': {
    link: 'https://www.apartments.com/platform-americus-americus-ga/vmg3fke/',
  },
};

export function projectOverride(name?: string): ProjectOverride | undefined {
  if (!name) return undefined;
  return OVERRIDES[name.trim().toLowerCase()];
}
