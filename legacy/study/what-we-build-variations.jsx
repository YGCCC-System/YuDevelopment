/* "What We Build" — 25 section variations for Yu Development.
   All share the brand system (Geist, navy + light blue, paper/white).
   Content axis: what we build (attainable rental communities) + who lives there. */

const IMG = "media/hero-aerial.png";
const IMG_D = "media/project-douglas.png";
const IMG_F = "media/project-flint-river.png";
const IMG_T = "media/project-dothan.png";

const HEAD = "Well-designed rental communities, priced for the people who keep a city running.";
const HEAD2 = "Homes built for the workforce a growing city can't run without.";
const HEAD3 = "Attainable rental homes, built to last and priced to fit a paycheck.";
const LEAD = "Attainable, durable rental housing built near jobs and schools \u2014 the kind of place a working household can settle into for years, not the kind that prices them out the day it opens.";
const LEAD2 = "We build garden-style rental communities in the places adding jobs faster than housing, priced to what local working families actually earn.";

const WHO = ["Teachers &amp; school staff", "Nurses &amp; healthcare workers", "First responders", "Local workers &amp; their families"];
const WHO_DESC = [
  ["Teachers &amp; school staff", "The people educating the next generation, able to live in the district they serve."],
  ["Nurses &amp; healthcare workers", "Caregivers close to the hospitals and clinics that need them on short notice."],
  ["First responders", "Police, fire, and EMS who can finally afford to live in the community they protect."],
  ["Local workers &amp; families", "The retail, service, and trade workforce that keeps a local economy moving."]
];

const whoRows = () => `<ul class="who-rows">${WHO.map(w=>`<li>${w}</li>`).join("")}</ul>`;
const whoPills = () => `<div class="who-pills">${WHO.map(w=>`<span>${w}</span>`).join("")}</div>`;
const whoNum = () => `<ul class="who-num">${WHO.map((w,i)=>`<li><span class="n">0${i+1}</span><span class="t">${w}</span></li>`).join("")}</ul>`;
const whoGrid = () => `<div class="who-grid">${WHO_DESC.map((w,i)=>`<div class="who-card"><div class="ic">0${i+1}</div><h4>${w[0]}</h4><p>${w[1]}</p></div>`).join("")}</div>`;

/* ============================================================
   GROUP A — Image + text splits (1–5)
   ============================================================ */

const v1 = `<div class="wb white pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center">
    <div class="wb-photo" style="aspect-ratio:4/5"><img src="${IMG_D}" alt=""></div>
    <div>
      <div class="wb-eyebrow" style="margin-bottom:26px">What we build</div>
      <h2 class="wb-h" style="font-size:40px">${HEAD}</h2>
      <p class="wb-lead" style="font-size:18px;margin:20px 0 0;max-width:46ch">${LEAD}</p>
      <div class="wb-wholab" style="margin:32px 0 0">Who lives here</div>
      ${whoRows()}
    </div>
  </div>
</div>`;

const v2 = `<div class="wb paper pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:64px;align-items:center">
    <div>
      <div class="wb-eyebrow" style="margin-bottom:26px">What we build</div>
      <h2 class="wb-h" style="font-size:40px">${HEAD2}</h2>
      <p class="wb-lead" style="font-size:18px;margin:20px 0 0;max-width:44ch">${LEAD2}</p>
      <div class="wb-wholab" style="margin:32px 0 16px">Who lives here</div>
      ${whoPills()}
    </div>
    <div class="wb-photo" style="aspect-ratio:4/5"><img src="${IMG_F}" alt=""><div class="wb-cap">Platform Flint River · Bainbridge, GA</div></div>
  </div>
</div>`;

const v3 = `<div class="wb image-bg" style="position:relative">
  <div class="wb-photo" style="position:absolute;inset:0;background:none"><img src="${IMG}" alt=""></div>
  <div class="scrim left"></div>
  <div style="position:relative;z-index:2;max-width:540px;padding:72px;display:flex;flex-direction:column;justify-content:center;height:100%">
    <div class="wb-eyebrow" style="margin-bottom:26px">What we build</div>
    <h2 class="wb-h" style="font-size:42px;color:#fff">${HEAD3}</h2>
    <div class="wb-wholab" style="margin:30px 0 14px">Who lives here</div>
    ${whoPills()}
  </div>
</div>`;

