'use client';

import Script from 'next/script';
import { CALENDLY_URL } from '@/lib/servicesContent';

/*
  The three qualifying questions (specialty, current workload, biggest
  problem right now) must be added as Custom Questions on this Calendly
  event itself: Calendly renders its own booking form, so the embed can't
  inject questions that aren't configured on the event.
*/
export default function CalendlyEmbed({ ctaHeadline }: { ctaHeadline: string }) {
  return (
    <section id="schedule" className="svc-section svc-dark">
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <div className="svc-wrap svc-wrap-narrow svc-center">
        <h2 className="svc-h2">{ctaHeadline}</h2>
        <p className="svc-lede-dark">Before we hop on a call, we’ll ask a few quick questions so we show up ready to help:</p>

        <div className="svc-qual-row">
          <div className="svc-qual-item">What’s your specialty?</div>
          <div className="svc-qual-item">What does your workload look like right now?</div>
          <div className="svc-qual-item">What’s the biggest problem you’re trying to solve?</div>
        </div>

        <div className="calendly-inline-widget svc-calendly-widget" data-url={CALENDLY_URL} style={{ minWidth: '320px', height: '700px' }} />
      </div>

      <style>{`
        .svc-center{ text-align:center; }
        .svc-lede-dark{ margin-top:10px; font-family:var(--sans); font-size:17px; color:rgba(247,248,250,.72); }
        .svc-qual-row{ margin:18px auto 0; max-width:640px; display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
        .svc-qual-item{ flex:1; min-width:180px; padding:12px 16px; border-radius:10px; background:rgba(255,255,255,.06);
          font-family:var(--sans); font-size:13.5px; color:rgba(247,248,250,.85); }
        .svc-calendly-widget{ margin-top:28px; border-radius:4px; overflow:hidden; background:#fff; }
      `}</style>
    </section>
  );
}
