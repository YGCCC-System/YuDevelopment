import type { Metadata } from 'next';
import Script from 'next/script';
import ProjectCards from '@/components/ProjectCards';
import { getSiteContent, projectImage, isVideoUrl, FEATURED_NEWS } from '@/lib/content';
import ExpertiseTabs from '@/components/ExpertiseTabs';
import SocialLinks from '@/components/SocialLinks';

export const metadata: Metadata = {
  title: 'Yu Development — Hero',
};

// Split a stat string like "$90M" / "948" / "68%" into the parts the count-up
// animation in v12-scroll.js expects (data-count + data-prefix/suffix). When the
// value has no number, `count` is null and we render it as static text.
function parseFig(value?: string): { count: string | null; prefix: string; suffix: string; text: string } {
  const raw = String(value ?? '').trim();
  const m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return { count: null, prefix: '', suffix: '', text: raw };
  return { count: m[2].replace(/,/g, ''), prefix: m[1], suffix: m[3], text: raw };
}

const css = `
  :root{
    --paper:    #EFEDE6;
    --paper-2:  #E5E2D8;
    --ink:      #14161A;
    --ink-2:    #2F3238;
    --ink-3:    #61656D;
    --rule:     #C6C3B7;
    --accent:      #6E7B43;  /* olive — the guide's only accent */
    --accent-2:    #8B9A5B;  /* olive light */
    --accent-deep: #586235;
    --nav-ink:     #34383E;
    --sans:  "Geist", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
    --mono:  "Geist Mono", ui-monospace, Menlo, monospace;
    --serif: "Newsreader", Georgia, serif;
  }
  *,*::before,*::after{ box-sizing: border-box; }
  html,body{ margin:0; padding:0; height:100%; background:#0C0E0A; overscroll-behavior:none; }

  /* ============================================================
     01 ANCHORED HERO — full viewport, standalone
     ============================================================ */
  .hf{
    position:relative; width:100%; height:100vh; min-height:560px; overflow:hidden;
    background:var(--paper); color:var(--ink);
    font-family:var(--sans); -webkit-font-smoothing:antialiased;
  }
  .hf img{ display:block; }

  .hf-photo{ position:absolute; inset:0; }
  .hf-photo img,.hf-photo video{ width:100%; height:100%; object-fit:cover; display:block; }

  .hf-scrim{ position:absolute; inset:0; pointer-events:none; z-index:1; }
  .s-bottom{ background:linear-gradient(180deg, rgba(247,248,250,.60) 0%, rgba(247,248,250,.26) 16%, rgba(8,12,18,0) 40%, rgba(8,12,18,.5) 100%); }

  /* Nav ------------------------------------------------------- */
  .hf-nav{
    position:fixed; top:0; left:0; right:0; z-index:40;
    display:flex; align-items:center; height:92px; padding:0 56px; color:#0B1320;
    transition:background .3s ease, border-color .3s ease, color .3s ease;
    border-bottom:1px solid transparent;
  }
  .hf-nav.navy{
    background:#ffffff;
    border-bottom:2px solid #C6C3B7;
    color:var(--nav-ink);
  }
  .hf-nav.navy .hf-wordmark{ color:var(--nav-ink); }
  .hf-nav.navy .hf-links a{ color:var(--nav-ink); }
  .hf-nav.navy .hf-links a:hover{ color:#8A8E96; }
  .hf-nav.navy .hf-links a.active{ color:var(--ink); }
  .hf-wordmark{
    font-weight:600; font-size:18px; text-transform:uppercase;
    letter-spacing:0.24em; white-space:nowrap;
    color:inherit; text-decoration:none; cursor:pointer;
  }
  .hf-links{ display:flex; align-items:center; gap:28px; margin-left:auto; font-size:15px; font-weight:500; }
  .hf-links a{ position:relative; cursor:pointer; color:#0B1320; text-decoration:none; transition:color .2s; }
  .hf-links a:hover{ color:rgba(11,19,32,.6); }
  .hf-links a.active{ color:#0B1320; }
  /* Type ------------------------------------------------------ */
  .hf-eyebrow{
    font-family:var(--mono); font-size:12px; letter-spacing:0.16em;
    text-transform:uppercase; color:rgba(255,255,255,.9);
  }
  .hf-h1{
    font-weight:500; line-height:1.04; letter-spacing:-0.024em;
    text-wrap:balance; margin:0; color:#F7F8FA;
    font-size:clamp(40px,5vw,72px); max-width:18ch;
    text-shadow:0 2px 16px rgba(8,12,18,.55), 0 1px 3px rgba(8,12,18,.5);
  }
  .hf-sub{
    margin:10px 0 0; color:#F7F8FA;
    font-family:var(--sans); font-weight:400; font-size:clamp(18px,1.8vw,24px); line-height:1.45; letter-spacing:-0.005em;
    text-shadow:0 2px 12px rgba(8,12,18,.55);
  }
  .hf-cta{
    position:relative; display:inline-flex; align-items:center; gap:9px; margin-top:clamp(24px,3vw,34px);
    padding:15px 30px; background:#F7F8FA; color:#0B1320;
    font-family:var(--sans); font-weight:600; font-size:15px; letter-spacing:0.02em;
    border-radius:6px; text-decoration:none; cursor:pointer;
    box-shadow:0 6px 22px rgba(8,12,18,.28);
    transition:background .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  /* expanding ripple ring to draw the eye */
  .hf-cta::before{
    content:""; position:absolute; inset:0; border-radius:6px; pointer-events:none;
    animation:ctaRing 2.8s ease-out infinite;
  }
  @keyframes ctaRing{
    0%{ box-shadow:0 0 0 0 rgba(247,248,250,.5); }
    70%{ box-shadow:0 0 0 16px rgba(247,248,250,0); }
    100%{ box-shadow:0 0 0 0 rgba(247,248,250,0); }
  }
  .hf-cta .arw{ transition:transform .25s ease; }
  .hf-cta:hover{ background:#fff; transform:translateY(-2px); box-shadow:0 10px 30px rgba(8,12,18,.34); }
  .hf-cta:hover .arw{ transform:translateX(5px); }
  .hf-cta:hover::before{ animation:none; }
  @media (prefers-reduced-motion: reduce){ .hf-cta::before{ animation:none; } .hf-cta .arw{ transition:none; } }

  /* Scroll cue ------------------------------------------------ */
  .hf-cue{
    display:flex; flex-direction:column; align-items:center; gap:14px;
    text-decoration:none; cursor:pointer; padding-bottom:4px;
  }
  .hf-cue-label{
    font-family:var(--mono); font-size:11px; letter-spacing:0.28em; text-transform:uppercase;
    color:rgba(255,255,255,.78); transition:color .25s ease;
    writing-mode:vertical-rl;
  }
  .hf-cue:hover .hf-cue-label{ color:#fff; }
  .hf-cue-line{
    position:relative; width:1px; height:54px; overflow:hidden;
    background:rgba(255,255,255,.22);
  }
  .hf-cue-line::after{
    content:""; position:absolute; left:0; top:0; width:1px; height:40%;
    background:linear-gradient(rgba(255,255,255,0), #fff);
    animation:hfcue 1.9s cubic-bezier(.6,.0,.3,1) infinite;
  }
  @keyframes hfcue{
    0%{ transform:translateY(-110%); }
    60%{ transform:translateY(160%); }
    100%{ transform:translateY(160%); }
  }
  @media (prefers-reduced-motion: reduce){
    .hf-cue-line::after{ animation:none; transform:translateY(60%); }
  }

  /* Title cluster — anchored to the top, just under the nav ----- */
  .hf-bottom{
    position:absolute; left:56px; right:56px; top:50%; transform:translateY(-50%); z-index:2;
    display:flex; align-items:center; justify-content:flex-start; gap:48px;
  }
  .hf-bottom .hf-eyebrow{ margin-bottom:18px; }

  @media (max-width: 760px){
    .hf-nav{ padding:0 28px; }
    .hf-links{ display:none; }
    .hf-bottom{ left:28px; right:28px; top:104px; flex-direction:column; align-items:flex-start; gap:24px; }
    .hf-h1{ font-size:40px; max-width:18ch; }
    .hf-cue{ display:none; }
  }

  /* ============================================================
     SIMPLE STATEMENT SECTION
     ============================================================ */
  .statement-simple{
    background:var(--paper);
    padding:clamp(96px, 16vh, 200px) 0;
    text-align:center;
  }
  .statement-simple .eyebrow{
    justify-content:center;
    margin-bottom:clamp(28px, 4vw, 48px);
  }
  .statement-line{
    margin:0 auto; max-width:18ch;
    font-family:var(--sans); font-weight:500;
    font-size:clamp(40px, 6.6vw, 104px);
    line-height:1.05; letter-spacing:-0.025em; text-wrap:balance;
    color:var(--ink);
  }
  .statement-line .accent{ color:var(--accent); }

  /* Smooth in-page scrolling for the nav anchors, offset for the fixed nav. */
  html{ scroll-behavior:smooth; }
  #projects, #news, #contact{ scroll-margin-top:92px; }
`;

