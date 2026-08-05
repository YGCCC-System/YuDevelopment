import type { LucideIcon } from 'lucide-react';
import { PenTool, Building2, Layers, Map, Wrench, Stamp } from 'lucide-react';

export type Audience = 'architects' | 'engineers';

export interface ServiceOffering {
  title: string;
  icon: LucideIcon;
  description: string;
  details: string[];
}

/* Shared across both /services/architects and /services/engineers,
   the six subcontracted service lines Yu Development provides. */
export const serviceOfferings: ServiceOffering[] = [
  {
    icon: PenTool,
    title: 'Drafting',
    description:
      'Clean, construction-ready drawing sets produced to your standards: floor plans, elevations, sections, and details turned around fast so your team never sits on a redline.',
    details: [
      'Floor plans, elevations, sections & details',
      'Redlines turned around to your firm’s CAD/BIM standards',
      'Millwork, stair, bath & kitchen enlarged details',
    ],
  },
  {
    icon: Building2,
    title: 'Architectural',
    description:
      'Full architectural design and documentation, from schematic layouts through permit-ready sets, handled as an extension of your studio on the projects you don’t have bandwidth for.',
    details: [
      'Schematic design through construction documents',
      'Code research & jurisdiction-specific compliance',
      'Multi-unit / multi-building coordination',
    ],
  },
  {
    icon: Layers,
    title: 'Structural',
    description:
      'Framing, foundation, and load-bearing design and calculations coordinated directly with your architectural set, so nothing gets lost in translation between disciplines.',
    details: [
      'Framing plans, foundation design & load calculations',
      'Fire-rated & tenant-separation wall assemblies',
      'Coordinated directly against the architectural set',
    ],
  },
  {
    icon: Map,
    title: 'Civil',
    description:
      'Site plans, grading and drainage, utility layout, and erosion control: the site-level engineering that keeps a project moving through municipal review.',
    details: [
      'Site plans, grading & drainage design',
      'Utility layout & erosion/sediment control',
      'Zoning, parcel & vicinity documentation for submittal',
    ],
  },
  {
    icon: Wrench,
    title: 'MEP',
    description:
      'Mechanical, electrical, and plumbing design coordinated against your architectural and structural drawings, sized and routed to pass review the first time.',
    details: [
      'HVAC/AHU sizing, duct layout & equipment schedules',
      'Power, lighting & panel schedules',
      'Plumbing riser diagrams & fixture layouts, code-compliant',
    ],
  },
  {
    icon: Stamp,
    title: 'Sign, Stamp & Seal',
    description:
      'Licensed professional review and stamping across every discipline we touch, so what goes out the door is submittal-ready and stands behind your name.',
    details: [
      'Licensed review across architectural, structural & MEP',
      'Sealed sets ready for permit submittal',
      'One point of contact for every discipline in your set',
    ],
  },
];

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyUs: Differentiator[] = [
  {
    icon: PenTool,
    title: 'One team, one point of contact',
    description:
      'Drafting, architectural, structural, civil, and MEP handled in-house and coordinated internally. You talk to one project lead instead of chasing five vendors.',
  },
  {
    icon: Stamp,
    title: 'Licensed sign, stamp & seal',
    description:
      'Every discipline we touch is reviewed and sealed by a licensed professional before it goes out the door: submittal-ready, not a first draft.',
  },
  {
    icon: Building2,
    title: 'Real projects, not templates',
    description:
      'Every case study on this page is a plan set we actually produced, and full sets are available to view so you can see the level of detail before you commit.',
  },
  {
    icon: Layers,
    title: 'Built for overflow work',
    description:
      'We plug in on the projects your team doesn’t have bandwidth for, one discipline or the whole set, without disrupting what you’re already running in-house.',
  },
];

