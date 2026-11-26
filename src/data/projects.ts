/**
 * Editable portfolio project data for Amir Moradsaleh.
 * Note: All entries are clearly marked placeholder case-study templates.
 * No real clients, awards, or performance statistics have been fabricated.
 */

import { portfolioAssets } from './assets';

export interface ProjectCaseStudy {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  statusNote: string;
  shortDescription: string;
  heroImage: string;
  heroImageAlt: string;
  aspectClass: string;
  gridSpanClass: string;
  offsetClass?: string;
  coordinates: string;
  overview: string;
  objectives: string[];
  creativeDirection: string;
  processSteps: {
    phase: string;
    title: string;
    detail: string;
  }[];
  interfacePreviewNotes: {
    label: string;
    caption: string;
    layoutType: 'editorial-grid' | 'commerce-ui' | 'spatial-browser' | 'dashboard-ui';
  }[];
  interactionDemo: {
    title: string;
    description: string;
    states: string[];
  };
  techStack: string[];
  outcome: string;
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'digital-commerce',
    number: '01',
    title: 'DIGITAL COMMERCE',
    category: 'E-Commerce UI & Editorial Direction',
    year: '2026 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'A minimalist editorial e-commerce website interface balancing tactile product presentation, crisp Swiss typography, and frictionless variant selection.',
    heroImage: portfolioAssets.workDigitalCommerceUi,
    heroImageAlt:
      'Minimalist editorial e-commerce website interface displaying product photography, Swiss typography, color swatches, and a vermilion Add to Bag button',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'lg:col-span-7',
    coordinates: 'UI 01 · COMMERCE',
    overview:
      '[Placeholder Overview — To be supplied by Amir] An exploration of digital commerce stripped of promotional clutter. Instead of crowded retail templates, products are presented inside a calm editorial grid with instant variant feedback and streamlined purchase flows.',
    objectives: [
      'Establish an unhurried editorial storefront rhythm that highlights product craft.',
      'Unify imagery, specifications, variant swatches, and checkout inside one clean grid.',
      'Deliver instant client-side transitions across desktop and mobile viewports.',
    ],
    creativeDirection:
      'Grounded in Swiss editorial web typography, warm ivory paper surfaces, fine hairline dividers, and a high-intent vermilion accent reserved strictly for primary purchase actions.',
    processSteps: [
      {
        phase: '01 · Structure',
        title: 'Storefront Information Design',
        detail:
          'Mapped product discovery, collection filtering, and product detail screens into a clean 12-column responsive layout.',
      },
      {
        phase: '02 · Visual System',
        title: 'Design Tokens & Editorial Type Scale',
        detail:
          'Defined reusable pricing, variant swatch, and product card components with disciplined spacing and contrast.',
      },
      {
        phase: '03 · Interaction',
        title: 'Instant Variant & Bag Feedback',
        detail:
          'Prototyped zero-reload media crossfades and an inline slide-over shopping bag interaction.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Product Detail Screen',
        caption: 'Split-screen layout pairing studio product imagery against tabular specs and instant add-to-bag controls.',
        layoutType: 'commerce-ui',
      },
      {
        label: 'View B — Collection Grid',
        caption: 'Filterable editorial catalog with restrained hairline framing and crisp hover preview states.',
        layoutType: 'editorial-grid',
      },
    ],
    interactionDemo: {
      title: 'Interactive Variant & Purchase State Preview',
      description:
        'Demonstrates immediate surface and state switching without jarring page reloads.',
      states: ['Default View', 'Variant Selected', 'Added to Bag'],
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Design Tokens'],
    outcome:
      '[Placeholder Outcome — Supply real project reflections when ready] Demonstrates a complete template structure for documenting e-commerce interface design, tokens, and interactive states.',
  },
  {
    slug: 'brand-experience',
    number: '02',
    title: 'BRAND EXPERIENCE',
    category: 'Brand Flagship & Interactive Web',
    year: '2026 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'A high-impact digital brand website combining oversized display typography, layered browser storytelling, and smooth scroll-linked transitions.',
    heroImage: portfolioAssets.workBrandExperienceUi,
    heroImageAlt:
      'Overlapping minimalist browser windows presenting a contemporary digital brand website with bold Swiss typography, product showcase, and vermilion CTA',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'lg:col-span-5',
    offsetClass: 'lg:mt-24',
    coordinates: 'UI 02 · BRAND WEB',
    overview:
      '[Placeholder Overview — To be supplied by Amir] Designed as a cohesive digital flagship rather than a stack of generic landing page blocks. Expressive display typography, crisp art direction, and intentional pacing turn brand storytelling into an interactive journey.',
    objectives: [
      'Translate visual brand identity into an unmistakable, expressive web experience.',
      'Choreograph scroll-linked transitions that reward exploration without delaying legibility.',
      'Build a scalable page-section system for product launches, stories, and editorial features.',
    ],
    creativeDirection:
      'Anchored by oversized grotesk display type, clean multi-window editorial framing, generous negative space, and surgical vermilion call-to-action highlights.',
    processSteps: [
      {
        phase: '01 · Concept',
        title: 'Digital Storyboarding',
        detail:
          'Mapped the narrative arc into rhythmic viewport chapters balancing bold statements with calm visual rests.',
      },
      {
        phase: '02 · Motion System',
        title: 'Scroll-Scrubbed Visual Transitions',
        detail:
          'Built synchronized SVG wireframe reveals that dissolve smoothly into finished brand screens.',
      },
      {
        phase: '03 · Engineering',
        title: 'Responsive Breakpoint Tuning',
        detail:
          'Calibrated type scale, image framing, and motion intensity independently across desktop, tablet, and touch devices.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Editorial Hero Frame',
        caption: 'Full-viewport brand opener pairing oversized display headlines with curated media composition.',
        layoutType: 'editorial-grid',
      },
      {
        label: 'View B — Layered Story Index',
        caption: 'Interactive project and story index with organic ink-masked visual reveals.',
        layoutType: 'spatial-browser',
      },
    ],
    interactionDemo: {
      title: 'Brand Interface Mode & Contrast Study',
      description:
        'Explore how tonal surfaces and interactive states maintain legibility across campaign chapters.',
      states: ['Wireframe Grid', 'Editorial Ivory', 'High-Contrast Mode'],
    },
    techStack: ['React', 'TypeScript', 'GSAP', 'Lenis', 'SVG Masks'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Provides a modular template for showcasing brand flagship websites and digital art direction.',
  },
  {
    slug: 'creative-platform',
    number: '03',
    title: 'CREATIVE PLATFORM',
    category: 'Product Dashboard & Design System',
    year: '2025 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'A modular digital workspace and publishing platform uniting clean sidebar navigation, reusable UI cards, and live design system tokens.',
    heroImage: portfolioAssets.workCreativePlatformUi,
    heroImageAlt:
      'Vertical UI presentation of a creative platform dashboard with left navigation sidebar, modular publishing cards, and charcoal and vermilion design tokens',
    aspectClass: 'aspect-[3/4]',
    gridSpanClass: 'lg:col-span-5',
    coordinates: 'UI 03 · PLATFORM',
    overview:
      '[Placeholder Overview — To be supplied by Amir] A calm, structured web application crafted for creative teams to organize projects, publish visual work, and maintain shared design tokens without interface bloat.',
    objectives: [
      'Organize complex workspace workflows inside a clear, scannable modular grid.',
      'Create a unified component library and live token documentation directly within the product.',
      'Ensure effortless keyboard navigation and responsive behavior across screen sizes.',
    ],
    creativeDirection:
      'Warm uncoated-paper neutral surfaces paired with crisp 1px hairline borders, clear typographic hierarchy, and purposeful vermilion indicators for primary actions and active tokens.',
    processSteps: [
      {
        phase: '01 · Information Design',
        title: 'Workspace Navigation & Card Taxonomy',
        detail:
          'Consolidated sidebar navigation, project feeds, and token libraries into a predictable modular system.',
      },
      {
        phase: '02 · Component System',
        title: 'Reusable Cards, Notes & Token Swatches',
        detail:
          'Standardized spacing scale, typography pairs, and state tokens for rapid frontend implementation.',
      },
      {
        phase: '03 · Prototyping',
        title: 'Interactive Filtering & Publishing States',
        detail:
          'Validated layout density and micro-interactions in working React prototypes.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Modular Workspace',
        caption: 'Balanced multi-column dashboard separating navigation, active drafts, and collaborator notes.',
        layoutType: 'dashboard-ui',
      },
      {
        label: 'View B — Design Token Inspector',
        caption: 'Live swatch, typography, and spacing token panels integrated into the platform UI.',
        layoutType: 'editorial-grid',
      },
    ],
    interactionDemo: {
      title: 'Workspace Density & Token Layer Switcher',
      description:
        'Test how the platform adapts cleanly between editorial focus, structured grid inspection, and dark review mode.',
      states: ['Workspace View', 'Token Specs', 'Review Contrast'],
    },
    techStack: ['React', 'TypeScript', 'CSS Grid', 'Design Tokens', 'GSAP'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Illustrates how editorial taste and product usability reinforce each other in web applications.',
  },
  {
    slug: 'experimental-interface',
    number: '04',
    title: 'EXPERIMENTAL INTERFACE',
    category: 'Creative Coding & Motion System',
    year: '2025 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'An unconventional interactive web experience combining layered floating browser frames, kinetic typography, bezier motion paths, and responsive choreography.',
    heroImage: portfolioAssets.workExperimentalInterfaceUi,
    heroImageAlt:
      'Experimental interactive website presentation featuring layered floating browser windows, bold Swiss typography, bezier motion paths, and mobile preview',
    aspectClass: 'aspect-[16/10]',
    gridSpanClass: 'lg:col-span-7',
    offsetClass: 'lg:mt-20',
    coordinates: 'UI 04 · EXPERIMENTAL',
    overview:
      '[Placeholder Overview — To be supplied by Amir] An interactive web experiment exploring multi-window editorial layouts, vector motion paths, optical SVG masks, and responsive pointer choreography built directly with native web technologies.',
    objectives: [
      'Push expressive web interaction using GPU-composited transforms and SVG filters.',
      'Keep experimental interfaces intuitive, fast, and accessible with reduced-motion support.',
      'Demonstrate tight integration between creative direction and frontend code.',
    ],
    creativeDirection:
      'Overlapping browser windows, expressive display typography, clean vector bezier guides, and a signature vermilion cursor accent linking desktop and mobile interactive canvases.',
    processSteps: [
      {
        phase: '01 · Experimentation',
        title: 'Motion Curves & Optical Mask Prototypes',
        detail:
          'Tested SVG displacement ink filters, path-drawing synchronization, and responsive pointer tracking.',
      },
      {
        phase: '02 · Choreography',
        title: 'Scroll-Scrubbed Multi-Window Timeline',
        detail:
          'Synchronized layered interface transitions directly to scroll progress with smooth reverse playback.',
      },
      {
        phase: '03 · Optimization',
        title: '60fps Compositor Discipline',
        detail:
          'Restricted continuous updates to transforms and refs, eliminating layout thrash and per-frame React re-renders.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Multi-Window Canvas',
        caption: 'Layered floating browser frames connected by interactive bezier motion vectors.',
        layoutType: 'spatial-browser',
      },
      {
        label: 'View B — Responsive Mobile Pairing',
        caption: 'Synchronized mobile viewport translating experimental desktop motion into crisp touch interactions.',
        layoutType: 'commerce-ui',
      },
    ],
    interactionDemo: {
      title: 'Layered Window & Motion Curve Sandbox',
      description:
        'Switch interface states to inspect how typography, vector guides, and contrast layers interact.',
      states: ['Wireframe Axis', 'Layered Windows', 'Kinetic Focus'],
    },
    techStack: ['TypeScript', 'GSAP ScrollTrigger', 'SVG Filters', 'CSS Masks', 'Lenis'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Serves as a live showcase structure for creative coding experiments and motion-driven web prototypes.',
  },
];

export function getProjectBySlug(slug: string | undefined): ProjectCaseStudy | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}
