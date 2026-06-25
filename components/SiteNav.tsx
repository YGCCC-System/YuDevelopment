// Sticky white nav shared by the Projects / Team / News / Contact pages.
// `active` highlights the current section.
type Section = 'team' | 'projects' | 'news' | 'investors' | 'contact';

export default function SiteNav({ active }: { active?: Section }) {
  const cls = (k: Section) => (active === k ? 'active' : undefined);
  return (
    <header className="nav">
      <a className="wordmark" href="/">Yu Development</a>
      <nav className="links">
        <a href="/team" className={cls('team')}>Team</a>
        <a href="/#projects">Projects</a>
        <a href="/#news">News</a>
        <a href="/investors" className={cls('investors')}>Investors</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}
