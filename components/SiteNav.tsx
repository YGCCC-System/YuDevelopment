'use client';

// Sticky nav shared by the Projects / Team / Services / News / Investors / Contact
// pages. `active` highlights the current section. On mobile the links collapse into
// a JS-toggled hamburger menu (reliable on touch devices, unlike a pure-CSS toggle).
import { useState } from 'react';

type Section = 'team' | 'projects' | 'services' | 'news' | 'investors' | 'contact';

const LINKS: { href: string; label: string; key?: Section }[] = [
  { href: '/team', label: 'Team', key: 'team' },
  { href: '/projects', label: 'Projects', key: 'projects' },
  { href: '/services', label: 'Services', key: 'services' },
  { href: '/news', label: 'News', key: 'news' },
  { href: '/investors', label: 'Investors', key: 'investors' },
  { href: '/contact', label: 'Contact', key: 'contact' },
  { href: '/careers', label: 'Careers' },
];

export default function SiteNav({ active }: { active?: Section }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="wordmark" href="/">Yu Development</a>
      <button
        type="button"
        className={`nav-burger${open ? ' open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span><span></span><span></span>
      </button>
      <nav className={`links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={active && l.key === active ? 'active' : undefined}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <style>{`
        .nav .nav-burger{ display:none; }
        @media (max-width:760px){
          .nav .nav-burger{ display:flex; flex-direction:column; justify-content:center; gap:5px;
            width:44px; height:44px; margin-left:auto; padding:0; background:none; border:none; cursor:pointer; z-index:2; }
          .nav .nav-burger span{ display:block; width:24px; height:2px; border-radius:0;
            background:#F7F8FA; transition:transform .25s ease, opacity .2s ease; }
          .nav .nav-burger.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
          .nav .nav-burger.open span:nth-child(2){ opacity:0; }
          .nav .nav-burger.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
          .nav .links{ display:none !important; position:absolute; top:92px; left:0; right:0;
            flex-direction:column; align-items:stretch; gap:0; margin:0; padding:6px 0 10px;
            background:#0E1626; border-bottom:1px solid rgba(255,255,255,.10);
            box-shadow:0 24px 40px -22px rgba(0,0,0,.55); }
          .nav .links.open{ display:flex !important; }
          .nav .links a{ padding:15px 28px; font-size:16px; color:rgba(247,248,250,.85); }
          .nav .links a.active{ color:#F7F8FA; }
        }
      `}</style>
    </header>
  );
}
