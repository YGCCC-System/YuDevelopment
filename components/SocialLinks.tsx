// Social links for the footer — logo icon : domain text (Instagram, Facebook, YouTube).
export default function SocialLinks() {
  return (
    <div className="foot-social">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <span className="ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="dom">/instagram.com</span>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <span className="ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
          </svg>
        </span>
        <span className="dom">/facebook.com</span>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <span className="ico">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.39.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
          </svg>
        </span>
        <span className="dom">/youtube.com</span>
      </a>
      <style>{`
        footer.v12foot .foot-social{ display:flex; flex-direction:column; align-items:flex-start;
          gap:14px; margin-top:24px; width:max-content; margin-left:auto; }
        @media (max-width:880px){ footer.v12foot .foot-social{ margin-left:0; } }
        footer.v12foot .foot-social a{ display:grid; grid-template-columns:22px auto; align-items:center; column-gap:3px;
          font-family:var(--sans); font-size:14px; color:rgba(255,255,255,.62); text-decoration:none; transition:color .2s ease; }
        footer.v12foot .foot-social a:hover{ color:#fff; }
        footer.v12foot .foot-social .ico{ display:inline-flex; align-items:center; justify-content:center; }
        footer.v12foot .foot-social .sep{ opacity:.7; }
        footer.v12foot .foot-social .dom{ font-variant-numeric:tabular-nums; }
      `}</style>
    </div>
  );
}
