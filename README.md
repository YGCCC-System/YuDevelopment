# Yu Development

Marketing website for **Yu Development, LLC** — a private development firm building attainable rental housing across the Southeast United States.

🌐 **Live site:** [yudevelopment.com](https://yudevelopment.com)

---

## Tech stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) + React 19 |
| Language | TypeScript |
| Styling | CSS (scoped per-page `<style>` blocks + `public/v12-styles.css` + `app/globals.css`) |
| CMS | [Sanity](https://www.sanity.io) (project `ymrsfmvq`) — read-only in most environments; see [Editing content](#editing-content) |
| Map | [Leaflet](https://leafletjs.com) + Esri satellite tiles (no API key needed) |
| Hosting | [Vercel](https://vercel.com) (team `ygccc`, project `yu-development`) |
| Domain | Registered in Squarespace, DNS pointed to Vercel |

---

## Running locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

Other scripts:

```bash
npm run build   # production build (also runs type-checking + lint)
npm run start   # serve the production build
```

### Environment variables

Copy the example and fill in values (see the comments in `.env.local`):

```
SANITY_PROJECT_ID=ymrsfmvq
SANITY_DATASET=production
SANITY_API_TOKEN=...          # server-only write token — never commit
ADMIN_PASSWORD=...            # gate for the /admin save endpoint
NEXT_PUBLIC_MAPBOX_TOKEN=...  # optional — the map works without it (uses Leaflet + Esri)
```

`.env.local` is git-ignored. In production, set the same variables in **Vercel → Project → Settings → Environment Variables**.

---

## Project structure

```
app/
  page.tsx            Homepage (hero, projects, services, "who lives here", news, footer)
  services/           /services page
  projects/           /projects page (project cards + interactive map)
  team/  investors/  news/  contact/  careers/  privacy/  terms/
  api/                Serverless routes (Sanity content + password-gated save)
  layout.tsx          Root layout (fonts, cookie banner, scripts)
components/
  SiteNav / HomeNav   Navigation (desktop + mobile hamburger menu)
  SiteFooter          Shared footer
  ExpertiseTabs       Services section (Development / Partner service tabs)
  ProjectCards        Portfolio cards
  ProjectMap          Interactive project-locations map (Leaflet + Esri)
  CookieConsent       Cookie consent banner
  CountUp             Scroll-triggered count-up numbers
  LegalPage           Shared shell for Privacy / Terms
lib/
  content.ts          Sanity fetch + content types
  careers.ts          Careers on/off switch + openings
  project-overrides.ts  Per-project image / link / unit-count overrides
public/                Static assets, media, and homepage stylesheet/scripts
```

---

## Common tasks

### Editing content
Most site copy lives **in the code** (the Sanity dataset is read-only in this setup, so content is overridden in the page components). To change wording, edit the relevant `app/*/page.tsx` or component, then deploy (below).

### Careers page
`lib/careers.ts` controls it:

```ts
export const CAREERS_OPEN = false;   // flip to true when hiring
export const OPENINGS = [ /* add roles here */ ];
```

When off, `/careers` shows a "Coming soon" page. When on (with openings listed), it becomes a job board. The "Careers" link is always in the nav + footer.

### Projects (photos, links, units, map pins)
- Card photo / apartments.com link / unit count → `lib/project-overrides.ts`
- Map pin coordinates → the `SITES` array in `components/ProjectMap.tsx`

### Cookie banner
`components/CookieConsent.tsx`. It stores the visitor's choice in `localStorage` and emits a `cookie-consent` event so analytics/marketing scripts can be gated on consent if added later.

---

## Deploying

Vercel is connected to this GitHub repo and deploys automatically:

- **Push to `main`** → auto-deploys to **production** (`yudevelopment.com`) in ~1–2 minutes.
- **Push to any other branch** → auto-deploys a private **preview** URL (not live).

Recommended flow: work on a branch → review the preview → merge to `main` to go live.

---

_© Yu Development, LLC_
