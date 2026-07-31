import Link from 'next/link';

// "End-to-End Development Support" — stacked-band layout (Example B):
// title band, one row of numbered service cards, five-step dot timeline,
// and a navy "Our Role" closing band. Rendered inside the /services switcher;
// the homepage uses the short `overview` variant with a See-more link.

const SERVICES = [
  {
    title: 'Civil Engineering and Coordination',
    desc: 'We coordinate the evaluation of site conditions, zoning requirements, access, utilities, and property constraints to determine the plans, consultants, and approvals required before the project advances.',
  },
  {
    title: 'Architectural Coordination',
    desc: 'We coordinate architectural services for new construction, renovations, and additions, keeping the design aligned with your objectives, budget, constructability, and applicable building codes.',
  },
  {
    title: 'MEP/Structural Coordination',
    desc: 'We coordinate the engineering professionals required for each project, including civil, structural, mechanical, electrical, plumbing, and fire protection, and keep the architectural and engineering documents properly aligned.',
  },
  {
    title: 'Full Construction Plan Preparation',
    desc: 'We oversee preparation of complete construction plan sets for permitting and construction, spanning architectural, structural, civil, MEP, and supporting technical documents.',
  },
];

const PROCESS = [
  { label: 'Review', desc: 'Review project goals, property information, plans, and available documentation.' },
  { label: 'Scope', desc: 'Define the project scope and identify the required professional services.' },
  { label: 'Source', desc: 'Source and evaluate qualified architects, engineers, and consultants.' },
  { label: 'Coordinate', desc: 'Oversee plan preparation and coordination between disciplines.' },
  { label: 'Approve', desc: 'Support permitting, revisions, and resubmissions through final approval and closeout.' },
];

