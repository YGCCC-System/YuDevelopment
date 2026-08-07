'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { servicesFAQ, type FAQItem } from '@/lib/servicesContent';

export default function ServicesFAQ({ faq = servicesFAQ }: { faq?: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="svc-section">
      <div className="svc-wrap svc-wrap-narrow">
        <h2 className="svc-h2">Frequently asked questions</h2>

        <ul className="svc-faq-list">
          {faq.map((f, i) => {
            const isOpen = i === open;
            return (
              <li key={f.q} className="svc-faq-item">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="svc-faq-question"
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <ChevronDown size={18} className={`svc-faq-chevron${isOpen ? ' open' : ''}`} />
                </button>
                {isOpen && <p className="svc-faq-answer">{f.a}</p>}
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        .svc-wrap-narrow{ max-width:820px; }
        .svc-faq-list{ list-style:none; margin:24px 0 0; padding:0; border-top:1px solid var(--rule); }
        .svc-faq-item{ border-bottom:1px solid var(--rule); }
        .svc-faq-question{ width:100%; display:flex; align-items:center; justify-content:space-between;
          gap:16px; padding:16px 0; background:none; border:none; cursor:pointer; text-align:left;
          font-family:var(--sans); font-weight:500; font-size:15px; color:var(--ink); }
        .svc-faq-chevron{ flex-shrink:0; transition:transform .2s ease; color:var(--ink-3); }
        .svc-faq-chevron.open{ transform:rotate(180deg); }
        .svc-faq-answer{ margin:-4px 0 16px; font-family:var(--sans); font-size:14px; line-height:1.55; color:var(--ink-2); }
      `}</style>
    </section>
  );
}
