// Renders portfolio project cards from Sanity. Markup matches the v12 .pcard
// design used on the homepage and the Projects page.
import { projectImage, type Project } from '@/lib/content';
import { projectOverride } from '@/lib/project-overrides';

export default function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((p, i) => {
        const sub = p.units || p.scope || p.type || '';
        const alt = p.name + (p.location ? ` — ${p.location}` : '');
        const override = projectOverride(p.name);
        const img = projectImage(p.image) || override?.image || '';
        const href = override?.link || '#';
        const external = /^https?:\/\//i.test(href);
        return (
          <a
            className="pcard"
            href={href}
            key={p._key || i}
            data-slug={p.slug || ''}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <div className="pshot">
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={img} alt={alt} />
              ) : (
                <image-slot id={`project-${i + 1}`} shape="rect" placeholder="Project image"></image-slot>
              )}
            </div>
            <div className="pm">
              <span className="lcol">
                <span className="nm">{p.name}</span>
                <span className="u">{sub}</span>
              </span>
              <span className="loc">{p.location || ''}</span>
            </div>
          </a>
        );
      })}
    </>
  );
}