const v4 = `<div class="wb white">
  <div class="wb-photo" style="height:300px"><img src="${IMG_T}" alt=""><div class="wb-cap">Platform Dothan · Dothan, AL</div></div>
  <div style="padding:48px 72px;display:grid;grid-template-columns:1.2fr 1fr;gap:64px;align-items:start">
    <div>
      <div class="wb-eyebrow" style="margin-bottom:22px">What we build</div>
      <h2 class="wb-h" style="font-size:36px">${HEAD}</h2>
      <p class="wb-lead" style="font-size:17px;margin:18px 0 0">${LEAD}</p>
    </div>
    <div>
      <div class="wb-wholab" style="margin:6px 0 0">Who lives here</div>
      ${whoRows()}
    </div>
  </div>
</div>`;

const v5 = `<div class="wb paper3 pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center">
    <div style="display:grid;grid-template-rows:1fr 1fr;gap:14px;height:520px">
      <div class="wb-photo"><img src="${IMG_D}" alt=""></div>
      <div class="wb-photo"><img src="${IMG_F}" alt=""></div>
    </div>
    <div>
      <div class="wb-eyebrow" style="margin-bottom:24px">What we build</div>
      <h2 class="wb-h" style="font-size:38px">${HEAD2}</h2>
      <p class="wb-lead" style="font-size:17px;margin:18px 0 0;max-width:44ch">${LEAD2}</p>
      <div class="wb-wholab" style="margin:30px 0 0">Who lives here</div>
      ${whoNum()}
    </div>
  </div>
</div>`;

/* ============================================================
   GROUP B — Who-lives-here forward (6–10)
   ============================================================ */

const v6 = `<div class="wb white pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:22px">What we build</div>
  <h2 class="wb-h" style="font-size:38px;max-width:24ch">${HEAD}</h2>
  <p class="wb-lead" style="font-size:17px;margin:16px 0 38px;max-width:60ch">${LEAD}</p>
  ${whoGrid()}
</div>`;

const v7 = `<div class="wb navy pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:26px">Who lives here</div>
  <h2 class="wb-h" style="font-size:34px;color:#fff;max-width:22ch">We build for the people a growing city can't run without.</h2>
  <ul class="who-num" style="margin-top:38px;max-width:640px">${WHO.map((w,i)=>`<li><span class="n">0${i+1}</span><span class="t" style="color:#fff">${w}</span></li>`).join("")}</ul>
</div>`;

const v8 = `<div class="wb paper pad" style="justify-content:center;text-align:center;align-items:center">
  <div class="wb-eyebrow" style="margin-bottom:24px">What we build</div>
  <h2 class="wb-h" style="font-size:30px;max-width:30ch">Attainable rental homes for the workforce that holds a community together.</h2>
  <div class="who-pills" style="justify-content:center;margin-top:34px;max-width:760px">${WHO.map(w=>`<span>${w}</span>`).join("")}</div>
</div>`;

const v9 = `<div class="wb white pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:340px 1fr;gap:56px;align-items:start">
    <div>
      <div class="wb-eyebrow" style="margin-bottom:22px">What we build</div>
      <h2 class="wb-h" style="font-size:32px">Homes for the people who keep a city running.</h2>
      <p class="wb-lead" style="font-size:16px;margin:16px 0 0">${LEAD2}</p>
    </div>
    ${whoGrid()}
  </div>
</div>`;

const v10 = `<div class="wb image-bg" style="position:relative">
  <div class="wb-photo" style="position:absolute;inset:0;background:none"><img src="${IMG_T}" alt=""></div>
  <div class="scrim full"></div>
  <div style="position:relative;z-index:2;padding:64px 72px;display:flex;flex-direction:column;justify-content:flex-end;height:100%">
    <div class="wb-eyebrow" style="margin-bottom:22px">Who lives here</div>
    <div class="who-pills">${["Teachers", "Nurses", "First responders", "Service workers", "Trades", "Young families"].map(w=>`<span>${w}</span>`).join("")}</div>
  </div>
</div>`;

/* ============================================================
   GROUP C — Editorial / typographic (11–15)
   ============================================================ */

const v11 = `<div class="wb paper pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:34px">What we build</div>
  <h2 class="wb-h" style="font-size:52px;max-width:18ch;line-height:1.05">Homes for <span style="color:var(--accent)">teachers</span>, <span style="color:var(--accent)">nurses</span>, <span style="color:var(--accent)">first responders</span> &amp; the families that hold a city together.</h2>
  <p class="wb-lead" style="font-size:18px;margin:30px 0 0;max-width:54ch">${LEAD}</p>
</div>`;

