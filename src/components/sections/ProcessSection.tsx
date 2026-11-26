import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../data/siteConfig';
import { portfolioAssets } from '../../data/assets';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const STAGES = siteConfig.process.stages;

export const ProcessSection: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const maskId = `process-ui-mask-${uid}`;
  const filterId = `process-ui-filter-${uid}`;

  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [isDesktopPinned, setIsDesktopPinned] = useState(false);

  const { scrollTo, reducedMotion } = useSmoothScroll();

  /**
   * 6-Stage Scroll-Scrubbed Website Creation Timeline:
   * 01 CONCEPT     -> Blank digital canvas, browser chrome, URL bar & direction focus
   * 02 STRUCTURE   -> 12-col website grid, navigation bar, content regions & layout frames
   * 03 DESIGN      -> Typography hierarchy, color tokens, surface fills & UI components
   * 04 INTERACTION -> Active nav states, button hover fill, cursor path & micro-motion
   * 05 DEVELOPMENT -> Responsive mobile breakpoint preview slides in alongside live DOM tokens
   * 06 EXPERIENCE  -> Organic ink-mask blooms the finished website visual into the browser canvas
   */
  const buildStageTimeline = (svg: SVGSVGElement) => {
    const prepareStroke = (selector: string) => {
      const els = svg.querySelectorAll<SVGGeometryElement>(selector);
      els.forEach((el) => {
        const len = el.getTotalLength ? el.getTotalLength() : 320;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });
      return els;
    };

    const s1Lines = prepareStroke('.p-stage-1-line');
    const s2Lines = prepareStroke('.p-stage-2-line');
    const s4Lines = prepareStroke('.p-stage-4-line');

    const s1Group = svg.querySelector('.p-stage-1');
    const s2Group = svg.querySelector('.p-stage-2');
    const s3Group = svg.querySelector('.p-stage-3');
    const s4Group = svg.querySelector('.p-stage-4');
    const s5Group = svg.querySelector('.p-stage-5');
    const s6Group = svg.querySelector('.p-stage-6');
    const expBlot = svg.querySelector('.p-exp-blot');
    const cursorNode = svg.querySelector('.p-cursor-node');
    const mobileDevice = svg.querySelector('.p-mobile-preview');

    gsap.set([s2Group, s3Group, s4Group, s5Group, s6Group], { opacity: 0 });
    gsap.set(s1Group, { opacity: 1 });
    if (expBlot) gsap.set(expBlot, { attr: { r: 0 } });
    if (mobileDevice) gsap.set(mobileDevice, { x: 64, opacity: 0 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

    // STAGE 01 — CONCEPT (0.0 -> 1.0)
    tl.to(s1Lines, { strokeDashoffset: 0, stagger: 0.04, duration: 0.85 }, 0);
    tl.fromTo(
      svg.querySelectorAll('.p-stage-1-fade'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.55 },
      0.25
    );

    // STAGE 02 — STRUCTURE (1.0 -> 2.0)
    tl.to(s2Group, { opacity: 1, duration: 0.14 }, 1.0);
    tl.to(s2Lines, { strokeDashoffset: 0, stagger: 0.032, duration: 0.84 }, 1.04);
    tl.to(svg.querySelectorAll('.p-stage-1-fade'), { opacity: 0.12, duration: 0.45 }, 1.1);

    // STAGE 03 — DESIGN (2.0 -> 3.0)
    tl.to(s3Group, { opacity: 1, duration: 0.18 }, 2.0);
    tl.fromTo(
      svg.querySelectorAll('.p-stage-3-item'),
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.055, duration: 0.78 },
      2.08
    );

    // STAGE 04 — INTERACTION (3.0 -> 4.0)
    tl.to(s4Group, { opacity: 1, duration: 0.14 }, 3.0);
    tl.to(s4Lines, { strokeDashoffset: 0, stagger: 0.05, duration: 0.72 }, 3.06);
    if (cursorNode) {
      tl.fromTo(
        cursorNode,
        { x: -170, y: 74, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power1.inOut' },
        3.14
      );
    }

    // STAGE 05 — DEVELOPMENT (4.0 -> 5.0)
    tl.to(s5Group, { opacity: 1, duration: 0.18 }, 4.0);
    if (mobileDevice) {
      tl.to(mobileDevice, { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 4.08);
    }
    tl.fromTo(
      svg.querySelectorAll('.p-stage-5-item'),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.65 },
      4.2
    );

    // STAGE 06 — EXPERIENCE (5.0 -> 6.0)
    tl.to(s6Group, { opacity: 1, duration: 0.16 }, 5.0);
    if (expBlot) {
      tl.to(expBlot, { attr: { r: 360 }, duration: 0.9, ease: 'power2.out' }, 5.06);
    }
    tl.to(s2Group, { opacity: 0.25, duration: 0.7 }, 5.18);
    tl.to(s4Group, { opacity: 0.55, duration: 0.7 }, 5.22);

    return tl;
  };

  const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const pinEl = pinContainerRef.current;
    const svg = svgRef.current;
    if (!pinEl || !svg) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop) && !reducedMotion;
        setIsDesktopPinned(isDesktop);

        const tl = buildStageTimeline(svg);

        if (isDesktop) {
          let lastStageIndex = 0;

          const st = ScrollTrigger.create({
            trigger: pinEl,
            start: 'top top',
            end: '+=4200',
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              tl.progress(self.progress);

              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }

              const nextStage = Math.min(
                STAGES.length - 1,
                Math.floor(self.progress * STAGES.length)
              );
              if (nextStage !== lastStageIndex) {
                lastStageIndex = nextStage;
                setActiveStage(nextStage);
              }
            },
          });

          scrollTriggerRef.current = st;

          return () => {
            st.kill();
            tl.kill();
            scrollTriggerRef.current = null;
          };
        } else {
          mobileTimelineRef.current = tl;
          tl.progress((activeStage + 1) / STAGES.length);
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${(activeStage + 1) / STAGES.length})`;
          }

          return () => {
            tl.kill();
            mobileTimelineRef.current = null;
          };
        }
      }
    );

    return () => mm.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (isDesktopPinned || !mobileTimelineRef.current) return;
    const targetProgress = (activeStage + 1) / STAGES.length;
    if (reducedMotion) {
      mobileTimelineRef.current.progress(targetProgress);
    } else {
      gsap.to(mobileTimelineRef.current, {
        progress: targetProgress,
        duration: 0.65,
        ease: 'power3.out',
      });
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${targetProgress})`;
    }
  }, [activeStage, isDesktopPinned, reducedMotion]);

  const handleStageSelect = (index: number) => {
    if (isDesktopPinned && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetProgress = (index + 0.55) / STAGES.length;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      scrollTo(targetScroll, { offset: 0 });
    } else {
      setActiveStage(index);
    }
  };

  const currentStage = STAGES[activeStage];

  return (
    <section
      id="process"
      className="relative z-10 border-b border-[#C9C8BE] bg-[#F2F1E9]"
    >
      <SectionHeaderBar
        number={siteConfig.process.sectionNumber}
        label={siteConfig.process.sectionLabel}
        metaRight={isDesktopPinned ? 'SCROLL-PINNED SEQUENCE · 01—06' : 'INTERACTIVE SEQUENCE · 01—06'}
      />

      {/* Pinned Viewport Stage */}
      <div
        ref={pinContainerRef}
        className="relative min-h-[auto] lg:min-h-screen flex flex-col justify-between bg-[#F2F1E9] pt-14 lg:pt-16"
      >
        {/* Continuous top scroll progress bar */}
        <div className="h-[2px] w-full bg-[#C9C8BE]/60 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-[#F04427] will-change-transform"
            style={{ transform: 'scaleX(0.16)' }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 py-8 lg:py-10 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Ledger: 6-Stage Digital Process Index */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427]">
                  <RegistrationMark accent />
                  <span>Stage {currentStage.number} of 06</span>
                </div>

                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#252522]">
                  {currentStage.title}
                </h2>

                <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[#77776F]">
                  {currentStage.subtitle}
                </p>

                <p className="mt-4 text-[15px] leading-[1.65] text-[#252522]/85 min-h-[4.5rem]">
                  {currentStage.description}
                </p>
              </div>

              {/* Clickable 6-Stage Stepper */}
              <div
                role="tablist"
                aria-label="Digital creation process stages"
                className="mt-8 border-t border-[#C9C8BE] divide-y divide-[#C9C8BE]/70"
              >
                {STAGES.map((stage, idx) => {
                  const isActive = idx === activeStage;
                  const isPassed = idx < activeStage;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleStageSelect(idx)}
                      data-cursor="link"
                      className={`w-full py-2.5 px-2 flex items-center justify-between text-left transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#E8E7DE]/90 text-[#252522]'
                          : 'hover:bg-[#E8E7DE]/45 text-[#77776F]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[11px] tabular-nums ${
                            isActive
                              ? 'text-[#F04427] font-medium'
                              : isPassed
                                ? 'text-[#252522]'
                                : 'text-[#77776F]'
                          }`}
                        >
                          {stage.number}
                        </span>
                        <span
                          className={`font-display text-sm tracking-[0.04em] ${
                            isActive ? 'font-semibold text-[#252522]' : 'font-normal'
                          }`}
                        >
                          {stage.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 transition-colors ${
                          isActive
                            ? 'bg-[#F04427]'
                            : isPassed
                              ? 'bg-[#252522]'
                              : 'bg-[#C9C8BE]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Browser Canvas: 6-Layer Digital Experience Creation SVG */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative border border-[#C9C8BE] bg-[#E8E7DE]/45 p-3 sm:p-5 lg:p-6">
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F]">
                  <span>BROWSER CANVAS · FROM WIREFRAME TO EXPERIENCE</span>
                  <span className="text-[#252522] tabular-nums">{currentStage.coordinates}</span>
                </div>

                <div className="relative aspect-[16/10] w-full bg-[#F2F1E9] border border-[#C9C8BE] overflow-hidden">
                  <svg
                    ref={svgRef}
                    viewBox="0 0 960 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    role="img"
                    aria-label="Six-stage digital website creation evolving from a blank browser canvas through wireframe grid, design tokens, interactive states, responsive mobile build, to final live website"
                  >
                    <defs>
                      <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.025"
                          numOctaves="3"
                          seed="11"
                          result="noise"
                        />
                        <feDisplacementMap
                          in="SourceGraphic"
                          in2="noise"
                          scale="14"
                          xChannelSelector="R"
                          yChannelSelector="G"
                        />
                      </filter>
                      <mask id={maskId}>
                        <circle
                          className="p-exp-blot"
                          cx="610"
                          cy="272"
                          r="0"
                          fill="white"
                          filter={`url(#${filterId})`}
                        />
                      </mask>
                    </defs>

                    {/* ===== STAGE 01: CONCEPT (Blank Browser Canvas & Direction) ===== */}
                    <g className="p-stage-1">
                      <rect className="p-stage-1-line" x="48" y="42" width="760" height="492" rx="3" stroke="#252522" strokeWidth="1.35" />
                      <line className="p-stage-1-line" x1="48" y1="82" x2="808" y2="82" stroke="#252522" strokeWidth="1.1" />
                      <circle className="p-stage-1-line" cx="72" cy="62" r="4.5" stroke="#252522" strokeWidth="1.1" />
                      <circle className="p-stage-1-line" cx="90" cy="62" r="4.5" stroke="#252522" strokeWidth="1.1" />
                      <circle className="p-stage-1-line" cx="108" cy="62" r="4.5" stroke="#F04427" strokeWidth="1.2" />
                      <rect className="p-stage-1-line" x="236" y="52" width="320" height="20" rx="2" stroke="#C9C8BE" strokeWidth="1" />
                      <text className="p-stage-1-fade" x="314" y="65" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.08em">
                        https://amirmoradsaleh.com
                      </text>
                      {/* Initial visual direction focal center */}
                      <text className="p-stage-1-fade" x="428" y="290" textAnchor="middle" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="22" fontWeight="600">
                        01 · NEW DIGITAL CONCEPT
                      </text>
                      <text className="p-stage-1-fade" x="428" y="316" textAnchor="middle" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="0.12em">
                        BLANK BROWSER CANVAS · DEFINE NARRATIVE &amp; DIRECTION
                      </text>
                    </g>

                    {/* ===== STAGE 02: STRUCTURE (12-Col Website Grid, Nav & Layout Blocks) ===== */}
                    <g className="p-stage-2">
                      {/* Modular column guides inside browser */}
                      {[80, 174, 268, 362, 456, 550, 644, 776].map((x) => (
                        <line key={`col-${x}`} className="p-stage-2-line" x1={x} y1="82" x2={x} y2="534" stroke="#C9C8BE" strokeWidth="0.85" strokeDasharray="3 4" />
                      ))}
                      {/* Top website navigation bar */}
                      <line className="p-stage-2-line" x1="48" y1="130" x2="808" y2="130" stroke="#252522" strokeWidth="1.15" />
                      {/* Hero split vertical divider */}
                      <line className="p-stage-2-line" x1="432" y1="130" x2="432" y2="416" stroke="#252522" strokeWidth="1.1" />
                      {/* Bottom modular feature strip */}
                      <line className="p-stage-2-line" x1="48" y1="416" x2="808" y2="416" stroke="#252522" strokeWidth="1.15" />
                      <line className="p-stage-2-line" x1="302" y1="416" x2="302" y2="534" stroke="#C9C8BE" strokeWidth="1" />
                      <line className="p-stage-2-line" x1="556" y1="416" x2="556" y2="534" stroke="#C9C8BE" strokeWidth="1" />
                      {/* Media & content layout containers */}
                      <rect className="p-stage-2-line" x="458" y="154" width="322" height="238" stroke="#252522" strokeWidth="1.1" />
                      <rect className="p-stage-2-line" x="80" y="168" width="290" height="22" stroke="#77776F" strokeWidth="0.95" />
                      <rect className="p-stage-2-line" x="80" y="202" width="246" height="22" stroke="#77776F" strokeWidth="0.95" />
                      <rect className="p-stage-2-line" x="80" y="236" width="194" height="22" stroke="#77776F" strokeWidth="0.95" />
                    </g>

                    {/* ===== STAGE 03: DESIGN (Typography, Colors, Tokens & UI Components) ===== */}
                    <g className="p-stage-3">
                      <rect x="49" y="83" width="758" height="46" fill="#F2F1E9" />
                      <rect x="49" y="131" width="382" height="284" fill="#F2F1E9" />
                      <rect x="49" y="417" width="758" height="116" fill="#E8E7DE" fillOpacity="0.72" />

                      {/* Brand & Nav */}
                      <text className="p-stage-3-item" x="80" y="110" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.06em">
                        AURAL STUDIO
                      </text>
                      <text className="p-stage-3-item" x="488" y="109" fill="#252522" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        Work
                      </text>
                      <text className="p-stage-3-item" x="550" y="109" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        System
                      </text>
                      <text className="p-stage-3-item" x="620" y="109" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        About
                      </text>
                      <rect className="p-stage-3-item" x="698" y="94" width="82" height="24" fill="#252522" />
                      <text className="p-stage-3-item" x="716" y="110" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                        CONTACT
                      </text>

                      {/* Typography & Copy */}
                      <text className="p-stage-3-item" x="80" y="160" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.14em">
                        DIGITAL EXPERIENCE
                      </text>
                      <text className="p-stage-3-item" x="80" y="198" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="700">
                        INTERFACES
                      </text>
                      <text className="p-stage-3-item" x="80" y="232" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="700">
                        CRAFTED FOR
                      </text>
                      <text className="p-stage-3-item" x="80" y="266" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="700">
                        THE WEB.
                      </text>

                      <text className="p-stage-3-item" x="80" y="302" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12">
                        Expressive typography, modular UI grids,
                      </text>
                      <text className="p-stage-3-item" x="80" y="320" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12">
                        and responsive interactive storytelling.
                      </text>

                      {/* Primary & Secondary Buttons */}
                      <rect className="p-stage-3-item" x="80" y="352" width="154" height="38" fill="#F04427" />
                      <text className="p-stage-3-item" x="102" y="375" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.08em">
                        EXPLORE WORK →
                      </text>
                      <rect className="p-stage-3-item" x="246" y="352" width="112" height="38" stroke="#252522" strokeWidth="1.15" fill="none" />
                      <text className="p-stage-3-item" x="268" y="375" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.08em">
                        SYSTEM UI
                      </text>

                      {/* Lower 3 UI Token & Feature Modules */}
                      <text className="p-stage-3-item" x="80" y="454" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                        01 · DESIGN TOKENS
                      </text>
                      <circle className="p-stage-3-item" cx="90" cy="482" r="8" fill="#252522" />
                      <circle className="p-stage-3-item" cx="112" cy="482" r="8" fill="#F04427" />
                      <circle className="p-stage-3-item" cx="134" cy="482" r="8" fill="#F2F1E9" stroke="#252522" strokeWidth="1" />
                      <text className="p-stage-3-item" x="154" y="486" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="10">
                        #F04427
                      </text>

                      <text className="p-stage-3-item" x="328" y="454" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                        02 · TYPE SYSTEM
                      </text>
                      <text className="p-stage-3-item" x="328" y="486" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="16" fontWeight="600">
                        Bricolage + Mono
                      </text>

                      <text className="p-stage-3-item" x="582" y="454" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                        03 · INTERACTION
                      </text>
                      <text className="p-stage-3-item" x="582" y="486" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="16" fontWeight="600">
                        Scroll Choreography
                      </text>
                    </g>

                    {/* ===== STAGE 04: INTERACTION (Active States, Cursor & Hover Paths) ===== */}
                    <g className="p-stage-4">
                      {/* Active nav indicator underline */}
                      <line className="p-stage-4-line" x1="488" y1="116" x2="520" y2="116" stroke="#F04427" strokeWidth="2.2" />
                      {/* Interactive vector path connecting button to preview */}
                      <path
                        className="p-stage-4-line"
                        d="M 234 371 C 340 371, 386 272, 488 272"
                        stroke="#F04427"
                        strokeWidth="1.5"
                        strokeDasharray="5 4"
                      />
                      {/* Active focus ring around primary CTA */}
                      <rect className="p-stage-4-line" x="75" y="347" width="164" height="48" stroke="#F04427" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Animated interactive pointer cursor */}
                      <g className="p-cursor-node">
                        <circle cx="488" cy="272" r="22" stroke="#F04427" strokeWidth="1.15" fill="#F04427" fillOpacity="0.1" />
                        <polygon
                          points="484,264 484,286 491,280 498,290 502,288 495,277 503,277"
                          fill="#F04427"
                        />
                        <rect x="514" y="256" width="96" height="22" fill="#252522" />
                        <text x="524" y="270" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="0.08em">
                          HOVER · ACTIVE
                        </text>
                      </g>
                    </g>

                    {/* ===== STAGE 05: DEVELOPMENT (Responsive Mobile Viewport & Code Sync) ===== */}
                    <g className="p-stage-5">
                      <g className="p-mobile-preview">
                        {/* Overlapping sleek mobile viewport demonstrating responsive code */}
                        <rect x="742" y="232" width="174" height="328" rx="14" fill="#F2F1E9" stroke="#252522" strokeWidth="1.8" />
                        <line x1="742" y1="264" x2="916" y2="264" stroke="#C9C8BE" strokeWidth="1" />
                        <rect x="808" y="246" width="42" height="5" rx="2.5" fill="#C9C8BE" />

                        <text className="p-stage-5-item" x="758" y="286" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="10" fontWeight="700">
                          AURAL STUDIO
                        </text>
                        <text className="p-stage-5-item" x="758" y="316" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="17" fontWeight="700">
                          INTERFACES
                        </text>
                        <text className="p-stage-5-item" x="758" y="335" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="17" fontWeight="700">
                          FOR THE WEB.
                        </text>

                        <rect className="p-stage-5-item" x="758" y="352" width="142" height="114" fill="#E8E7DE" stroke="#252522" strokeWidth="1" />
                        <image
                          href={portfolioAssets.workBrandExperienceUi}
                          x="758"
                          y="352"
                          width="142"
                          height="114"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        <rect className="p-stage-5-item" x="758" y="480" width="142" height="30" fill="#F04427" />
                        <text className="p-stage-5-item" x="786" y="499" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="9">
                          EXPLORE →
                        </text>
                        <text className="p-stage-5-item" x="758" y="536" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
                          390PX · SYNCED
                        </text>
                      </g>
                    </g>

                    {/* ===== STAGE 06: EXPERIENCE (Organic Ink-Masked Live Website Reveal) ===== */}
                    <g className="p-stage-6">
                      <g mask={`url(#${maskId})`}>
                        <image
                          href={portfolioAssets.workBrandExperienceUi}
                          x="458"
                          y="154"
                          width="322"
                          height="238"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        <rect x="458" y="154" width="322" height="238" stroke="#252522" strokeWidth="1.2" />
                        <rect x="472" y="352" width="154" height="26" fill="#F2F1E9" fillOpacity="0.94" />
                        <text x="482" y="369" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.08em">
                          LIVE WEBSITE · READY
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Bottom progress hint */}
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-[#77776F]">
                  <span>
                    {isDesktopPinned
                      ? 'KEEP SCROLLING TO BUILD THE INTERFACE — SCROLL UP TO REVERSE'
                      : 'SELECT ANY STAGE ABOVE TO INSPECT THE INTERFACE TRANSFORMATION'}
                  </span>
                  <span className="tabular-nums text-[#252522]">
                    {currentStage.number} / 06
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
