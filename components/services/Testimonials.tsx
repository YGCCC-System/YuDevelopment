import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/servicesContent';

export default function Testimonials({ heading = 'What partner firms say' }: { heading?: string }) {
  return (
    <section className="svc-section svc-section-alt">
      <div className="svc-wrap">
        <h2 className="svc-h2">{heading}</h2>

        <div className="svc-testi-grid">
          {testimonials.map((t) => (
            <div key={t.name} className={`svc-testi-card${t.ready ? '' : ' svc-testi-pending'}`}>
              <Quote size={22} className="svc-testi-mark" />
              {t.ready ? (
                <p className="svc-testi-quote">{t.quote}</p>
              ) : (
                <p className="svc-testi-quote svc-testi-quote-pending">Testimonial coming soon.</p>
              )}
              <p className="svc-testi-name">{t.name}</p>
              <p className="svc-testi-role">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-testi-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 360px));
          justify-content:center; gap:20px; }
        @media (max-width:640px){ .svc-testi-grid{ grid-template-columns:1fr; } }
        .svc-testi-card{ background:#fff; border:1px solid var(--rule); padding:28px; display:flex; flex-direction:column; }
        .svc-testi-mark{ color:var(--accent-deep); opacity:.5; margin-bottom:12px; }
        .svc-testi-quote{ flex:1; margin:0 0 20px; font-family:var(--sans); font-size:14.5px; line-height:1.6; color:var(--ink-2); }
        .svc-testi-quote-pending{ font-style:italic; color:var(--ink-3); }
        .svc-testi-pending{ opacity:.6; }
        .svc-testi-name{ margin:0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700; font-size:16px; color:var(--ink); }
        .svc-testi-role{ margin:2px 0 0; font-family:var(--sans); font-size:12.5px; color:var(--ink-3); }
      `}</style>
    </section>
  );
}