const v12 = `<div class="wb white pad" style="justify-content:center;align-items:center;text-align:center">
  <div style="font-family:var(--serif);font-size:15px;letter-spacing:0.04em;color:var(--ink-3);margin-bottom:24px">What we build</div>
  <blockquote style="margin:0;font-family:var(--serif);font-style:italic;font-weight:400;font-size:40px;line-height:1.24;letter-spacing:-0.01em;max-width:22ch">Attainable housing is the product &mdash; for the teachers, nurses, and first responders a city depends on.</blockquote>
  <div class="divider" style="width:64px;margin:34px 0 0"></div>
</div>`;

const v13 = `<div class="wb paper3 pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px">
    <div>
      <div class="wb-eyebrow" style="margin-bottom:26px">What we build</div>
      <h2 class="wb-h" style="font-size:42px">${HEAD3}</h2>
    </div>
    <div style="padding-top:8px">
      <p class="wb-lead" style="font-size:18px;margin:0">${LEAD}</p>
      <div class="wb-wholab" style="margin:28px 0 0">Who lives here</div>
      ${whoRows()}
    </div>
  </div>
</div>`;

const v14 = `<div class="wb white pad" style="justify-content:center">
  <div style="display:flex;align-items:baseline;gap:30px;border-bottom:1px solid var(--rule);padding-bottom:30px;margin-bottom:36px">
    <div style="font-family:var(--serif);font-weight:600;font-size:84px;line-height:.9;color:var(--accent)">948</div>
    <div style="font-size:18px;color:var(--ink-2);max-width:26ch">homes delivered for working households across the Southeast &mdash; and counting.</div>
  </div>
  <div class="wb-wholab" style="margin:0 0 16px">Who lives in them</div>
  ${whoPills()}
</div>`;

const v15 = `<div class="wb paper pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:30px">What we build</div>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px 56px">
    ${WHO_DESC.map((w,i)=>`<div style="display:flex;gap:20px;padding:20px 0;border-top:1px solid var(--rule)"><span style="font-family:var(--mono);font-size:13px;color:var(--accent)">0${i+1}</span><div><h4 style="margin:0;font-size:21px;font-weight:600;letter-spacing:-0.01em">${w[0]}</h4><p style="margin:6px 0 0;font-size:15px;line-height:1.5;color:var(--ink-3)">${w[1]}</p></div></div>`).join("")}
  </div>
</div>`;

/* ============================================================
   GROUP D — Cards & modules (16–20)
   ============================================================ */

const v16 = `<div class="wb white pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:22px">What we build</div>
  <h2 class="wb-h" style="font-size:34px;max-width:26ch;margin-bottom:36px">${HEAD}</h2>
  <div class="feat3">
    <div class="cell"><div class="ix">Attainable</div><h4>Priced to a paycheck</h4><p>Rents set to what local working families actually earn, not to an exit price.</p></div>
    <div class="cell"><div class="ix">Durable</div><h4>Built to last</h4><p>Garden-style communities specified for decades of use, not a quick flip.</p></div>
    <div class="cell"><div class="ix">Connected</div><h4>Near jobs &amp; schools</h4><p>Sited where people work and kids learn, so a home cuts the commute.</p></div>
  </div>
</div>`;

const v17 = `<div class="wb paper3 pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:34px">Who lives here</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
    ${WHO_DESC.map((w,i)=>`<div class="who-card" style="background:#fff"><div class="ic">0${i+1}</div><h4>${w[0]}</h4><p>${w[1]}</p></div>`).join("")}
  </div>
</div>`;

const v18 = `<div class="wb white pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;height:100%;align-items:stretch">
    <div style="display:flex;flex-direction:column;justify-content:center;padding-right:24px">
      <div class="wb-eyebrow" style="margin-bottom:24px">What we build</div>
      <h2 class="wb-h" style="font-size:36px">${HEAD2}</h2>
      <p class="wb-lead" style="font-size:16px;margin:18px 0 0">${LEAD2}</p>
    </div>
    <div style="display:grid;grid-template-rows:1fr 1fr;gap:18px">
      <div class="wb-photo"><img src="${IMG_D}" alt=""><div class="wb-cap">Platform Douglas · Douglas, GA</div></div>
      <div style="background:var(--accent);color:#fff;padding:28px;display:flex;flex-direction:column;justify-content:center">
        <div class="wb-wholab" style="color:rgba(255,255,255,.6);margin-bottom:14px">Who lives here</div>
        <div class="who-pills">${WHO.map(w=>`<span style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.22);color:#fff">${w}</span>`).join("")}</div>
      </div>
    </div>
  </div>
