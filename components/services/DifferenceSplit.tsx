import { Check, X } from 'lucide-react';
import { differenceOther, differenceUs } from '@/lib/servicesContent';

export default function DifferenceSplit() {
  return (
    <section className="svc-section">
      <div className="svc-wrap">
        <h2 className="svc-h2">Everyone else in this category is a supplier.</h2>
        <p className="svc-lede">
          You can buy production hours from an outsourcing shop. What you can’t buy is a team that’s already stood in front of the plan reviewer in your jurisdiction.
        </p>

        <div className="svc-split">
          <div className="svc-split-col svc-split-other">
            <span className="svc-split-tag svc-tag-no">The usual option</span>
            <h3 className="svc-split-title">An outsourcing shop</h3>
            <ul className="svc-split-list">
              {differenceOther.map((r) => (
                <li key={r.label}>
                  <X size={14} className="svc-split-icon svc-icon-no" />
                  {r.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="svc-split-col svc-split-us">
            <span className="svc-split-tag svc-tag-yes">Yu Development</span>
            <h3 className="svc-split-title">A developer’s in-house team</h3>
            <ul className="svc-split-list">
              {differenceUs.map((r) => (
                <li key={r.label}>
                  <Check size={14} className="svc-split-icon svc-icon-yes" />
                  {r.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .svc-split{ margin-top:32px; display:grid; grid-template-columns:1fr 1fr; border:1px solid var(--rule);
          border-radius:4px; overflow:hidden; background:#fff; }
        @media (max-width:760px){ .svc-split{ grid-template-columns:1fr; } }
        .svc-split-col{ padding:32px; }
        .svc-split-other{ background:var(--paper-2); border-right:1px solid var(--rule); }
        @media (max-width:760px){ .svc-split-other{ border-right:0; border-bottom:1px solid var(--rule); } }
        .svc-split-tag{ display:block; font-family:var(--sans); font-size:11px; font-weight:700;
          letter-spacing:0.11em; text-transform:uppercase; margin-bottom:12px; }
        .svc-tag-no{ color:var(--ink-3); }
        .svc-tag-yes{ color:var(--accent-deep); }
        .svc-split-title{ margin:0 0 16px; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
          font-size:20px; color:var(--ink); }
        .svc-split-list{ list-style:none; margin:0; padding:0; }
        .svc-split-list li{ display:flex; align-items:flex-start; gap:10px; font-family:var(--sans);
          font-size:14px; line-height:1.5; color:var(--ink-2); margin-bottom:12px; }
        .svc-split-icon{ margin-top:3px; flex-shrink:0; }
        .svc-icon-no{ color:#A3937C; }
        .svc-icon-yes{ color:var(--accent-deep); }
      `}</style>
    </section>
  );
}
