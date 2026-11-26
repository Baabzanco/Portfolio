import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../../data/siteConfig';
import { SectionHeaderBar } from '../layout/GridSystem';
import { ChallengeDiagram } from '../graphics/ArchitecturalIllustrations';
import { TextReveal } from '../animations/TextReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const ChallengesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>('.challenge-column');
      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate each illustration's SVG strokes independently
      cards.forEach((card, index) => {
        const paths = card.querySelectorAll<SVGGeometryElement>('.challenge-draw-path');
        paths.forEach((path) => {
          const length = path.getTotalLength ? path.getTotalLength() : 200;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.05,
          delay: index * 0.12,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="challenges"
      className="relative z-10 border-b border-[#C9C8BE]"
    >
      <SectionHeaderBar
        number={siteConfig.challenges.sectionNumber}
        label={siteConfig.challenges.sectionLabel}
        metaRight="FOUR STRUCTURAL PILLARS"
      />

      {/* Four Modular Architectural Columns */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#C9C8BE]">
          {siteConfig.challenges.items.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            return (
              <article
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                data-cursor="interactive"
                className={`challenge-column group relative flex flex-col justify-between p-6 sm:p-8 transition-colors duration-300 outline-none ${
                  idx < 3 ? 'lg:border-r lg:border-[#C9C8BE]' : ''
                } ${idx % 2 === 0 ? 'sm:border-r sm:border-[#C9C8BE] lg:border-r' : ''} ${
                  idx < 2 ? 'border-b sm:border-b lg:border-b-0 border-[#C9C8BE]' : idx === 2 ? 'border-b sm:border-b-0 border-[#C9C8BE]' : ''
                } ${isHovered ? 'bg-[#E8E7DE]/75' : 'bg-transparent'}`}
              >
                {/* Column index & technical descriptor */}
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em]">
                    <span
                      className={`tabular-nums transition-colors duration-200 ${
                        isHovered ? 'text-[#F04427]' : 'text-[#252522]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-[#77776F] uppercase">
                      {item.detailLabel}
                    </span>
                  </div>

                  {/* Unique Architectural Illustration */}
                  <div className="my-7 aspect-[13/9] w-full bg-[#F2F1E9]/85 border border-[#C9C8BE] p-2">
                    <ChallengeDiagram
                      type={item.id as 'clarity' | 'structure' | 'interaction' | 'performance'}
                      active={isHovered}
                    />
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#252522] flex items-center gap-2.5">
                    <span>{item.title}</span>
                    <span
                      aria-hidden="true"
                      className={`inline-block h-2 w-2 bg-[#F04427] transition-transform duration-300 ${
                        isHovered ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.6] text-[#77776F]">
                    {item.description}
                  </p>
                </div>

                {/* Subtle interactive footer detail */}
                <div className="mt-8 pt-4 border-t border-[#C9C8BE]/80 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] text-[#77776F]">
                  <span>{item.interactiveHint}</span>
                  <span
                    className={`transition-colors duration-200 ${
                      isHovered ? 'text-[#F04427]' : 'text-[#77776F]'
                    }`}
                  >
                    {isHovered ? 'ALIGNED' : 'INSPECT'}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Concluding Large Editorial Statement */}
        <div className="py-16 sm:py-22 lg:py-28">
          <div className="grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 lg:col-span-9">
              <TextReveal
                as="h2"
                text={siteConfig.challenges.closingStatement}
                highlightWords={['PURPOSE.']}
                className="font-display text-[2.5rem] sm:text-[4rem] lg:text-[5.25rem] font-semibold leading-[0.94] tracking-[-0.035em] text-[#252522]"
              />
            </div>
            <div className="col-span-12 lg:col-span-3 lg:text-right">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#77776F]">
                Next Chapter · Scroll Blueprint
              </p>
              <p className="mt-1 text-sm text-[#252522]">
                Watch structure evolve into interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