export default async function HomePage() {
  const content = await getSiteContent();
  const projects = (content?.portfolio?.projects ?? [])
    .filter((p) => p && p.name && String(p.name).trim())
    .slice(0, 4);

  const hero = content?.home?.hero;
  const heroBg = projectImage(hero?.backgroundImage) || '/media/hero.mp4';
  const heroIsVideo = isVideoUrl(heroBg);
  // Overriding the CMS value (Sanity is read-only in this environment).
  const heroTitle = 'Housing that Works for the Working People';
  const heroSubtitle = hero?.subtitle || 'Attainable housing for the Southeast’s underbuilt markets.';

  const statement = content?.home?.statement;
  const statementHeadline = statement?.headline || 'A housing partner for the Southeast’s growing cities.';
  const statementParagraphs = statement?.paragraphs?.length
    ? statement.paragraphs
    : [
        'Yu Development builds attainable rental housing in the Southeast’s fastest-growing, most underbuilt markets, with homes priced to what working families actually earn, in the places the jobs are.',
        'We own and operate the majority of our communities long term.',
      ];
  const stats = statement?.stats?.length
    ? statement.stats
    : [
        { label: 'Communities delivered', value: '9' },
        { label: 'Homes delivered', value: '948' },
        { label: 'Invested', value: '$90M' },
        { label: 'Since', value: '2018' },
      ];

  const projectsHeading = content?.home?.projectsHeading || 'Communities already in the ground.';

  const svc = content?.services ?? {};
  const svcLocalFig = parseFig(svc.localEconomyFigure || '64%');
  const svcLocalText = svc.localEconomyText || 'of working residents are employed in the same county they live in. Their wages and spending stay in the local economy.';

  const newsTitle = content?.news?.title || 'News & updates';
  const newsList = FEATURED_NEWS.slice(0, 3);

  const cta = content?.home?.cta ?? {};
  // Overriding the CMS value (Sanity is read-only in this environment).
  const ctaTitle = 'Need attainable housing in your community, or interested in our work?';
  const ctaLabel = cta.linkLabel || 'Get in touch';
  const ctaHref = '/contact';

  const brand = content?.brand ?? {};
  const brandName = brand.name || 'Yu Development';
  const brandTagline = brand.tagline || 'A private development firm building attainable rental housing across the Southeast United States.';
  const brandEmail = 'services@yudevelopment.com';
  const brandPhone = brand.phone || '470-380-7339';
  const brandOffice = brand.office || 'Atlanta, Georgia';
  const brandCopyright = brand.copyright || '© 2026 Yu Development, LLC';
  const brandTel = 'tel:+' + brandPhone.replace(/[^0-9]/g, '');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link rel="stylesheet" href="/v12-styles.css" />

      <div className="v12" id="top">
        <div className="hf hf--onphoto" data-screen-label="Hero">
          <div className="hf-photo">
            {heroIsVideo ? (
              <video src={heroBg} autoPlay muted loop playsInline poster="/media/hero-aerial.png" />
            ) : (
              <img
                src={heroBg}
                alt="Aerial view of a Yu Development community, completed buildings beside a site under preparation."
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>
          <div className="hf-scrim s-bottom"></div>

          <header className="hf-nav">
            <a className="hf-wordmark" href="#top">Yu Development</a>
            <nav className="hf-links">
              <a href="/team" style={{ fontWeight: 600, fontSize: '14px' }}>Team</a>
              <a href="/projects" style={{ fontWeight: 600, fontSize: '14px' }}>Projects</a>
              <a href="#expertise" style={{ fontWeight: 600, fontSize: '14px' }}>Services</a>
              <a href="/news" style={{ fontWeight: 600, fontSize: '14px' }}>News</a>
              <a href="/investors" style={{ fontWeight: 600, fontSize: '14px' }}>Investors</a>
              <a href="/contact" style={{ fontWeight: 600, fontSize: '14px' }}>Contact</a>
            </nav>
          </header>

          <div className="hf-bottom">
            <div>
              <h1 className="hf-h1">{heroTitle}</h1>
              <p className="hf-sub">{heroSubtitle}</p>
              <a href="/contact" className="hf-cta">Get in touch <span className="arw">→</span></a>
            </div>
          </div>
        </div>

        {/* ============================ WHY WE EXIST + STATS (editorial) ============================ */}
        <section className="about-band" id="statementTrack" data-screen-label="Why we exist">
          <div className="wrap">
            <h2 className="about-headline">{statementHeadline}</h2>

            <div className="about-rule"></div>

            <div className="about-cols">
              {statementParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="about-rule"></div>

            <div className="about-stats">
              <div className="statgrid">
                {stats.map((s, i) => {
                  const f = parseFig(s.value);
                  return (
                    <div className="stat" key={s._key || i}>
                      {f.count !== null ? (
                        <div className="fig" data-count={f.count} data-prefix={f.prefix} data-suffix={f.suffix} data-plain="1">{f.text}</div>
                      ) : (
                        <div className="fig">{f.text}</div>
                      )}
                      <div className="lab">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about-rule"></div>
          </div>
        </section>

        {/* ============================ SELECTED PROJECTS (portfolio) ============================ */}
        <section className="story white" id="projects" data-screen-label="Selected Projects">
          <div className="wrap">
            <div className="sec-head-row">
              <div>
                <h2 className="sec-h">{projectsHeading}</h2>
              </div>
            </div>
            <div className="proj-grid">
              {projects.length ? (
                <ProjectCards projects={projects} />
              ) : (
                <>
                  <a className="pcard" href="https://www.apartments.com/platform-douglas-douglas-ga/m0s6cwh/" target="_blank" rel="noopener noreferrer">
                    <div className="pshot"><img loading="lazy" decoding="async" src="/media/project-douglas.png" alt="Aerial view of a Yu Development community in Douglas, Georgia." /></div>
                    <div className="pm"><span className="lcol"><span className="nm">Platform Douglas</span><span className="u">126 units</span></span><span className="loc">Douglas, GA</span></div>
                  </a>
                  <a className="pcard" href="https://www.apartments.com/platform-flint-river-bainbridge-ga/vy9r43f/" target="_blank" rel="noopener noreferrer">
                    <div className="pshot"><img loading="lazy" decoding="async" src="/media/project-flint-river.png" alt="Aerial view of Platform Flint River in Bainbridge, Georgia." /></div>
                    <div className="pm"><span className="lcol"><span className="nm">Platform Flint River</span><span className="u">192 units</span></span><span className="loc">Bainbridge, GA</span></div>
                  </a>
                  <a className="pcard" href="https://www.apartments.com/platform-dothan-dothan-al/xc8d3rp/" target="_blank" rel="noopener noreferrer">
                    <div className="pshot"><img loading="lazy" decoding="async" src="/media/project-dothan.png" alt="Aerial view of Platform Dothan in Dothan, Alabama." /></div>
                    <div className="pm"><span className="lcol"><span className="nm">Platform Dothan</span><span className="u">208 units</span></span><span className="loc">Dothan, AL</span></div>
                  </a>
                  <a className="pcard" href="https://www.apartments.com/platform-americus-americus-ga/vmg3fke/" target="_blank" rel="noopener noreferrer">
                    <div className="pshot"><img loading="lazy" decoding="async" src="/media/project-americus.png" alt="Aerial view of Platform Americus in Americus, Georgia." /></div>
                    <div className="pm"><span className="lcol"><span className="nm">Platform Americus</span><span className="u">80 units</span></span><span className="loc">Americus, GA</span></div>
                  </a>
                </>
              )}
            </div>
            <div className="proj-cta">
              <a className="sec-link" href="/projects" style={{ borderBottom: 'none', textDecoration: 'none', color: '#6E7B43' }}>View full portfolio &rarr;</a>
            </div>
          </div>
        </section>

        {/* ============================ WHO LIVES HERE / BUILD ============================ */}
        {/* ============================ SERVICES (full-page capability tabs) ============================ */}
        <ExpertiseTabs />

        {/* ============================ LOCAL ECONOMY STATEMENT ============================ */}
        <section className="local-stmt" data-screen-label="Local economy">
          <div className="wrap">
            <p className="local-line">
              {svcLocalFig.count !== null ? (
                <span className="local-fig" data-count={svcLocalFig.count} data-suffix={svcLocalFig.suffix} style={{ fontSize: '69px' }}>{svcLocalFig.text}</span>
              ) : (
                <span className="local-fig" style={{ fontSize: '69px' }}>{svcLocalFig.text}</span>
              )}{' '}
              {svcLocalText}
            </p>
          </div>
        </section>

        {/* ============================ 7 · INSIGHTS ============================ */}
        <section className="section insights" id="news" data-screen-label="News" style={{ paddingBottom: 'clamp(36px,4vw,56px)' }}>
          <div className="head">
            <div>
              <h2 className="fx" style={{ fontSize: '33px' }}>{newsTitle}</h2>
            </div>
          </div>
          <div className="news-grid wrap">
            {newsList.map((a, i) => {
              const img = projectImage(a.image);
              return (
                <div className={`ncard fx${i === 1 ? ' fx-d1' : i === 2 ? ' fx-d2' : ''}`} key={('_key' in a && a._key) || i}>
                  {img ? (
                    a.link ? (
                      <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img loading="lazy" decoding="async" src={img} alt={a.title || ''} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                      </a>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={img} alt={a.title || ''} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                    )
                  ) : (
                    <image-slot id={`v12-news${i + 1}`} shape="rect" placeholder="Article image"></image-slot>
                  )}
                  <div className="date">{a.date}</div>
                  <h3>{a.title}</h3>
                </div>
              );
            })}
          </div>
          <div className="wrap" style={{ textAlign: 'center', marginTop: 'clamp(28px,3.5vw,44px)' }}>
            <a href="/news" className="sec-link" style={{ textDecoration: 'none', borderBottom: 'none', color: '#6E7B43', fontWeight: 600 }}>See more →</a>
          </div>
        </section>

        {/* ============================ 9 · CONTACT ============================ */}
        <section className="section contact" id="contact" data-screen-label="Contact">
          <div className="wrap">
            <h2>{ctaTitle}</h2>
            <div className="cta">
              <a className="sec-link" href={ctaHref} style={{ borderBottom: 'none', textDecoration: 'none', fontSize: 'clamp(22px,2.4vw,32px)', color: '#6E7B43' }}>{ctaLabel} &rarr;</a>
            </div>
          </div>
        </section>

        <footer className="v12foot">
          <div className="foot-wrap">
            <div className="top">
              <div className="col">
                <span className="foot-wordmark">{brandName}</span>
                <p className="blurb">{brandTagline}</p>
              </div>
              <div className="col col-site">
                <div className="site-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="/team">Team</a>
                  <a href="/projects">Projects</a>
                  <a href="#expertise">Services</a>
                  <a href="/news">News</a>
                  <a href="/investors">Investors</a>
                  <a href="/contact">Contact</a>
                </div>
              </div>
              <div className="col col-office">
                <p>{brandOffice}</p>
                <p><a href={`mailto:${brandEmail}`}>{brandEmail}</a></p>
                <p><a href={brandTel}>{brandPhone}</a></p>
                <SocialLinks />
              </div>
            </div>

            <div className="mega">{brandName}</div>

            <div className="legal">
              <span>{brandCopyright}</span>
              <span className="legal-links">
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      <Script src="/v12-scroll.js" strategy="afterInteractive" />
    </>
  );
}
