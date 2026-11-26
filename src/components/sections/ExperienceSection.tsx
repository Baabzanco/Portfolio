import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { portfolioAssets } from '../../data/assets';
import { TextReveal } from '../animations/TextReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

type ViewportMode = 'desktop' | 'tablet' | 'mobile';
type InspectMode = 'surface' | 'grid' | 'motion';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const browserLayerRef = useRef<HTMLDivElement | null>(null);
  const floatCardARef = useRef<HTMLDivElement | null>(null);
  const floatCardBRef = useRef<HTMLDivElement | null>(null);

  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [inspectMode, setInspectMode] = useState<InspectMode>('surface');
  const [activeSpecimenIdx, setActiveSpecimenIdx] = useState(0);
  const [activeNavTab, setActiveNavTab] = useState('Work');

  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (floatCardARef.current) {
        gsap.fromTo(
          floatCardARef.current,
          { y: 42 },
          {
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      }

      if (floatCardBRef.current) {
        gsap.fromTo(
          floatCardBRef.current,
          { y: -24 },
          {
            y: 36,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current || !browserLayerRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(browserLayerRef.current, {
      rotateY: nx * 5,
      rotateX: -ny * 4,
      duration: 0.45,
      ease: 'power2.out',
      transformPerspective: 1100,
    });
  };

  const handlePointerLeave = () => {
    if (!browserLayerRef.current) return;
    gsap.to(browserLayerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const frameWidthClass =
    viewportMode === 'desktop'
      ? 'w-full'
      : viewportMode === 'tablet'
        ? 'max-w-[640px]'
        : 'max-w-[340px]';

  const specimens = [
    {
      label: 'Responsive Grid',
      metric: '12 Columns · Fluid Breakpoints',
      headline: 'Modular web layouts adapt seamlessly across desktop, tablet, and mobile.',
    },
    {
      label: 'Interactive States',
      metric: '180ms Ease · GPU Composited',
      headline: 'Hover feedback, focus states, and micro-motion guide attention naturally.',
    },
    {
      label: 'Typography Scale',
      metric: 'Ratio 1.414 · Balanced Measure',
      headline: 'Expressive display headlines paired with calm, scannable interface copy.',
    },
  ];

  const previewNavItems = ['Work', 'Systems', 'Motion'];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 border-b border-[#C9C8BE] bg-[#E8E7DE]/45"
    >
      <SectionHeaderBar
        number="06"
        label="The Digital Experience"
        metaRight="INTERACTIVE INTERFACE LAB"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        {/* Top Row: Headline + Interactive Viewport & Layer Controls */}
        <div className="grid grid-cols-12 gap-8 items-end pb-10 border-b border-[#C9C8BE]">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-4">
              Design × Frontend Engineering
            </p>
            <TextReveal
              as="h2"
              text="DESIGN IS NOT STATIC."
              highlightWords={['STATIC.']}
              className="font-display text-[2.4rem] sm:text-[3.6rem] lg:text-[4.6rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#252522]"
            />
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-[#77776F]">
              Great websites come alive through responsive breakpoints, thoughtful UI tokens, and deliberate motion. Switch viewports and inspect the live interface layers below.
            </p>
          </div>

          {/* Functional Segmented Controls */}
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:items-end xl:justify-end">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F] mb-2">
                Responsive Viewport
              </span>
              <div className="inline-flex border border-[#C9C8BE] bg-[#F2F1E9]">
                {(
                  [
                    { id: 'desktop', label: 'Desktop', Icon: Monitor },
                    { id: 'tablet', label: 'Tablet', Icon: Tablet },
                    { id: 'mobile', label: 'Mobile', Icon: Smartphone },
                  ] as const
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setViewportMode(id)}
                    data-cursor="link"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      viewportMode === id
                        ? 'bg-[#252522] text-[#F2F1E9]'
                        : 'text-[#77776F] hover:text-[#252522]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F] mb-2">
                UI Inspector
              </span>
              <div className="inline-flex border border-[#C9C8BE] bg-[#F2F1E9]">
                {(
                  [
                    { id: 'surface', label: 'Live UI' },
                    { id: 'grid', label: 'Grid' },
                    { id: 'motion', label: 'Motion' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInspectMode(id)}
                    data-cursor="link"
                    className={`px-3 py-2 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      inspectMode === id
                        ? 'bg-[#F04427] text-white'
                        : 'text-[#77776F] hover:text-[#252522]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Layered Browser Stage */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mt-10 lg:mt-14 border border-[#C9C8BE] bg-[#F2F1E9] ui-canvas-grid p-5 sm:p-8 lg:p-14 overflow-hidden"
        >
          {/* Floating Left Design Token Card (Parallax) */}
          <div
            ref={floatCardARef}
            className="hidden xl:block absolute left-8 top-10 z-20 w-56 border border-[#252522] bg-[#F2F1E9] p-4 shadow-[6px_6px_0_rgba(37,37,34,0.08)]"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F04427]">
              <span>DESIGN TOKENS</span>
              <RegistrationMark accent />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-4 w-4 bg-[#F2F1E9] border border-[#252522]" title="#F2F1E9" />
              <span className="h-4 w-4 bg-[#252522]" title="#252522" />
              <span className="h-4 w-4 bg-[#F04427]" title="#F04427" />
              <span className="font-mono text-[10px] text-[#77776F] ml-1">3 CORE</span>
            </div>
            <p className="mt-2 font-mono text-[11px] text-[#252522] tabular-nums">
              {viewportMode === 'desktop'
                ? '1440px · 12-Col Layout'
                : viewportMode === 'tablet'
                  ? '834px · 8-Col Layout'
                  : '390px · 4-Col Stack'}
            </p>
          </div>

          {/* Floating Right Motion Spec Card (Parallax) */}
          <div
            ref={floatCardBRef}
            className="hidden xl:block absolute right-8 bottom-10 z-20 w-60 border border-[#C9C8BE] bg-[#252522] text-[#F2F1E9] p-4"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F04427]">
              <span>MOTION SPEC</span>
              <span>60 FPS</span>
            </div>
            <p className="mt-2 font-display text-sm font-medium">
              {specimens[activeSpecimenIdx].label}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#C9C8BE]">
              {specimens[activeSpecimenIdx].metric}
            </p>
          </div>

          {/* Interactive Browser Frame */}
          <div
            ref={browserLayerRef}
            className={`relative z-10 mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#252522] bg-[#F2F1E9] shadow-[12px_12px_0_rgba(37,37,34,0.06)] ${frameWidthClass}`}
          >
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between border-b border-[#C9C8BE] bg-[#E8E7DE] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-[#252522]" />
                <span className="h-2.5 w-2.5 rounded-full border border-[#252522]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F04427]" />
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#77776F] truncate px-3">
                amirmoradsaleh.com / preview / {viewportMode}
              </div>
              <div className="font-mono text-[10px] text-[#252522] uppercase">
                {inspectMode}
              </div>
            </div>

            {/* Simulated Live Website Header Navigation */}
            <div className="flex items-center justify-between border-b border-[#C9C8BE] px-5 sm:px-7 py-3 bg-[#F2F1E9]">
              <span className="font-display text-xs font-bold tracking-[0.08em] text-[#252522]">
                AMIR.UI
              </span>
              <div className="flex items-center gap-4">
                {previewNavItems.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveNavTab(tab)}
                    className={`font-mono text-[10px] uppercase tracking-[0.1em] pb-0.5 transition-colors cursor-pointer ${
                      activeNavTab === tab
                        ? 'text-[#F04427] border-b border-[#F04427]'
                        : 'text-[#77776F] hover:text-[#252522]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Browser Viewport Content */}
            <div className="relative p-5 sm:p-7 min-h-[320px]">
              {/* Optional 6-Column UI Grid Overlay */}
              {(inspectMode === 'grid' || inspectMode === 'motion') && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 grid grid-cols-6 gap-2 px-5 sm:px-7"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-full border-x border-[#F04427]/30 bg-[#F04427]/[0.04]"
                    />
                  ))}
                </div>
              )}

              {/* Optional Motion Path Overlay */}
              {inspectMode === 'motion' && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 320"
                  fill="none"
                  className="pointer-events-none absolute inset-0 z-30 h-full w-full"
                >
                  <path
                    d="M 48 250 C 160 250, 210 95, 360 95 C 450 95, 490 190, 545 190"
                    stroke="#F04427"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                  />
                  <circle cx="48" cy="250" r="6" fill="#F04427" />
                  <circle cx="360" cy="95" r="14" stroke="#F04427" strokeWidth="1.2" />
                  <rect x="356" y="91" width="8" height="8" fill="#F04427" />
                  <circle cx="545" cy="190" r="6" fill="#252522" />
                </svg>
              )}

              {/* Live Responsive Interface Preview */}
              <div
                className={`relative z-10 grid gap-5 ${
                  viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-12'
                }`}
              >
                <div
                  className={
                    viewportMode === 'mobile' ? 'col-span-1' : 'col-span-7 flex flex-col justify-between'
                  }
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#F04427]">
                      {activeNavTab} · Specimen 0{activeSpecimenIdx + 1}
                    </span>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold leading-tight text-[#252522]">
                      {specimens[activeSpecimenIdx].headline}
                    </h3>
                  </div>

                  {/* Interactive State Switcher inside Browser Frame */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {specimens.map((spec, idx) => (
                      <button
                        key={spec.label}
                        type="button"
                        onClick={() => setActiveSpecimenIdx(idx)}
                        data-cursor="link"
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          activeSpecimenIdx === idx
                            ? 'border-[#252522] bg-[#252522] text-[#F2F1E9]'
                            : 'border-[#C9C8BE] bg-transparent text-[#252522] hover:border-[#F04427]'
                        }`}
                      >
                        0{idx + 1} · {spec.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Media Preview inside Browser Frame */}
                <div
                  className={
                    viewportMode === 'mobile' ? 'col-span-1' : 'col-span-5'
                  }
                >
                  <div className="relative aspect-[4/3] border border-[#C9C8BE] bg-[#E8E7DE] overflow-hidden">
                    <img
                      src={portfolioAssets.workExperimentalInterfaceUi}
                      alt="Layered interactive browser windows and responsive mobile design preview"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`h-full w-full object-cover transition-all duration-500 ${
                        inspectMode === 'grid'
                          ? 'opacity-30 grayscale'
                          : 'opacity-100 scale-100'
                      }`}
                    />
                    <div className="absolute bottom-2 left-2 bg-[#F2F1E9]/92 px-2 py-0.5 font-mono text-[9px] text-[#252522] border border-[#C9C8BE]">
                      {specimens[activeSpecimenIdx].metric}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
