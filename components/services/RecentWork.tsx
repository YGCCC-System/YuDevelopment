import { FileText } from 'lucide-react';
import { caseStudiesFor, planLibrary, type Audience } from '@/lib/servicesContent';

export default function RecentWork({ audience }: { audience: Audience }) {
  const studies = caseStudiesFor(audience);

  return (
    <section className="svc-section">
      <div className="svc-wrap">
        <h2 className="svc-h2">Recent work</h2>
        <p className="svc-lede">A sample of plan sets we’ve produced and stamped for partner firms, plus full concept sets you can browse before you send us a project.</p>

        <div className="svc-case-grid">
          {studies.map((cs) => (
            <article key={cs.slug} className="svc-case-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.imagePath} alt={cs.title} className="svc-case-image" />

              <div className="svc-case-body">
                <p className="svc-case-type">{cs.projectType}</p>
                <h3 className="svc-case-title">{cs.title}</h3>

                <div className="svc-stat-strip">
                  {cs.stats.map((stat) => (
                    <div key={stat} className="svc-stat">{stat}</div>
                  ))}
                </div>

                <div className="svc-tag-row">
                  {cs.servicesProvided.map((tag) => (
                    <span key={tag} className="svc-tag">{tag}</span>
                  ))}
                </div>

                <p className="svc-case-summary">{cs.summary}</p>
                <p className="svc-case-outcome">{cs.outcome}</p>

                <a href={`/plans/${cs.slug}`} target="_blank" rel="noopener noreferrer" className="svc-link">
                  <FileText size={15} /> View full plan set
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="svc-plan-grid">
          {planLibrary.map((plan) => (
            <div key={plan.slug} className="svc-plan-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={plan.imagePath} alt={plan.title} className="svc-plan-image" />
              <div className="svc-plan-body">
                <h3 className="svc-offer-title">{plan.title}</h3>
                <p className="svc-offer-desc">{plan.description}</p>
                <a href={`/plans/${plan.slug}`} target="_blank" rel="noopener noreferrer" className="svc-link">
                  <FileText size={15} /> View full plan set
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-case-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
        @media (max-width:820px){ .svc-case-grid{ grid-template-columns:1fr; } }
        .svc-case-card{ background:#fff; border:1px solid var(--rule); overflow:hidden; }
        .svc-case-image{ display:block; width:100%; height:200px; object-fit:contain; background:#fff; padding:8px; }
        .svc-case-body{ padding:22px; border-top:1px solid var(--rule); }
        .svc-case-type{ margin:0; font-family:var(--sans); font-size:11px; font-weight:600;
          letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-3); }
        .svc-case-title{ margin:4px 0 0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
          font-size:22px; color:var(--ink); }
        .svc-stat-strip{ margin-top:14px; display:grid; grid-template-columns:repeat(4,1fr); gap:1px;
          background:var(--rule); border:1px solid var(--rule); }
        .svc-stat{ background:var(--paper-2); padding:8px 6px; text-align:center; font-family:var(--sans);
          font-size:11px; font-weight:600; color:var(--ink); }
        .svc-tag-row{ margin-top:12px; display:flex; flex-wrap:wrap; gap:6px; }
        .svc-tag{ padding:4px 11px; border-radius:999px; background:var(--paper-2); font-family:var(--sans);
          font-size:11px; font-weight:500; color:var(--ink-2); }
        .svc-case-summary{ margin-top:12px; font-family:var(--sans); font-size:14px; line-height:1.5; color:var(--ink-2); }
        .svc-case-outcome{ margin-top:8px; font-family:var(--sans); font-size:14px; font-weight:600; color:var(--ink); }

        .svc-plan-grid{ margin-top:24px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media (max-width:820px){ .svc-plan-grid{ grid-template-columns:1fr; } }
        .svc-plan-card{ background:#fff; border:1px solid var(--rule); overflow:hidden; }
        .svc-plan-image{ display:block; width:100%; height:160px; object-fit:contain; background:#fff; padding:8px; }
        .svc-plan-body{ padding:18px; border-top:1px solid var(--rule); }
      `}</style>
    </section>
  );
}
