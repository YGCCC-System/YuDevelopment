'use client';

// Top-level switcher on the Services page. Two options:
//   1. Yu Development          -> Development & Partner services (ExpertiseTabs)
//   2. Yu Development Services -> Development Support write-up (DevelopmentSupportSection)
import { useState, useEffect } from 'react';
import ExpertiseTabs from './ExpertiseTabs';
import DevelopmentSupportSection from './DevelopmentSupportSection';

const OPTIONS = [
  { key: 'dev', label: 'Yu Development', sub: 'Development & Partner Services' },
  { key: 'svc', label: 'Yu Development Services', sub: 'Development Support' },
] as const;

// `home` renders a short overview for the Development Support option (with a
// "See more" link to the full version on /services). On /services the switch
// shows the full content and honors ?area=support to pre-select that option.
export default function ServicesSwitch({ home = false }: { home?: boolean }) {
  const [opt, setOpt] = useState<'dev' | 'svc'>('dev');

  useEffect(() => {
    if (home) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('area') === 'support' || window.location.hash === '#development-support') {
      setOpt('svc');
    }
  }, [home]);

  return (
    <>
      <div className="sw-bar">
        <div className="sw-wrap">
          <p className="sw-eyebrow">Choose an area</p>
          <div className="sw-toggle" role="tablist" aria-label="Service areas">
            {OPTIONS.map((o) => (
              <button
                key={o.key}
                type="button"
                role="tab"
                aria-selected={opt === o.key}
                className={`sw-btn${opt === o.key ? ' active' : ''}`}
                onClick={() => setOpt(o.key)}
              >
                <span className="sw-label">{o.label}</span>
                <span className="sw-sub">{o.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Both panels stay in the DOM (good for SEO); the toggle just shows one. */}
      <div hidden={opt !== 'dev'}>
        <ExpertiseTabs />
      </div>
      <div hidden={opt !== 'svc'} id="development-support">
        <DevelopmentSupportSection variant={home ? 'overview' : 'full'} />
      </div>

      <style>{`
        .sw-bar{ background:var(--paper,#EFEDE6); padding:clamp(46px,6.5vh,84px) 0 clamp(6px,1vh,12px); }
        .sw-wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
        .sw-eyebrow{ margin:0 0 16px; font-family:var(--mono,"Geist Mono",monospace); font-size:12px;
          font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:var(--accent,#6E7B43); }
        .sw-toggle{ display:inline-flex; border:1px solid var(--rule,#C6C3B7);
          box-shadow:0 3px 16px rgba(20,22,26,.08); }
        .sw-btn{ display:flex; flex-direction:column; gap:5px; align-items:flex-start; text-align:left;
          padding:15px 30px; background:#fff; border:none; border-right:1px solid var(--rule,#C6C3B7);
          cursor:pointer; transition:background .2s ease, color .2s ease; }
        .sw-btn:last-child{ border-right:none; }
        .sw-btn.active{ background:var(--ink,#14161A); }
        .sw-label{ font-family:var(--sans); font-weight:600; font-size:clamp(16px,1.4vw,20px);
          letter-spacing:-0.012em; color:var(--ink,#14161A); }
        .sw-sub{ font-family:var(--mono,"Geist Mono",monospace); font-size:11px; letter-spacing:0.16em;
          text-transform:uppercase; color:var(--ink-3,#61656D); }
        .sw-btn.active .sw-label{ color:#fff; }
        .sw-btn.active .sw-sub{ color:rgba(247,248,250,.62); }
        .sw-btn:not(.active):hover{ background:var(--paper-2,#E5E2D8); }

        @media (max-width:620px){
          .sw-toggle{ display:flex; flex-direction:column; width:100%; }
          .sw-btn{ border-right:none; border-bottom:1px solid var(--rule,#C6C3B7); }
          .sw-btn:last-child{ border-bottom:none; }
        }
      `}</style>
    </>
  );
}
