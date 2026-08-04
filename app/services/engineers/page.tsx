import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ServiceHero from '@/components/services/ServiceHero';
import VideoShowcase from '@/components/services/VideoShowcase';
import ServiceOfferings from '@/components/services/ServiceOfferings';
import WhyUs from '@/components/services/WhyUs';
import ServiceCaseStudies from '@/components/services/ServiceCaseStudies';
import PlanLibrary from '@/components/services/PlanLibrary';
import ProcessSteps from '@/components/services/ProcessSteps';
import ServicesFAQ from '@/components/services/ServicesFAQ';
import CalendlyEmbed from '@/components/services/CalendlyEmbed';

export const metadata: Metadata = {
  title: 'Subcontracted Structural, Civil & MEP Engineering Services for Engineers',
  description:
    'Backlog piling up? Yu Development provides licensed structural, civil, MEP, drafting, and architectural services, sign, stamp and seal included, as an extension of your firm.',
};

const css = `
  :root{
    --paper:#EFEDE6; --paper-2:#E5E2D8; --ink:#14161A; --ink-2:#2F3238; --ink-3:#61656D;
    --rule:#C6C3B7; --accent:#6E7B43; --accent-2:#8B9A5B; --accent-deep:#586235;
    --sans:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
    --mono:"Geist Mono",ui-monospace,Menlo,monospace;
  }
  *,*::before,*::after{ box-sizing:border-box; }
  html,body{ margin:0; overscroll-behavior:none; }
  html{ background:#0E1626; }
  body{ background:var(--paper); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased; min-height:100%; }
  a{ color:inherit; }

  /* nav — navy panel to match the footer */
  .nav{ position:sticky; top:0; z-index:40; background:#0E1626;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid rgba(255,255,255,.10); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#F7F8FA; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:rgba(247,248,250,.80); text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#F7F8FA; }
  .nav .links a.active{ color:#F7F8FA; }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

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

  /* shared section building blocks for the services sub-pages */
  .svc-wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .svc-section{ padding:clamp(56px,7vw,88px) 0; }
  .svc-section-alt{ background:var(--paper-2); }
  .svc-dark{ background:#0E1626; }
  .svc-dark .svc-h2{ color:#fff; }
  .svc-dark .svc-lede{ color:rgba(247,248,250,.72); }
  .svc-h2{ margin:0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700;
    font-size:clamp(28px,3vw,38px); letter-spacing:-0.01em; color:var(--ink); }
  .svc-lede{ margin:10px 0 0; max-width:640px; font-family:var(--sans); font-size:16px; line-height:1.5; color:var(--ink-2); }
  .svc-link{ display:inline-flex; align-items:center; gap:6px; margin-top:14px; font-family:var(--sans);
    font-size:13.5px; font-weight:600; color:var(--ink); text-decoration:underline; text-underline-offset:3px; }
  .svc-link:hover{ color:var(--accent-deep); }
`;

export default function EngineersServicesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav active="services" />

      <ServiceHero
        eyebrow="For Engineers"
        headline="Overloaded on calcs? Bring us in before the deadline does."
        subhead="When structural, civil, or MEP scope is stacking up faster than your firm can stamp it, Yu Development picks up the overflow: coordinated, licensed, and ready to submit."
      />
      <VideoShowcase />
      <ServiceOfferings audience="engineers" />
      <WhyUs />
      <ServiceCaseStudies audience="engineers" />
      <PlanLibrary />
      <ProcessSteps />
      <ServicesFAQ />
      <CalendlyEmbed ctaHeadline="Tell us what’s on your plate" />

      <SiteFooter />
    </>
  );
}
