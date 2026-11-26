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
  const maskId = `process-exp-mask-${uid}`;
  const filterId = `process-exp-filter-${uid}`;

  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [isDesktopPinned, setIsDesktopPinned] = useState(false);

  const { scrollTo, reducedMotion } = useSmoothScroll();

  // Build master timeline for the 6 stages (reused both for desktop scroll-scrub & mobile interactive stepping)
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
    const s3Lines = prepareStroke('.p-stage-3-line');
    const s4Lines = prepareStroke('.p-stage-4-line');

    const s1Group = svg.querySelector('.p-stage-1');
    const s2Group = svg.querySelector('.p-stage-2');
    const s3Group = svg.querySelector('.p-stage-3');
    const s4Group = svg.querySelector('.p-stage-4');
    const s5Group = svg.querySelector('.p-stage-5');
    const s6Group = svg.querySelector('.p-stage-6');
    const expBlot = svg.querySelector('.p-exp-blot');
    const cursorNode = svg.querySelector('.p-cursor-node');

    gsap.set([s2Group, s3Group, s4Group, s5Group, s6Group], { opacity: 0 });
    gsap.set(s1Group, { opacity: 1 });
    if (expBlot) gsap.set(expBlot, { attr: { r: 0 } });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

    // STAGE 01 — STRUCTURE (0.0 -> 1.0)
    tl.to(s1Lines, { strokeDashoffset: 0, stagger: 0.025, duration: 0.9 }, 0);

    // STAGE 02 — FOUNDATION (1.0 -> 2.0)
    tl.to(s2Group, { opacity: 1, duration: 0.15 }, 1.0);
    tl.to(s2Lines, { strokeDashoffset: 0, stagger: 0.04, duration: 0.85 }, 1.05);

    // STAGE 03 — COMPOSITION (2.0 -> 3.0)
    tl.to(s3Group, { opacity: 1, duration: 0.18 }, 2.0);
    tl.to(s3Lines, { strokeDashoffset: 0, stagger: 0.035, duration: 0.78 }, 2.06);
    tl.fromTo(
      svg.querySelectorAll('.p-stage-3-block'),
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, stagger: 0.05, duration: 0.65 },
      2.18
    );

    // STAGE 04 — INTERACTION (3.0 -> 4.0)
    tl.to(s4Group, { opacity: 1, duration: 0.15 }, 3.0);
    tl.to(s4Lines, { strokeDashoffset: 0, stagger: 0.05, duration: 0.75 }, 3.06);
    if (cursorNode) {
      tl.fromTo(
        cursorNode,
        { x: -160, y: 70, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.78, ease: 'power1.inOut' },
        3.15
      );
    }

    // STAGE 05 — REFINEMENT (4.0 -> 5.0)
    tl.to(s5Group, { opacity: 1, duration: 0.75 }, 4.05);
    tl.fromTo(
      svg.querySelectorAll('.p-stage-5-item'),
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.75 },
      4.12
    );

    // STAGE 06 — EXPERIENCE (5.0 -> 6.0)
    tl.to(s6Group, { opacity: 1, duration: 0.2 }, 5.0);
    if (expBlot) {
      tl.to(expBlot, { attr: { r: 340 }, duration: 0.9, ease: 'power2.out' }, 5.05);
    }
    // Blueprint guides gently recede into finished architectural precision
    tl.to(s1Group, { opacity: 0.24, duration: 0.75 }, 5.15);
    tl.to(s4Group, { opacity: 0.42, duration: 0.75 }, 5.2);

    return tl;
  };

  // Desktop scroll-pinned scrubbed choreography vs Mobile/Reduced-Motion interactive stepper
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
          // Mobile / Reduced-Motion: clean interactive stage progression without locking touch scroll
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

  // Animate mobile / reduced-motion stage transitions cleanly when user taps a stage
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
        {/* Continuous top architectural progress ruler */}
        <div className="h-[2px] w-full bg-[#C9C8BE]/60 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-[#F04427] will-change-transform"
            style={{ transform: 'scaleX(0.16)' }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 py-8 lg:py-10 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Ledger: 6-Stage Narrative Index */}
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

              {/* Clickable 6-Stage Architectural Stepper */}
              <div
                role="tablist"
                aria-label="Design process stages"
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

            {/* Right Blueprint Canvas: 6-Layer Progressive Architectural-to-Experience SVG */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative border border-[#C9C8BE] bg-[#E8E7DE]/45 p-3 sm:p-5 lg:p-6">
                {/* Top technical bar */}
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F]">
                  <span>BLUEPRINT CANVAS · FROM STRUCTURE TO EXPERIENCE</span>
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
                    aria-label="Six-stage architectural diagram evolving from empty grid to finished interactive web interface"
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
                          cx="645"
                          cy="285"
                          r="0"
                          fill="white"
                          filter={`url(#${filterId})`}
                        />
                      </mask>
                    </defs>

                    {/* ===== STAGE 01: STRUCTURE (Grid, Construction Axes, Diagonals) ===== */}
                    <g className="p-stage-1" stroke="#C9C8BE" strokeWidth="1">
                      {/* Vertical Swiss 8-col grid */}
                      {[80, 190, 300, 410, 520, 630, 740, 880].map((x) => (
                        <line key={`v-${x}`} className="p-stage-1-line" x1={x} y1="24" x2={x} y2="576" />
                      ))}
                      {/* Horizontal construction lines */}
                      {[60, 140, 260, 390, 480, 540].map((y) => (
                        <line key={`h-${y}`} className="p-stage-1-line" x1="36" y1={y} x2="924" y2={y} />
                      ))}
                      {/* Perspective architectural diagonals */}
                      <line className="p-stage-1-line" x1="80" y1="60" x2="880" y2="540" strokeDasharray="4 5" />
                      <line className="p-stage-1-line" x1="880" y1="60" x2="80" y2="540" strokeDasharray="4 5" />
                      <circle className="p-stage-1-line" cx="480" cy="300" r="195" strokeDasharray="3 5" />
                    </g>

                    {/* ===== STAGE 02: FOUNDATION (Primary Volumes & Spatial Boundaries) ===== */}
                    <g className="p-stage-2" stroke="#252522" strokeWidth="1.4">
                      {/* Viewport shell */}
                      <rect className="p-stage-2-line" x="80" y="60" width="800" height="480" />
                      {/* Top navigation rail */}
                      <line className="p-stage-2-line" x1="80" y1="112" x2="880" y2="112" />
                      {/* Asymmetric split divider */}
                      <line className="p-stage-2-line" x1="465" y1="112" x2="465" y2="430" />
                      {/* Lower modular strip divider */}
                      <line className="p-stage-2-line" x1="80" y1="430" x2="880" y2="430" />
                      <line className="p-stage-2-line" x1="346" y1="430" x2="346" y2="540" />
                      <line className="p-stage-2-line" x1="613" y1="430" x2="613" y2="540" />
                    </g>

                    {/* ===== STAGE 03: COMPOSITION (Layout Proportions & Editorial Framing) ===== */}
                    <g className="p-stage-3">
                      {/* Editorial headline proportion bars */}
                      <rect className="p-stage-3-block" x="112" y="160" width="290" height="24" fill="#252522" fillOpacity="0.14" stroke="#252522" strokeWidth="1" />
                      <rect className="p-stage-3-block" x="112" y="196" width="246" height="24" fill="#252522" fillOpacity="0.14" stroke="#252522" strokeWidth="1" />
                      <rect className="p-stage-3-block" x="112" y="232" width="198" height="24" fill="#252522" fillOpacity="0.14" stroke="#252522" strokeWidth="1" />
                      {/* Body measure frame */}
                      <line className="p-stage-3-line" x1="112" y1="286" x2="375" y2="286" stroke="#77776F" strokeWidth="1.2" />
                      <line className="p-stage-3-line" x1="112" y1="304" x2="348" y2="304" stroke="#77776F" strokeWidth="1.2" />
                      <line className="p-stage-3-line" x1="112" y1="322" x2="296" y2="322" stroke="#77776F" strokeWidth="1.2" />
                      {/* Right media showcase architectural frame */}
                      <rect className="p-stage-3-line" x="498" y="142" width="350" height="256" stroke="#252522" strokeWidth="1.2" />
                      <line className="p-stage-3-line" x1="498" y1="142" x2="848" y2="398" stroke="#C9C8BE" strokeWidth="0.9" />
                      <line className="p-stage-3-line" x1="848" y1="142" x2="498" y2="398" stroke="#C9C8BE" strokeWidth="0.9" />
                    </g>

                    {/* ===== STAGE 04: INTERACTION (UI States, Vectors & Vermilion Anchors) ===== */}
                    <g className="p-stage-4">
                      {/* Primary CTA button geometry */}
                      <rect className="p-stage-4-line" x="112" y="358" width="156" height="38" stroke="#F04427" strokeWidth="1.6" />
                      <rect className="p-stage-4-line" x="282" y="358" width="112" height="38" stroke="#252522" strokeWidth="1.2" />
                      {/* Connection vector curve from CTA to media frame */}
                      <path
                        className="p-stage-4-line"
                        d="M 268 377 C 370 377, 420 270, 520 270"
                        stroke="#F04427"
                        strokeWidth="1.35"
                        strokeDasharray="5 4"
                      />
                      {/* Nav hover underline vectors */}
                      <line className="p-stage-4-line" x1="560" y1="96" x2="604" y2="96" stroke="#F04427" strokeWidth="2" />
                      <line className="p-stage-4-line" x1="634" y1="96" x2="678" y2="96" stroke="#252522" strokeWidth="1" />
                      <line className="p-stage-4-line" x1="708" y1="96" x2="752" y2="96" stroke="#252522" strokeWidth="1" />
                      {/* Moving interactive cursor indicator */}
                      <g className="p-cursor-node">
                        <circle cx="520" cy="270" r="18" stroke="#F04427" strokeWidth="1.1" fill="#F04427" fillOpacity="0.1" />
                        <rect x="516" y="266" width="8" height="8" fill="#F04427" />
                      </g>
                    </g>

                    {/* ===== STAGE 05: REFINEMENT (Typography, Contrast, Surface Polish) ===== */}
                    <g className="p-stage-5">
                      {/* Solid surface framing */}
                      <rect x="81" y="61" width="798" height="50" fill="#F2F1E9" />
                      <rect x="81" y="113" width="383" height="316" fill="#F2F1E9" />
                      <rect x="81" y="431" width="798" height="108" fill="#E8E7DE" fillOpacity="0.72" />

                      {/* Refined wordmark & navigation */}
                      <text className="p-stage-5-item" x="112" y="91" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.08em">
                        AMIR MORADSALEH
                      </text>
                      <text className="p-stage-5-item" x="560" y="90" fill="#252522" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        Work
                      </text>
                      <text className="p-stage-5-item" x="634" y="90" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        Process
                      </text>
                      <text className="p-stage-5-item" x="708" y="90" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
                        About
                      </text>
                      <rect className="p-stage-5-item" x="780" y="75" width="72" height="24" fill="#252522" />
                      <text className="p-stage-5-item" x="795" y="90" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                        INQUIRE
                      </text>

                      {/* Refined editorial headline & copy */}
                      <text className="p-stage-5-item" x="112" y="142" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.14em">
                        DIGITAL ARCHITECTURE
                      </text>
                      <text className="p-stage-5-item" x="112" y="182" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="600">
                        SYSTEMS BUILT
                      </text>
                      <text className="p-stage-5-item" x="112" y="216" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="600">
                        FOR CLARITY
                      </text>
                      <text className="p-stage-5-item" x="112" y="250" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="29" fontWeight="600">
                        AND MOTION.
                      </text>

                      <text className="p-stage-5-item" x="112" y="290" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12">
                        Turning complex architecture into
                      </text>
                      <text className="p-stage-5-item" x="112" y="308" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12">
                        intuitive, lasting web experiences.
                      </text>

                      {/* Refined CTA buttons */}
                      <rect className="p-stage-5-item" x="112" y="358" width="156" height="38" fill="#F04427" />
                      <text className="p-stage-5-item" x="132" y="381" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.1em">
                        VIEW SELECTED WORK
                      </text>
                      <rect className="p-stage-5-item" x="282" y="358" width="112" height="38" fill="none" stroke="#252522" strokeWidth="1.2" />
                      <text className="p-stage-5-item" x="307" y="381" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.1em">
                        PROCESS
                      </text>

                      {/* Lower 3 architectural capability cells */}
                      <text className="p-stage-5-item" x="112" y="468" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="10">01 · DIRECTION</text>
                      <text className="p-stage-5-item" x="112" y="494" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="15" fontWeight="600">Visual Systems</text>

                      <text className="p-stage-5-item" x="374" y="468" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="10">02 · MOTION</text>
                      <text className="p-stage-5-item" x="374" y="494" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="15" fontWeight="600">Scroll Choreography</text>

                      <text className="p-stage-5-item" x="640" y="468" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="10">03 · CRAFT</text>
                      <text className="p-stage-5-item" x="640" y="494" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="15" fontWeight="600">Frontend Engineering</text>
                    </g>

                    {/* ===== STAGE 06: EXPERIENCE (Organic Ink-Masked Live Visual Composition) ===== */}
                    <g className="p-stage-6">
                      <g mask={`url(#${maskId})`}>
                        <image
                          href={portfolioAssets.workBrandExperience}
                          x="498"
                          y="142"
                          width="350"
                          height="256"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        {/* Clean minimal overlay frame on revealed experience */}
                        <rect x="498" y="142" width="350" height="256" stroke="#252522" strokeWidth="1.2" />
                        <rect x="514" y="356" width="166" height="26" fill="#F2F1E9" fillOpacity="0.92" />
                        <text x="524" y="373" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.08em">
                          EXPERIENCE · LIVE VIEW
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Bottom stage progress hint */}
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-[#77776F]">
                  <span>
                    {isDesktopPinned
                      ? 'KEEP SCROLLING TO TRANSFORM BLUEPRINT — SCROLL UP TO REVERSE'
                      : 'SELECT ANY STAGE ABOVE TO INSPECT THE TRANSFORMATION'}
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
