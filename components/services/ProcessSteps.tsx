import { processSteps, type ProcessStep } from '@/lib/servicesContent';

export default function ProcessSteps({ steps = processSteps }: { steps?: ProcessStep[] }) {
  return (
    <section className="svc-section svc-dark">
      <div className="svc-wrap">
        <h2 className="svc-h2">How it works</h2>

        <div className="svc-process-grid">
          {steps.map((s) => (
            <div key={s.step} className="svc-process-card">
              <span className="svc-process-num">{s.step}</span>
              <h3 className="svc-process-title">{s.title}</h3>
              <p className="svc-process-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-process-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        @media (max-width:900px){ .svc-process-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .svc-process-grid{ grid-template-columns:1fr; } }
        .svc-process-num{ font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700; font-size:34px;
          color:rgba(255,255,255,.24); }
        .svc-process-title{ margin:8px 0 0; font-family:var(--sans); font-weight:600; font-size:16px; color:#fff; }
        .svc-process-desc{ margin:6px 0 0; font-family:var(--sans); font-size:13.5px; line-height:1.5; color:rgba(247,248,250,.68); }
      `}</style>
    </section>
  );
}
