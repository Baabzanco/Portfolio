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
    layoutType: 'editorial-grid' | 'commerce-plinth' | 'spatial-canvas' | 'type-index';
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
    category: 'E-Commerce Architecture & Art Direction',
    year: '2026 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'A restrained editorial storefront concept translating physical object presence into an unhurried, grid-disciplined browsing architecture.',
    heroImage: portfolioAssets.workDigitalCommerce,
    heroImageAlt:
      'Minimalist ceramic and aluminum object resting on a warm travertine plinth with architectural window shadows',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'lg:col-span-7',
    coordinates: '40.01 · COMM-01',
    overview:
      '[Placeholder Overview — To be supplied by Amir] An exploration of digital commerce stripped of promotional clutter. Instead of dense retail carousels, products are presented with museum-grade whitespace, crisp architectural specifications, and fluid tactile state transitions.',
    objectives: [
      'Establish an unhurried editorial browsing rhythm that elevates physical craftsmanship.',
      'Unify product specifications, imagery, and checkout flow inside a single coherent grid.',
      'Maintain instantaneous visual responsiveness across desktop and mobile viewports.',
    ],
    creativeDirection:
      'Rooted in Swiss catalog typography and warm architectural materials—travertine, warm ivory paper, and matte charcoal ink—using vermilion strictly to signify active selection and purchase intent.',
    processSteps: [
      {
        phase: '01 · Architecture',
        title: 'Catalog Taxonomy & Grid Proportions',
        detail:
          'Defined a 12-column asymmetric product sheet separating full-bleed photography from tabular technical specifications.',
      },
      {
        phase: '02 · Visual System',
        title: 'Typographic Scale & Material Contrast',
        detail:
          'Paired oversized grotesk object titles with monospaced dimensions and tactile hairline dividers.',
      },
      {
        phase: '03 · Interaction',
        title: 'Seamless Variant & Cart Choreography',
        detail:
          'Engineered zero-reload image crossfades and an inline architectural specification drawer.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Object Monograph',
        caption: 'Split viewport balancing macro material photography against tabular product geometry.',
        layoutType: 'commerce-plinth',
      },
      {
        label: 'View B — Modular Index',
        caption: 'Filterable catalog grid with restrained hairline framing and instant hover previews.',
        layoutType: 'editorial-grid',
      },
    ],
    interactionDemo: {
      title: 'Tactile Material & Configuration Preview',
      description:
        'Demonstrates instant surface-state switching without jarring layout shifts or modal interruptions.',
      states: ['Travertine Finish', 'Anodized Charcoal', 'Raw Alabaster'],
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Custom SVG'],
    outcome:
      '[Placeholder Outcome — Supply real launch summary or reflections when ready] Demonstrates a complete template structure for documenting commerce design systems, visual direction, and interactive prototypes.',
  },
  {
    slug: 'brand-experience',
    number: '02',
    title: 'BRAND EXPERIENCE',
    category: 'Spatial Narrative & Web Identity',
    year: '2026 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'An architectural brand flagship translating spatial geometry, light, and typographic pacing into a continuous scroll-driven narrative.',
    heroImage: portfolioAssets.workBrandExperience,
    heroImageAlt:
      'Contemporary architectural exhibition hall with monolithic concrete columns, curved alabaster wall, and morning light shafts',
    aspectClass: 'aspect-[4/3]',
    gridSpanClass: 'lg:col-span-5',
    offsetClass: 'lg:mt-24',
    coordinates: '40.02 · BRND-02',
    overview:
      '[Placeholder Overview — To be supplied by Amir] Designed as an architectural promenade on the web. Rather than stacking isolated marketing banners, the site guides visitors through carefully paced chapters of space, typography, and progressive visual revelation.',
    objectives: [
      'Translate physical architectural identity into an unmistakable digital visual language.',
      'Choreograph scroll-linked transitions that reward curiosity without delaying content access.',
      'Create a scalable editorial system for future exhibitions, stories, and announcements.',
    ],
    creativeDirection:
      'Inspired by daylight moving across travertine and concrete planes. Strong vertical structural lines anchor oversized editorial statements while generous negative space creates calm authority.',
    processSteps: [
      {
        phase: '01 · Concept',
        title: 'Narrative Storyboarding',
        detail:
          'Mapped the brand story into sequential spatial frames with deliberate rests between dense editorial sections.',
      },
      {
        phase: '02 · Motion System',
        title: 'Scroll-Scrubbed Elevation Shifts',
        detail:
          'Built synchronized SVG drafting overlays that dissolve smoothly into photographic architecture.',
      },
      {
        phase: '03 · Engineering',
        title: 'Responsive Grid Adaptation',
        detail:
          'Tailored column proportions and motion durations individually for desktop, tablet, and touch devices.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Narrative Opener',
        caption: 'Full-viewport editorial chapter introduction with synchronized hairline grid lines.',
        layoutType: 'editorial-grid',
      },
      {
        label: 'View B — Exhibition Index',
        caption: 'Asymmetric archive directory pairing structured metadata with organic image masks.',
        layoutType: 'type-index',
      },
    ],
    interactionDemo: {
      title: 'Architectural Light & Elevation Scrubber',
      description:
        'Interactive demonstration of how architectural lighting cues and tonal planes adapt to user exploration.',
      states: ['Drafting Blueprint', 'Ambient Daylight', 'High-Contrast Gallery'],
    },
    techStack: ['React', 'TypeScript', 'GSAP', 'Lenis', 'SVG Masks'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Provides a modular narrative framework for presenting identity systems and flagship digital experiences.',
  },
  {
    slug: 'creative-platform',
    number: '03',
    title: 'CREATIVE PLATFORM',
    category: 'Editorial Archive & Publishing System',
    year: '2025 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'A living digital monograph and publishing interface organized around Swiss grid rigor, drafting overlays, and calm typographic legibility.',
    heroImage: portfolioAssets.workCreativePlatform,
    heroImageAlt:
      'Open architectural design monograph resting on ivory linen beside a black drafting ruler and translucent vellum grid',
    aspectClass: 'aspect-[3/4]',
    gridSpanClass: 'lg:col-span-5',
    coordinates: '40.03 · PLAT-03',
    overview:
      '[Placeholder Overview — To be supplied by Amir] A digital publishing environment crafted for long-form visual essays, design archives, and studio documentation. Balances the tactile calm of printed monographs with fluid hyperlinked indexing.',
    objectives: [
      'Design a reading and browsing experience that honors both photography and long-form prose.',
      'Build intuitive cross-referencing and instant filtering without cluttered toolbars.',
      'Establish a strict typographic scale that remains effortless to read at any viewport width.',
    ],
    creativeDirection:
      'Modeled directly after architectural monographs and drafting tables: warm uncoated paper tones, hairlines measured to the pixel, tabular index columns, and clean vellum-like overlay layers.',
    processSteps: [
      {
        phase: '01 · Information Design',
        title: 'Index & Monograph Taxonomy',
        detail:
          'Structured entries with unboxed tabular metadata so readers can scan years, disciplines, and formats immediately.',
      },
      {
        phase: '02 · Reading Rhythm',
        title: 'Multi-Column Editorial Composition',
        detail:
          'Balanced 65–72 character reading measures beside spacious margin annotations and full-bleed plates.',
      },
      {
        phase: '03 · Prototyping',
        title: 'Instant Plate Inspection',
        detail:
          'Crafted smooth in-context image transitions and keyboard-accessible navigation across archive entries.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Monograph Spread',
        caption: 'Two-column asymmetric spread pairing essay prose with technical figure callouts.',
        layoutType: 'type-index',
      },
      {
        label: 'View B — Archive Matrix',
        caption: 'Precision index rows separated by 1px rules with live hover thumbnail reveal.',
        layoutType: 'editorial-grid',
      },
    ],
    interactionDemo: {
      title: 'Vellum Grid & Margin Annotation Toggle',
      description:
        'Explore how readers can toggle structural drafting guides and editorial margin notes seamlessly.',
      states: ['Reading Mode', 'Grid Overlay', 'Annotated Index'],
    },
    techStack: ['React', 'TypeScript', 'CSS Grid', 'GSAP', 'Structured JSON'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Illustrates how editorial discipline and interactive clarity combine in content-rich creative platforms.',
  },
  {
    slug: 'experimental-interface',
    number: '04',
    title: 'EXPERIMENTAL INTERFACE',
    category: 'Interactive System & Creative Development',
    year: '2025 · Placeholder',
    statusNote: 'Editable Case Study Template — Replace with Amir Moradsaleh project details',
    shortDescription:
      'An interactive spatial web experiment exploring responsive depth planes, optical SVG filters, and scroll-synchronized architectural diagrams.',
    heroImage: portfolioAssets.workExperimentalInterface,
    heroImageAlt:
      'Minimalist spatial installation with frosted glass planes, matte black structural frame, geometric light beam, and vermilion focal element',
    aspectClass: 'aspect-[16/10]',
    gridSpanClass: 'lg:col-span-7',
    offsetClass: 'lg:mt-20',
    coordinates: '40.04 · EXPR-04',
    overview:
      '[Placeholder Overview — To be supplied by Amir] An investigation into non-standard browser interaction: combining vector geometry, optical SVG displacement filters, and hardware-accelerated spatial layering into an intuitive, lightweight web instrument.',
    objectives: [
      'Push expressive visual interaction using native web technologies and compositor-friendly animation.',
      'Ensure experimental visuals remain immediately navigable and respectful of reduced-motion preferences.',
      'Demonstrate tight collaboration between creative art direction and frontend engineering.',
    ],
    creativeDirection:
      'Translucent architectural planes, sharp light geometry, precision matte-black framing, and a solitary vermilion focal marker guiding cursor exploration across depth layers.',
    processSteps: [
      {
        phase: '01 · Experimentation',
        title: 'Motion & Optical Filter Studies',
        detail:
          'Prototyped SVG turbulence masks, path-drawing synchronization, and responsive pointer interpolation.',
      },
      {
        phase: '02 · Choreography',
        title: 'Scroll-Pinned State Machine',
        detail:
          'Tied multi-layer geometry directly to scroll progress so forward and reverse scrubbing feel physical.',
      },
      {
        phase: '03 · Optimization',
        title: 'Frame-Budget Discipline',
        detail:
          'Restricted continuous transforms to GPU-composited properties and bypassed React state inside animation loops.',
      },
    ],
    interfacePreviewNotes: [
      {
        label: 'View A — Layered Spatial Canvas',
        caption: 'Independent depth planes responding smoothly to pointer coordinates and scroll progress.',
        layoutType: 'spatial-canvas',
      },
      {
        label: 'View B — Vector Telemetry Spec',
        caption: 'Precision architectural wireframe blueprint exposing component hierarchy and motion curves.',
        layoutType: 'commerce-plinth',
      },
    ],
    interactionDemo: {
      title: 'Optical Plane & Vector Alignment Study',
      description:
        'Test how depth separation and focal emphasis transform an abstract geometric layout into an interactive interface.',
      states: ['Wireframe Axis', 'Frosted Depth', 'Focal Resonance'],
    },
    techStack: ['TypeScript', 'GSAP ScrollTrigger', 'SVG Filters', 'CSS Masks', 'Lenis'],
    outcome:
      '[Placeholder Outcome — Supply real project reflection when ready] Serves as a live showcase structure for experimental frontend studies and interactive prototypes.',
  },
];

export function getProjectBySlug(slug: string | undefined): ProjectCaseStudy | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}