</div>`;

const v19 = `<div class="wb paper pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:30px">Who lives here</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
    ${[[IMG_D,"Teachers &amp; school staff"],[IMG_F,"Nurses &amp; healthcare"],[IMG_T,"First responders"],[IMG,"Local families"]].map(([img,label])=>`<div><div class="wb-photo" style="aspect-ratio:3/4"><img src="${img}" alt=""></div><div style="font-size:16px;font-weight:500;margin-top:12px">${label}</div></div>`).join("")}
  </div>
</div>`;

const v20 = `<div class="wb white pad" style="justify-content:center">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
    <div>
      <div class="wb-eyebrow" style="margin-bottom:24px">What we build</div>
      <h2 class="wb-h" style="font-size:38px">${HEAD3}</h2>
      <div style="display:flex;gap:40px;margin-top:30px">
        <div><div style="font-family:var(--serif);font-size:46px;font-weight:600;color:var(--accent);line-height:1">12</div><div style="font-size:14px;color:var(--ink-3);margin-top:6px">Communities</div></div>
        <div><div style="font-family:var(--serif);font-size:46px;font-weight:600;color:var(--accent);line-height:1">948</div><div style="font-size:14px;color:var(--ink-3);margin-top:6px">Homes</div></div>
      </div>
    </div>
    <div>
      <div class="wb-wholab" style="margin:0 0 0">Who lives here</div>
      ${whoRows()}
    </div>
  </div>
</div>`;

/* ============================================================
   GROUP E — Bold & experimental (21–25)
   ============================================================ */

const v21 = `<div class="wb navy" style="position:relative;overflow:hidden">
  <div style="position:absolute;right:-4%;top:-10%;width:46%;height:120%;opacity:.9"><div class="wb-photo" style="height:100%;background:none"><img src="${IMG_F}" alt="" style="object-fit:cover"></div></div>
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,var(--accent-deep) 42%, rgba(21,40,59,.2) 70%, rgba(21,40,59,0))"></div>
  <div style="position:relative;z-index:2;padding:72px;max-width:620px;display:flex;flex-direction:column;justify-content:center;height:100%">
    <div class="wb-eyebrow" style="margin-bottom:26px">What we build</div>
    <h2 class="wb-h" style="font-size:44px;color:#fff">${HEAD3}</h2>
    <div class="wb-wholab" style="margin:30px 0 14px;color:rgba(255,255,255,.6)">Who lives here</div>
    <div class="who-pills">${WHO.map(w=>`<span style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.22);color:#fff">${w}</span>`).join("")}</div>
  </div>
</div>`;

const v22 = `<div class="wb white pad" style="justify-content:center">
  <h2 class="wb-h" style="font-size:30px;max-width:30ch;margin-bottom:8px">We build a home for the</h2>
  <div style="font-family:var(--sans);font-weight:600;font-size:72px;letter-spacing:-0.03em;line-height:1.04;color:var(--accent)">
    teacher.<br>nurse.<br>first responder.
  </div>
  <p class="wb-lead" style="font-size:17px;margin:30px 0 0;max-width:48ch">${LEAD2}</p>
</div>`;

const v23 = `<div class="wb paper3 pad" style="justify-content:center">
  <div class="wb-eyebrow" style="margin-bottom:24px">What we build</div>
  <h2 class="wb-h" style="font-size:34px;max-width:24ch;margin-bottom:30px">${HEAD}</h2>
  <div style="display:flex;gap:14px;overflow:hidden">
    ${[[IMG_D,"Platform Douglas","Douglas, GA"],[IMG_F,"Platform Flint River","Bainbridge, GA"],[IMG_T,"Platform Dothan","Dothan, AL"]].map(([img,nm,loc])=>`<div style="flex:1"><div class="wb-photo" style="aspect-ratio:4/3"><img src="${img}" alt=""></div><div style="margin-top:12px;font-size:16px;font-weight:600">${nm}</div><div style="font-size:13px;color:var(--ink-3)">${loc}</div></div>`).join("")}
  </div>
