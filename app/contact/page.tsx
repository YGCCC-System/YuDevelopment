import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Yu Development — Contact',
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
  html{ background:#23262A; }
  body{ background:var(--paper); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased; min-height:100%; }
  a{ color:inherit; }

  /* nav — matches homepage (.hf-nav.navy scrolled state) */
  .nav{ position:sticky; top:0; z-index:40; background:#fff;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid var(--rule); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#34383E; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:#34383E; text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#8A8E96; }
  .nav .links a.active{ color:var(--ink); }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

  /* section */
  .contact{ padding:clamp(96px,12vw,150px) 0 clamp(120px,15vw,190px); }
  .wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .contact-eyebrow{ margin:0 0 16px; font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:0.28em; text-transform:uppercase; color:var(--accent); }
  .contact-head{ margin:0; max-width:24ch; font-family:var(--sans); font-weight:600;
    font-size:clamp(30px,4vw,48px); line-height:1.08; letter-spacing:-0.025em; color:var(--ink); text-wrap:balance; }
  .contact-accent{ width:56px; height:3px; background:var(--accent); border-radius:2px; margin:22px 0 0; }
  .rule{ height:1px; background:var(--rule); margin:clamp(18px,2.2vw,28px) 0 clamp(36px,4.5vw,60px); }

  .split{ display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(40px,6vw,96px); align-items:start; }
  .lead{ margin:0; font-size:clamp(18px,1.5vw,22px); line-height:1.55; color:var(--ink-2); max-width:38ch; }
  .cta{ margin-top:clamp(28px,3.4vw,42px); }
  .cta a{ display:inline-flex; align-items:center; gap:9px; color:var(--link); font-weight:500; font-size:clamp(22px,2.4vw,32px); letter-spacing:-0.01em; text-decoration:none; }

  .details-title{ margin:clamp(30px,3.6vw,46px) 0 0; font-family:var(--mono); font-size:12px;
    letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); font-weight:500; }
  .details{ display:grid; gap:clamp(24px,2.6vw,32px); margin-top:18px; }
  .d{ position:relative; padding-left:34px; }
  .d-num{ position:absolute; left:0; top:1px; font-family:var(--mono); font-size:12px;
    letter-spacing:0.06em; color:var(--accent); font-weight:500; }
  .clickup-form{ width:100%; height:452px; display:block; border:1px solid var(--rule);
    border-radius:14px; background:#fff; box-shadow:0 18px 40px -24px rgba(20,22,26,.28); overflow:hidden; }
  @media (max-width:760px){ .clickup-form{ height:500px; } }
  .d h4{ margin:0 0 9px; font-family:var(--mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--ink); font-weight:500; transition:color .2s ease; }
  .d a, .d p{ margin:0; font-size:clamp(16px,1.3vw,18px); line-height:1.5; color:var(--ink); text-decoration:none; transition:color .2s ease; }
  .d .hint{ margin:7px 0 0; font-size:13.5px; line-height:1.5; color:var(--ink-3); max-width:34ch; }
  .d:hover h4, .d:hover a, .d:hover p{ color:var(--accent); }
  .d:hover .hint{ color:var(--ink-3); }

  @media (max-width:760px){ .split{ grid-template-columns:1fr; gap:44px; } }

  /* footer (ported from v12) */
  footer.v12foot{ --foot-bg:#23262A; --foot-line:rgba(255,255,255,.14); --foot-bright:#FFFFFF; --foot-text:rgba(255,255,255,.74); --foot-muted:rgba(255,255,255,.52);
    background:var(--foot-bg); color:var(--foot-text); border-top:1px solid var(--foot-line); padding:84px 0 28px; }
  footer.v12foot .foot-wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  footer.v12foot .top{ display:flex; justify-content:space-between; align-items:flex-start; gap:40px; margin-bottom:56px; flex-wrap:wrap; }
  footer.v12foot .col-office{ text-align:right; }
  footer.v12foot .foot-wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; color:var(--foot-bright); line-height:1; white-space:nowrap; }
  footer.v12foot .col .blurb{ margin:18px 0 0; max-width:32ch; font-family:var(--sans); color:var(--foot-muted); font-size:14px; line-height:1.6; }
  footer.v12foot .col a, footer.v12foot .col p{ display:block; margin:0 0 7px; font-family:var(--sans); font-size:14px; color:var(--foot-text); text-decoration:none; }
  footer.v12foot .col a:hover{ color:var(--foot-bright); }
  footer.v12foot .col-site .site-links{ display:grid; grid-template-columns:1fr 1fr; column-gap:32px; row-gap:0; }
  footer.v12foot .foot-careers{ font-weight:700; color:var(--foot-text); display:inline-block; border-bottom:1px solid currentColor; padding-bottom:3px; }
  footer.v12foot .foot-careers:hover{ color:var(--foot-bright); }
  footer.v12foot .col p a{ font-family:var(--sans); display:inline; }
  footer.v12foot .mega{ padding:28px 0 24px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-weight:600; text-transform:uppercase; letter-spacing:0.24em; font-size:clamp(22px,3vw,40px); line-height:1; color:var(--foot-bright); }
  footer.v12foot .legal{ display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; padding-top:16px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-size:13px; color:var(--foot-muted); }
  footer.v12foot .legal a{ color:var(--foot-muted); text-decoration:none; }
  footer.v12foot .legal a:hover{ color:var(--foot-bright); }
  footer.v12foot .legal-links a{ display:inline; margin-left:24px; }
`;

export default async function ContactPage() {
  const content = await getSiteContent();
  const c = content?.contact ?? {};
  const title = c.title || 'Contact';
  const lead = c.lead || 'Whether you have a site, a partnership in mind, or a question about how we work, we’d like to hear from you.';
  const email = 'services@yudevelopment.com';
  const phone = c.phone || '470-380-7339';
  const office = c.office || 'Atlanta, Georgia';
  const telHref = 'tel:+' + phone.replace(/[^0-9]/g, '');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav active="contact" />

      <section className="contact">
        <div className="wrap">
          <p className="contact-eyebrow">Yu Development · Contact</p>
          <h2 className="contact-head">{title}</h2>
          <div className="contact-accent"></div>
          <div className="rule"></div>

          <div className="split">
            <div>
              <p className="lead">{lead}</p>
              <p className="details-title">Three ways to reach us</p>
              <div className="details">
                <div className="d">
                  <span className="d-num">01</span>
                  <h4>Email</h4>
                  <a href={`mailto:${email}`}>{email}</a>
                  <p className="hint">Best for detailed inquiries — we reply within one business day.</p>
                </div>
                <div className="d">
                  <span className="d-num">02</span>
                  <h4>Phone</h4>
                  <a href={telHref}>{phone}</a>
                  <p className="hint">Call us Monday–Friday, 9am–5pm ET.</p>
                </div>
                <div className="d">
                  <span className="d-num">03</span>
                  <h4>Office</h4>
                  <p>{office}</p>
                  <p className="hint">Visits by appointment — reach out before stopping by.</p>
                </div>
              </div>
            </div>
            <div>
              <iframe
                className="clickup-form"
                src="https://forms.clickup.com/9017090351/f/8cqbr9f-79677/9OP9CMYCOV3AX5G7VH"
                title="Contact form"
                loading="lazy"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
