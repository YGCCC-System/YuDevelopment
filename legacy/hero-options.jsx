/* Yu Development — hero explorations.
   Each option is a self-contained hero composition rendered into a DCArtboard. */

const H = "Attainable housing for the Southeast\u2019s underbuilt markets.";
const IMG = '<div class="hf-photo"><img src="media/hero-aerial.png" alt="Aerial view of a Yu Development community, completed buildings beside a site under preparation." /></div>';
const IMG_PLAIN = '<img src="media/hero-aerial.png" alt="Aerial view of a Yu Development community." />';

const nav = (tone) => `
  <header class="hf-nav hf-nav--${tone}">
    <span class="hf-wordmark">Yu Development</span>
    <nav class="hf-links">
      <a class="active">Approach</a>
      <a>Portfolio</a>
      <a>Team</a>
      <a>News</a>
      <a>Contact</a>
      <a class="inv">Investors</a>
    </nav>
  </header>`;

/* ---- 01 Anchored — refined version of the live hero ---- */
const o1 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  ${nav('light')}
  <div class="hf-bottom">
    <div>
      <div class="hf-eyebrow on-photo">Attainable housing &middot; Southeast U.S.</div>
      <h1 class="hf-h1 on-photo" style="font-size:58px;max-width:17ch">${H}</h1>
    </div>
    <div class="hf-meta">
      <div><strong>5</strong> active markets</div>
      <div><strong>Since 2016</strong></div>
    </div>
  </div>
</div>`;

/* ---- 02 Centered ---- */
const o2 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-full"></div>
  ${nav('light')}
  <div class="hf-center">
    <div class="hf-eyebrow on-photo" style="margin-bottom:24px">Southeast U.S. &middot; Since 2016</div>
    <h1 class="hf-h1 on-photo" style="font-size:60px;max-width:20ch">${H}</h1>
    <div class="hf-rule"></div>
    <a class="hf-ghost">Explore our communities <span>&rarr;</span></a>
  </div>
  <div class="hf-scrollcue">Scroll</div>
</div>`;

/* ---- 03 Card overlay ---- */
const o3 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-left"></div>
  ${nav('light')}
  <div class="hf-card">
    <div class="hf-eyebrow" style="color:var(--accent-2);margin-bottom:18px">Attainable housing &middot; Southeast</div>
    <h1 class="hf-h1 on-photo" style="font-size:40px;max-width:16ch">Building housing the Southeast can actually afford.</h1>
    <a class="hf-btn light" style="margin-top:30px">Get in touch <span>&rarr;</span></a>
  </div>
</div>`;

/* ---- 04 Split — paper panel + photo ---- */
const o4 = `
<div class="hf col">
  ${nav('solid')}
  <div class="hf-split">
    <div class="hf-split-text">
      <div class="hf-eyebrow" style="color:var(--accent)">Attainable housing &middot; Southeast U.S.</div>
      <h1 class="hf-h1" style="font-size:50px;margin-top:20px;max-width:14ch">${H}</h1>
      <p class="hf-lede">New rental communities, built to last and priced to fit a paycheck &mdash; delivered end to end by one firm.</p>
      <div class="hf-actions">
        <a class="hf-btn">Our approach <span>&rarr;</span></a>
        <a class="hf-textlink">See the portfolio</a>
      </div>
    </div>
    <div class="hf-split-photo">${IMG_PLAIN}</div>
  </div>
</div>`;

/* ---- 05 Split reversed — photo + navy panel ---- */
const o5 = `
<div class="hf col">
  ${nav('dark')}
  <div class="hf-split rev">
    <div class="hf-split-photo">${IMG_PLAIN}</div>
    <div class="hf-split-text on-navy">
      <div class="hf-eyebrow" style="color:var(--accent-2)">Southeast U.S. &middot; Since 2016</div>
      <h1 class="hf-h1 on-photo" style="font-size:48px;margin-top:20px;max-width:15ch">Attainable housing, delivered.</h1>
      <p class="hf-lede" style="color:rgba(255,255,255,.82)">We carry every community ourselves &mdash; acquisition through long-term operations &mdash; in the region&rsquo;s most underbuilt markets.</p>
      <a class="hf-btn light" style="margin-top:30px">Get in touch <span>&rarr;</span></a>
    </div>
  </div>
</div>`;

/* ---- 06 Framed inset — navy editorial ---- */
const o6 = `
<div class="hf col hf--navy">
  ${nav('dark')}
  <div class="hf-inset">
    <div>
      <div class="hf-eyebrow" style="color:var(--accent-2)">Our work &middot; Southeast U.S.</div>
      <h1 class="hf-h1 on-photo" style="font-size:52px;margin-top:20px;max-width:13ch">${H}</h1>
      <a class="hf-btn light" style="margin-top:32px">See our communities <span>&rarr;</span></a>
    </div>
    <div class="hf-frame">
      ${IMG_PLAIN}
      <div class="hf-cap">Maybree Station &middot; Jasper, FL</div>
    </div>
  </div>
