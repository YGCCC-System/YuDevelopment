import { FileText } from 'lucide-react';
import { planLibrary } from '@/lib/servicesContent';

export default function PlanLibrary() {
  return (
    <section className="svc-section svc-section-alt">
      <div className="svc-wrap">
        <h2 className="svc-h2">Browse full plan sets</h2>
        <p className="svc-lede">A few complete concept plan sets so you can see the level of detail before you send us a project.</p>

        <div className="svc-plan-grid">
          {planLibrary.map((plan) => (
            <div key={plan.slug} className="svc-plan-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={plan.imagePath} alt={plan.title} className="svc-plan-image" />
              <div className="svc-plan-body">
                <h3 className="svc-offer-title">{plan.title}</h3>
                <p className="svc-offer-desc">{plan.description}</p>
                <a href={plan.pdfPath} target="_blank" rel="noopener noreferrer" className="svc-link">
                  <FileText size={15} /> View full plan set (PDF)
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-plan-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media (max-width:820px){ .svc-plan-grid{ grid-template-columns:1fr; } }
        .svc-plan-card{ background:#fff; border:1px solid var(--rule); overflow:hidden; }
        .svc-plan-image{ display:block; width:100%; height:160px; object-fit:contain; background:#fff; padding:8px; }
        .svc-plan-body{ padding:18px; border-top:1px solid var(--rule); }
      `}</style>
    </section>
  );
}
