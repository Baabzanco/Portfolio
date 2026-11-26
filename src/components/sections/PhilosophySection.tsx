import React, { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../data/siteConfig';
import { portfolioAssets } from '../../data/assets';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { TextReveal } from '../animations/TextReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const maskId = `phil-ui-mask-${uid}`;
  const filterId = `phil-ui-filter-${uid}`;

  const sectionRef = useRef<HTMLElement | null>(null);
  const layoutGridRef = useRef<SVGGElement | null>(null);
  const styledUiRef = useRef<SVGGElement | null>(null);
  const tokensLayerRef = useRef<SVGGElement | null>(null);
  const inkBlotRef = useRef<SVGCircleElement | null>(null);
  const wireframeRef = useRef<SVGGElement | null>(null);

  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const wirePaths = section.querySelectorAll<SVGGeometryElement>('.phil-ui-wire');
      wirePaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 260;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          end: 'bottom 58%',
          scrub: 0.75,
        },
      });

      // Stage 1: Minimal grayscale website wireframe draws in
      tl.to(
        wirePaths,
        {
          strokeDashoffset: 0,
          stagger: 0.035,
          duration: 1.05,
          ease: 'none',
        },
        0
      );

      // Stage 2: Modular layout guides & design tokens slide in
      if (layoutGridRef.current) {
        tl.fromTo(
          layoutGridRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.65, ease: 'none' },
          0.45
        );
      }

      if (tokensLayerRef.current) {
        tl.fromTo(
          tokensLayerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'none' },
          0.7
        );
      }

      // Stage 3: Typography, styled UI components & vermilion primary CTA appear
      if (styledUiRef.current) {
        tl.fromTo(
          styledUiRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'none' },
          0.95
        );
      }

      // Stage 4: Organic ink-mask blooms the live editorial media card inside the UI
      if (inkBlotRef.current) {
        tl.fromTo(
          inkBlotRef.current,
          { attr: { r: 0 } },
          { attr: { r: 190 }, duration: 1.0, ease: 'none' },
          1.25
        );
      }

      if (wireframeRef.current) {
        tl.to(wireframeRef.current, { opacity: 0.35, duration: 0.7, ease: 'none' }, 1.35);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative z-10 border-b border-[#C9C8BE]"
    >
      <SectionHeaderBar
        number={siteConfig.philosophy.sectionNumber}
        label={siteConfig.philosophy.sectionLabel}
        metaRight="WIREFRAME TO INTERFACE"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 items-stretch">
          {/* Left Side: Scroll-Scrubbed Grayscale Wireframe -> Styled Digital Interface */}
          <div className="col-span-12 lg:col-span-7 py-12 lg:py-20 lg:pr-12 lg:border-r lg:border-[#C9C8BE] flex flex-col justify-between">
            <div className="relative border border-[#C9C8BE] bg-[#E8E7DE]/55 p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F] mb-4">
                <span>UI 02 · WIREFRAME → DESIGN SYSTEM → INTERFACE</span>
                <span>SCROLL SCRUBBED</span>
              </div>

              <svg
                viewBox="0 0 580 410"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                role="img"
                aria-label="Scroll-driven transformation from a grayscale website wireframe into a fully styled digital interface with typography, tokens, and media"
              >
                <defs>
                  <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.03"
                      numOctaves="3"
                      seed="9"
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
                      ref={inkBlotRef}
                      cx="415"
                      cy="205"
                      r={reducedMotion ? 190 : 0}
                      fill="white"
                      filter={reducedMotion ? undefined : `url(#${filterId})`}
                    />
                  </mask>
                </defs>

                {/* Base canvas backdrop */}
                <rect x="16" y="16" width="548" height="378" fill="#F2F1E9" stroke="#C9C8BE" strokeWidth="1" />

                {/* Layout column overlay (revealed in Stage 2) */}
                <g ref={layoutGridRef} opacity={reducedMotion ? 1 : 0}>
                  {[40, 128, 216, 304, 392, 480].map((x) => (
                    <rect key={x} x={x} y="64" width="64" height="304" fill="#F04427" fillOpacity="0.035" />
                  ))}
                </g>

                {/* Minimal Grayscale Website Wireframe (Stage 1) */}
                <g ref={wireframeRef} stroke="#252522" strokeWidth="1.15">
                  {/* Browser top bar */}
                  <line className="phil-ui-wire" x1="16" y1="54" x2="564" y2="54" />
                  <circle className="phil-ui-wire" cx="36" cy="35" r="4" />
                  <circle className="phil-ui-wire" cx="52" cy="35" r="4" />
                  <circle className="phil-ui-wire" cx="68" cy="35" r="4" />
                  <rect className="phil-ui-wire" x="172" y="26" width="236" height="18" stroke="#77776F" />

                  {/* Navigation header wireframe */}
                  <line className="phil-ui-wire" x1="16" y1="92" x2="564" y2="92" stroke="#C9C8BE" />
                  <rect className="phil-ui-wire" x="40" y="68" width="90" height="12" stroke="#77776F" />
                  <line className="phil-ui-wire" x1="330" y1="74" x2="372" y2="74" stroke="#77776F" />
                  <line className="phil-ui-wire" x1="392" y1="74" x2="434" y2="74" stroke="#77776F" />
                  <rect className="phil-ui-wire" x="466" y="64" width="74" height="20" stroke="#77776F" />

                  {/* Left hero text skeleton */}
                  <rect className="phil-ui-wire" x="40" y="124" width="218" height="22" stroke="#77776F" />
                  <rect className="phil-ui-wire" x="40" y="156" width="186" height="22" stroke="#77776F" />
                  <line className="phil-ui-wire" x1="40" y1="202" x2="244" y2="202" stroke="#77776F" />
                  <line className="phil-ui-wire" x1="40" y1="218" x2="212" y2="218" stroke="#77776F" />
                  <rect className="phil-ui-wire" x="40" y="246" width="118" height="32" stroke="#77776F" />

                  {/* Right media container wireframe */}
                  <rect className="phil-ui-wire" x="292" y="114" width="248" height="182" stroke="#77776F" />
                  <line className="phil-ui-wire" x1="292" y1="114" x2="540" y2="296" stroke="#C9C8BE" strokeWidth="0.8" />
                  <line className="phil-ui-wire" x1="540" y1="114" x2="292" y2="296" stroke="#C9C8BE" strokeWidth="0.8" />

                  {/* Bottom token & component bar */}
                  <line className="phil-ui-wire" x1="16" y1="316" x2="564" y2="316" stroke="#C9C8BE" />
                </g>

                {/* Styled Digital Interface Layer (Stage 3) */}
                <g ref={styledUiRef} opacity={reducedMotion ? 1 : 0}>
                  {/* Refined header & active nav */}
                  <rect x="17" y="55" width="546" height="36" fill="#F2F1E9" />
                  <text x="40" y="77" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="0.06em">
                    STUDIO.UI
                  </text>
                  <text x="330" y="77" fill="#252522" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
                    Work
                  </text>
                  <text x="392" y="77" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
                    System
                  </text>
                  <rect x="466" y="63" width="74" height="20" fill="#252522" />
                  <text x="480" y="76" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
                    START ↗
                  </text>

                  {/* Left expressive typography & CTA */}
                  <rect x="34" y="110" width="242" height="184" fill="#F2F1E9" />
                  <text x="40" y="122" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="0.14em">
                    BESPOKE INTERFACE
                  </text>
                  <text x="40" y="150" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="24" fontWeight="700">
                    CLARITY IN
                  </text>
                  <text x="40" y="177" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="24" fontWeight="700">
                    EVERY PIXEL.
                  </text>
                  <text x="40" y="206" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5">
                    Custom visual systems shaped around
                  </text>
                  <text x="40" y="222" fill="#77776F" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10.5">
                    real users and interactive stories.
                  </text>

                  <rect x="40" y="246" width="122" height="32" fill="#F04427" />
                  <text x="54" y="266" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.08em">
                    EXPLORE UI →
                  </text>
                  <rect x="172" y="246" width="84" height="32" stroke="#252522" strokeWidth="1" fill="none" />
                  <text x="192" y="266" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                    TOKENS
                  </text>
                </g>

                {/* Organic Ink-Masked Finished Website Image inside Right Media Card (Stage 4) */}
                <g mask={`url(#${maskId})`}>
                  <image
                    href={portfolioAssets.workDigitalCommerceUi}
                    x="292"
                    y="114"
                    width="248"
                    height="182"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <rect x="292" y="114" width="248" height="182" stroke="#252522" strokeWidth="1.2" />
                </g>

                {/* Bottom Live Design Token Strip */}
                <g ref={tokensLayerRef} opacity={reducedMotion ? 1 : 0}>
                  <rect x="40" y="332" width="142" height="44" fill="#E8E7DE" stroke="#C9C8BE" strokeWidth="0.9" />
                  <circle cx="62" cy="354" r="9" fill="#252522" />
                  <circle cx="84" cy="354" r="9" fill="#F04427" />
                  <circle cx="106" cy="354" r="9" fill="#F2F1E9" stroke="#252522" strokeWidth="0.9" />
                  <text x="124" y="357" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="8">
                    TOKENS
                  </text>

                  <rect x="196" y="332" width="166" height="44" fill="#E8E7DE" stroke="#C9C8BE" strokeWidth="0.9" />
                  <text x="210" y="350" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8">
                    TYPOGRAPHY SCALE
                  </text>
                  <text x="210" y="366" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="11.5" fontWeight="600">
                    Grotesk · 1.414 Ratio
                  </text>

                  <rect x="376" y="332" width="164" height="44" fill="#252522" />
                  <text x="392" y="350" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="8">
                    INTERFACE STATE
                  </text>
                  <text x="392" y="366" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
                    INTERACTIVE · LIVE
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Side: Oversized Editorial Typography + Design Principles */}
          <div className="col-span-12 lg:col-span-5 py-12 lg:py-20 lg:pl-12 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-5">
                Design Perspective
              </p>

              <TextReveal
                as="h2"
                text={siteConfig.philosophy.headline}
                highlightWords={['TEMPLATES.']}
                className="font-display text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#252522]"
              />

              <p className="mt-7 text-[15px] sm:text-base leading-[1.7] text-[#77776F]">
                {siteConfig.philosophy.supportingCopy}
              </p>

              <p className="mt-5 text-[15px] leading-[1.7] text-[#252522]">
                {siteConfig.brand.primaryStatement}
              </p>
            </div>

            {/* Structured digital design principles */}
            <div className="mt-12 border-t border-[#C9C8BE] divide-y divide-[#C9C8BE]">
              {siteConfig.philosophy.annotations.map((item) => (
                <div
                  key={item.label}
                  className="py-4 flex items-start justify-between gap-4"
                >
                  <div className="flex items-center gap-2.5 shrink-0">
                    <RegistrationMark />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#77776F]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-right text-sm text-[#252522] leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