</div>`;

/* ---- 07 Editorial stacked — paper, oversized type over a photo band ---- */
const o7 = `
<div class="hf col">
  ${nav('solid')}
  <div class="hf-ed-head">
    <div>
      <div class="hf-eyebrow" style="color:var(--accent)">Attainable housing &middot; Southeast U.S.</div>
      <h1 class="hf-h1" style="font-size:70px;margin-top:24px;max-width:15ch">${H}</h1>
    </div>
    <div class="hf-ed-right">
      <div><strong>5</strong><span>Active markets</span></div>
      <div><strong>2016</strong><span>Founded</span></div>
      <div><strong>End to end</strong><span>One firm</span></div>
    </div>
  </div>
  <div class="hf-ed-photo">
    ${IMG_PLAIN}
    <div class="hf-marker">Jesup, Georgia &mdash; under construction</div>
  </div>
</div>`;

/* ---- 08 Wordmark splash — minimal, type-forward ---- */
const o8 = `
<div class="hf col">
  ${nav('solid')}
  <div class="hf-splash">
    <div class="hf-eyebrow" style="color:var(--accent)">Southeast U.S. &middot; Since 2016</div>
    <div class="hf-bigmark" style="margin:22px 0 4px">Yu Development</div>
    <div class="hf-rule dark"></div>
    <p class="hf-tag">${H}</p>
  </div>
  <div class="hf-strip">${IMG_PLAIN}</div>
</div>`;

/* ---- 09 Stat bar — photo headline over a navy stat strip ---- */
const o9 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  ${nav('light')}
  <div class="hf-stat-headline">
    <div class="hf-eyebrow on-photo">Attainable housing &middot; Southeast U.S.</div>
    <h1 class="hf-h1 on-photo" style="font-size:54px;max-width:18ch">${H}</h1>
  </div>
  <div class="hf-statbar">
    <div><strong>5</strong><span>Active markets</span></div>
    <div><strong>2016</strong><span>Founded</span></div>
    <div><strong>End to end</strong><span>One firm, no exits</span></div>
    <a class="hf-btn light statcta">Get in touch <span>&rarr;</span></a>
  </div>
</div>`;

/* ============================================================
   EXPRESSIVE DIRECTIONS (10–16)
   ============================================================ */

/* ---- 10 Type-mask — photo lives inside the headline ---- */
const o10 = `
<div class="hf col">
  ${nav('solid')}
  <div class="hf-mask-body">
    <div class="hf-eyebrow" style="color:var(--accent);margin-bottom:24px">Attainable housing &middot; Southeast U.S.</div>
    <h1 class="hf-masktext">Attainable<br/>Housing</h1>
    <p class="hf-mask-sub">New rental communities for the Southeast&rsquo;s most underbuilt markets &mdash; built to last and priced to fit a paycheck.</p>
  </div>
</div>`;

/* ---- 11 Diagonal split ---- */
const o11 = `
<div class="hf hf-diag">
  ${IMG}
  <div class="seam"></div>
  ${nav('light')}
  <div class="hf-diagtext">
    <div class="hf-eyebrow" style="color:var(--accent-2);margin-bottom:18px">Southeast U.S. &middot; Since 2016</div>
    <h1 class="hf-h1 on-photo" style="font-size:46px;max-width:13ch">${H}</h1>
    <a class="hf-btn light" style="margin-top:30px">Our approach <span>&rarr;</span></a>
  </div>
</div>`;

/* ---- 12 Blueprint document ---- */
const o12 = `
<div class="hf hf--onphoto hf-bp">
  ${IMG}
  <div class="scrim2"></div>
  <div class="grid"></div>
  ${nav('light')}
  <span class="crop tl"></span><span class="crop tr"></span>
  <span class="crop bl"></span><span class="crop br"></span>
  <div class="tick t1">N 31.6&deg; &middot; W 81.8&deg;</div>
  <div class="tick t2">Sheet 01 / Site</div>
  <div class="hf-bptext">
    <div class="hf-eyebrow on-photo" style="margin-bottom:18px">Attainable housing &middot; Southeast U.S.</div>
    <h1 class="hf-h1 on-photo" style="font-size:56px;max-width:18ch">${H}</h1>
  </div>
</div>`;

