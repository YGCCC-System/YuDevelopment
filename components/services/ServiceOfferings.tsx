import { Check } from 'lucide-react';
import { serviceOfferings, type Audience } from '@/lib/servicesContent';

export default function ServiceOfferings({ audience }: { audience: Audience }) {
  /* Architects already own the architecture, they need the disciplines
     around it covered, not the architecture itself handed back to them. */
  const offerings =
    audience === 'architects'
      ? serviceOfferings.filter((o) => o.title !== 'Architectural')
      : serviceOfferings;

  return (
    <section className="svc-section">
      <div className="svc-wrap">
        <h2 className="svc-h2">One team, every discipline</h2>
        <p className="svc-lede">
          We work as your subcontracted plan-production arm. Pick up one discipline or hand us the whole set, everything is coordinated in-house and stamped before it goes out the door.
        </p>

        <div className="svc-offer-grid">
          {offerings.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.title} className="svc-offer-card">
                <div className="svc-icon-circle">
                  <Icon size={22} />
                </div>
                <h3 className="svc-offer-title">{o.title}</h3>
                <p className="svc-offer-desc">{o.description}</p>
                <ul className="svc-offer-details">
                  {o.details.map((d) => (
                    <li key={d}>
                      <Check size={13} className="svc-check" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .svc-offer-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media (max-width:900px){ .svc-offer-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:620px){ .svc-offer-grid{ grid-template-columns:1fr; } }
        .svc-offer-card{ background:#fff; border:1px solid var(--rule); padding:26px; }
        .svc-icon-circle{ display:flex; align-items:center; justify-content:center; width:44px; height:44px;
          border-radius:999px; background:var(--paper-2); color:var(--ink); margin-bottom:14px; }
        .svc-offer-title{ margin:0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
          font-size:19px; color:var(--ink); }
        .svc-offer-desc{ margin:8px 0 0; font-family:var(--sans); font-size:14px; line-height:1.5; color:var(--ink-2); }
        .svc-offer-details{ list-style:none; margin:14px 0 0; padding:12px 0 0; border-top:1px solid var(--rule); }
        .svc-offer-details li{ display:flex; align-items:flex-start; gap:8px; font-family:var(--sans);
          font-size:12.5px; color:var(--ink-3); margin-bottom:6px; }
        .svc-check{ margin-top:2px; flex-shrink:0; color:var(--accent-deep); }
      `}</style>
    </section>
  );
}
