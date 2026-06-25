import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ProjectMap from '@/components/ProjectMap';
import ProjectCards from '@/components/ProjectCards';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Yu Development — Projects',
};

const css = `
  :root{
    --paper:#EFEDE6; --paper-2:#E5E2D8; --ink:#14161A; --ink-2:#2F3238; --ink-3:#61656D;
    --rule:#C6C3B7; --accent:#1F3A5C; --accent-2:#6FA0C9; --accent-deep:#15283B;
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
  .projects{ padding:clamp(96px,12vw,150px) 0 clamp(120px,15vw,190px); }
  .wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .proj-head{ margin:0; max-width:24ch; font-family:var(--sans); font-weight:600;
    font-size:clamp(22px,2.4vw,32px); line-height:1.12; letter-spacing:-0.022em; color:var(--ink); text-wrap:balance; }
  .rule{ height:1px; background:var(--rule); margin:clamp(18px,2.2vw,28px) 0 clamp(24px,3vw,38px); }

  /* map placeholder */
  .map{ width:100%; aspect-ratio:21/8; background:var(--paper-2); overflow:hidden; }
  .map image-slot{ display:block; width:100%; height:100%; }

  /* project grid — exact match to v12 featured-projects 3-wide cards */
  .proj-grid{ margin-top:clamp(40px,5vw,60px); display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(24px,2.6vw,36px); }
  .pcard{ text-decoration:none; display:block; }
  .pcard .pshot{ width:100%; aspect-ratio:3/2; overflow:hidden; }
  .pcard .pshot img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s cubic-bezier(.2,.7,.2,1); }
  .pcard:hover .pshot img{ transform:scale(1.04); }
  .pcard .pm{ display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-top:12px; }
  .pcard .nm{ font-family:var(--sans); font-weight:600; font-size:18px; letter-spacing:-0.01em; color:var(--ink); }
  .pcard .lcol{ display:flex; flex-direction:column; }
  .pcard .lcol .u{ margin-top:6px; font-family:var(--sans); font-weight:400; font-size:14px; line-height:1.2; letter-spacing:0; color:var(--ink-3); font-variant-numeric:tabular-nums; }
  .pcard .loc{ display:inline-flex; align-items:center; gap:5px; font-family:var(--sans); font-size:14px; color:var(--ink-3); }
  @media (max-width:880px){ .proj-grid{ grid-template-columns:1fr 1fr; } }
  @media (max-width:560px){ .proj-grid{ grid-template-columns:1fr; } }

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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav active="projects" />

      <section className="projects">
        <div className="wrap">
          <h2 className="proj-head">Our Projects</h2>
          <div className="rule"></div>

          <div className="map"><ProjectMap /></div>

          <div className="rule"></div>

          <div className="proj-grid">
            {projects.length ? (
              <ProjectCards projects={projects} />
            ) : (
              <>
                <a className="pcard" href="#">
                  <div className="pshot"><img src="/media/project-douglas.png" alt="Aerial view of a Yu Development community in Douglas, Georgia." /></div>
                  <div className="pm"><span className="lcol"><span className="nm">Platform Douglas</span><span className="u">126 units</span></span><span className="loc">Douglas, GA</span></div>
                </a>
                <a className="pcard" href="#">
                  <div className="pshot"><img src="/media/project-flint-river.png" alt="Aerial view of Platform Flint River in Bainbridge, Georgia." /></div>
                  <div className="pm"><span className="lcol"><span className="nm">Platform Flint River</span><span className="u">192 units</span></span><span className="loc">Bainbridge, GA</span></div>
                </a>
                <a className="pcard" href="#">
                  <div className="pshot"><img src="/media/project-dothan.png" alt="Aerial view of Platform Dothan in Dothan, Alabama." /></div>
                  <div className="pm"><span className="lcol"><span className="nm">Platform Dothan</span><span className="u">208 units</span></span><span className="loc">Dothan, AL</span></div>
                </a>
                <a className="pcard" href="#">
                  <div className="pshot"><img src="/media/project-americus.png" alt="Aerial view of Platform Americus in Americus, Georgia." /></div>
                  <div className="pm"><span className="lcol"><span className="nm">Platform Americus</span><span className="u">80 units</span></span><span className="loc">Americus, GA</span></div>
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
