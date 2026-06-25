// Dark footer shared by the Projects / Team / News / Contact pages
// (ported from the v12 homepage footer). Brand details come from the CMS.
import { getSiteContent } from '@/lib/content';

export default async function SiteFooter() {
  const content = await getSiteContent();
  const brand = content?.brand ?? {};
  const name = brand.name || 'Yu Development';
  const tagline = brand.tagline || 'A private development firm building attainable rental housing across the Southeast United States.';
  const email = brand.email || 'hello@yudevelopment.com';
  const phone = brand.phone || '470-380-7339';
  const office = brand.office || 'Atlanta, Georgia';
  const copyright = brand.copyright || '© 2026 Yu Development, LLC';
  const telHref = 'tel:+' + phone.replace(/[^0-9]/g, '');

  return (
    <footer className="v12foot">
      <div className="foot-wrap">
        <div className="top">
          <div className="col">
            <span className="foot-wordmark">{name}</span>
            <p className="blurb">{tagline}</p>
          </div>
          <div className="col col-site">
            <div className="site-links">
              <a href="/team">Team</a>
              <a href="/#projects">Projects</a>
              <a href="/#news">News</a>
              <a href="/investors">Investors</a>
              <a href="/#contact">Contact</a>
            </div>
          </div>
          <div className="col col-careers">
            <a href="#" className="foot-careers" style={{ fontSize: '18px', fontWeight: 700 }}>Careers&nbsp;&nearr;</a>
          </div>
          <div className="col col-office">
            <p>{office}</p>
            <p><a href={`mailto:${email}`}>{email}</a></p>
            <p><a href={telHref}>{phone}</a></p>
          </div>
        </div>

        <div className="mega">{name}</div>

        <div className="legal">
          <span>{copyright}</span>
          <span className="legal-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
