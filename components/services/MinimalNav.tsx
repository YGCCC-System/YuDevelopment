// Logo-only header for the services landing pages: no nav links to click away
// on, so the hero (and its "Schedule a call" CTA) is the only path forward.
export default function MinimalNav() {
  return (
    <header className="nav">
      <a className="wordmark" href="/">Yu Development</a>
    </header>
  );
}
