'use client';

// Homepage hero nav. Transparent over the video at the top, turns navy on scroll
// (the .navy class is toggled by v12-scroll.js). On mobile the links collapse into
// a JS-toggled hamburger menu.
import { useState } from 'react';

const LINKS = [
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/news', label: 'News' },
  { href: '/investors', label: 'Investors' },
  { href: '/contact', label: 'Contact' },
  { href: '/careers', label: 'Careers' },
];

export default function HomeNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hf-nav">
      <a className="hf-wordmark" href="#top">Yu Development</a>
      <button
        type="button"
        className={`hf-burger${open ? ' open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span><span></span><span></span>
      </button>
      <nav className={`hf-links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} style={{ fontWeight: 600, fontSize: '14px' }}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