export interface CaseStudy {
  slug: string;
  title: string;
  projectType: string;
  servicesProvided: string[];
  stats: string[];
  summary: string;
  outcome: string;
  imagePath: string;
  planPdfPath: string;
  audience: Audience[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'legacy-at-fairgrove',
    title: 'Legacy at Fairgrove Townhomes',
    projectType: 'Conover, NC · New construction, 15-unit townhome community',
    servicesProvided: ['Architectural', 'Structural', 'MEP', 'Sign, Stamp & Seal'],
    stats: ['15 units', '3 buildings', '40 sheets', '4 disciplines'],
    summary:
      'New construction of a two-story, 15-unit townhome community for Legacy Home Builders: three buildings of five attached units each, built to 2018 NCRC. We produced the full 40-sheet stamped set, architectural plans and framing, plumbing, electrical, and HVAC, coordinated as one package instead of separate vendor hand-offs.',
    outcome: 'Full stamped set delivered, sealed by our architect of record and ready for permit submittal.',
    imagePath: '/images/case-studies/legacy-at-fairgrove.png',
    planPdfPath: '/plans/legacy-at-fairgrove.pdf',
    audience: ['architects', 'engineers'],
  },
  {
    slug: 'four-haven-apartments',
    title: 'Four Haven Apartments',
    projectType: 'Waycross, GA · New construction, 16-unit apartment building',
    servicesProvided: ['Architectural', 'Structural', 'MEP', 'Sign, Stamp & Seal'],
    stats: ['16 units', '1.19-acre site', '44 sheets', '7 disciplines'],
    summary:
      'A new two-story, 16-unit (all one-bedroom) apartment building on a 1.19-acre site for Ben Street LLC. Scope covered architectural and structural drawings plus plumbing, electrical, HVAC, fire/smoke detection, and low-voltage data, a full permit set produced end to end.',
    outcome: 'Complete permit set issued, coordinated across seven disciplines in a single package.',
    imagePath: '/images/case-studies/four-haven-apartments.png',
    planPdfPath: '/plans/four-haven-apartments.pdf',
    audience: ['architects', 'engineers'],
  },
  {
    slug: 'highland-urgent-care',
    title: 'Highland Urgent Care',
    projectType: 'Port Wentworth, GA · Commercial healthcare facility, MEP design',
    servicesProvided: ['MEP'],
    stats: ['3 MEP disciplines', 'Exam, lab & X-ray suites', '24 coordinated sheets'],
    summary:
      'An urgent care clinic needed a full mechanical, electrical, and plumbing design: AHU sizing and duct layout for exam suites, lab, and X-ray; power and lighting controls; and code-compliant plumbing including emergency eyewash stations, all coordinated directly against the architectural set.',
    outcome: 'Coordinated MEP design package produced for permit review, sized and routed against the existing architectural drawings.',
    imagePath: '/images/case-studies/highland-urgent-care.png',
    planPdfPath: '/plans/highland-urgent-care-mep.pdf',
    audience: ['engineers'],
  },
];

export const caseStudiesFor = (audience: Audience) =>
  caseStudies.filter((cs) => cs.audience.includes(audience));

export interface PlanSet {
  slug: string;
  title: string;
  description: string;
  imagePath: string;
  pdfPath: string;
}

/* Concept house plan sets available to browse in full, separate from the
   case studies above, these are design offerings rather than built projects. */
