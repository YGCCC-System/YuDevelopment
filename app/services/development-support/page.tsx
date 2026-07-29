import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Yu Development — End-to-End Development Support',
  description:
    'Comprehensive development coordination for property owners, investors, and developers — from concept through design, permitting, and final approval.',
};

const css = `
  :root{
    --paper:#EFEDE6; --paper-2:#E5E2D8; --ink:#14161A; --ink-2:#2F3238; --ink-3:#61656D;
    --rule:#C6C3B7; --accent:#6E7B43; --accent-2:#8B9A5B; --accent-deep:#586235;
    --sans:"Geist",ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
    --serif:"Newsreader",Georgia,"Times New Roman",serif;
    --mono:"Geist Mono",ui-monospace,Menlo,monospace;
  }
  *,*::before,*::after{ box-sizing:border-box; }
  html,body{ margin:0; overscroll-behavior:none; }
  html{ background:#0E1626; }
  body{ background:var(--paper); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased; min-height:100%; }
  a{ color:inherit; }

  /* nav — matches homepage (.hf-nav.navy scrolled state) */
  .nav{ position:sticky; top:0; z-index:40; background:#0E1626;
    display:flex; align-items:center; height:92px; padding:0 clamp(28px,5vw,56px); border-bottom:1px solid rgba(255,255,255,.10); }
  .nav .wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; white-space:nowrap; color:#F7F8FA; text-decoration:none; }
  .nav .links{ display:flex; align-items:center; gap:28px; margin-left:auto; }
  .nav .links a{ font-weight:600; font-size:14px; color:rgba(247,248,250,.80); text-decoration:none; transition:color .2s; }
  .nav .links a:hover{ color:#F7F8FA; }
  .nav .links a.active{ color:#F7F8FA; }
  @media (max-width:760px){ .nav{ padding:0 28px; } .nav .links{ display:none; } }

  /* hero / intro */
  .ds{ padding:clamp(72px,9vw,120px) 0 clamp(64px,8vw,110px); }
  .wrap{ max-width:900px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  .ds-back{ display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:12px;
    letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-3); text-decoration:none; margin:0 0 clamp(26px,3.4vw,40px); transition:color .2s ease; }
  .ds-back:hover{ color:var(--accent); }
  .ds-eyebrow{ margin:0 0 16px; font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:0.28em; text-transform:uppercase; color:var(--accent); }
  .ds-title{ margin:0; font-family:var(--serif); font-weight:600; font-size:clamp(34px,5vw,58px);
    line-height:1.04; letter-spacing:-0.02em; color:var(--ink); text-wrap:balance; }
  .ds-accent{ width:60px; height:3px; background:var(--accent); margin:26px 0 0; }
  .ds-lead{ margin:clamp(28px,3.2vw,40px) 0 0; font-size:clamp(18px,1.5vw,21px); line-height:1.62; color:var(--ink-2); }
  .ds-lead + .ds-lead{ margin-top:18px; }

  /* content sections */
  .ds-block{ margin-top:clamp(52px,6vw,84px); }
  .ds-h2{ margin:0 0 clamp(22px,2.6vw,32px); font-family:var(--serif); font-weight:600;
    font-size:clamp(26px,3vw,38px); line-height:1.08; letter-spacing:-0.015em; color:var(--ink);
    padding-bottom:16px; border-bottom:1px solid var(--rule); }
  .ds-item{ margin-top:clamp(30px,3.4vw,44px); }
  .ds-item:first-of-type{ margin-top:0; }
  .ds-h3{ margin:0 0 12px; font-family:var(--sans); font-weight:600; font-size:clamp(18px,1.6vw,22px);
    letter-spacing:-0.01em; color:var(--ink); }
  .ds-p{ margin:0 0 14px; font-size:clamp(16px,1.35vw,18px); line-height:1.62; color:var(--ink-2); }
  .ds-p:last-child{ margin-bottom:0; }

  /* bullet lists */
  .ds-ul{ margin:14px 0 0; padding:0; list-style:none; display:grid; gap:11px; }
  .ds-ul li{ position:relative; padding-left:24px; font-size:clamp(16px,1.35vw,18px); line-height:1.5; color:var(--ink-2); }
  .ds-ul li::before{ content:""; position:absolute; left:0; top:.62em; width:8px; height:8px; background:var(--accent); }

  /* numbered process */
  .ds-steps{ margin:0; padding:0; list-style:none; display:grid; gap:0; }
  .ds-steps li{ position:relative; display:grid; grid-template-columns:52px 1fr; gap:20px; align-items:start;
    padding:clamp(18px,2vw,24px) 0; border-top:1px solid var(--rule); font-size:clamp(16px,1.35vw,18px); line-height:1.55; color:var(--ink-2); }
  .ds-steps li:last-child{ border-bottom:1px solid var(--rule); }
  .ds-steps .n{ font-family:var(--mono); font-size:15px; font-weight:500; color:var(--accent); padding-top:2px; font-variant-numeric:tabular-nums; }

  /* closing CTA */
  .ds-cta{ margin-top:clamp(56px,6vw,88px); padding-top:clamp(32px,3.6vw,48px); border-top:1px solid var(--rule); }
  .ds-cta a{ display:inline-flex; align-items:center; gap:10px; font-size:clamp(22px,2.4vw,30px);
    font-weight:500; letter-spacing:-0.01em; color:var(--accent); text-decoration:none; }
  .ds-cta .arrow{ transition:transform .25s ease; }
  .ds-cta a:hover .arrow{ transform:translateX(6px); }

  /* footer (ported from v12) */
  footer.v12foot{ --foot-bg:#0E1626; --foot-line:rgba(255,255,255,.14); --foot-bright:#FFFFFF; --foot-text:rgba(255,255,255,.74); --foot-muted:rgba(255,255,255,.52);
    background:var(--foot-bg); color:var(--foot-text); border-top:1px solid var(--foot-line); padding:84px 0 28px; }
  footer.v12foot .foot-wrap{ max-width:1280px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
  footer.v12foot .top{ display:flex; justify-content:space-between; align-items:flex-start; gap:40px; margin-bottom:56px; flex-wrap:wrap; }
  footer.v12foot .col-office{ text-align:right; }
  footer.v12foot .foot-wordmark{ font-family:var(--sans); font-weight:600; font-size:18px; text-transform:uppercase; letter-spacing:0.24em; color:var(--foot-bright); line-height:1; white-space:nowrap; }
  footer.v12foot .col .blurb{ margin:18px 0 0; max-width:32ch; font-family:var(--sans); color:var(--foot-muted); font-size:14px; line-height:1.6; }
  footer.v12foot .col a, footer.v12foot .col p{ display:block; margin:0 0 7px; font-family:var(--sans); font-size:14px; color:var(--foot-text); text-decoration:none; }
  footer.v12foot .col a:hover{ color:var(--foot-bright); }
  footer.v12foot .col-site .site-links{ display:grid; grid-template-columns:1fr 1fr; column-gap:32px; row-gap:0; }
  footer.v12foot .foot-careers{ font-weight:700; color:var(--foot-text); display:inline-block; border-bottom:1px solid currentColor; padding-bottom:3px; }
  footer.v12foot .foot-careers:hover{ color:var(--foot-bright); }
  footer.v12foot .col p a{ font-family:var(--sans); display:inline; }
  footer.v12foot .mega{ padding:28px 0 24px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-weight:600; text-transform:uppercase; letter-spacing:0.24em; font-size:clamp(22px,3vw,40px); line-height:1; color:var(--foot-bright); }
  footer.v12foot .legal{ display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; padding-top:16px; border-top:1px solid var(--foot-line); font-family:var(--sans); font-size:13px; color:var(--foot-muted); }
  footer.v12foot .legal a{ color:var(--foot-muted); text-decoration:none; }
  footer.v12foot .legal a:hover{ color:var(--foot-bright); }
  footer.v12foot .legal-links a{ display:inline; margin-left:24px; }
`;

