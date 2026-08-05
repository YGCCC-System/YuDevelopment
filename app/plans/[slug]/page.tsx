import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getPlanBySlug, allPlanSlugs } from '@/lib/servicesContent';

export function generateStaticParams() {
  return allPlanSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return { title: 'Plan set' };
  return { title: `${plan.data.title} — Yu Development` };
}

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

  .nav{ position:sticky; top:0; z-index:40; background:#0E1626;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid rgba(255,255,255,.10); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#F7F8FA; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:rgba(247,248,250,.80); text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#F7F8FA; }
  .nav .links a.active{ color:#F7F8FA; }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

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

  .pv-wrap{ max-width:1000px; margin:0 auto; padding:56px clamp(28px,5vw,72px) 96px; }
  .pv-eyebrow{ font-family:var(--sans); font-size:11px; font-weight:600; letter-spacing:0.13em; text-transform:uppercase; color:var(--ink-3); margin:0 0 10px; }
  .pv-title{ margin:0; font-family:var(--serif,'Newsreader',Georgia,serif); font-weight:700; font-size:clamp(28px,3.6vw,42px); color:var(--ink); }
  .pv-desc{ margin:14px 0 0; max-width:70ch; font-family:var(--sans); font-size:16px; line-height:1.6; color:var(--ink-2); }
  .pv-tag-row{ margin-top:16px; display:flex; flex-wrap:wrap; gap:6px; }
  .pv-tag{ padding:4px 11px; border-radius:999px; background:var(--paper-2); font-family:var(--sans); font-size:11px; font-weight:500; color:var(--ink-2); }
  .pv-actions{ margin-top:24px; display:flex; flex-wrap:wrap; gap:12px; }
  .pv-btn{ display:inline-flex; align-items:center; gap:8px; padding:12px 22px; border-radius:999px; font-family:var(--sans);
    font-weight:600; font-size:14px; text-decoration:none; transition:background .2s ease; }
  .pv-btn-primary{ background:var(--ink); color:#fff; }
  .pv-btn-primary:hover{ background:var(--ink-2); }
  .pv-btn-ghost{ background:#fff; color:var(--ink); border:1px solid var(--rule); }
  .pv-btn-ghost:hover{ background:var(--paper-2); }
  .pv-frame{ margin-top:32px; width:100%; height:82vh; min-height:520px; border:1px solid var(--rule); border-radius:4px; overflow:hidden; background:#fff; }
  .pv-frame iframe{ width:100%; height:100%; border:none; }
  .pv-fallback{ margin-top:12px; font-family:var(--sans); font-size:13px; color:var(--ink-3); }
`;

export default async function PlanViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  const pdfPath = plan.kind === 'case-study' ? plan.data.planPdfPath : plan.data.pdfPath;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <SiteNav active="services" />

      <div className="pv-wrap">
        <p className="pv-eyebrow">{plan.kind === 'case-study' ? 'Case study' : 'Concept plan set'}</p>
        <h1 className="pv-title">{plan.data.title}</h1>

        {plan.kind === 'case-study' ? (
          <>
            <p className="pv-desc">{plan.data.projectType}</p>
            <p className="pv-desc">{plan.data.summary}</p>
            <div className="pv-tag-row">
              {plan.data.servicesProvided.map((tag) => (
                <span key={tag} className="pv-tag">{tag}</span>
              ))}
            </div>
          </>
        ) : (
          <p className="pv-desc">{plan.data.description}</p>
        )}

        <div className="pv-actions">
          <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="pv-btn pv-btn-primary">
            Open full PDF in a new tab
          </a>
          <a href="/services/architects#schedule" className="pv-btn pv-btn-ghost">
            Schedule a call
          </a>
        </div>

        <div className="pv-frame">
          <iframe src={pdfPath} title={`${plan.data.title} plan set`} />
        </div>
        <p className="pv-fallback">If the preview doesn’t load on your device, use “Open full PDF in a new tab” above.</p>
      </div>

      <SiteFooter />
    </>
  );
}
