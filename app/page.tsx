import type { Metadata } from 'next';
import Script from 'next/script';
import ProjectCards from '@/components/ProjectCards';
import { getSiteContent, projectImage, isVideoUrl, FEATURED_NEWS } from '@/lib/content';
import ServicesSwitch from '@/components/ServicesSwitch';
import SocialLinks from '@/components/SocialLinks';
import HomeNav from '@/components/HomeNav';
import CountUp from '@/components/CountUp';

export const metadata: Metadata = {
  title: 'Yu Development',
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
    background:#0E1626;
    border-bottom:1px solid rgba(255,255,255,.10);
    color:#F7F8FA;
  }
  .hf-nav.navy .hf-wordmark{ color:#F7F8FA; }
  .hf-nav.navy .hf-links a{ color:rgba(247,248,250,.80); }
  .hf-nav.navy .hf-links a:hover{ color:#F7F8FA; }
  .hf-nav.navy .hf-links a.active{ color:#F7F8FA; }
  .hf-wordmark{
    font-weight:600; font-size:18px; text-transform:uppercase;
    letter-spacing:0.24em; white-space:nowrap;
    color:inherit; text-decoration:none; cursor:pointer;
  }
  .hf-links{ display:flex; align-items:center; gap:28px; margin-left:auto; font-size:15px; font-weight:500; }
  .hf-links a{ position:relative; cursor:pointer; color:#0B1320; text-decoration:none; transition:color .2s; }
  .hf-links a:hover{ color:rgba(11,19,32,.6); }
  .hf-links a.active{ color:#0B1320; }
  .hf-burger{ display:none; color:inherit; background:none; border:none; padding:0; }
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
    border-radius:0; text-decoration:none; cursor:pointer;
    box-shadow:0 6px 22px rgba(8,12,18,.28);
    transition:background .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  /* expanding ripple ring to draw the eye */
  .hf-cta::before{
    content:""; position:absolute; inset:0; border-radius:0; pointer-events:none;
    animation:ctaRing 2.8s ease-out infinite;
  }
  @keyframes ctaRing{
    0%{ box-shadow:0 0 0 0 rgba(247,248,250,.5); }
    70%{ box-shadow:0 0 0 16px rgba(247,248,250,0); }
    100%{ box-shadow:0 0 0 0 rgba(247,248,250,0); }
  }
  .hf-cta .arw{ display:inline-block; transition:transform .25s ease; animation:ctaNudge 1.9s ease-in-out infinite; }
  @keyframes ctaNudge{ 0%,100%{ transform:translateX(0); } 50%{ transform:translateX(6px); } }
  .sec-link .arw{ display:inline-block; transition:transform .25s ease; animation:ctaNudge 1.9s ease-in-out infinite; }
  .sec-link:hover .arw{ transform:translateX(8px); animation:none; }
  @media (prefers-reduced-motion: reduce){ .sec-link .arw{ animation:none; transition:none; } }

  /* "Who lives here" band on olive green — flip text to light for readability */
  .who-olive .split2.build-2col .build-copy{ justify-content:flex-start; gap:clamp(28px,4vw,48px); padding-bottom:0; }
  .who-olive .split2.build-2col .build-copy .sec-h{ color:#F7F8FA; }
  .who-olive .about-rule{ background:rgba(255,255,255,.24); }
  .who-olive .split2.build-2col .build-copy .build-note{ color:rgba(247,248,250,.80); }
  .who-olive .who-label{ color:rgba(247,248,250,.72); }
  .who-olive .who-fig{ color:#8FB0DF; }
  .who-olive .who-figlab{ color:rgba(247,248,250,.82); }
  .who-olive .split2.build-2col .who{ border-top-color:rgba(255,255,255,.24); }
  .who-olive .split2.build-2col .who li{ color:#F7F8FA; border-bottom-color:rgba(255,255,255,.20); }
  .hf-cta:hover{ background:#fff; transform:translateY(-2px); box-shadow:0 10px 30px rgba(8,12,18,.34); }
  .hf-cta:hover .arw{ transform:translateX(6px); animation:none; }
  .hf-cta:hover::before{ animation:none; }
  @media (prefers-reduced-motion: reduce){ .hf-cta::before{ animation:none; } .hf-cta .arw{ transition:none; animation:none; } }

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
    .hf-burger{ display:flex; flex-direction:column; justify-content:center; gap:5px; width:44px; height:44px; margin-left:auto; cursor:pointer; z-index:3; }
    .hf-burger span{ display:block; width:24px; height:2px; border-radius:0; background:currentColor; transition:transform .25s ease, opacity .2s ease; }
    .hf-links.open{ display:flex; position:absolute; top:92px; left:0; right:0; flex-direction:column; align-items:stretch; gap:0; margin:0; padding:6px 0 10px; background:#0E1626; border-bottom:1px solid rgba(255,255,255,.10); box-shadow:0 24px 40px -22px rgba(0,0,0,.55); }
    .hf-links.open a{ padding:15px 28px; color:#F7F8FA !important; }
    .hf-burger.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
    .hf-burger.open span:nth-child(2){ opacity:0; }
    .hf-burger.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
    .hf-bottom{ left:28px; right:28px; top:50%; transform:translateY(-50%); flex-direction:column; align-items:flex-start; gap:24px; }
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

  /* Local economy band — text beside the photo (inline so it can't be cache-defeated). */
  /* Vertical padding scales with screen HEIGHT (vh), so the band fits one screen on wide monitors. */
  /* Projects heading — same scale as the Services group headings (inline so it can't be cache-defeated). */
  #projects .sec-h{ font-size:clamp(32px,3.6vw,52px); line-height:1.08; letter-spacing:-0.02em; white-space:nowrap; }
  @media (max-width:900px){ #projects .sec-h{ white-space:normal; font-size:clamp(40px,6vw,48px); } }
  /* Mobile stats — 2×2 grid with hairline dividers instead of a plain stacked list. */
  @media (max-width:760px){
    .about-stats .statgrid{ grid-template-columns:1fr 1fr !important; gap:clamp(30px,7vw,40px) 20px !important; }
    .about-stats .fig{ font-size:clamp(34px,9vw,46px); }
    .about-stats .lab{ margin-top:8px; font-size:14px; }
  }
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
  // Overriding the CMS value (Sanity is read-only in this environment).
  const statementParagraphs = [
    'Yu Development develops attainable multifamily housing in middle-class towns across the Southeast, serving the missing middle and helping local workers live near the jobs and communities they support.',
    'As long-term owner-operators, we remain invested in the quality, stability, and performance of each community after development is complete.',
  ];
  const stats = statement?.stats?.length
    ? statement.stats
    : [
        { label: 'Communities delivered', value: '9' },
        { label: 'Homes delivered', value: '948' },
        { label: 'Invested', value: '$90M' },
        { label: 'Since', value: '2018' },
      ];

  // Overriding the CMS value (Sanity is read-only in this environment).
  const projectsHeading = 'Communities already built';

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

          <HomeNav />

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
              <a className="sec-link" href="/projects" style={{ borderBottom: 'none', textDecoration: 'none', color: '#6E7B43' }}>View full portfolio <span className="arw">&rarr;</span></a>
            </div>
          </div>
        </section>

        {/* ============================ WHO LIVES HERE / BUILD ============================ */}
        {/* ============================ SERVICES (two-option switcher: Development / Development Support) ============================ */}
        <ServicesSwitch home />

        {/* ============================ WHO LIVES HERE ============================ */}
        <section className="story paper who-olive" data-screen-label="Who lives here" style={{ background: '#586235', padding: 'clamp(72px,9vw,120px) 0' }}>
          <div className="wrap">
            <div className="split2 build-2col">
              <div className="build-copy">
                <div>
                  <h2 className="sec-h" style={{ fontWeight: 500 }}>Rental communities, priced for the people who keep a city running.</h2>
                  <div className="about-rule" style={{ margin: 'clamp(28px,3.5vw,44px) 0 0' }}></div>
                </div>
                <p className="build-note">Homes affordable to households earning around 72% of area median income, with every unit under 80%.</p>
              </div>
              <div className="fx-d1">
                <div className="who-label">Who lives here</div>
                <div className="who-stat">
                  <CountUp className="who-fig" target={68} suffix="%" />
                  <span className="who-figlab">essential workers</span>
                </div>
                <ul className="who">
                  <li>Teachers &amp; school staff</li>
                  <li>Nurses &amp; healthcare workers</li>
                  <li>First responders &amp; public-safety workers</li>
                  <li>Plant &amp; food-production workers</li>
                  <li>Local workers &amp; their families</li>
                </ul>
              </div>
            </div>
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
            <a href="/news" className="sec-link" style={{ textDecoration: 'none', borderBottom: 'none', color: '#6E7B43', fontWeight: 600 }}>See more <span className="arw">→</span></a>
          </div>
        </section>

        {/* ============================ 9 · CONTACT ============================ */}
        <section className="section contact" id="contact" data-screen-label="Contact">
          <div className="wrap">
            <h2>{ctaTitle}</h2>
            <div className="cta">
              <a className="sec-link" href={ctaHref} style={{ borderBottom: 'none', textDecoration: 'none', fontSize: 'clamp(22px,2.4vw,32px)', color: '#6E7B43' }}>{ctaLabel} <span className="arw">&rarr;</span></a>
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
                  <a href="/services">Services</a>
                  <a href="/news">News</a>
                  <a href="/investors">Investors</a>
                  <a href="/contact">Contact</a>
                  <a href="/careers">Careers</a>
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