const ENGINEERING = [
  'Civil engineering',
  'Structural engineering',
  'Mechanical engineering',
  'Electrical engineering',
  'Plumbing design',
  'Fire protection',
  'Specialty engineering and consulting',
];

const VENDOR = [
  'Preparing and issuing requests for proposals',
  'Comparing pricing and scope',
  'Reviewing timelines and deliverables',
  'Negotiating project terms',
  'Coordinating contracts and notices to proceed',
  'Monitoring vendor performance',
  'Tracking revisions and outstanding items',
];

const VALUE_ENG = [
  'Construction cost',
  'Material selection',
  'Structural efficiency',
  'Building systems',
  'Unit layouts',
  'Repetition and standardization',
  'Constructability',
  'Long-term maintenance',
  'Coordination between architectural and engineering disciplines',
];

const PROCESS = [
  'Review the project goals, property information, plans, and available documentation.',
  'Define the project scope and identify required professional services.',
  'Source and evaluate qualified architects, engineers, consultants, and vendors.',
  'Review proposals, pricing, timelines, and deliverables.',
  'Coordinate contracts, project kickoff, and notices to proceed.',
  'Oversee plan preparation and coordination between disciplines.',
  'Review deliverables for completeness and alignment with the approved scope.',
  'Support permit submission and track agency review comments.',
  'Coordinate revisions, responses, and resubmissions.',
  'Monitor the project through final approval and closeout.',
];

