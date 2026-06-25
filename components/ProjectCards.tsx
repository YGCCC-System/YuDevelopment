// Renders portfolio project cards from Sanity. Markup matches the v12 .pcard
// design used on the homepage and the Projects page.
import { projectImage, type Project } from '@/lib/content';

export default function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map((p, i) => {
        const sub = p.units || p.scope || p.type || '';
        const alt = p.name + (p.location ? ` — ${p.location}` : '');
        return (
          <a className="pcard" href="#" key={p._key || i} data-slug={p.slug || ''}>
            <div className="pshot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={projectImage(p.image)} alt={alt} />
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
