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
type LayerMode = 'experience' | 'blueprint' | 'vectors';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const browserLayerRef = useRef<HTMLDivElement | null>(null);
  const floatCardARef = useRef<HTMLDivElement | null>(null);
  const floatCardBRef = useRef<HTMLDivElement | null>(null);

  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [layerMode, setLayerMode] = useState<LayerMode>('experience');
  const [activeSpecimenIdx, setActiveSpecimenIdx] = useState(0);

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

  // Subtle pointer-reactive architectural tilt on the interactive stage
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
      label: 'Spatial Grid',
      metric: '12 Columns · 40px Margin',
      headline: 'Modular rhythm adapts across breakpoints without losing tension.',
    },
    {
      label: 'Motion State',
      metric: '180ms Ease · GPU Transform',
      headline: 'Every state transition reinforces spatial hierarchy and user intent.',
    },
    {
      label: 'Type Architecture',
      metric: 'Scale 1.414 · Balanced Measure',
      headline: 'Expressive headlines balanced by disciplined technical metadata.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 border-b border-[#C9C8BE] bg-[#E8E7DE]/45"
    >
      <SectionHeaderBar
        number="06"
        label="The Digital Experience"
        metaRight="INTERACTIVE SPECIMEN LAB"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        {/* Top Row: Headline + Interactive Controls */}
        <div className="grid grid-cols-12 gap-8 items-end pb-10 border-b border-[#C9C8BE]">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-4">
              Design × Engineering
            </p>
            <TextReveal
              as="h2"
              text="DESIGN IS NOT STATIC."
              highlightWords={['STATIC.']}
              className="font-display text-[2.4rem] sm:text-[3.6rem] lg:text-[4.6rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#252522]"
            />
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-[#77776F]">
              Interfaces live in motion, viewport shifts, and pointer proximity. Inspect how responsive structure, blueprint geometry, and motion vectors operate together below.
            </p>
          </div>

          {/* Functional Segmented Controls: Viewport + Layer Inspection */}
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:items-end xl:justify-end">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F] mb-2">
                Viewport Scale
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
                Inspection Layer
              </span>
              <div className="inline-flex border border-[#C9C8BE] bg-[#F2F1E9]">
                {(
                  [
                    { id: 'experience', label: 'Surface' },
                    { id: 'blueprint', label: 'Grid' },
                    { id: 'vectors', label: 'Vectors' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLayerMode(id)}
                    data-cursor="link"
                    className={`px-3 py-2 text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      layerMode === id
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

        {/* Interactive Layered Architectural Stage */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mt-10 lg:mt-14 border border-[#C9C8BE] bg-[#F2F1E9] arch-blueprint-bg p-5 sm:p-8 lg:p-14 overflow-hidden"
        >
          {/* Floating Left Architectural Annotation Card (Parallax) */}
          <div
            ref={floatCardARef}
            className="hidden xl:block absolute left-8 top-10 z-20 w-56 border border-[#252522] bg-[#F2F1E9] p-4 shadow-[6px_6px_0_rgba(37,37,34,0.08)]"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F04427]">
              <span>LAYER 01</span>
              <RegistrationMark accent />
            </div>
            <p className="mt-2 font-display text-sm font-semibold text-[#252522]">
              Responsive Geometry
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#77776F] tabular-nums">
              {viewportMode === 'desktop'
                ? '1440px · 12-Col Swiss Grid'
                : viewportMode === 'tablet'
                  ? '834px · 8-Col Modular'
                  : '390px · 4-Col Touch Stack'}
            </p>
          </div>

          {/* Floating Right Motion Annotation Card (Parallax) */}
          <div
            ref={floatCardBRef}
            className="hidden xl:block absolute right-8 bottom-10 z-20 w-60 border border-[#C9C8BE] bg-[#252522] text-[#F2F1E9] p-4"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F04427]">
              <span>COMPOSITOR</span>
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
            {/* Browser Architectural Chrome */}
            <div className="flex items-center justify-between border-b border-[#C9C8BE] bg-[#E8E7DE] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border border-[#252522]" />
                <span className="h-2.5 w-2.5 border border-[#252522]" />
                <span className="h-2.5 w-2.5 bg-[#F04427]" />
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-[#77776F] truncate px-3">
                amirmoradsaleh.com / specimen / {viewportMode}
              </div>
              <div className="font-mono text-[10px] text-[#252522] uppercase">
                {layerMode}
              </div>
            </div>

            {/* Browser Viewport Content */}
            <div className="relative p-5 sm:p-7 min-h-[340px]">
              {/* Optional Blueprint Grid Overlay */}
              {(layerMode === 'blueprint' || layerMode === 'vectors') && (
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

              {/* Optional Motion Vector SVG Overlay */}
              {layerMode === 'vectors' && (
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
                      Interactive Specimen · 0{activeSpecimenIdx + 1}
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

                {/* Right Media Plate inside Browser Frame */}
                <div
                  className={
                    viewportMode === 'mobile' ? 'col-span-1' : 'col-span-5'
                  }
                >
                  <div className="relative aspect-[4/3] border border-[#C9C8BE] bg-[#E8E7DE] overflow-hidden">
                    <img
                      src={portfolioAssets.workExperimentalInterface}
                      alt="Spatial interface architectural light study"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`h-full w-full object-cover transition-all duration-500 ${
                        layerMode === 'blueprint'
                          ? 'opacity-25 grayscale'
                          : 'opacity-100 scale-100'
                      }`}
                    />
                    <div className="absolute bottom-2 left-2 bg-[#F2F1E9]/90 px-2 py-0.5 font-mono text-[9px] text-[#252522] border border-[#C9C8BE]">
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
