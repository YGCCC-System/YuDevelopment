import { townsPermitted } from '@/lib/servicesContent';

export default function TownsMarquee() {
  return (
    <section className="svc-towns">
      <div className="svc-towns-label-row">
        <span className="svc-towns-label">Permitted &amp; built in</span>
      </div>

      <div className="svc-towns-track-wrap">
        <div className="svc-towns-track">
          {[...townsPermitted, ...townsPermitted].map((t, i) => (
            <span key={`${t}-${i}`} className="svc-town">{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .svc-towns{ background:#fff; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:16px 0; }
        .svc-towns-label-row{ max-width:1280px; margin:0 auto 10px; padding:0 clamp(28px,5vw,72px); }
        .svc-towns-label{ font-family:var(--sans); font-size:11px; font-weight:600; letter-spacing:0.13em;
          text-transform:uppercase; color:var(--ink-3); }
        .svc-towns-track-wrap{ overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .svc-towns-track{ display:flex; gap:12px; width:max-content; animation:svc-scroll 22s linear infinite; }
        .svc-towns-track-wrap:hover .svc-towns-track{ animation-play-state:paused; }
        .svc-town{ flex-shrink:0; font-family:var(--sans); font-size:13px; font-weight:500; color:var(--ink-2);
          padding:6px 16px; border:1px solid var(--rule); border-radius:999px; background:var(--paper); white-space:nowrap; }
        @keyframes svc-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        @media (prefers-reduced-motion: reduce){ .svc-towns-track{ animation:none; } }
      `}</style>
    </section>
  );
}
