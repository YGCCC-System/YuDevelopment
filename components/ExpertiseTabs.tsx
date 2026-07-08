'use client';

// "Services" — full-page section. Selectable pills swap the description and the
// full-bleed blurred photo behind the whole page. Active pill is solid ink.
import { useState } from 'react';

type Service = { name: string; desc: string; image: string };

// The six services split into two groups shown as separate labeled rows.
const GROUPS: { label: string; range: [number, number] }[] = [
  { label: 'Our Development Services', range: [0, 4] },
  { label: 'Our Partner Services', range: [4, 7] },
];

const SERVICES: Service[] = [
  {
    name: 'Consulting',
    desc: 'We offer full-scope development consulting for current and aspiring multifamily developers. Over the past decade we have completed 12 multifamily projects through the full development lifecycle. We can help take an idea from concept to construction, beginning with market research and site selection, and continuing all the way through selecting a general contractor.',
    image: '/media/svc-asset-management.jpg',
  },
  {
    name: 'Design & Drafting',
    desc: 'Our network of licensed architects and engineers spans all 50 states and delivers signed-and-sealed plans. Paired with in-house draftsmen who produce full architectural and engineering sets, including MEP and structural. This hybrid model cuts design cost and turnaround time by roughly half.',
    image: '/media/svc-design-drafting.jpg',
  },
  {
    name: 'Site Acquisition & Entitlements',
    desc: 'Every project begins with the right site and a clear path through entitlements. We have led numerous multifamily rezonings and successful annexations, and after ten years in development we know exactly what to look for in a site built for multifamily.',
    image: '/media/svc-site-acquisition.jpg',
  },
  {
    name: 'Material Sourcing',
    desc: 'Our founder, George, spent 11 years manufacturing and importing across Asia. He applies that experience to source construction materials directly, lowering costs on our own developments, and on yours.',
    image: '/media/svc-project-financing.jpg',
  },
  {
    name: 'Construction Execution',
    desc: 'Through our construction partners, Yu Development supports merchant build projects for clients who need a development team to take a project from concept through construction-ready execution. We help coordinate planning, design, budgeting, consultants, and construction oversight so the project can move from idea to finished product with a clear process and accountable management.',
    image: '/media/svc-construction.jpg',
  },
  {
    name: 'Raising Capital',
    desc: 'Yu Development supports capital raising by helping prepare financeable project packages, including feasibility, budgets, timelines, development strategy, and investor-ready materials. We also maintain private investor relationships and access to debt relationships that may help connect qualified projects with potential capital sources when needed.',
    image: '/media/svc-operations.jpg',
  },
  {
    name: 'Asset Management',
    desc: 'After construction is completed, Yu Development can support long-term operations through asset and property management partners. This includes coordinating leasing strategy, property operations, reporting, performance tracking, maintenance oversight, and overall asset management to help the community remain stable, efficient, and well-managed.',
    image: '/media/svc-asset-management.jpg',
  },
];

export default function ExpertiseTabs() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  return (
    <section className="xp-section" id="expertise" data-screen-label="Services">
      <div className="xp-bg" style={{ backgroundImage: `url("${svc.image}")` }} aria-hidden="true" />
      <div className="xp-overlay" aria-hidden="true" />
      <div className="xp-wrap">
        {GROUPS.map((g) => {
          const activeInGroup = active >= g.range[0] && active < g.range[1];
          return (
            <div className="xp-group" key={g.label}>
              <h2 className="xp-group-head">{g.label}</h2>
              <div className="xp-tabs" role="tablist" aria-label={g.label}>
                {SERVICES.slice(g.range[0], g.range[1]).map((s, j) => {
                  const i = g.range[0] + j;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`xp-pill${i === active ? ' active' : ''}`}
                      onClick={() => setActive(i)}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
              {activeInGroup && <p className="xp-desc">{svc.desc}</p>}
            </div>
          );
        })}
      </div>

      <style>{`
        /* Full-page section — full viewport height, content vertically centered. */
        .xp-section{ position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; scroll-margin-top:92px; }
        /* Full-bleed related photo, 50% blur wash. Over-scaled so the blur's soft
           edges never reveal a gap. */
        .xp-bg{ position:absolute; inset:0; z-index:0; background-size:cover; background-position:center;
          filter:blur(5px); transform:scale(1.06); }
        /* Light veil, heavier on the left where the text sits, lighter on the right so the photo shows through. */
        .xp-overlay{ position:absolute; inset:0; z-index:1;
          background:linear-gradient(90deg, rgba(239,237,230,.75) 0%, rgba(239,237,230,.56) 45%, rgba(239,237,230,.3) 100%); }
        .xp-wrap{ position:relative; z-index:2; width:100%; max-width:1280px; margin:0 auto;
          padding:clamp(64px,11vh,140px) clamp(28px,5vw,72px); }
        .xp-group{ margin:0 0 clamp(30px,3.6vw,46px); }
        .xp-group-head{ margin:0 0 clamp(16px,1.8vw,24px); font-family:var(--serif,'Newsreader',Georgia,serif);
          font-weight:700; font-size:clamp(40px,3.8vw,52px); line-height:1.02; letter-spacing:-0.015em; color:var(--ink);
          text-shadow:0 1px 3px rgba(247,248,250,.95), 0 0 20px rgba(247,248,250,.7); }
        .xp-tabs{ display:flex; flex-wrap:wrap; gap:16px 18px; }
        .xp-pill{ font-family:var(--sans); font-size:clamp(16px,1.3vw,20px); font-weight:500;
          color:var(--ink); background:#fff; border:1px solid rgba(255,255,255,.6); border-radius:0;
          padding:16px 32px; cursor:pointer; box-shadow:0 3px 16px rgba(20,22,26,.14);
          transition:background .2s ease, color .2s ease, transform .2s ease; }
        .xp-pill:hover{ transform:translateY(-1px); }
        .xp-pill.active{ background:var(--ink); color:#fff; border-color:var(--ink); }
        .xp-desc{ margin:clamp(34px,4vw,54px) 0 0; max-width:60ch; font-family:var(--sans); font-weight:500;
          font-size:clamp(20px,1.8vw,28px); line-height:1.55; color:var(--ink);
          text-shadow:0 1px 2px rgba(247,248,250,.95), 0 0 18px rgba(247,248,250,.85); }
      `}</style>
    </section>
  );
}
