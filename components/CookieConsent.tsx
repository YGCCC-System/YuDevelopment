'use client';

// Cookie consent banner. Shows on first visit, remembers the choice in
// localStorage, and offers Accept all / Reject non-essential / Cookie settings
// (per-category toggles). Styled to match the site (navy panel, olive accent,
// hard corners). No third-party scripts — reads/writes the consent locally so
// you can gate analytics/marketing on it later.
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'yu-cookie-consent';

type Consent = { essential: true; analytics: boolean; marketing: boolean; ts: number };

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const save = (a: boolean, m: boolean) => {
    const consent: Consent = { essential: true, analytics: a, marketing: m, ts: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* ignore */
    }
    // Let other scripts react (e.g. load analytics only if allowed).
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }));
    setShow(false);
    setSettingsOpen(false);
  };

  if (!show) return null;

  return (
    <div className="cc-root" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cc-panel">
        {!settingsOpen ? (
          <>
            <div className="cc-copy">
              <p className="cc-text">
                <strong>We use cookies</strong> to run this site and, with your consent, for analytics. See our <a href="/privacy">Privacy Policy</a>.
              </p>
            </div>
            <div className="cc-actions">
              <button type="button" className="cc-btn cc-ghost" onClick={() => setSettingsOpen(true)}>Settings</button>
              <button type="button" className="cc-btn cc-ghost" onClick={() => save(false, false)}>Reject</button>
              <button type="button" className="cc-btn cc-accept" onClick={() => save(true, true)}>Accept</button>
            </div>
          </>
        ) : (
          <>
            <div className="cc-copy">
              <p className="cc-title">Cookie settings</p>
              <div className="cc-cats">
                <label className="cc-cat cc-cat--locked">
                  <span>
                    <span className="cc-cat-name">Essential</span>
                    <span className="cc-cat-desc">Required for the site to work. Always on.</span>
                  </span>
                  <span className="cc-toggle cc-toggle--on cc-toggle--locked" aria-hidden="true"><span /></span>
                </label>
                <label className="cc-cat">
                  <span>
                    <span className="cc-cat-name">Analytics</span>
                    <span className="cc-cat-desc">Helps us understand how the site is used.</span>
                  </span>
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                  <span className={`cc-toggle${analytics ? ' cc-toggle--on' : ''}`} aria-hidden="true"><span /></span>
                </label>
                <label className="cc-cat">
                  <span>
                    <span className="cc-cat-name">Marketing</span>
                    <span className="cc-cat-desc">Used to personalize and measure outreach.</span>
                  </span>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <span className={`cc-toggle${marketing ? ' cc-toggle--on' : ''}`} aria-hidden="true"><span /></span>
                </label>
              </div>
            </div>
            <div className="cc-actions">
              <button type="button" className="cc-btn cc-ghost" onClick={() => save(false, false)}>Reject all</button>
              <button type="button" className="cc-btn cc-ghost" onClick={() => save(analytics, marketing)}>Save preferences</button>
              <button type="button" className="cc-btn cc-accept" onClick={() => save(true, true)}>Accept all</button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .cc-root{ position:fixed; left:0; right:0; bottom:0; z-index:1000;
          background:#0E1626; color:#F7F8FA; border-top:1px solid rgba(255,255,255,.14);
          box-shadow:0 -14px 44px -28px rgba(0,0,0,.6);
          font-family:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif; }
        .cc-panel{ max-width:1280px; margin:0 auto; display:flex; align-items:center;
          justify-content:space-between; gap:clamp(14px,2.5vw,40px); flex-wrap:wrap;
          padding:clamp(10px,1.1vw,13px) clamp(24px,5vw,72px); }
        .cc-copy{ flex:1 1 320px; min-width:0; max-width:78ch; }
        .cc-title{ margin:0 0 6px; font-weight:600; font-size:15px; letter-spacing:0.01em; }
        .cc-text{ margin:0; font-size:13px; line-height:1.4; color:rgba(247,248,250,.66); }
        .cc-text strong{ color:#F7F8FA; font-weight:600; }
        .cc-text a{ color:#8B9A5B; text-decoration:underline; text-underline-offset:2px; }
        .cc-text a:hover{ color:#B7C489; }
        .cc-actions{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .cc-btn{ font-family:inherit; font-weight:600; font-size:13px; letter-spacing:0.01em; cursor:pointer;
          padding:8px 16px; border-radius:0; transition:background .2s ease, color .2s ease, border-color .2s ease; white-space:nowrap; }
        .cc-ghost{ background:transparent; color:rgba(247,248,250,.82); border:1px solid rgba(255,255,255,.24); }
        .cc-ghost:hover{ color:#F7F8FA; border-color:rgba(255,255,255,.5); }
        .cc-accept{ background:#6E7B43; color:#fff; border:1px solid #6E7B43; }
        .cc-accept:hover{ background:#586235; border-color:#586235; }

        .cc-cats{ display:flex; flex-direction:column; gap:2px; margin-top:6px; }
        .cc-cat{ display:flex; align-items:center; justify-content:space-between; gap:20px; padding:11px 0;
          border-top:1px solid rgba(255,255,255,.10); cursor:pointer; position:relative; }
        .cc-cat:first-child{ border-top:none; }
        .cc-cat input{ position:absolute; opacity:0; width:0; height:0; }
        .cc-cat-name{ display:block; font-size:14px; font-weight:600; }
        .cc-cat-desc{ display:block; font-size:12.5px; color:rgba(247,248,250,.6); margin-top:2px; }
        .cc-toggle{ flex:none; width:42px; height:24px; background:rgba(255,255,255,.18); position:relative;
          transition:background .2s ease; }
        .cc-toggle > span{ position:absolute; top:3px; left:3px; width:18px; height:18px; background:#F7F8FA;
          transition:transform .2s ease; }
        .cc-toggle--on{ background:#6E7B43; }
        .cc-toggle--on > span{ transform:translateX(18px); }
        .cc-toggle--locked{ opacity:.6; }

        @media (max-width:680px){
          .cc-panel{ flex-direction:column; align-items:stretch; justify-content:flex-start; gap:16px; }
          .cc-copy{ flex:0 0 auto; }
          .cc-actions{ justify-content:stretch; gap:8px; }
          .cc-actions .cc-btn{ flex:1; text-align:center; padding:12px 10px; }
        }
      `}</style>
    </div>
  );
}
