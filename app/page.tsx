import type { Metadata } from 'next';
import Script from 'next/script';
import ProjectCards from '@/components/ProjectCards';
import { getSiteContent, projectImage, isVideoUrl } from '@/lib/content';

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
    --accent:      #1F3A5C;  /* trustworthy navy */
    --accent-2:    #6FA0C9;  /* light blue */
    --accent-deep: #15283B;
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
  .s-bottom{ background:linear-gradient(180deg, rgba(8,12,18,.42) 0%, rgba(8,12,18,0) 24%, rgba(8,12,18,0) 46%, rgba(8,12,18,.66) 100%); }

  /* Nav ------------------------------------------------------- */
  .hf-nav{
    position:fixed; top:0; left:0; right:0; z-index:40;
    display:flex; align-items:center; height:92px; padding:0 56px; color:#fff;
    transition:background .3s ease, border-color .3s ease, color .3s ease;
    border-bottom:1px solid transparent;
  }
  .hf-nav.navy{
    background:#ffffff;
    border-bottom:2px solid #B2AD9E;
    color:var(--nav-ink);
  }
  .hf-nav.navy .hf-wordmark{ color:var(--nav-ink); }
  .hf-nav.navy .hf-links a{ color:var(--nav-ink); }
  .hf-nav.navy .hf-links a:hover{ color:#8A8E96; }
  .hf-nav.navy .hf-links a.active{ color:var(--ink); }
  .hf-wordmark{
    font-weight:600; font-size:18px; text-transform:uppercase;
    letter-spacing:0.24em; white-space:nowrap;
  }
  .hf-links{ display:flex; align-items:center; gap:28px; margin-left:auto; font-size:15px; font-weight:500; }
  .hf-links a{ position:relative; cursor:pointer; color:rgba(255,255,255,.86); text-decoration:none; transition:color .2s; }
  .hf-links a:hover{ color:rgba(255,255,255,.55); }
  .hf-links a.active{ color:#fff; }
  /* Type ------------------------------------------------------ */
  .hf-eyebrow{
    font-family:var(--mono); font-size:12px; letter-spacing:0.16em;
    text-transform:uppercase; color:rgba(255,255,255,.9);
  }
  .hf-h1{
    font-weight:500; line-height:1.04; letter-spacing:-0.024em;
    text-wrap:balance; margin:0; color:#fff;
    font-size:clamp(40px,5vw,72px); max-width:18ch;
  }
  .hf-sub{
    margin:10px 0 0; color:rgba(255,255,255,.9);
    font-family:var(--sans); font-weight:400; font-size:clamp(18px,1.8vw,24px); line-height:1.45; letter-spacing:-0.005em;
  }

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

  /* Bottom cluster -------------------------------------------- */
  .hf-bottom{
    position:absolute; left:56px; right:56px; bottom:52px; z-index:2;
    display:flex; align-items:flex-end; justify-content:space-between; gap:48px;
  }
  .hf-bottom .hf-eyebrow{ margin-bottom:18px; }

  @media (max-width: 760px){
    .hf-nav{ padding:0 28px; }
    .hf-links{ display:none; }
    .hf-bottom{ left:28px; right:28px; bottom:36px; flex-direction:column; align-items:flex-start; gap:24px; }
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
  const heroBg = projectImage(hero?.backgroundImage) || '/media/hero-aerial.png';
  const heroIsVideo = isVideoUrl(hero?.backgroundImage);
  const heroTitle = hero?.title || 'Housing that Works for Working People';
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
  const svcHeadline = svc.headline || 'Rental communities, priced for the people who keep a city running.';
  const svcNote = svc.note || 'Homes affordable to households earning around 72% of area median income, with every unit under 80%.';
  const svcAudienceLabel = svc.audienceLabel || 'Who lives here';
  const svcAudienceFig = parseFig(svc.audienceFigure || '68%');
  const svcAudienceFigLabel = svc.audienceFigureLabel || 'essential workers';
  const svcGroups = svc.audienceGroups?.length
    ? svc.audienceGroups
    : ['Teachers & school staff', 'Nurses & healthcare workers', 'First responders & public-safety workers', 'Plant & food-production workers', 'Local workers & their families'];
  const svcLocalFig = parseFig(svc.localEconomyFigure || '64%');
  const svcLocalText = svc.localEconomyText || 'of working residents are employed in the same county they live in. Their wages and spending stay in the local economy.';

  const newsTitle = content?.news?.title || 'News & updates';
  const newsArticles = (content?.news?.articles ?? []).filter((a) => a && a.title && String(a.title).trim()).slice(0, 3);
  const newsList = newsArticles.length
    ? newsArticles
    : [
        { date: 'June 4, 2026', title: 'What “attainable” actually means in 2026' },
        { date: 'May 14, 2026', title: 'Why we underwrite to working rents, not exit prices' },
        { date: 'April 9, 2026', title: 'The Southeast’s underbuilt middle, by the numbers' },
      ];

  const cta = content?.home?.cta ?? {};
  const ctaTitle = cta.title || 'Building in your community, or interested in our work?';
  const ctaLabel = cta.linkLabel || 'Get in touch';
  const ctaHref = cta.linkHref || 'mailto:hello@yudevelopment.com';

  const brand = content?.brand ?? {};
  const brandName = brand.name || 'Yu Development';
  const brandTagline = brand.tagline || 'A private development firm building attainable rental housing across the Southeast United States.';
  const brandEmail = brand.email || 'hello@yudevelopment.com';
  const brandPhone = brand.phone || '470-380-7339';
  const brandOffice = brand.office || 'Atlanta, Georgia';
  const brandCopyright = brand.copyright || '© 2026 Yu Development, LLC';
  const brandTel = 'tel:+' + brandPhone.replace(/[^0-9]/g, '');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link rel="stylesheet" href="/v12-styles.css" />

      <div className="v12">
        <div className="hf hf--onphoto" data-screen-label="Hero">
          <div className="hf-photo">
            {heroIsVideo ? (
              <video src={heroBg} autoPlay muted loop playsInline poster="/media/hero-aerial.png" />
            ) : (
              <img
                src={heroBg}
                alt="Aerial view of a Yu Development community, completed buildings beside a site under preparation."
              />
            )}
          </div>
          <div className="hf-scrim s-bottom"></div>

          <header className="hf-nav">
            <span className="hf-wordmark">Yu Development</span>
            <nav className="hf-links">
              <a href="/team" style={{ fontWeight: 600, fontSize: '14px' }}>Team</a>
              <a href="#projects" style={{ fontWeight: 600, fontSize: '14px' }}>Projects</a>
              <a href="#whatwedo" style={{ fontWeight: 600, fontSize: '14px' }}>Services</a>
              <a href="#news" style={{ fontWeight: 600, fontSize: '14px' }}>News</a>
              <a href="/investors" style={{ fontWeight: 600, fontSize: '14px' }}>Investors</a>
              <a href="#contact" style={{ fontWeight: 600, fontSize: '14px' }}>Contact</a>
            </nav>
          </header>

          <div className="hf-bottom">
            <div>
              <h1 className="hf-h1">{heroTitle}</h1>
              <p className="hf-sub">{heroSubtitle}</p>
            </div>
          </div>
        </div>

        {/* ============================ WHY WE EXIST + STATS (editorial) ============================ */}
        <section className="about-band" id="statementTrack" data-screen-label="Why we exist">
          <div className="wrap">
            <h2 className="about-headline" style={{ fontSize: '44px' }}>{statementHeadline}</h2>

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
                <h2 className="sec-h" style={{ fontSize: '33px' }}>{projectsHeading}</h2>
              </div>
              <a className="sec-link" href="/projects" style={{ borderBottom: 'none', textDecoration: 'none', color: '#1A6DD2' }}>View full portfolio &rarr;</a>
            </div>
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

        {/* ============================ WHO LIVES HERE / BUILD ============================ */}
        <section className="story paper" id="whatwedo" data-screen-label="Who Lives Here" style={{ paddingTop: 'clamp(36px,4vw,56px)' }}>
          <div className="wrap">
            <div className="split2 build-2col">
              <div className="build-copy">
                <div>
                  <h2 className="sec-h" style={{ fontSize: '50px', fontWeight: 500 }}>{svcHeadline}</h2>
                  <div className="about-rule" style={{ margin: 'clamp(28px,3.5vw,44px) 0 0' }}></div>
                </div>
                <p className="build-note" style={{ fontSize: '17px' }}>{svcNote}</p>
              </div>
              <div className="fx-d1">
                <div className="who-label">{svcAudienceLabel}</div>
                <div className="who-stat">
                  {svcAudienceFig.count !== null ? (
                    <span className="who-fig" data-count={svcAudienceFig.count} data-suffix={svcAudienceFig.suffix} data-plain="1">{svcAudienceFig.text}</span>
                  ) : (
                    <span className="who-fig">{svcAudienceFig.text}</span>
                  )}
                  <span className="who-figlab">{svcAudienceFigLabel}</span>
                </div>
                <ul className="who">
                  {svcGroups.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="build-shot" style={{ marginTop: 'clamp(40px,5vw,64px)' }}><img src="/media/build-interior.png" alt="Interior of a Yu Development rental home — open living room and kitchen with modern finishes." style={{ height: '576px' }} /></div>
          </div>
        </section>

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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={a.title || ''} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <image-slot id={`v12-news${i + 1}`} shape="rect" placeholder="Article image"></image-slot>
                  )}
                  <div className="date">{a.date}</div>
                  <h3>{a.title}</h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================ 9 · CONTACT ============================ */}
        <section className="section contact" id="contact" data-screen-label="Contact">
          <div className="wrap">
            <h2>{ctaTitle}</h2>
            <div className="cta">
              <a className="sec-link" href={ctaHref} style={{ borderBottom: 'none', textDecoration: 'none', fontSize: 'clamp(22px,2.4vw,32px)', color: '#1A6DD2' }}>{ctaLabel} &rarr;</a>
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
                <div className="site-links">
                  <a href="/team">Team</a>
                  <a href="#projects">Projects</a>
                  <a href="#whatwedo">Services</a>
                  <a href="#news">News</a>
                  <a href="/investors">Investors</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>
              <div className="col col-careers">
                <a href="#" className="foot-careers" style={{ fontSize: '18px', fontWeight: 700 }}>Careers&nbsp;&nearr;</a>
              </div>
              <div className="col col-office">
                <p>{brandOffice}</p>
                <p><a href={`mailto:${brandEmail}`}>{brandEmail}</a></p>
                <p><a href={brandTel}>{brandPhone}</a></p>
              </div>
            </div>

            <div className="mega">{brandName}</div>

            <div className="legal">
              <span>{brandCopyright}</span>
              <span className="legal-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      <Script src="/v12-scroll.js" strategy="afterInteractive" />
    </>
  );
}
