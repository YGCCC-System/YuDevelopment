import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { careersActive, OPENINGS } from '@/lib/careers';

export const metadata: Metadata = {
  title: 'Yu Development — Careers',
};

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

  .nav{ position:sticky; top:0; z-index:40; background:#0E1626;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid rgba(255,255,255,.10); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#F7F8FA; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:rgba(247,248,250,.80); text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#F7F8FA; }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

  .careers{ padding:clamp(72px,10vw,120px) 0 clamp(96px,13vw,150px); }
  .wrap{ max-width:900px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .careers-eyebrow{ margin:0 0 16px; font-family:var(--mono); font-size:12px; font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:var(--accent); }
  .careers-head{ margin:0; font-family:var(--sans); font-weight:600; font-size:clamp(30px,4vw,48px); line-height:1.08; letter-spacing:-0.025em; color:var(--ink); }
  .careers-lead{ margin:18px 0 0; font-size:clamp(16px,1.3vw,19px); line-height:1.6; color:var(--ink-2); max-width:60ch; }
  .careers-accent{ width:56px; height:3px; background:var(--accent); margin:22px 0 0; }
  .rule{ height:1px; background:var(--rule); margin:clamp(30px,4vw,48px) 0 0; }

  /* Coming-soon state (shown when there are no openings) */
  .careers-soon{ margin-top:clamp(30px,4vw,44px); }
  .soon-tag{ margin:0 0 18px; display:inline-block; font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:0.16em; text-transform:uppercase; color:var(--accent); border:1px solid var(--accent); padding:7px 14px; }
  .soon-cta{ margin-top:clamp(26px,3vw,38px); }
  .soon-cta a{ display:inline-flex; align-items:center; gap:9px; color:var(--link); font-weight:500;
    font-size:clamp(20px,2.2vw,28px); letter-spacing:-0.01em; text-decoration:none; transition:color .2s ease; }
  .soon-cta a .arw{ display:inline-block; transition:transform .25s ease; animation:ctaNudge 1.9s ease-in-out infinite; }
  .soon-cta a:hover{ color:var(--accent-deep); }
  .soon-cta a:hover .arw{ transform:translateX(8px); animation:none; }
  @keyframes ctaNudge{ 0%,100%{ transform:translateX(0); } 50%{ transform:translateX(6px); } }
  @media (prefers-reduced-motion: reduce){ .soon-cta a .arw{ animation:none; transition:none; } }

  .jobs{ display:grid; gap:0; margin-top:clamp(20px,3vw,36px); }
  .job{ display:flex; justify-content:space-between; align-items:flex-start; gap:28px;
    padding:clamp(24px,3vw,34px) 0; border-bottom:1px solid var(--rule); }
  .job:first-child{ border-top:1px solid var(--rule); }
  .job .jinfo{ max-width:56ch; }
  .job .jtitle{ margin:0; font-family:var(--sans); font-weight:600; font-size:clamp(20px,1.9vw,26px); letter-spacing:-0.012em; color:var(--ink); }
  .job .jmeta{ margin:8px 0 0; font-family:var(--mono); font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-3); }
  .job .jblurb{ margin:12px 0 0; font-size:clamp(15px,1.2vw,17px); line-height:1.55; color:var(--ink-2); }
  .job .japply{ flex:none; display:inline-flex; align-items:center; gap:8px; font-family:var(--sans);
    font-weight:600; font-size:14px; letter-spacing:0.02em; color:#fff; background:var(--accent);
    padding:13px 24px; text-decoration:none; transition:background .2s ease; white-space:nowrap; }
  .job .japply:hover{ background:var(--accent-deep); }
  @media (max-width:640px){ .job{ flex-direction:column; gap:16px; } }

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

export default function CareersPage() {
  // When we're hiring, list the openings. Otherwise show a "coming soon" note —
  // the page and the "Careers" link always stay visible.
  const active = careersActive();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav />

      <section className="careers">
        <div className="wrap">
          <p className="careers-eyebrow">Yu Development · Careers</p>
          <h1 className="careers-head">{active ? 'Open positions' : 'Careers'}</h1>
          <div className="careers-accent"></div>

          {active ? (
            <>
              <p className="careers-lead">
                We&rsquo;re a small, operator-led team building attainable housing across the Southeast.
                If one of these roles fits, we&rsquo;d like to hear from you.
              </p>
              <div className="rule"></div>
              <div className="jobs">
                {OPENINGS.map((job, i) => (
                  <div className="job" key={i}>
                    <div className="jinfo">
                      <h2 className="jtitle">{job.title}</h2>
                      <p className="jmeta">{job.location} · {job.type}</p>
                      <p className="jblurb">{job.blurb}</p>
                    </div>
                    <a className="japply" href={job.applyUrl || '/contact'}>Apply &rarr;</a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="careers-soon">
              <p className="soon-tag">Coming soon</p>
              <p className="careers-lead">
                We don&rsquo;t have any openings posted right now. We&rsquo;re always glad to hear from
                talented people who care about attainable housing, so check back soon &mdash; or
                introduce yourself and we&rsquo;ll keep you in mind.
              </p>
              <div className="soon-cta"><a href="/contact">Get in touch <span className="arw">&rarr;</span></a></div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