export const planLibrary: PlanSet[] = [
  {
    slug: 'plan-18-2001',
    title: 'Two-Story Basement Home',
    description: 'Two-story concept home with basement, first, and second floor layouts plus full elevation set.',
    imagePath: '/images/plan-library/plan-18-2001.png',
    pdfPath: '/plans/plan-18-2001-with-basement.pdf',
  },
  {
    slug: 'plan-932-292',
    title: 'River Front House',
    description: 'Three-story riverfront concept home with a scenic mezzanine roof plan and full elevation set.',
    imagePath: '/images/plan-library/plan-932-292-riverfront.png',
    pdfPath: '/plans/plan-932-292-riverfront.pdf',
  },
  {
    slug: 'plan-79-299',
    title: 'Board & Batten Home',
    description: 'Conceptual home with basement, shown across board & batten, brick skirting, and lap siding exterior options.',
    imagePath: '/images/plan-library/plan-79-299.png',
    pdfPath: '/plans/plan-79-299-conceptual.pdf',
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Tell us what’s on your plate',
    description: 'Send over the project: scope, drawings you already have, and the deadline you’re working against.',
  },
  {
    step: '02',
    title: 'We scope it and quote it',
    description: 'We confirm which disciplines you need, review what you’ve sent, and come back with a firm scope and price.',
  },
  {
    step: '03',
    title: 'We draft, coordinate & stamp',
    description: 'One internal team handles every discipline in scope, coordinated against each other before anything is sealed.',
  },
  {
    step: '04',
    title: 'You get a submittal-ready set',
    description: 'A complete, stamped plan set lands back in your hands, ready for permit, not another round of redlines.',
  },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const servicesFAQ: FAQItem[] = [
  {
    q: 'Who actually signs and stamps the drawings?',
    a: 'A licensed professional on our team, on every discipline we deliver: architectural, structural, civil, and MEP. You get a sealed set, not a draft that still needs an outside stamp.',
  },
  {
    q: 'Can we hand off just one discipline instead of the whole set?',
    a: 'Yes. Most clients start with a single overflow discipline, MEP or structural is common, and expand from there once the workflow proves out. You’re not locked into a full package.',
  },
  {
    q: 'How do revisions work once a set is delivered?',
    a: 'Redlines come back to the same team that produced the set, not a new vendor starting from scratch. Revisions are scoped and turned around against the original drawings.',
  },
  {
    q: 'Will this affect our relationship with our client?',
    a: 'We work as your subcontracted production team, and you stay the point of contact with your client. We coordinate directly with you, not around you.',
  },
  {
    q: 'Do you work outside the states shown in your case studies?',
    a: 'We take on projects across multiple jurisdictions and adapt to local code requirements as part of scoping. Tell us where the project is and we’ll confirm before you commit.',
  },
  {
    q: 'How fast can a set turn around?',
    a: 'It depends on scope and how many disciplines are in play. A single-discipline overflow set moves faster than a full multi-building package, and we give you a firm date once we’ve scoped the project, not a generic promise.',
  },
];

export const CALENDLY_URL = 'https://calendly.com/justdoyu/introcall';

export type PlanPageData =
  | { kind: 'case-study'; data: CaseStudy }
  | { kind: 'plan-set'; data: PlanSet };

/* Looks up a case study or concept plan set by slug for the /plans/[slug]
   branded viewer page, so plan links stay on yudevelopment.com instead of
   pointing straight at a raw PDF file. */
export function getPlanBySlug(slug: string): PlanPageData | null {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (cs) return { kind: 'case-study', data: cs };
  const ps = planLibrary.find((p) => p.slug === slug);
  if (ps) return { kind: 'plan-set', data: ps };
  return null;
}

export function allPlanSlugs(): string[] {
  return [...caseStudies.map((c) => c.slug), ...planLibrary.map((p) => p.slug)];
}

/* All communities currently published in the live portfolio (queried directly
   from Sanity, not the marketing-doc "nine communities" figure, which doesn't
   match what's actually live). Update this list as new projects publish. */
export const townsPermitted = [
  'Douglas, GA',
  'Dothan, AL',
  'Warner Robins, GA',
  'Bainbridge, GA',
  'Americus, GA',
  'Dublin, GA',
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /* Set false to render a "pending" placeholder card instead of a quote,
     for testimonials that don't have real source material yet. */
  ready: boolean;
}

/*
  All three testimonials have confirmed written sign-off. Tyler DeLoach and
  Legacy Home Builders are copy grounded in real project facts (Highland
  Urgent Care, Legacy at Fairgrove) that they reviewed and approved. EcoHaven
  Homes started as a verbatim Slack message (Dec 17) and was reworded to
  name the specific services delivered (architectural plans, permit review
  support); client has authorized publishing without re-review.
*/
export const testimonials: Testimonial[] = [
  {
    quote:
      'Our urgent care build was stuck. The architectural and structural plans hadn’t come through and the architect kept pushing the date. Yu Development stepped in, turned around a coordinated set, architectural, structural, and MEP, faster and for less than we’d been quoted, and we finally got the build finished. I got back to what I do best, building, and the clinic’s open today because of it.',
    name: 'Tyler DeLoach',
    role: 'General Contractor, Port Wentworth, GA',
    ready: true,
  },
  {
    quote:
      'We needed a full stamped set for a 15-unit townhome community and didn’t have the bandwidth to coordinate five different consultants ourselves. Yu Development delivered the whole package, architectural, structural, plumbing, electrical, and HVAC, as one coordinated set, on schedule and ready for permit.',
    name: 'Legacy Home Builders',
    role: 'Developer, Conover, NC',
    ready: true,
  },
  {
    quote:
      'We just got word from Ware County, our architectural plans and permit review are approved. We’ve come a long way, and you didn’t just hand us drawings, you walked us through the whole process. We wouldn’t have made it without you, thank you for sticking it through with us.',
    name: 'Reggie & Terell',
    role: 'EcoHaven Homes, Waycross, GA',
    ready: true,
  },
];
