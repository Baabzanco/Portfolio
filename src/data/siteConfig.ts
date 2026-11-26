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
    image: portfolioAssets.heroInterfaceComposition,
    imageAlt:
      'Minimalist experimental website interface displayed on a frameless studio screen showing Swiss editorial typography and vermilion accent button',
  },

  philosophy: {
    sectionNumber: '02',
    sectionLabel: 'Philosophy',
    headline: 'THE WEB DESERVES MORE THAN TEMPLATES.',
    supportingCopy:
      'Every digital experience is an opportunity to rethink how people interact with information, ideas, and technology.',
    annotations: [
      { label: 'Principle 01', value: 'Interface structure precedes visual ornament' },
      { label: 'Principle 02', value: 'Motion clarifies hierarchy, state, and intent' },
      { label: 'Principle 03', value: 'Clean frontend engineering sustains bold art direction' },
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
        detailLabel: 'Typography & Hierarchy',
        interactiveHint: 'Hover to refine type hierarchy',
      },
      {
        id: 'structure',
        number: '02',
        title: 'STRUCTURE',
        description: 'Creating coherent systems and intuitive navigation.',
        detailLabel: 'Modular UI Grid',
        interactiveHint: 'Hover to highlight grid modules',
      },
      {
        id: 'interaction',
        number: '03',
        title: 'INTERACTION',
        description: 'Designing meaningful responses to user behavior.',
        detailLabel: 'Tactile UI States',
        interactiveHint: 'Hover to trigger button state',
      },
      {
        id: 'performance',
        number: '04',
        title: 'PERFORMANCE',
        description: 'Making visual ambition work smoothly in the real world.',
        detailLabel: '60fps Browser Craft',
        interactiveHint: 'Hover to inspect render layers',
      },
    ] as ChallengeItem[],
  },

  process: {
    sectionNumber: '04',
    sectionLabel: 'The Creation of a Digital Experience',
    stages: [
      {
        id: 'concept',
        number: '01',
        title: 'CONCEPT',
        subtitle: 'Blank Canvas & Visual Direction',
        description:
          'Every website begins as a blank browser frame, a clear creative hypothesis, and an intentional visual direction tailored to the story.',
        coordinates: 'VIEWPORT 1440 · STAGE 01',
      },
      {
        id: 'structure',
        number: '02',
        title: 'STRUCTURE',
        subtitle: 'Website Grid, Navigation & Layout',
        description:
          'Drawing the modular column grid, top navigation bar, content regions, and visual rhythm that keep complex pages intuitive.',
        coordinates: '12-COL GRID · MARGIN 40PX',
      },
      {
        id: 'design',
        number: '03',
        title: 'DESIGN',
        subtitle: 'Typography, Color & UI Components',
        description:
          'Introducing expressive display type, calibrated color contrast, photography frames, and cohesive interface components.',
        coordinates: 'TYPE 4.5REM · TOKEN SYSTEM',
      },
      {
        id: 'interaction',
        number: '04',
        title: 'INTERACTION',
        subtitle: 'Hover States, Cursors & Micro-Motion',
        description:
          'Bringing buttons, navigation links, cursor cues, and subtle motion pathways to life so every gesture earns an immediate response.',
        coordinates: 'EASE EXPO.OUT · LIVE CURSOR',
      },
      {
        id: 'development',
        number: '05',
        title: 'DEVELOPMENT',
        subtitle: 'Responsive Behavior & Production Polish',
        description:
          'Translating static screens into responsive React components, synchronized scroll choreography, and crisp multi-device adaptability.',
        coordinates: 'DESKTOP ↔ MOBILE · 60FPS',
      },
      {
        id: 'experience',
        number: '06',
        title: 'EXPERIENCE',
        subtitle: 'Polished Interactive Website Revealed',
        description:
          'Wireframes give way to a complete, expressive digital experience built with clarity, responsiveness, and unmistakable character.',
        coordinates: 'BUILD READY · LIVE WEB',
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
          'Crafting cohesive digital identities for the browser—grounded in Swiss typographic discipline, asymmetric editorial grids, and reusable design systems.',
        deliverables: [
          'Digital Art Direction & Visual Systems',
          'Modular Grid & Layout Systems',
          'Responsive Interface Design',
          'Design Tokens & Component Libraries',
        ],
        diagramSpec: '12-COL WEB · TYPE RATIO 1.414',
      },
      {
        id: 'creative-development',
        number: '02',
        title: 'CREATIVE DEVELOPMENT',
        shortDescription:
          'Interactive frontend experiences and custom web implementations.',
        extendedDescription:
          'Bridging visual craft and production frontend engineering with clean React and TypeScript code, custom SVG graphics, and fluid browser performance.',
        deliverables: [
          'React, Next.js & TypeScript Frontend',
          'Custom SVG & Interactive UI Graphics',
          'Performance-Tuned Production Code',
          'Accessible Semantic Web Standards',
        ],
        diagramSpec: 'TSX / SVG / GPU COMPOSITOR',
      },
      {
        id: 'interaction-design',
        number: '03',
        title: 'INTERACTION DESIGN',
        shortDescription:
          'Motion systems, transitions, and meaningful interface behavior.',
        extendedDescription:
          'Choreographing micro-interactions, page transitions, and responsive state feedback that guide attention and make websites feel alive and tactile.',
        deliverables: [
          'Motion Systems & Easing Curves',
          'Custom Cursor & Hover States',
          'Interactive UI Prototypes',
          'State & Feedback Choreography',
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
          'Unifying content strategy, information design, responsive UX, and frontend engineering into a coherent digital flagship across every viewport.',
        deliverables: [
          'Information & UX Strategy',
          'Editorial Flow & Content Pacing',
          'Multi-Device Responsive Systems',
          'Launch Quality Verification',
        ],
        diagramSpec: 'DESKTOP · TABLET · MOBILE',
      },
      {
        id: 'experimental-web',
        number: '05',
        title: 'EXPERIMENTAL WEB',
        shortDescription:
          'Scroll-driven storytelling and unconventional digital experiences.',
        extendedDescription:
          'Pushing browser storytelling with scroll-pinned sequences, organic SVG ink masks, kinetic typography, and interactive editorial compositions.',
        deliverables: [
          'Scroll-Pinned Visual Narratives',
          'SVG Path & Ink Mask Choreography',
          'Interactive Editorial Showcases',
          'Creative Coding Experiments',
        ],
        diagramSpec: 'SCRUB 0.00—1.00 · KINETIC UI',
      },
    ] as CapabilityItem[],
  },

  about: {
    sectionNumber: '08',
    sectionLabel: 'About',
    headline: 'DESIGNING WITH CURIOSITY. BUILDING WITH INTENTION.',
    portraitImage: portfolioAssets.aboutEditorialPortrait,
    portraitCaption:
      'Studio Portrait Placeholder — Replace with Amir Moradsaleh photograph in src/data/assets.ts',
    introduction:
      'Amir Moradsaleh is an independent web designer and digital experience designer focused on creating expressive, thoughtful websites where editorial clarity meets interactive frontend craft.',
    philosophy:
      'Every website starts by stripping away generic templates—organizing information cleanly, defining a distinct visual voice, and using motion to make every interaction memorable.',
    designInterests: [
      'Editorial Web Grids & Swiss Typography',
      'Scroll-Driven Digital Storytelling',
      'Design Systems & Interface Craft',
      'Interactive Micro-States & Prototyping',
    ],
    technicalInterests: [
      'Modern Frontend Engineering (React, TypeScript)',
      'GSAP ScrollTrigger & Smooth Choreography',
      'Interactive SVG, Masks & Optical Filters',
      'Responsive Performance & Browser Craft',
    ],
    editableNotice:
      'Biography, location, and studio details are structured placeholders ready to be customized in src/data/siteConfig.ts.',
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
