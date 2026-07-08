// Shared shell for legal pages (Privacy, Terms). Matches the site nav + footer.
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export type LegalSection = { heading: string; body: (string | string[])[] };

const css = `
  :root{
    --paper:#EFEDE6; --paper-2:#E5E2D8; --ink:#14161A; --ink-2:#2F3238; --ink-3:#61656D;
    --rule:#C6C3B7; --accent:#6E7B43; --accent-2:#8B9A5B; --accent-deep:#586235; --link:#6E7B43;
    --sans:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
    --mono:"Geist Mono",ui-monospace,Menlo,monospace;
  }
  *,*::before,*::after{ box-sizing:border-box; }
  html,body{ margin:0; overscroll-behavior:none; }
  html{ background:#0E1626; }
  body{ background:var(--paper); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased; min-height:100%; }
  a{ color:inherit; }

  /* nav — matches homepage (.hf-nav.navy scrolled state) */
  .nav{ position:sticky; top:0; z-index:40; background:#0E1626;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid rgba(255,255,255,.10); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#F7F8FA; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:rgba(247,248,250,.80); text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#F7F8FA; }
  .nav .links a.active{ color:#F7F8FA; }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

  /* section */
  .legal-sec{ padding:clamp(72px,10vw,120px) 0 clamp(96px,13vw,150px); }
  .wrap{ max-width:820px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .legal-eyebrow{ margin:0 0 16px; font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:0.28em; text-transform:uppercase; color:var(--accent); }
  .legal-head{ margin:0; font-family:var(--sans); font-weight:600;
    font-size:clamp(30px,4vw,48px); line-height:1.08; letter-spacing:-0.025em; color:var(--ink); }
  .legal-accent{ width:56px; height:3px; background:var(--accent); border-radius:0; margin:22px 0 0; }
  .legal-updated{ margin:16px 0 0; font-family:var(--mono); font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-3); }
  .rule{ height:1px; background:var(--rule); margin:clamp(26px,3vw,40px) 0 clamp(30px,4vw,48px); }

  .legal-block{ margin:clamp(32px,4vw,48px) 0 0; }
  .legal-num{ display:block; margin:0 0 6px; font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:0.14em; color:var(--accent); }
  .legal-body h2{ margin:0 0 12px; font-family:var(--sans); font-weight:600; position:relative;
    padding-left:16px; font-size:clamp(18px,1.8vw,22px); letter-spacing:-0.012em; color:var(--ink); }
  .legal-body h2::before{ content:""; position:absolute; left:0; top:0.18em; width:5px; height:5px;
    border-radius:0; background:var(--accent); }
  .legal-body p{ margin:0 0 16px; font-size:clamp(15px,1.2vw,17px); line-height:1.62; color:var(--ink-2); max-width:66ch; }
  .legal-body ul{ margin:0 0 16px; padding-left:2px; list-style:none; }
  .legal-body li{ position:relative; padding-left:22px; font-size:clamp(15px,1.2vw,17px); line-height:1.62; color:var(--ink-2); max-width:64ch; margin:0 0 9px; }
  .legal-body li::before{ content:""; position:absolute; left:2px; top:0.62em; width:6px; height:1px; background:var(--accent); }
  .legal-body a{ color:var(--link); text-decoration:underline; text-underline-offset:2px; }
  .legal-body a:hover{ color:var(--accent-deep); }
  .legal-note{ margin-top:clamp(36px,4.5vw,56px); padding:18px 20px 18px 22px; border:1px solid var(--rule);
    border-left:3px solid var(--accent); border-radius:0; background:var(--paper-2); font-size:13.5px; line-height:1.55; color:var(--ink-3); }

  /* footer (ported from v12) */
  footer.v12foot{ --foot-bg:#0E1626; --foot-line:rgba(255,255,255,.14); --foot-bright:#FFFFFF; --foot-text:rgba(255,255,255,.74); --foot-muted:rgba(255,255,255,.52);
    background:var(--foot-bg); color:var(--foot-text); border-top:1px solid var(--foot-line); padding:84px 0 28px; }
  footer.v12foot .foot-wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  footer.v12foot .top{ display:flex; justify-content:space-between; align-items:flex-start; gap:40px; margin-bottom:56px; flex-wrap:wrap; }
  footer.v12foot .col-office{ text-align:right; }
  footer.v12foot .foot-wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; color:var(--foot-bright); line-height:1; white-space:nowrap; }
  footer.v12foot .col .blurb{ margin:18px 0 0; max-width:32ch; font-family:var(--sans); color:var(--foot-muted); font-size:14px; line-height:1.6; }
  footer.v12foot .col a, footer.v12foot .col p{ display:block; margin:0 0 7px; font-family:var(--sans); font-size:14px; color:var(--foot-text); text-decoration:none; }
  footer.v12foot .col a:hover{ color:var(--foot-bright); }
  footer.v12foot .col-site .site-links{ display:grid; grid-template-columns:1fr 1fr; column-gap:32px; row-gap:0; }
  footer.v12foot .col p a{ font-family:var(--sans); display:inline; }
  footer.v12foot .mega{ padding:28px 0 24px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-weight:600; text-transform:uppercase; letter-spacing:0.24em; font-size:clamp(22px,3vw,40px); line-height:1; color:var(--foot-bright); }
  footer.v12foot .legal{ display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; padding-top:16px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-size:13px; color:var(--foot-muted); }
  footer.v12foot .legal a{ color:var(--foot-muted); text-decoration:none; }
  footer.v12foot .legal a:hover{ color:var(--foot-bright); }
  footer.v12foot .legal-links a{ display:inline; margin-left:24px; }
`;

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav />

      <section className="legal-sec">
        <div className="wrap">
          <p className="legal-eyebrow">Yu Development · Legal</p>
          <h1 className="legal-head">{title}</h1>
          <div className="legal-accent"></div>
          <p className="legal-updated">Last updated · {updated}</p>
          <div className="rule"></div>

          <div className="legal-body">
            {sections.map((sec, i) => (
              <div className="legal-block" key={i}>
                <span className="legal-num">{String(i + 1).padStart(2, '0')}</span>
                <h2>{sec.heading}</h2>
                {sec.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j}>
                      {block.map((li, k) => (
                        <li key={k}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{block}</p>
                  )
                )}
              </div>
            ))}
          </div>

          <p className="legal-note">
            This page is provided for general information and does not constitute legal advice.
            Yu Development may update these terms from time to time; the “last updated” date above
            reflects the most recent revision.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
