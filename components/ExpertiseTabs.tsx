'use client';

// "Services" — full-page section. Selectable pills swap the description and the
// full-bleed blurred photo behind the whole page. Active pill is solid ink.
import { useState } from 'react';

type Service = { name: string; desc: string; image: string };

const SERVICES: Service[] = [
  {
    name: 'Site Acquisition & Entitlements',
    desc: 'We help identify and evaluate development sites with real potential. Our team reviews zoning, land use, density, utilities, access, market demand, and approval risks before major capital is committed. We also assist with rezoning, variances, special use permits, planning commission coordination, municipal approvals, and government agency communication.',
    image: '/media/svc-site-acquisition.jpg',
  },
  {
    name: 'Design & Drafting',
    desc: 'We coordinate the full design process needed to move a project from concept to permit-ready plans. This includes architectural design, civil engineering, structural engineering, MEP coordination, surveying, geotechnical coordination, and construction document management. Our goal is to keep the design team aligned so plans are complete, accurate, and ready for review.',
    image: '/media/svc-design-drafting.jpg',
  },
  {
    name: 'Project Financing',
    desc: 'We help prepare projects for investor, lender, or capital partner review by organizing the key information needed to evaluate the deal. This includes feasibility findings, development strategy, preliminary budgets, project scope, timeline assumptions, entitlement status, and construction-ready plan requirements. The goal is to make the project clearer, more credible, and easier to finance.',
    image: '/media/svc-project-financing.jpg',
  },
  {
    name: 'Construction Execution',
    desc: 'We support the transition from planning into construction by helping coordinate permit-ready drawing sets, consultant revisions, value engineering, project timelines, and execution planning. Our team helps make sure the project is properly organized before construction begins, reducing delays, confusion, and costly changes.',
    image: '/media/svc-construction.jpg',
  },
  {
    name: 'Operations',
    desc: 'We serve as an outsourced development management team for landowners, investors, and developers. Our work includes project management, consultant coordination, budget tracking, timeline management, design oversight, vendor communication, and development execution. We help keep the project moving while making sure the right people are accountable at each stage.',
    image: '/media/svc-operations.jpg',
  },
  {
    name: 'Asset Management',
    desc: 'We provide strategic support for projects beyond the initial planning stage. This includes deal reviews, feasibility guidance, project strategy, entitlement planning, budget review, troubleshooting, and long-term development planning. We help owners and investors understand what is working, what needs attention, and how to protect the value of the project over time.',
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
        <h2 className="xp-head">Services</h2>
        <div className="xp-tabs" role="tablist" aria-label="Services">
          {SERVICES.map((s, i) => (
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
          ))}
        </div>
        <p className="xp-desc">{svc.desc}</p>
      </div>

      <style>{`
        /* Full-page section — full viewport height, content vertically centered. */
        .xp-section{ position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; scroll-margin-top:92px; }
        /* Full-bleed related photo, 50% blur wash. Over-scaled so the blur's soft
           edges never reveal a gap. */
        .xp-bg{ position:absolute; inset:0; z-index:0; background-size:cover; background-position:center;
          filter:blur(3px); transform:scale(1.05); }
        .xp-overlay{ position:absolute; inset:0; z-index:1; background:rgba(239,237,230,.28); }
        .xp-wrap{ position:relative; z-index:2; width:100%; max-width:1280px; margin:0 auto;
          padding:clamp(64px,11vh,140px) clamp(28px,5vw,72px); }
        .xp-head{ margin:0 0 clamp(30px,3.4vw,48px); font-family:var(--serif,'Newsreader',Georgia,serif);
          font-weight:700; font-size:clamp(46px,6vw,84px); line-height:1.0; letter-spacing:-0.015em; color:var(--ink);
          text-shadow:0 1px 2px rgba(255,255,255,.5); }
        .xp-tabs{ display:flex; flex-wrap:wrap; gap:16px 18px; }
        .xp-pill{ font-family:var(--sans); font-size:clamp(16px,1.3vw,20px); font-weight:500;
          color:var(--ink); background:#fff; border:1px solid rgba(255,255,255,.6); border-radius:999px;
          padding:16px 32px; cursor:pointer; box-shadow:0 3px 16px rgba(20,22,26,.14);
          transition:background .2s ease, color .2s ease, transform .2s ease; }
        .xp-pill:hover{ transform:translateY(-1px); }
        .xp-pill.active{ background:var(--ink); color:#fff; border-color:var(--ink); }
        .xp-desc{ margin:clamp(34px,4vw,54px) 0 0; max-width:60ch; font-family:var(--sans); font-weight:500;
          font-size:clamp(20px,1.8vw,28px); line-height:1.55; color:var(--ink);
          text-shadow:0 1px 3px rgba(255,255,255,.7), 0 0 16px rgba(255,255,255,.4); }
      `}</style>
    </section>
  );
}