</div>`;

const v24 = `<div class="wb white" style="position:relative">
  <div style="display:grid;grid-template-columns:1.3fr 1fr;height:100%">
    <div class="wb-photo"><img src="${IMG_T}" alt=""></div>
    <div style="background:var(--paper);padding:56px;display:flex;flex-direction:column;justify-content:center">
      <div class="wb-eyebrow" style="margin-bottom:22px">What we build</div>
      <h2 class="wb-h" style="font-size:32px">${HEAD2}</h2>
      <div class="wb-wholab" style="margin:26px 0 0">Who lives here</div>
      ${whoNum()}
    </div>
  </div>
  <div style="position:absolute;left:calc(56.5% - 90px);top:50%;transform:translateY(-50%);width:180px;height:180px;background:var(--accent);color:#fff;border-radius:999px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px">
    <div style="font-family:var(--serif);font-size:40px;font-weight:600;line-height:1">948</div>
    <div style="font-size:12px;letter-spacing:0.06em;margin-top:6px;color:rgba(255,255,255,.8)">homes for working families</div>
  </div>
</div>`;

const v25 = `<div class="wb image-bg" style="position:relative">
  <div class="wb-photo" style="position:absolute;inset:0;background:none"><img src="${IMG}" alt=""></div>
  <div class="scrim bottom"></div>
  <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:56px 72px">
    <div class="wb-eyebrow" style="margin-bottom:0">What we build</div>
    <div>
      <h2 class="wb-h" style="font-size:46px;color:#fff;max-width:20ch">${HEAD3}</h2>
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:24px">
        <span class="wb-wholab" style="color:rgba(255,255,255,.7)">Home to</span>
        ${WHO.map(w=>`<span style="font-size:17px;font-weight:500;color:#fff">${w}</span>`).join('<span style="color:rgba(255,255,255,.4)">·</span>')}
      </div>
    </div>
  </div>
</div>`;

/* ============================================================
   Render
   ============================================================ */

const board = (id, label, w, h, html) => (
  <DCArtboard id={id} label={label} width={w} height={h}>
    <div style={{ width:"100%", height:"100%" }} dangerouslySetInnerHTML={{ __html: html }} />
  </DCArtboard>
);

function App(){
  return (
    <DesignCanvas>
      <DCSection id="a" title="A · Image + text splits" subtitle="Photography carries the section; copy + who-list alongside.">
        {board("v1","01 · Image left, who-list",1280,720,v1)}
        {board("v2","02 · Image right, who-pills",1280,720,v2)}
        {board("v3","03 · Full-bleed, text panel",1280,680,v3)}
        {board("v4","04 · Banner + two columns",1280,720,v4)}
        {board("v5","05 · Stacked photos + numbered",1280,720,v5)}
      </DCSection>

      <DCSection id="b" title="B · Who-lives-here forward" subtitle="The residents become the hero of the section.">
        {board("v6","06 · Resident card grid",1280,700,v6)}
        {board("v7","07 · Navy numbered roster",1280,680,v7)}
        {board("v8","08 · Centered pills",1280,600,v8)}
        {board("v9","09 · Copy + 2×2 cards",1280,640,v9)}
        {board("v10","10 · Photo + resident pills",1280,640,v10)}
      </DCSection>

      <DCSection id="c" title="C · Editorial & typographic" subtitle="Type-forward, minimal imagery.">
        {board("v11","11 · Names in the headline",1280,640,v11)}
        {board("v12","12 · Serif pull-quote",1280,600,v12)}
        {board("v13","13 · Split headline / body",1280,620,v13)}
        {board("v14","14 · Big stat + pills",1280,600,v14)}
        {board("v15","15 · Two-column definitions",1280,620,v15)}
      </DCSection>

      <DCSection id="d" title="D · Cards & modules" subtitle="Structured grids — attributes and residents as modules.">
        {board("v16","16 · What-we-build feature trio",1280,640,v16)}
        {board("v17","17 · Four resident cards",1280,560,v17)}
        {board("v18","18 · Copy + photo + navy card",1280,680,v18)}
        {board("v19","19 · Resident portrait row",1280,660,v19)}
        {board("v20","20 · Stats + who-list",1280,620,v20)}
      </DCSection>

      <DCSection id="e" title="E · Bold & experimental" subtitle="Higher-contrast, more distinctive compositions.">
        {board("v21","21 · Navy diagonal photo",1280,680,v21)}
        {board("v22","22 · Oversized resident type",1280,680,v22)}
        {board("v23","23 · Headline + project trio",1280,700,v23)}
        {board("v24","24 · Split photo + stat badge",1280,680,v24)}
        {board("v25","25 · Full-bleed, home-to row",1280,720,v25)}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
