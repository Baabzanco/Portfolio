import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { TextReveal } from '../animations/TextReveal';
import { HeroBrowserWireframe } from '../graphics/DigitalInterfaceGraphics';
import { RegistrationMark } from '../layout/GridSystem';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualFrameRef = useRef<HTMLDivElement | null>(null);
  const wireframeLayerRef = useRef<HTMLDivElement | null>(null);
  const renderLayerRef = useRef<HTMLDivElement | null>(null);
  const headlineShiftRef = useRef<HTMLDivElement | null>(null);
  const metaRailRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  const [renderImgError, setRenderImgError] = useState(false);
  const { scrollTo, reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Progressive drawing sequence:
      // Browser frames -> nav lines -> layout grid -> type & button wireframes -> interactive cursor marker
      const drawLines = section.querySelectorAll<SVGGeometryElement>('.hero-draw-line');
      drawLines.forEach((line) => {
        const length = line.getTotalLength ? line.getTotalLength() : 280;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (metaRailRef.current) {
        introTl.fromTo(
          metaRailRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.08
        );
      }

      if (drawLines.length) {
        introTl.to(
          drawLines,
          {
            strokeDashoffset: 0,
            duration: 1.45,
            stagger: 0.028,
            ease: 'power2.inOut',
          },
          0.16
        );
      }

      const annotations = section.querySelectorAll('.hero-annotation');
      if (annotations.length) {
        introTl.fromTo(
          annotations,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.08 },
          0.95
        );
      }

      const marker = section.querySelector('.hero-marker');
      if (marker) {
        introTl.fromTo(
          marker,
          { opacity: 0, scale: 0.55, transformOrigin: '234px 370px' },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
          1.12
        );
      }

      if (ctaGroupRef.current) {
        introTl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.72
        );
      }

      // Subtle preview of the finished digital interface behind the wireframe on load
      if (renderLayerRef.current) {
        introTl.fromTo(
          renderLayerRef.current,
          { opacity: 0.12, clipPath: 'inset(0% 0% 100% 0%)' },
          { opacity: 0.24, clipPath: 'inset(0% 0% 48% 0%)', duration: 1.25, ease: 'power3.out' },
          0.78
        );
      }

      // 2. Scroll-choreographed transformation:
      // Wireframe progressively yields to the completed website interface as user scrolls
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      });

      if (renderLayerRef.current) {
        scrollTl.to(
          renderLayerRef.current,
          {
            opacity: 0.98,
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1.04,
            ease: 'none',
          },
          0
        );
      }

      if (wireframeLayerRef.current) {
        scrollTl.to(
          wireframeLayerRef.current,
          {
            opacity: 0.22,
            yPercent: -6,
            scale: 1.03,
            ease: 'none',
          },
          0
        );
      }

      if (headlineShiftRef.current) {
        scrollTl.to(
          headlineShiftRef.current,
          {
            yPercent: -14,
            opacity: 0.45,
            ease: 'none',
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative z-10 pt-14 lg:pt-16 border-b border-[#C9C8BE]"
    >
      {/* Top editorial metadata rail */}
      <div
        ref={metaRailRef}
        className="border-b border-[#C9C8BE] bg-[#F2F1E9]/70"
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-12 items-center gap-y-2 py-3 text-xs">
            <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex items-center gap-3">
              <RegistrationMark accent />
              <span className="font-mono text-[11px] text-[#252522] tracking-[0.06em]">
                {siteConfig.brand.role}
              </span>
            </div>
            <div className="col-span-7 sm:col-span-4 lg:col-span-4 font-mono text-[11px] text-[#77776F] tracking-[0.06em]">
              {siteConfig.brand.availability}
            </div>
            <div className="col-span-5 sm:col-span-2 lg:col-span-3 text-right font-mono text-[11px] text-[#77776F] tracking-[0.1em] tabular-nums">
              01 · INTRO
            </div>
          </div>
        </div>
      </div>

      {/* Main asymmetric Hero editorial grid */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 items-stretch">
          {/* Left Typographic Column */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between py-10 sm:py-14 lg:py-16 lg:pr-10 lg:border-r lg:border-[#C9C8BE]">
            <div ref={headlineShiftRef} className="will-change-transform">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#77776F] mb-5">
                From Wireframe to Experience · Digital Design
              </p>

              <TextReveal
                as="h1"
                trigger="mount"
                delay={0.25}
                stagger={0.05}
                text={siteConfig.hero.headline}
                highlightWords={['MOVE']}
                className="font-display text-[2.35rem] sm:text-[3.4rem] lg:text-[4.1rem] xl:text-[4.85rem] font-semibold leading-[0.96] tracking-[-0.03em] text-[#252522]"
              />

              <p className="mt-7 max-w-xl text-[15px] sm:text-base leading-[1.65] text-[#77776F]">
                {siteConfig.hero.supportingText}
              </p>
            </div>

            {/* CTAs + Scroll Prompt */}
            <div ref={ctaGroupRef} className="mt-10 lg:mt-14 pt-8 border-t border-[#C9C8BE]">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo('#work', { offset: -64 })}
                  data-cursor="link"
                  className="inline-flex items-center gap-3 bg-[#F04427] px-6 py-3.5 text-xs font-mono font-medium tracking-[0.1em] text-white hover:bg-[#252522] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{siteConfig.hero.primaryCta}</span>
                  <ArrowDownRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo('#contact', { offset: -64 })}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 border border-[#252522] px-6 py-3.5 text-xs font-mono font-medium tracking-[0.1em] text-[#252522] hover:bg-[#252522] hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{siteConfig.hero.secondaryCta}</span>
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.08em] text-[#77776F]">
                <span>01 CONCEPT → 06 EXPERIENCE</span>
                <button
                  type="button"
                  onClick={() => scrollTo('#philosophy', { offset: -64 })}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 text-[#252522] hover:text-[#F04427] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>SCROLL TO EXPLORE</span>
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Digital Interface Wireframe -> Live Website Composition */}
          <div className="col-span-12 lg:col-span-6 py-8 lg:py-12 lg:pl-10 flex flex-col justify-between">
            <div
              ref={visualFrameRef}
              className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[380px] border border-[#C9C8BE] bg-[#E8E7DE]/60 overflow-hidden"
            >
              {/* Underlying finished website interface composition — progressively unveiled on scroll */}
              <div
                ref={renderLayerRef}
                className="absolute inset-0 will-change-transform"
              >
                {!renderImgError ? (
                  <img
                    src={siteConfig.hero.image}
                    alt={siteConfig.hero.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setRenderImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full ui-canvas-grid bg-[#E8E7DE]" />
                )}
              </div>

              {/* Foreground original SVG browser & interface wireframe */}
              <div
                ref={wireframeLayerRef}
                className="relative z-10 h-full w-full p-2 sm:p-4 will-change-transform"
              >
                <HeroBrowserWireframe />
              </div>

              {/* Digital UI metadata bar */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-[#252522]/85 bg-[#F2F1E9]/88 px-2.5 py-1 border border-[#C9C8BE]/90">
                <span>UI 01.A · WIREFRAME TO LIVE INTERFACE</span>
                <span className="tabular-nums">1440 × 900</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
