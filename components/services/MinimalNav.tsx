// Logo-only header for the services landing pages: no nav links to click away
// on, so the hero (and its "Schedule a call" CTA) is the only path forward.
// The mark reuses the "YD" monogram from the site favicon.
export default function MinimalNav() {
  return (
    <header className="nav">
      <a className="yd-brand" href="/">
        <span className="yd-mark">YD</span>
        <span className="yd-word">Yu Development</span>
      </a>

      <style>{`
        .yd-brand{ display:inline-flex; align-items:center; gap:12px; text-decoration:none; }
        .yd-mark{ display:inline-flex; align-items:center; justify-content:center; flex:none;
          width:34px; height:34px; border:1px solid rgba(247,248,250,.55); border-radius:6px;
          font-family:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
          font-weight:700; font-size:13px; letter-spacing:0.01em; color:#F7F8FA; }
        .yd-word{ font-family:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
          font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em;
          white-space:nowrap; color:#F7F8FA; }
      `}</style>
    </header>
  );
}
