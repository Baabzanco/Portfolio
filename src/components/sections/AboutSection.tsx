import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { TextReveal } from '../animations/TextReveal';
import { InkReveal } from '../animations/InkReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

export const AboutSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="about"
      className="relative z-10 border-b border-[#C9C8BE]"
    >
      <SectionHeaderBar
        number={siteConfig.about.sectionNumber}
        label={siteConfig.about.sectionLabel}
        metaRight="THE DESIGNER"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Portrait Plate (Asymmetric 5 cols) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-[#C9C8BE] bg-[#E8E7DE]/60 p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F]">
                <span>PLATE 08 · STUDIO PORTRAIT</span>
                <span>PLACEHOLDER</span>
              </div>

              <InkReveal
                src={siteConfig.about.portraitImage}
                alt={siteConfig.about.portraitCaption}
                aspectClass="aspect-[3/4]"
                fallbackTitle="Amir Moradsaleh — Studio Portrait"
              />

              <p className="mt-3 font-mono text-[10px] leading-relaxed text-[#77776F]">
                {siteConfig.about.portraitCaption}
              </p>
            </div>
          </div>

          {/* Right Editorial Profile (7 cols) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-4">
                Independent Practice
              </p>

              <TextReveal
                as="h2"
                text={siteConfig.about.headline}
                className="font-display text-[2.2rem] sm:text-[3.1rem] lg:text-[3.85rem] font-semibold leading-[0.97] tracking-[-0.03em] text-[#252522]"
              />

              <div className="mt-8 space-y-5 max-w-2xl text-[15px] sm:text-base leading-[1.7] text-[#252522]">
                <p>{siteConfig.about.introduction}</p>
                <p className="text-[#77776F]">{siteConfig.about.philosophy}</p>
                <p className="text-[#77776F]">{siteConfig.brand.supportingStatement}</p>
              </div>
            </div>

            {/* Design & Technical Interests Two-Column Ledger */}
            <div className="mt-10 pt-8 border-t border-[#C9C8BE] grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#252522] flex items-center gap-2">
                  <RegistrationMark accent />
                  <span>Design &amp; Direction Focus</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#77776F]">
                  {siteConfig.about.designInterests.map((item) => (
                    <li key={item} className="leading-snug text-[#252522]/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#252522] flex items-center gap-2">
                  <RegistrationMark />
                  <span>Technical Craft</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#77776F]">
                  {siteConfig.about.technicalInterests.map((item) => (
                    <li key={item} className="leading-snug text-[#252522]/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Editable Metadata Strip (Location + Direct Contact Link) */}
            <div className="mt-10 pt-6 border-t border-[#C9C8BE] grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F]">
                  Location
                </span>
                <span className="mt-1 block text-sm text-[#252522]">
                  {siteConfig.brand.locationPlaceholder}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F]">
                  Availability
                </span>
                <span className="mt-1 block text-sm text-[#252522]">
                  {siteConfig.brand.availability}
                </span>
              </div>

              <div className="sm:text-right">
                <button
                  type="button"
                  onClick={() => scrollTo('#contact', { offset: -64 })}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 border border-[#252522] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-[#252522] hover:bg-[#F04427] hover:border-[#F04427] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <p className="mt-6 font-mono text-[10px] tracking-[0.06em] text-[#77776F]">
              {siteConfig.about.editableNotice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