/* ---- 13 Index / contents ---- */
const o13 = `
<div class="hf col hf-index">
  ${nav('solid')}
  <div class="hf-split">
    <div class="hf-idx-left">
      <div class="hf-eyebrow" style="color:var(--accent);margin-bottom:20px">Yu Development &middot; Southeast U.S.</div>
      <h1 class="hf-h1" style="font-size:52px;max-width:13ch">${H}</h1>
    </div>
    <div class="hf-idx-list">
      <div class="hf-idx-row active"><span class="num">01</span><span class="nm">Our approach</span><span class="arr">&rarr;</span></div>
      <div class="hf-idx-row"><span class="num">02</span><span class="nm">The portfolio</span><span class="arr">&rarr;</span></div>
      <div class="hf-idx-row"><span class="num">03</span><span class="nm">Where we work</span><span class="arr">&rarr;</span></div>
      <div class="hf-idx-row"><span class="num">04</span><span class="nm">The team</span><span class="arr">&rarr;</span></div>
      <div class="hf-idx-row"><span class="num">05</span><span class="nm">Get in touch</span><span class="arr">&rarr;</span></div>
    </div>
  </div>
</div>`;

/* ---- 14 Kinetic marquee ---- */
const marqSet = `
  <span class="it">Attainable housing</span><span class="it dim">&bull;</span>
  <span class="it">Southeast U.S.</span><span class="it dim">&bull;</span>
  <span class="it">Built to last</span><span class="it dim">&bull;</span>
  <span class="it">Priced to a paycheck</span><span class="it dim">&bull;</span>
  <span class="it">One firm, end to end</span><span class="it dim">&bull;</span>`;
const o14 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  ${nav('light')}
  <div class="hf-marq-headline">
    <h1 class="hf-h1 on-photo" style="font-size:56px;max-width:18ch">${H}</h1>
  </div>
  <div class="hf-marq"><div class="hf-marq-track">${marqSet}${marqSet}</div></div>
</div>`;

/* ---- 15 Big metric (navy) ---- */
const o15 = `
<div class="hf col hf-metric">
  ${nav('dark')}
  <div class="hf-metric-body">
    <div class="hf-metric-num">
      <div class="hf-eyebrow" style="color:var(--accent-2);margin-bottom:8px">Average rent discount we underwrite</div>
      <div class="hf-bignum">&asymp;14<em>%</em></div>
      <p class="hf-metric-cap">below the comparable new-build market rate &mdash; attainable housing for the Southeast&rsquo;s underbuilt markets.</p>
    </div>
    <div class="hf-metric-side">${IMG_PLAIN}</div>
  </div>
</div>`;

/* ---- 16 Vertical rail nav ---- */
const o16 = `
<div class="hf hf--onphoto hf-rail">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  <div class="hf-railbar">
    <div class="hf-railmark">Yu Development</div>
    <nav class="hf-raillinks">
      <a>Approach</a><a>Portfolio</a><a>Team</a><a>Contact</a>
    </nav>
    <div class="hf-railbottom">Est. 2016</div>
  </div>
  <div class="hf-rail-headline">
    <div class="hf-eyebrow on-photo" style="margin-bottom:16px">Southeast U.S.</div>
    <h1 class="hf-h1 on-photo" style="font-size:54px;max-width:18ch">${H}</h1>
  </div>
</div>`;

/* ============================================================
   REFERENCE LANGUAGES — Apple & Tesla (17–20)
   ============================================================ */
const navMini = (tone) => `
  <header class="hf-nav hf-nav--${tone} hf-nav--mini">
    <span class="hf-wordmark">Yu Development</span>
    <nav class="hf-links">
      <a>Approach</a><a>Portfolio</a><a>Team</a><a>News</a><a>Contact</a>
    </nav>
  </header>`;

/* ---- 17 Apple — centered, contained "product" photo ---- */
const o17 = `
<div class="hf col hf-apple">
  ${navMini('solid')}
  <div class="hf-ap-stack">
    <h1>Attainable housing, refined.</h1>
    <p class="sub">New rental communities for the Southeast&rsquo;s underbuilt markets.</p>
    <div class="hf-ap-links">
      <a>Explore our work &rsaquo;</a>
      <a>Get in touch &rsaquo;</a>
    </div>
  </div>
  <div class="hf-ap-photo">${IMG_PLAIN}</div>
</div>`;

/* ---- 18 Apple — full-bleed dark, text top ---- */
const o18 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-top"></div>
  ${navMini('light')}
  <div class="hf-apd-top">
    <h1>Attainable housing.</h1>
    <p class="sub">Built to last. Priced to a paycheck.</p>
    <div class="hf-apd-links">
      <a>Learn more &rsaquo;</a>
      <a>Get in touch &rsaquo;</a>
    </div>
  </div>
</div>`;

/* ---- 19 Tesla — full-bleed, bottom pill pair (dark text region up top) ---- */
const o19 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-top"></div>
  ${navMini('light')}
  <div class="hf-tsl-top dark">
    <h1>Linden Yards</h1>
    <p class="sub">Attainable housing &mdash; now leasing in Decatur, Georgia</p>
  </div>
  <div class="hf-tsl-cta">
    <a class="primary">Get in touch</a>
    <a class="ghost">View our work</a>
  </div>
