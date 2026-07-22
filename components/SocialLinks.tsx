// Social links for the footer — logo icon : label text (Instagram, Facebook, LinkedIn).
export default function SocialLinks() {
  return (
    <div className="foot-social">
      <a href="https://www.instagram.com/yudevelopment" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <span className="ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="dom">Instagram</span>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61592021725366" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <span className="ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
          </svg>
        </span>
        <span className="dom">Facebook</span>
      </a>
      <a href="https://www.linkedin.com/company/yudevelopment" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <span className="ico">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
        </span>
        <span className="dom">LinkedIn</span>
      </a>
      <style>{`
        /* Left-align the whole footer contact column (overrides the per-page right-align) */
        footer.v12foot .col-office{ text-align:left; }
        footer.v12foot .foot-social{ display:flex; flex-direction:column; align-items:flex-start;
          gap:14px; margin-top:24px; }
        /* Mobile / tablet: stack the footer into one clean left-aligned column */
        @media (max-width:880px){
          footer.v12foot{ padding:60px 0 26px; }
          footer.v12foot .top{ flex-direction:column; gap:34px; margin-bottom:44px; }
          footer.v12foot .col-office{ text-align:left; }
          footer.v12foot .foot-social{ align-items:flex-start; margin-top:18px; }
          footer.v12foot .col .blurb{ max-width:42ch; }
          footer.v12foot .col-site .site-links{ display:flex !important; flex-direction:row !important; flex-wrap:wrap; gap:14px 28px; }
        }
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