export default function DevelopmentSupportPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <SiteNav active="services" />

      <section className="ds">
        <div className="wrap">
          <Link href="/services" className="ds-back">&larr; Back to Services</Link>
          <p className="ds-eyebrow">Yu Development · Services</p>
          <h1 className="ds-title">End-to-End Real Estate Development Support</h1>
          <div className="ds-accent"></div>
          <p className="ds-lead">
            YuDevelopment Services provides comprehensive development support for property owners,
            investors, and developers. We coordinate the professionals, plans, approvals, vendors,
            and documentation required to move a project from initial concept through design,
            permitting, and final approval.
          </p>
          <p className="ds-lead">
            Our team serves as the central point of coordination between clients, architects,
            engineers, surveyors, consultants, contractors, vendors, and permitting authorities. By
            managing these moving parts through one organized process, we help reduce communication
            gaps, prevent missed requirements, control costs, and keep projects moving forward.
          </p>

          {/* Our Services */}
          <div className="ds-block">
            <h2 className="ds-h2">Our Services</h2>

            <div className="ds-item">
              <h3 className="ds-h3">Client and Project Coordination</h3>
              <p className="ds-p">
                We begin by reviewing the client’s goals, property information, available plans,
                project requirements, timeline, and budget considerations. From there, we define the
                project scope, identify the required professional disciplines, establish the next
                steps, and maintain clear communication throughout the project.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Site Planning and Development Review</h3>
              <p className="ds-p">
                We coordinate the evaluation of site conditions, zoning requirements, access,
                utilities, property constraints, and development objectives. This process helps
                determine the plans, consultants, approvals, and technical services required before
                the project advances.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Architectural Coordination</h3>
              <p className="ds-p">
                We coordinate architectural services for new construction, renovations, additions,
                building layouts, floor plans, elevations, plan revisions, and code-related updates.
                Our team helps ensure the architectural design remains aligned with the client’s
                objectives, project budget, constructability requirements, and applicable building
                codes.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Engineering Coordination</h3>
              <p className="ds-p">
                YuDevelopment Services coordinates the engineering professionals required for each
                project, including:
              </p>
              <ul className="ds-ul">
                {ENGINEERING.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <p className="ds-p" style={{ marginTop: 14 }}>
                We manage communication between disciplines and help ensure the architectural and
                engineering documents are properly coordinated.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Full Construction Plan Preparation</h3>
              <p className="ds-p">
                We oversee the preparation and coordination of complete construction plan sets for
                permitting and construction. Depending on the project, the full plan package may
                include architectural, structural, civil, mechanical, electrical, plumbing, fire
                protection, and supporting technical documents.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Permit Submission Support</h3>
              <p className="ds-p">
                We help organize permit-ready documents, coordinate required professional reviews and
                stamps, and support submissions to the applicable city, county, or authority having
                jurisdiction.
              </p>
              <p className="ds-p">
                When plan-review comments are issued, we track each comment, assign responsibilities,
                coordinate the required revisions, and monitor the response process until the
                necessary corrections are completed.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Vendor and Consultant Management</h3>
              <p className="ds-p">
                We identify and coordinate qualified architects, engineers, surveyors, drafters,
                contractors, and specialty consultants based on the project’s scope and jurisdiction.
              </p>
              <p className="ds-p">Our vendor-management services may include:</p>
              <ul className="ds-ul">
                {VENDOR.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Project Oversight</h3>
              <p className="ds-p">
                Throughout the project, we track schedules, deliverables, approvals, client
                decisions, permit comments, revisions, and next actions. We maintain communication
                between all parties and identify potential delays, coordination gaps, or scope issues
                before they become larger problems.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Value Engineering</h3>
              <p className="ds-p">
                YuDevelopment Services brings more than design coordination to a project. We approach
                each assignment from the perspective of a developer and owner who understands the
                financial impact of construction decisions.
              </p>
              <p className="ds-p">
                Because our team has direct experience developing and building multifamily projects,
                we understand that a successful design must be functional, code-compliant,
                constructible, and financially practical.
              </p>
              <p className="ds-p">Our value-engineering process considers:</p>
              <ul className="ds-ul">
                {VALUE_ENG.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <p className="ds-p" style={{ marginTop: 14 }}>
                We look for opportunities to simplify the design, reduce unnecessary complexity,
                improve material efficiency, and minimize avoidable construction costs without
                compromising the project’s function, quality, or design intent.
              </p>
              <p className="ds-p">
                This developer-led perspective allows us to evaluate how decisions made during the
                design phase may affect the project’s construction budget, schedule, and long-term
                performance.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Faster and More Efficient Delivery</h3>
              <p className="ds-p">
                As a small and agile team, we operate with fewer layers of management and more direct
                communication than many traditional firms. This allows us to respond quickly, make
                decisions efficiently, and maintain close coordination with clients and consultants.
              </p>
              <p className="ds-p">
                Depending on the project scope and review requirements, our streamlined process can
                allow us to produce deliverables in significantly less time than larger traditional
                firms.
              </p>
              <p className="ds-p">
                Our lean operating structure also enables us to offer pricing that is often more
                favorable than a conventional architecture firm while maintaining professional
                coordination and accountability throughout the project.
              </p>
            </div>

            <div className="ds-item">
              <h3 className="ds-h3">Nationwide Project Capability</h3>
              <p className="ds-p">
                Through our nationwide network of licensed architects, engineers, and technical
                professionals, YuDevelopment Services can coordinate projects across all 50 states.
              </p>
              <p className="ds-p">
                We match each project with appropriately licensed professionals based on the project
                location, required discipline, applicable codes, and jurisdictional requirements.
              </p>
              <p className="ds-p">
                Technical designs, engineering calculations, professional certifications, and stamped
                plans are completed by the appropriately licensed professionals assigned to the
                project.
              </p>
            </div>
          </div>

          {/* Our Process */}
          <div className="ds-block">
            <h2 className="ds-h2">Our Process</h2>
            <p className="ds-p" style={{ marginBottom: 'clamp(20px,2.4vw,30px)' }}>
              Our process is designed to provide clarity, accountability, and consistent progress at
              every stage:
            </p>
            <ol className="ds-steps">
              {PROCESS.map((step, i) => (
                <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Why */}
          <div className="ds-block">
            <h2 className="ds-h2">Why YuDevelopment Services</h2>
            <p className="ds-p">
              Development projects require coordination between multiple professionals, technical
              documents, deadlines, approvals, budgets, and regulatory requirements. Without
              centralized oversight, projects can experience delays, duplicated work, missed
              requirements, and unnecessary costs.
            </p>
            <p className="ds-p">
              YuDevelopment Services provides a structured and efficient process that keeps the
              client informed, the project team aligned, and the required deliverables moving forward.
            </p>
            <p className="ds-p">
              By combining development experience, professional coordination, value engineering,
              nationwide resources, and a streamlined delivery model, we help clients create projects
              that are not only designed for approval, but also practical and cost-conscious to build.
            </p>
          </div>

          {/* Our Role */}
          <div className="ds-block">
            <h2 className="ds-h2">Our Role</h2>
            <p className="ds-p">
              YuDevelopment Services acts as the client’s development coordinator and project
              oversight partner.
            </p>
            <p className="ds-p">
              Our responsibility is to manage the overall process, coordinate the required
              professionals, maintain accountability, support permitting, and help ensure that every
              component of the project is properly organized and delivered from concept through final
              approval.
            </p>
          </div>

          {/* Closing CTA */}
          <div className="ds-cta">
            <Link href="/contact">Start a project <span className="arrow">&rarr;</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
