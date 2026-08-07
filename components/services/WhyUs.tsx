import { whyUs, type Differentiator } from '@/lib/servicesContent';

interface WhyUsProps {
  items?: Differentiator[];
  heading?: string;
}

export default function WhyUs({ items = whyUs, heading = 'Why firms hand us the overflow' }: WhyUsProps) {
  return (
    <section className="svc-section svc-section-alt">
      <div className="svc-wrap">
        <h2 className="svc-h2">{heading}</h2>

        <div className="svc-why-grid">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="svc-why-card">
                <div className="svc-icon-circle">
                  <Icon size={22} />
                </div>
                <h3 className="svc-offer-title">{item.title}</h3>
                <p className="svc-offer-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .svc-why-grid{ margin-top:32px; display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        @media (max-width:900px){ .svc-why-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .svc-why-grid{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
