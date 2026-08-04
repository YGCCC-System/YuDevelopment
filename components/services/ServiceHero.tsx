// Full-bleed hero for the /services/architects and /services/engineers pages.
// Relies on --ink / --paper / --serif / --sans custom properties defined by the parent page.

interface ServiceHeroProps {
  eyebrow: string;
  headline: string;
  subhead: string;
}

export default function ServiceHero({ eyebrow, headline, subhead }: ServiceHeroProps) {
  return (
    <section className="svc-hero">
      <div className="svc-hero-bg" />
      <div className="svc-hero-inner">
        <span className="svc-eyebrow">{eyebrow}</span>
        <h1 className="svc-hero-headline">{headline}</h1>
        <p className="svc-hero-subhead">{subhead}</p>
        <a href="#schedule" className="svc-btn svc-btn-light">
          Schedule a call <span aria-hidden="true">→</span>
        </a>
      </div>

      <style>{`
        .svc-hero{ position:relative; overflow:hidden; min-height:78vh; display:flex; align-items:center;
          justify-content:center; text-align:center; }
        .svc-hero-bg{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(14,22,38,.72), rgba(14,22,38,.55) 55%, rgba(14,22,38,.85)), url('/media/svc-design-drafting.jpg') center/cover no-repeat; }
        .svc-hero-inner{ position:relative; z-index:2; max-width:820px; padding:120px clamp(24px,5vw,56px) 80px; }
        .svc-eyebrow{ display:inline-block; margin-bottom:18px; padding:6px 16px; border-radius:999px;
          background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.24);
          font-family:var(--sans); font-size:12px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:#F7F8FA; }
        .svc-hero-headline{ margin:0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
          font-size:clamp(36px,5.2vw,60px); line-height:1.05; letter-spacing:-0.015em; color:#fff; }
        .svc-hero-subhead{ margin:20px auto 0; max-width:620px; font-family:var(--sans); font-size:clamp(16px,1.6vw,20px);
          line-height:1.5; color:rgba(247,248,250,.86); }
        .svc-btn{ display:inline-flex; align-items:center; gap:8px; margin-top:32px; padding:15px 30px;
          border-radius:999px; font-family:var(--sans); font-weight:600; font-size:16px; text-decoration:none;
          transition:transform .2s ease, background .2s ease; }
        .svc-btn-light{ background:#fff; color:var(--ink); }
        .svc-btn-light:hover{ transform:translateY(-1px); background:#F1EFE8; }
      `}</style>
    </section>
  );
}
