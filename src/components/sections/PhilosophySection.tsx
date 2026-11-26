import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../data/siteConfig';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { TextReveal } from '../animations/TextReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const solidPlanesRef = useRef<SVGGElement | null>(null);
  const shadowPlanesRef = useRef<SVGGElement | null>(null);
  const wireLayerRef = useRef<SVGGElement | null>(null);

  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const wirePaths = section.querySelectorAll<SVGGeometryElement>('.phil-wire');
      wirePaths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 240;
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

      // Phase 1: Wireframe lines draw into precision architectural elevation
      tl.to(
        wirePaths,
        {
          strokeDashoffset: 0,
          stagger: 0.04,
          duration: 1.2,
          ease: 'none',
        },
        0
      );

      // Phase 2: Vermilion architectural geometric marker expands smoothly
      if (circleRef.current) {
        tl.fromTo(
          circleRef.current,
          { scale: 0.35, opacity: 0.25, transformOrigin: '360px 210px' },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'none' },
          0.35
        );
      }

      // Phase 3: Sketch-to-solid transformation reveals architectural concrete & shadow planes
      if (solidPlanesRef.current) {
        tl.fromTo(
          solidPlanesRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1, ease: 'none' },
          0.75
        );
      }

      if (shadowPlanesRef.current) {
        tl.fromTo(
          shadowPlanesRef.current,
          { opacity: 0, scaleX: 0.6, transformOrigin: 'left center' },
          { opacity: 1, scaleX: 1, duration: 0.9, ease: 'none' },
          0.95
        );
      }

      if (wireLayerRef.current) {
        tl.to(wireLayerRef.current, { opacity: 0.48, duration: 0.8, ease: 'none' }, 1.1);
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
        metaRight="SYSTEM BEFORE SURFACE"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 items-stretch">
          {/* Left Side: Scroll-Scrubbed Sketch-to-Solid Architectural Visual + Vermilion Circle */}
          <div className="col-span-12 lg:col-span-7 py-12 lg:py-20 lg:pr-12 lg:border-r lg:border-[#C9C8BE] flex flex-col justify-between">
            <div className="relative border border-[#C9C8BE] bg-[#E8E7DE]/55 p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F] mb-4">
                <span>FIG 02 · SKETCH-TO-SOLID EVOLUTION</span>
                <span>SCROLL DRIVEN</span>
              </div>

              <svg
                viewBox="0 0 540 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                role="img"
                aria-label="Architectural elevation transforming from drafting wireframe into solid geometric forms with a vermilion focal circle"
              >
                {/* Drafting grid backdrop */}
                <g stroke="#C9C8BE" strokeWidth="0.8">
                  <line x1="20" y1="60" x2="520" y2="60" />
                  <line x1="20" y1="160" x2="520" y2="160" />
                  <line x1="20" y1="260" x2="520" y2="260" />
                  <line x1="20" y1="340" x2="520" y2="340" />
                  <line x1="110" y1="20" x2="110" y2="380" />
                  <line x1="270" y1="20" x2="270" y2="380" strokeDasharray="3 4" />
                  <line x1="430" y1="20" x2="430" y2="380" />
                </g>

                {/* Oversized vermilion geometric circle marker */}
                <circle
                  ref={circleRef}
                  cx="360"
                  cy="210"
                  r="102"
                  fill="#F04427"
                />

                {/* Solid rendered architectural volumes (revealed on scroll) */}
                <g ref={solidPlanesRef}>
                  <polygon points="88,340 88,118 238,88 238,340" fill="#252522" />
                  <polygon points="238,88 338,130 338,340 238,340" fill="#E8E7DE" stroke="#252522" strokeWidth="1.2" />
                  <rect x="122" y="168" width="84" height="172" fill="#F2F1E9" />
                  <rect x="266" y="218" width="46" height="122" fill="#252522" />
                </g>

                {/* Geometric daylight cast shadow */}
                <g ref={shadowPlanesRef}>
                  <polygon points="338,340 492,340 444,274 338,274" fill="#252522" fillOpacity="0.14" />
                </g>

                {/* Technical wireframe overlay (drawn first on scroll) */}
                <g ref={wireLayerRef} stroke="#252522" strokeWidth="1.25">
                  <polygon className="phil-wire" points="88,340 88,118 238,88 238,340" />
                  <polygon className="phil-wire" points="238,88 338,130 338,340 238,340" />
                  <rect className="phil-wire" x="122" y="168" width="84" height="172" />
                  <rect className="phil-wire" x="266" y="218" width="46" height="122" />
                  <line className="phil-wire" x1="56" y1="340" x2="504" y2="340" />
                  <line className="phil-wire" x1="88" y1="118" x2="462" y2="118" strokeDasharray="4 4" />
                  <circle className="phil-wire" cx="360" cy="210" r="118" strokeDasharray="3 5" />
                </g>

                {/* Technical annotations */}
                <g fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.1em">
                  <text x="88" y="76">ELEVATION 01 · STRUCTURE</text>
                  <text x="352" y="362">SECTION AXIS B</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Side: Oversized Editorial Typography + System Principles */}
          <div className="col-span-12 lg:col-span-5 py-12 lg:py-20 lg:pl-12 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-5">
                Architectural Thesis
              </p>

              <TextReveal
                as="h2"
                text={siteConfig.philosophy.headline}
                className="font-display text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#252522]"
              />

              <p className="mt-7 text-[15px] sm:text-base leading-[1.7] text-[#77776F]">
                {siteConfig.philosophy.supportingCopy}
              </p>

              <p className="mt-5 text-[15px] leading-[1.7] text-[#252522]">
                {siteConfig.brand.primaryStatement}
              </p>
            </div>

            {/* Structured architectural annotations */}
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
