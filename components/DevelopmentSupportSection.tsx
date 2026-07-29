import Link from 'next/link';

// Long-form "End-to-End Development Support" content, rendered as a section
// directly below the service tabs on the /services page (not a separate page).

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

export default function DevelopmentSupportSection() {
  return (
    <section className="dss">
      <div className="dss-wrap">
        <p className="dss-eyebrow">Yu Development · Development Support</p>
        <h2 className="dss-title">End-to-End Real Estate Development Support</h2>
        <div className="dss-accent"></div>
        <p className="dss-lead">
          YuDevelopment Services provides comprehensive development support for property owners,
          investors, and developers. We coordinate the professionals, plans, approvals, vendors, and
          documentation required to move a project from initial concept through design, permitting,
          and final approval.
        </p>
        <p className="dss-lead">
          Our team serves as the central point of coordination between clients, architects,
          engineers, surveyors, consultants, contractors, vendors, and permitting authorities. By
          managing these moving parts through one organized process, we help reduce communication
          gaps, prevent missed requirements, control costs, and keep projects moving forward.
        </p>

        {/* Our Services */}
        <div className="dss-block">
          <h3 className="dss-h2">Our Services</h3>

          <div className="dss-item">
            <h4 className="dss-h3">Client and Project Coordination</h4>
            <p className="dss-p">
              We begin by reviewing the client’s goals, property information, available plans,
              project requirements, timeline, and budget considerations. From there, we define the
              project scope, identify the required professional disciplines, establish the next
              steps, and maintain clear communication throughout the project.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Site Planning and Development Review</h4>
            <p className="dss-p">
              We coordinate the evaluation of site conditions, zoning requirements, access,
              utilities, property constraints, and development objectives. This process helps
              determine the plans, consultants, approvals, and technical services required before the
              project advances.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Architectural Coordination</h4>
            <p className="dss-p">
              We coordinate architectural services for new construction, renovations, additions,
              building layouts, floor plans, elevations, plan revisions, and code-related updates. Our
              team helps ensure the architectural design remains aligned with the client’s objectives,
              project budget, constructability requirements, and applicable building codes.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Engineering Coordination</h4>
            <p className="dss-p">
              YuDevelopment Services coordinates the engineering professionals required for each
              project, including:
            </p>
            <ul className="dss-ul">{ENGINEERING.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="dss-p" style={{ marginTop: 14 }}>
              We manage communication between disciplines and help ensure the architectural and
              engineering documents are properly coordinated.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Full Construction Plan Preparation</h4>
            <p className="dss-p">
              We oversee the preparation and coordination of complete construction plan sets for
              permitting and construction. Depending on the project, the full plan package may include
              architectural, structural, civil, mechanical, electrical, plumbing, fire protection, and
              supporting technical documents.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Permit Submission Support</h4>
            <p className="dss-p">
              We help organize permit-ready documents, coordinate required professional reviews and
              stamps, and support submissions to the applicable city, county, or authority having
              jurisdiction.
            </p>
            <p className="dss-p">
              When plan-review comments are issued, we track each comment, assign responsibilities,
              coordinate the required revisions, and monitor the response process until the necessary
              corrections are completed.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Vendor and Consultant Management</h4>
            <p className="dss-p">
              We identify and coordinate qualified architects, engineers, surveyors, drafters,
              contractors, and specialty consultants based on the project’s scope and jurisdiction.
            </p>
            <p className="dss-p">Our vendor-management services may include:</p>
            <ul className="dss-ul">{VENDOR.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Project Oversight</h4>
            <p className="dss-p">
              Throughout the project, we track schedules, deliverables, approvals, client decisions,
              permit comments, revisions, and next actions. We maintain communication between all
              parties and identify potential delays, coordination gaps, or scope issues before they
              become larger problems.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Value Engineering</h4>
            <p className="dss-p">
              YuDevelopment Services brings more than design coordination to a project. We approach
              each assignment from the perspective of a developer and owner who understands the
              financial impact of construction decisions.
            </p>
            <p className="dss-p">
              Because our team has direct experience developing and building multifamily projects, we
              understand that a successful design must be functional, code-compliant, constructible,
              and financially practical.
            </p>
            <p className="dss-p">Our value-engineering process considers:</p>
            <ul className="dss-ul">{VALUE_ENG.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="dss-p" style={{ marginTop: 14 }}>
              We look for opportunities to simplify the design, reduce unnecessary complexity, improve
              material efficiency, and minimize avoidable construction costs without compromising the
              project’s function, quality, or design intent.
            </p>
            <p className="dss-p">
              This developer-led perspective allows us to evaluate how decisions made during the
              design phase may affect the project’s construction budget, schedule, and long-term
              performance.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Faster and More Efficient Delivery</h4>
            <p className="dss-p">
              As a small and agile team, we operate with fewer layers of management and more direct
              communication than many traditional firms. This allows us to respond quickly, make
              decisions efficiently, and maintain close coordination with clients and consultants.
            </p>
            <p className="dss-p">
              Depending on the project scope and review requirements, our streamlined process can
              allow us to produce deliverables in significantly less time than larger traditional
              firms.
            </p>
            <p className="dss-p">
              Our lean operating structure also enables us to offer pricing that is often more
              favorable than a conventional architecture firm while maintaining professional
              coordination and accountability throughout the project.
            </p>
          </div>

          <div className="dss-item">
            <h4 className="dss-h3">Nationwide Project Capability</h4>
            <p className="dss-p">
              Through our nationwide network of licensed architects, engineers, and technical
              professionals, YuDevelopment Services can coordinate projects across all 50 states.
            </p>
            <p className="dss-p">
              We match each project with appropriately licensed professionals based on the project
              location, required discipline, applicable codes, and jurisdictional requirements.
            </p>
            <p className="dss-p">
              Technical designs, engineering calculations, professional certifications, and stamped
              plans are completed by the appropriately licensed professionals assigned to the project.
            </p>
          </div>
        </div>

        {/* Our Process */}
        <div className="dss-block">
          <h3 className="dss-h2">Our Process</h3>
          <p className="dss-p" style={{ marginBottom: 'clamp(20px,2.4vw,30px)' }}>
            Our process is designed to provide clarity, accountability, and consistent progress at
            every stage:
          </p>
          <ol className="dss-steps">
            {PROCESS.map((step, i) => (
              <li key={i}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Why */}
        <div className="dss-block">
          <h3 className="dss-h2">Why YuDevelopment Services</h3>
          <p className="dss-p">
            Development projects require coordination between multiple professionals, technical
            documents, deadlines, approvals, budgets, and regulatory requirements. Without centralized
            oversight, projects can experience delays, duplicated work, missed requirements, and
            unnecessary costs.
          </p>
          <p className="dss-p">
            YuDevelopment Services provides a structured and efficient process that keeps the client
            informed, the project team aligned, and the required deliverables moving forward.
          </p>
          <p className="dss-p">
            By combining development experience, professional coordination, value engineering,
            nationwide resources, and a streamlined delivery model, we help clients create projects
            that are not only designed for approval, but also practical and cost-conscious to build.
          </p>
        </div>

        {/* Our Role */}
        <div className="dss-block">
          <h3 className="dss-h2">Our Role</h3>
          <p className="dss-p">
            YuDevelopment Services acts as the client’s development coordinator and project oversight
            partner.
          </p>
          <p className="dss-p">
            Our responsibility is to manage the overall process, coordinate the required
            professionals, maintain accountability, support permitting, and help ensure that every
            component of the project is properly organized and delivered from concept through final
            approval.
          </p>
        </div>

        <div className="dss-cta">
          <Link href="/contact">Start a project <span className="arrow">&rarr;</span></Link>
        </div>
      </div>

      <style>{`
        .dss{ background:var(--paper-2,#E5E2D8); border-top:1px solid var(--rule,#C6C3B7);
          padding:clamp(72px,9vw,120px) 0 clamp(72px,9vw,120px); }
        .dss-wrap{ max-width:900px; margin:0 auto; padding:0 clamp(28px,5vw,72px); }
        .dss-eyebrow{ margin:0 0 16px; font-family:var(--mono,"Geist Mono",monospace); font-size:12px;
          font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:var(--accent,#6E7B43); }
        .dss-title{ margin:0; font-family:var(--serif,"Newsreader",Georgia,serif); font-weight:600;
          font-size:clamp(30px,4.4vw,52px); line-height:1.05; letter-spacing:-0.02em; color:var(--ink,#14161A); text-wrap:balance; }
        .dss-accent{ width:60px; height:3px; background:var(--accent,#6E7B43); margin:24px 0 0; }
        .dss-lead{ margin:clamp(26px,3vw,38px) 0 0; font-size:clamp(18px,1.5vw,21px); line-height:1.62; color:var(--ink-2,#2F3238); }
        .dss-lead + .dss-lead{ margin-top:18px; }

        .dss-block{ margin-top:clamp(48px,5.5vw,80px); }
        .dss-h2{ margin:0 0 clamp(22px,2.6vw,32px); font-family:var(--serif,"Newsreader",Georgia,serif);
          font-weight:600; font-size:clamp(24px,2.8vw,36px); line-height:1.08; letter-spacing:-0.015em;
          color:var(--ink,#14161A); padding-bottom:16px; border-bottom:1px solid var(--rule,#C6C3B7); }
        .dss-item{ margin-top:clamp(30px,3.4vw,44px); }
        .dss-item:first-of-type{ margin-top:0; }
        .dss-h3{ margin:0 0 12px; font-family:var(--sans); font-weight:600; font-size:clamp(18px,1.6vw,22px);
          letter-spacing:-0.01em; color:var(--ink,#14161A); }
        .dss-p{ margin:0 0 14px; font-size:clamp(16px,1.35vw,18px); line-height:1.62; color:var(--ink-2,#2F3238); }
        .dss-p:last-child{ margin-bottom:0; }

        .dss-ul{ margin:14px 0 0; padding:0; list-style:none; display:grid; gap:11px; }
        .dss-ul li{ position:relative; padding-left:24px; font-size:clamp(16px,1.35vw,18px); line-height:1.5; color:var(--ink-2,#2F3238); }
        .dss-ul li::before{ content:""; position:absolute; left:0; top:.62em; width:8px; height:8px; background:var(--accent,#6E7B43); }

        .dss-steps{ margin:0; padding:0; list-style:none; display:grid; gap:0; }
        .dss-steps li{ position:relative; display:grid; grid-template-columns:52px 1fr; gap:20px; align-items:start;
          padding:clamp(18px,2vw,24px) 0; border-top:1px solid var(--rule,#C6C3B7); font-size:clamp(16px,1.35vw,18px); line-height:1.55; color:var(--ink-2,#2F3238); }
        .dss-steps li:last-child{ border-bottom:1px solid var(--rule,#C6C3B7); }
        .dss-steps .n{ font-family:var(--mono,"Geist Mono",monospace); font-size:15px; font-weight:500; color:var(--accent,#6E7B43); padding-top:2px; font-variant-numeric:tabular-nums; }

        .dss-cta{ margin-top:clamp(52px,6vw,84px); padding-top:clamp(30px,3.4vw,44px); border-top:1px solid var(--rule,#C6C3B7); }
        .dss-cta a{ display:inline-flex; align-items:center; gap:10px; font-size:clamp(22px,2.4vw,30px);
          font-weight:500; letter-spacing:-0.01em; color:var(--accent,#6E7B43); text-decoration:none; }
        .dss-cta .arrow{ transition:transform .25s ease; }
        .dss-cta a:hover .arrow{ transform:translateX(6px); }
      `}</style>
    </section>
  );
}
