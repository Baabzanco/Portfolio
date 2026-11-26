import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { TextReveal } from '../animations/TextReveal';
import { InkReveal } from '../animations/InkReveal';

export const SelectedWorkSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative z-10 border-b border-[#C9C8BE]"
    >
      <SectionHeaderBar
        number="05"
        label="Selected Work"
        metaRight="04 EDITABLE CASE STUDIES"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        {/* Editorial Header */}
        <div className="grid grid-cols-12 gap-6 items-end pb-12 lg:pb-16 border-b border-[#C9C8BE]">
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-4">
              Portfolio Archive
            </p>
            <TextReveal
              as="h2"
              text="SELECTED WORK. DISTINCT EXPERIENCES."
              className="font-display text-[2.35rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#252522]"
            />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="text-[15px] leading-[1.65] text-[#77776F] max-w-md lg:ml-auto">
              A selection of digital experiences shaped by design, strategy, and thoughtful execution.
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-[#77776F]">
              Editable placeholder entries · Configured in src/data/projects.ts
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Modular Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-12 gap-y-16 lg:gap-x-10 lg:gap-y-24">
          {projects.map((project) => (
            <article
              key={project.slug}
              className={`col-span-12 ${project.gridSpanClass} ${project.offsetClass || ''}`}
            >
              <Link
                to={`/work/${project.slug}`}
                data-cursor="project"
                data-cursor-label="VIEW CASE"
                className="group block focus-visible:outline-2 focus-visible:outline-[#F04427]"
              >
                {/* Top technical metadata strip */}
                <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.1em]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 bg-[#C9C8BE] group-hover:bg-[#F04427] transition-colors duration-200" />
                    <span className="text-[#252522] font-medium tabular-nums">
                      PROJECT {project.number}
                    </span>
                    <span className="text-[#C9C8BE]" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-[#77776F] group-hover:text-[#252522] transition-colors">
                      {project.category}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-[#77776F] tabular-nums">
                    {project.year}
                  </span>
                </div>

                {/* Organic Ink-Revealed Web Interface Preview */}
                <div className="relative border border-[#C9C8BE] group-hover:border-[#252522] transition-colors duration-300 overflow-hidden bg-[#E8E7DE]">
                  <InkReveal
                    src={project.heroImage}
                    alt={project.heroImageAlt}
                    aspectClass={project.aspectClass}
                    fallbackTitle={project.title}
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                  />

                  <div className="pointer-events-none absolute top-3 right-3 z-10 bg-[#F2F1E9]/92 border border-[#C9C8BE] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-[#252522] opacity-85 group-hover:opacity-100 group-hover:border-[#F04427] transition-all duration-200">
                    {project.coordinates}
                  </div>
                </div>

                {/* Editorial Title & Description */}
                <div className="mt-5 pt-4 border-t border-[#C9C8BE] flex items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#252522] group-hover:translate-x-1.5 group-hover:text-[#F04427] transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-[#77776F]">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 pt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#252522] group-hover:text-[#F04427] transition-colors">
                    <span className="hidden sm:inline">View</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Footer index rule */}
        <div className="mt-16 pt-6 border-t border-[#C9C8BE] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#77776F]">
          <div className="flex items-center gap-2.5">
            <RegistrationMark />
            <span>ALL CASE STUDIES INCLUDE INTERACTIVE UI TEMPLATES &amp; EDITABLE SPECIFICATIONS</span>
          </div>
          <span className="tabular-nums">04 / 04 CASE STUDIES</span>
        </div>
      </div>
    </section>
  );
};
