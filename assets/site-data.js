/* site-data.js — fetches siteContent from Sanity and hydrates the page.
 *
 * Usage in markup:
 *   <div class="proj-grid" data-cms-projects="4"> … fallback cards … </div>
 *       -> replaced with up to 4 live projects from portfolio.projects
 *   <span data-cms="brand.name">Yu Development</span>
 *       -> textContent replaced with the value at that path (if non-empty)
 *
 * Primary source is the same-origin /api/content proxy (always works on Vercel).
 * Falls back to Sanity's public CDN so the page still hydrates if /api is absent
 * (e.g. local `live-server`). If both fail, the static fallback markup remains.
 */
(function () {
  var PROJECT_ID = 'ymrsfmvq', DATASET = 'production';
  var GROQ = '*[_id == "siteContent"][0]';
  var CDN = 'https://' + PROJECT_ID + '.apicdn.sanity.io/v2021-10-21/data/query/' +
    DATASET + '?query=' + encodeURIComponent(GROQ);

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }

  async function fetchContent() {
    try {
      var r = await fetch('/api/content');
      if (r.ok) return await r.json();
    } catch (e) {}
    try {
      var r2 = await fetch(CDN);
      if (r2.ok) { var d = await r2.json(); return d.result; }
    } catch (e2) {}
    return null;
  }

  function cardHtml(p) {
    var sub = p.scope || p.type || '';
    var alt = p.name + (p.location ? ' — ' + p.location : '');
    return '<a class="pcard" href="#" data-slug="' + esc(p.slug || '') + '">' +
      '<div class="pshot"><img src="' + esc(p.image || '') + '" alt="' + esc(alt) + '" /></div>' +
      '<div class="pm"><span class="lcol"><span class="nm">' + esc(p.name) + '</span>' +
      '<span class="u">' + esc(sub) + '</span></span>' +
      '<span class="loc">' + esc(p.location || '') + '</span></div></a>';
  }

  function renderProjects(content) {
    var all = (content && content.portfolio && content.portfolio.projects) || [];
    var live = all.filter(function (p) { return p && p.name && String(p.name).trim(); });
    var grids = document.querySelectorAll('[data-cms-projects]');
    grids.forEach(function (grid) {
      var limAttr = grid.getAttribute('data-cms-projects');
      var lim = parseInt(limAttr, 10);
      var items = (lim > 0) ? live.slice(0, lim) : live;
      if (!items.length) return; // keep static fallback if nothing usable
      grid.innerHTML = items.map(cardHtml).join('');
    });
  }

  function bindText(content) {
    document.querySelectorAll('[data-cms]').forEach(function (el) {
      var v = get(content, el.getAttribute('data-cms'));
      if (typeof v === 'string' && v.trim()) el.textContent = v;
      else if (typeof v === 'number') el.textContent = String(v);
    });
  }

  window.SITE = fetchContent().then(function (content) {
    if (!content) return null;
    try { renderProjects(content); } catch (e) {}
    try { bindText(content); } catch (e) {}
    document.dispatchEvent(new CustomEvent('site:loaded', { detail: content }));
    return content;
  });
})();