export default function DevelopmentSupportSection({
  variant = 'full',
}: {
  variant?: 'full' | 'overview';
}) {
  const overview = variant === 'overview';
  return (
    <section className={`dss${overview ? '' : ' dss--full'}`}>
      <div className="dss-wrap">
        <p className="dss-eyebrow">Yu Development · Development Support</p>
        <h2 className="dss-title">End-to-End Real Estate Development Support</h2>
        <div className="dss-accent"></div>
        <p className="dss-lead">
          YuDevelopment Services provides comprehensive development support for property owners,
          investors, and developers. We coordinate the professionals, plans, approvals, vendors, and
          documentation required to move a project from initial concept through design, permitting,
          and final approval.
        </p>
        {overview && (
          <p className="dss-lead">
            Our team serves as the central point of coordination between clients, architects,
            engineers, surveyors, consultants, contractors, vendors, and permitting authorities. By
            managing these moving parts through one organized process, we help reduce communication
            gaps, prevent missed requirements, control costs, and keep projects moving forward.
          </p>
        )}

        {overview ? (
          <div className="dss-cta">
            <Link href="/services?area=support">
              See full development support <span className="arrow">&rarr;</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Our Services — one row of numbered cards */}
            <div className="dss-block">
              <h3 className="dss-h2">Our Services</h3>
              <div className="dss-cards">
                {SERVICES.map((s, i) => (
                  <div className="dss-card" key={s.title}>
                    <div className="dss-card-num">{String(i + 1).padStart(2, '0')}</div>
                    <h4 className="dss-card-title">{s.title}</h4>
                    <p className="dss-card-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Process — five-step dot timeline */}
            <div className="dss-block">
              <h3 className="dss-h2">Our Process</h3>
              <div className="dss-steps">
                {PROCESS.map((p, i) => (
                  <div className="dss-step" key={p.label}>
                    <div className="dss-step-track">
                      <span className="dss-dot"></span>
                      {i < PROCESS.length - 1 && <span className="dss-line"></span>}
                    </div>
                    <p className="dss-step-label">{p.label}</p>
                    <p className="dss-step-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Our Role — navy closing band */}
      {!overview && (
        <div className="dss-role">
          <div className="dss-wrap">
            <p className="dss-role-eyebrow">Our Role</p>
            <p className="dss-role-quote">
              Your development coordinator and project oversight partner, keeping every professional,
              plan, and approval organized from concept through final approval.
            </p>
            <Link className="dss-role-cta" href="/contact">
              Start a project <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .dss{ background:var(--paper,#EFEDE6);
          padding:clamp(72px,9vw,120px) 0 clamp(72px,9vw,120px); }
        .dss--full{ padding-bottom:0; }
        .dss-wrap{ max-width:1160px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
        .dss-eyebrow{ margin:0 0 16px; font-family:var(--mono,"Geist Mono",monospace); font-size:12px;
          font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:var(--accent,#6E7B43); }
        .dss-title{ margin:0; font-family:var(--serif,"Newsreader",Georgia,serif); font-weight:600;
          font-size:clamp(30px,4.4vw,52px); line-height:1.05; letter-spacing:-0.02em; color:var(--ink,#14161A); text-wrap:balance; }
        .dss-accent{ width:60px; height:3px; background:var(--accent,#6E7B43); margin:24px 0 0; }
        .dss-lead{ margin:clamp(26px,3vw,38px) 0 0; max-width:70ch; font-size:clamp(18px,1.5vw,21px); line-height:1.62; color:var(--ink-2,#2F3238); }
        .dss-lead + .dss-lead{ margin-top:18px; }

        .dss-block{ margin-top:clamp(48px,5.5vw,80px); }
        .dss-h2{ margin:0 0 clamp(10px,1.4vw,18px); font-family:var(--serif,"Newsreader",Georgia,serif);
          font-weight:600; font-size:clamp(30px,3.6vw,46px); line-height:1.06; letter-spacing:-0.018em;
          color:var(--ink,#14161A); padding-bottom:16px; border-bottom:1px solid var(--rule,#C6C3B7); }

        /* Service cards — one row on desktop */
        .dss-cards{ display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(12px,1.5vw,20px);
          margin-top:clamp(22px,2.6vw,32px); align-items:stretch; }
        .dss-card{ background:#fff; border:1px solid var(--rule,#C6C3B7); border-radius:0;
          padding:clamp(20px,2vw,30px) clamp(20px,2vw,28px); box-shadow:0 3px 16px rgba(20,22,26,.08);
          transition:transform .25s ease, box-shadow .25s ease; }
        .dss-card:hover{ transform:translateY(-2px); box-shadow:0 10px 28px rgba(20,22,26,.12); }
        .dss-card-num{ font-family:var(--serif,"Newsreader",Georgia,serif); font-size:clamp(26px,2.4vw,36px);
          font-weight:600; line-height:.9; color:var(--accent,#6E7B43); font-variant-numeric:tabular-nums; }
        .dss-card-title{ margin:12px 0 8px; font-family:var(--sans); font-weight:600;
          font-size:clamp(16px,1.3vw,19px); line-height:1.22; letter-spacing:-0.01em; color:var(--ink,#14161A); text-wrap:balance; }
        .dss-card-desc{ margin:0; font-size:clamp(13.5px,1.05vw,15.5px); line-height:1.55; color:var(--ink-3,#61656D); }
        @media (max-width:1020px){ .dss-cards{ grid-template-columns:1fr 1fr; } }
        @media (max-width:600px){ .dss-cards{ grid-template-columns:1fr; } }

        /* Process — dot timeline */
        .dss-steps{ display:grid; grid-template-columns:repeat(5,1fr); gap:clamp(14px,1.8vw,24px);
          margin-top:clamp(26px,3vw,40px); }
        .dss-step-track{ display:flex; align-items:center; }
        .dss-dot{ width:12px; height:12px; border-radius:50%; background:var(--accent,#6E7B43); flex:none; }
        .dss-line{ flex:1; height:2px; background:var(--rule,#C6C3B7); margin-left:8px; }
        .dss-step-label{ margin:14px 0 0; font-family:var(--sans); font-weight:600;
          font-size:clamp(16px,1.3vw,19px); color:var(--ink,#14161A); }
        .dss-step-desc{ margin:6px 0 0; font-size:clamp(13.5px,1.02vw,15px); line-height:1.55; color:var(--ink-3,#61656D); }
        @media (max-width:820px){
          .dss-steps{ grid-template-columns:1fr; gap:20px; }
          .dss-step-track{ display:none; }
          .dss-step{ border-left:3px solid var(--accent,#6E7B43); padding-left:16px; }
          .dss-step-label{ margin-top:0; }
        }

        /* Our Role — deep-olive closing band (distinct from the navy footer) */
        .dss-role{ background:var(--accent-deep,#586235); margin-top:clamp(56px,7vw,100px);
          padding:clamp(48px,5.5vw,84px) 0; }
        .dss-role-eyebrow{ margin:0 0 14px; font-family:var(--mono,"Geist Mono",monospace); font-size:12px;
          font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:rgba(247,248,250,.72); }
        .dss-role-quote{ margin:0; max-width:32ch; font-family:var(--serif,"Newsreader",Georgia,serif);
          font-weight:500; font-size:clamp(24px,3vw,40px); line-height:1.28; letter-spacing:-0.012em; color:#F7F8FA; text-wrap:balance; }
        .dss-role-cta{ display:inline-flex; align-items:center; gap:10px; margin-top:clamp(24px,2.8vw,36px);
          font-family:var(--sans); font-size:clamp(18px,1.6vw,23px); font-weight:500; letter-spacing:-0.01em;
          color:#F7F8FA; text-decoration:none; border-bottom:1px solid rgba(247,248,250,.5); padding-bottom:3px; }
        .dss-role-cta .arrow{ transition:transform .25s ease; }
        .dss-role-cta:hover .arrow{ transform:translateX(6px); }

        /* Overview (homepage) CTA */
        .dss-cta{ margin-top:clamp(32px,3.6vw,48px); }
        .dss-cta a{ display:inline-flex; align-items:center; gap:10px; font-size:clamp(22px,2.4vw,30px);
          font-weight:500; letter-spacing:-0.01em; color:var(--accent,#6E7B43); text-decoration:none; }
        .dss-cta .arrow{ transition:transform .25s ease; }
        .dss-cta a:hover .arrow{ transform:translateX(6px); }
      `}</style>
    </section>
  );
}