</div>`;

/* ---- 20 Tesla — light variant, dark headline over bright sky ---- */
const o20 = `
<div class="hf hf--onphoto">
  ${IMG}
  ${navMini('solid')}
  <div class="hf-tsl-top light">
    <h1>Attainable housing for the Southeast.</h1>
    <p class="sub">Built to last. Priced to a paycheck.</p>
  </div>
  <div class="hf-tsl-cta">
    <a class="primary">Get in touch</a>
    <a class="ghost invert">View our work</a>
  </div>
</div>`;

/* ============================================================
   PHOTO-LED · NAME AS HERO (21–23) — tagline removed, big wordmark
   ============================================================ */

/* ---- 21 Masthead — wordmark across the bottom ---- */
const o21 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  ${nav('light')}
  <div class="hf-wm-masthead">
    <div class="top">
      <span class="kick">Attainable housing &middot; Southeast U.S.</span>
      <span class="kick">Est. 2016</span>
    </div>
    <h1 class="big">Yu Development</h1>
  </div>
</div>`;

/* ---- 22 Stacked — big wordmark, bottom-left ---- */
const o22 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-bottom"></div>
  ${nav('light')}
  <div class="hf-wm-stack">
    <div class="hf-eyebrow on-photo">Southeast U.S. &middot; Since 2016</div>
    <h1 class="hf-wm-big">Yu<br/>Development</h1>
  </div>
</div>`;

/* ---- 23 Centered wordmark ---- */
const o23 = `
<div class="hf hf--onphoto">
  ${IMG}
  <div class="hf-scrim s-full"></div>
  ${nav('light')}
  <div class="hf-wm-center">
    <h1 class="hf-wm-cbig">Yu Development</h1>
    <div class="hf-rule"></div>
    <div class="hf-wm-meta">Attainable housing &middot; Southeast U.S.</div>
  </div>
</div>`;

const board = (id, label, w, h, html) => (
  <DCArtboard id={id} label={label} width={w} height={h}>
    <div style={{ width:'100%', height:'100%' }} dangerouslySetInnerHTML={{ __html: html }} />
  </DCArtboard>
);

function App(){
  return (
    <DesignCanvas>
      <DCSection id="photo" title="Photo-led" subtitle="The aerial carries the page; type sits over it.">
        {board("o1", "01 · Anchored", 1280, 720, o1)}
        {board("o2", "02 · Centered", 1280, 720, o2)}
        {board("o3", "03 · Card overlay", 1280, 720, o3)}
        {board("o9", "04 · Photo + stat bar", 1280, 720, o9)}
      </DCSection>

      <DCSection id="name" title="Photo-led · the name as hero" subtitle="No tagline — Yu Development carries the frame.">
        {board("o21", "21 · Masthead (bottom)", 1280, 720, o21)}
        {board("o22", "22 · Stacked (bottom-left)", 1280, 720, o22)}
        {board("o23", "23 · Centered", 1280, 720, o23)}
      </DCSection>

      <DCSection id="split" title="Split & panel" subtitle="Type and photo share the frame.">
        {board("o4", "05 · Split — paper panel", 1280, 760, o4)}
        {board("o5", "06 · Split — navy panel", 1280, 760, o5)}
        {board("o6", "07 · Framed inset (navy)", 1280, 760, o6)}
      </DCSection>

      <DCSection id="type" title="Typographic & light" subtitle="Paper-first, type-forward openers.">
        {board("o7", "08 · Editorial stacked", 1280, 880, o7)}
        {board("o8", "09 · Wordmark splash", 1280, 720, o8)}
      </DCSection>

      <DCSection id="expressive" title="Expressive directions" subtitle="Bolder, more experimental concepts.">
        {board("o10", "10 · Type-mask window", 1280, 720, o10)}
        {board("o11", "11 · Diagonal split", 1280, 720, o11)}
        {board("o12", "12 · Blueprint document", 1280, 720, o12)}
        {board("o13", "13 · Index / contents", 1280, 760, o13)}
        {board("o14", "14 · Kinetic marquee", 1280, 720, o14)}
        {board("o15", "15 · Big metric (navy)", 1280, 760, o15)}
        {board("o16", "16 · Vertical rail nav", 1280, 720, o16)}
      </DCSection>

      <DCSection id="reference" title="If Apple or Tesla designed it" subtitle="Two opposite playbooks: Apple restraint, Tesla full-bleed.">
        {board("o17", "17 · Apple — centered", 1280, 760, o17)}
        {board("o18", "18 · Apple — full-bleed dark", 1280, 720, o18)}
        {board("o19", "19 · Tesla — full-bleed", 1280, 720, o19)}
        {board("o20", "20 · Tesla — light", 1280, 720, o20)}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
