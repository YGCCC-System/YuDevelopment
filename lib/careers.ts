// ── Careers on/off switch ────────────────────────────────────────────────
// Flip CAREERS_OPEN to `true` when you have openings you want people to apply
// for, and list them in OPENINGS below. When it's `false` (or the list is
// empty) the /careers page 404s and the "Careers" link disappears from the
// footer — so nothing shows unless you're actually hiring.

export const CAREERS_OPEN = false;

export type Opening = {
  title: string;
  location: string;
  type: string; // e.g. "Full-time", "Contract"
  blurb: string;
  applyUrl?: string; // link or mailto; falls back to the contact page
};

export const OPENINGS: Opening[] = [
  // Example — copy this shape for each real opening, then set CAREERS_OPEN = true:
  // {
  //   title: 'Development Analyst',
  //   location: 'Atlanta, GA',
  //   type: 'Full-time',
  //   blurb: 'Support underwriting, feasibility, and entitlements across our Southeast pipeline.',
  //   applyUrl: 'mailto:services@yudevelopment.com?subject=Development%20Analyst',
  // },
];

// The page + footer link only show when the switch is on AND there's at least
// one opening listed.
export function careersActive(): boolean {
  return CAREERS_OPEN && OPENINGS.length > 0;
}
