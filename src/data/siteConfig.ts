/**
 * Central editable site configuration for Amir Moradsaleh's Portfolio.
 * Update placeholder values marked with [Editable ...] to publish personal details.
 */

import { portfolioAssets } from './assets';

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  deliverables: string[];
  diagramSpec: string;
}

export interface ProcessStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  coordinates: string;
}

export interface ChallengeItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detailLabel: string;
  interactiveHint: string;
}

export const siteConfig = {
  brand: {
    name: 'AMIR MORADSALEH',
    role: 'Independent Web Designer & Digital Experience Designer',
    primaryStatement:
      'I design digital experiences that turn complex ideas into intuitive, memorable interactions.',
    supportingStatement:
      'From visual systems and interaction design to development and immersive storytelling, I build websites with purpose, precision, and character.',
    availability: 'Available for select collaborations',
    locationPlaceholder: '[Location — Editable in siteConfig.ts]',
    timezonePlaceholder: '[Timezone — Editable]',
    year: new Date().getFullYear(),
  },

  contact: {
    emailPlaceholder: 'hello@amirmoradsaleh.com',
    emailNote: 'Editable placeholder email — replace in src/data/siteConfig.ts',
    socials: [
      { label: 'LinkedIn', href: '#contact', note: 'Add profile URL' },
      { label: 'Instagram', href: '#contact', note: 'Add profile URL' },
      { label: 'GitHub', href: '#contact', note: 'Add profile URL' },
      { label: 'Read.cv', href: '#contact', note: 'Add profile URL' },
    ],
  },

  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    headline: 'DESIGNING DIGITAL EXPERIENCES THAT MOVE PEOPLE.',
    supportingText:
      'Independent web designer exploring the intersection of design, technology, interaction, and digital storytelling.',
    primaryCta: 'EXPLORE SELECTED WORK',
    secondaryCta: "LET'S TALK",
    image: portfolioAssets.heroArchitecturalForm,
    imageAlt:
      'Minimalist travertine architectural pavilion model resting on an ivory drafting surface with geometric daylight shadows',
  },

  philosophy: {
    sectionNumber: '02',
    sectionLabel: 'Philosophy',
    headline: 'A WEBSITE IS MORE THAN WHAT YOU SEE.',
    supportingCopy:
      'Behind every meaningful digital experience is a carefully considered system of structure, clarity, interaction, and intention.',
    annotations: [
      { label: 'Principle A', value: 'Visual architecture precedes surface decoration' },
      { label: 'Principle B', value: 'Motion clarifies spatial hierarchy and state' },
      { label: 'Principle C', value: 'Engineering restraint sustains creative ambition' },
    ],
  },

  challenges: {
    sectionNumber: '03',
    sectionLabel: 'Design Challenges',
    closingStatement: 'EVERY DETAIL HAS A PURPOSE.',
    items: [
      {
        id: 'clarity',
        number: '01',
        title: 'CLARITY',
        description: 'Making complex information understandable.',
        detailLabel: 'Information Hierarchy',
        interactiveHint: 'Hover to align focal planes',
      },
      {
        id: 'structure',
        number: '02',
        title: 'STRUCTURE',
        description: 'Creating coherent systems and intuitive navigation.',
        detailLabel: 'Modular Proportion',
        interactiveHint: 'Hover to reveal structural axes',
      },
      {
        id: 'interaction',
        number: '03',
        title: 'INTERACTION',
        description: 'Designing meaningful responses to user behavior.',
        detailLabel: 'Tactile Feedback',
        interactiveHint: 'Hover to trigger vector response',
      },
      {
        id: 'performance',
        number: '04',
        title: 'PERFORMANCE',
        description: 'Making visual ambition work smoothly in the real world.',
        detailLabel: '60fps Execution',
        interactiveHint: 'Hover to inspect cadence curve',
      },
    ] as ChallengeItem[],
  },

  process: {
    sectionNumber: '04',
    sectionLabel: 'From Structure to Experience',
    stages: [
      {
        id: 'structure',
        number: '01',
        title: 'STRUCTURE',
        subtitle: 'Observation & Architectural Grid',
        description:
          'Every project begins on an empty coordinate field. Establishing proportions, margins, and visual tension before placing a single pixel.',
        coordinates: 'GRID 12 × 08 · RATIO 1.618',
      },
      {
        id: 'foundation',
        number: '02',
        title: 'FOUNDATION',
        subtitle: 'Primary Volumes & Layout Boundaries',
        description:
          'Translating narrative priorities into clear spatial zones, asymmetric anchors, and legible structural hierarchy.',
        coordinates: 'ZONES 04 · MARGIN 48PX',
      },
      {
        id: 'composition',
        number: '03',
        title: 'COMPOSITION',
        subtitle: 'Editorial Rhythm & Interface Framing',
        description:
          'Balancing typography, negative space, and imagery so each viewport reads with the quiet authority of an architectural monograph.',
        coordinates: 'SCALE 4.5REM · MEASURE 68CH',
      },
      {
        id: 'interaction',
        number: '04',
        title: 'INTERACTION',
        subtitle: 'Behavior, States & Spatial Flow',
        description:
          'Connecting components with deliberate motion pathways, responsive feedback, and natural scroll choreography.',
        coordinates: 'CURVE EXPO.OUT · SCRUB SYNC',
      },
      {
        id: 'refinement',
        number: '05',
        title: 'REFINEMENT',
        subtitle: 'Typography, Contrast & Surface Detail',
        description:
          'Calibrating tonal contrast, hairline dividers, micro-transitions, and responsive edge cases until nothing feels accidental.',
        coordinates: 'INK #252522 · ACCENT #F04427',
      },
      {
        id: 'experience',
        number: '06',
        title: 'EXPERIENCE',
        subtitle: 'Realized Digital Environment',
        description:
          'The blueprint recedes into effortless clarity—delivering an interactive web experience built with purpose, precision, and character.',
        coordinates: 'STATE COMPLETE · LIVE BUILD',
      },
    ] as ProcessStage[],
  },

  capabilities: {
    sectionNumber: '07',
    sectionLabel: 'Capabilities',
    items: [
      {
        id: 'web-design',
        number: '01',
        title: 'WEB DESIGN',
        shortDescription:
          'Visual direction, layout systems, typography, and digital interfaces.',
        extendedDescription:
          'Crafting cohesive visual identities translated for the browser—grounded in Swiss typographic discipline, asymmetric editorial grids, and durable design systems.',
        deliverables: [
          'Art Direction & Visual Language',
          'Modular Grid & Layout Systems',
          'Responsive Interface Design',
          'Design Tokens & Component Specs',
        ],
        diagramSpec: 'AXIS 12-COL · TYPE RATIO 1.414',
      },
      {
        id: 'creative-development',
        number: '02',
        title: 'CREATIVE DEVELOPMENT',
        shortDescription:
          'Interactive frontend experiences and custom web implementations.',
        extendedDescription:
          'Bridging design intent and production engineering with clean TypeScript architectures, custom SVG graphics, and fluid rendering across devices.',
        deliverables: [
          'React, Next.js & TypeScript Frontend',
          'Custom SVG & Canvas Graphics',
          'Performance-Tuned Production Code',
          'Accessible Semantic Markup',
        ],
        diagramSpec: 'DOM / SVG / GPU COMPOSITOR',
      },
      {
        id: 'interaction-design',
        number: '03',
        title: 'INTERACTION DESIGN',
        shortDescription:
          'Motion systems, transitions, and meaningful interface behavior.',
        extendedDescription:
          'Choreographing micro-interactions, page transitions, and responsive state changes that guide attention and make digital interfaces feel tactile and responsive.',
        deliverables: [
          'Motion Systems & Easing Libraries',
          'Custom Cursor & Hover Behavior',
          'Interactive Prototypes',
          'State & Feedback Architecture',
        ],
        diagramSpec: 'TIMING 180MS · CUBIC-BEZIER',
      },
      {
        id: 'digital-experience',
        number: '04',
        title: 'DIGITAL EXPERIENCE',
        shortDescription:
          'End-to-end thinking across structure, content, design, and technology.',
        extendedDescription:
          'Connecting narrative strategy, information architecture, visual design, and frontend craft into a unified digital presence rather than disconnected pages.',
        deliverables: [
          'Experience Architecture & Sitemaps',
          'Narrative Flow & Content Framing',
          'Cross-Device Responsive Strategy',
          'Launch Quality Assurance',
        ],
        diagramSpec: 'SYSTEM END-TO-END · 01—06',
      },
      {
        id: 'experimental-web',
        number: '05',
        title: 'EXPERIMENTAL WEB',
        shortDescription:
          'Scroll-driven storytelling and unconventional digital experiences.',
        extendedDescription:
          'Exploring scroll-pinned sequences, organic SVG masks, procedural illustrations, and editorial web compositions for studios and forward-thinking brands.',
        deliverables: [
          'Scroll-Pinned Visual Narratives',
          'SVG Path & Ink Mask Choreography',
          'Interactive Editorial Showcases',
          'Custom Creative Experiments',
        ],
        diagramSpec: 'SCRUB 0.00—1.00 · PIN ACTIVE',
      },
    ] as CapabilityItem[],
  },

  about: {
    sectionNumber: '08',
    sectionLabel: 'About',
    headline: 'DESIGNING WITH CURIOSITY. BUILDING WITH INTENTION.',
    portraitImage: portfolioAssets.aboutDesignerPortrait,
    portraitCaption:
      'Editorial Portrait Placeholder — Replace with Amir Moradsaleh studio photograph',
    introduction:
      'Amir Moradsaleh is an independent web designer and digital experience designer focused on building thoughtful, expressive websites where editorial clarity meets interactive craft.',
    philosophy:
      'Every project is approached as an architectural system: strip away ornamental noise, establish structural clarity, and use motion only where it deepens understanding and emotion.',
    designInterests: [
      'Editorial Grid Systems & Swiss Typography',
      'Scroll-Driven Visual Storytelling',
      'Minimalist Digital Art Direction',
      'Tactile Interface & Micro-Interaction Craft',
    ],
    technicalInterests: [
      'Modern Frontend Architecture (React, TypeScript)',
      'GSAP ScrollTrigger & Choreography Pipelines',
      'Procedural SVG, Masks & Optical Filters',
      'Smooth Performance & Responsive Precision',
    ],
    editableNotice:
      'Biography, location, and studio background fields are structured placeholders ready to be customized in src/data/siteConfig.ts.',
  },

  contactSection: {
    sectionNumber: '09',
    sectionLabel: 'Next Project',
    headline: "HAVE AN IDEA? LET'S MAKE IT REAL.",
    supportingCopy:
      "Have a project in mind or looking to create something different? Let's start a conversation.",
    primaryCta: 'START A PROJECT',
    secondaryCta: 'EMAIL ME',
  },
} as const;
