import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProjectBySlug, projects } from '../data/projects';
import { RegistrationMark, SectionHeaderBar } from '../components/layout/GridSystem';
import { TextReveal } from '../components/animations/TextReveal';
import { InkReveal } from '../components/animations/InkReveal';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const [demoStateIdx, setDemoStateIdx] = useState(0);

  if (!project) {
    return (
      <main className="relative z-10 pt-28 pb-24 min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#F04427]">
            404 · Case Study Not Found
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-[#252522]">
            This project route does not exist.
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 bg-[#252522] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.1em] text-[#F2F1E9] hover:bg-[#F04427] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
    );
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <main className="relative z-10 pt-14 lg:pt-16">
      {/* Top Back Navigation Strip */}
      <div className="border-b border-[#C9C8BE] bg-[#F2F1E9]/90">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/#work"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#252522] hover:text-[#F04427] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Selected Work</span>
          </Link>
          <span className="font-mono text-[11px] tracking-[0.1em] text-[#77776F]">
            PROJECT {project.number} · {project.coordinates}
          </span>
        </div>
      </div>

      {/* Case Study Editorial Header */}
      <section className="border-b border-[#C9C8BE]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#F04427] mb-4">
                <RegistrationMark accent />
                <span>{project.category}</span>
                <span className="text-[#C9C8BE]" aria-hidden="true">
                  /
                </span>
                <span className="text-[#77776F]">{project.year}</span>
              </div>

              <TextReveal
                as="h1"
                trigger="mount"
                text={project.title}
                className="font-display text-[2.6rem] sm:text-[4rem] lg:text-[5.2rem] font-semibold leading-[0.94] tracking-[-0.035em] text-[#252522]"
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <p className="text-[15px] leading-[1.65] text-[#77776F]">
                {project.shortDescription}
              </p>
              <p className="mt-4 border border-[#C9C8BE] bg-[#E8E7DE]/65 px-3.5 py-2.5 font-mono text-[10px] leading-relaxed text-[#252522]">
                {project.statusNote}
              </p>
            </div>
          </div>

          {/* Full-Width Hero UI Showcase */}
          <div className="mt-10 lg:mt-14 border border-[#C9C8BE] bg-[#E8E7DE]">
            <InkReveal
              src={project.heroImage}
              alt={project.heroImageAlt}
              aspectClass="aspect-[16/9]"
              fallbackTitle={project.title}
              priority
            />
          </div>
        </div>
      </section>

      {/* Overview & Design Objectives */}
      <section className="border-b border-[#C9C8BE]">
        <SectionHeaderBar
          number="01"
          label="Overview & Objectives"
          metaRight={project.title}
        />
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-6 lg:pr-8 lg:border-r lg:border-[#C9C8BE]">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427]">
                Project Overview
              </h2>
              <p className="mt-4 text-lg leading-[1.65] text-[#252522]">
                {project.overview}
              </p>

              <div className="mt-10 pt-8 border-t border-[#C9C8BE]">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#77776F]">
                  Creative Direction
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#252522]/85">
                  {project.creativeDirection}
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:pl-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#252522]">
                Design Objectives
              </h2>
              <ol className="mt-5 divide-y divide-[#C9C8BE] border-t border-b border-[#C9C8BE]">
                {project.objectives.map((objective, idx) => (
                  <li key={objective} className="py-5 flex items-start gap-5">
                    <span className="font-mono text-xs text-[#F04427] tabular-nums pt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-[#252522]">
                      {objective}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Technology Stack */}
              <div className="mt-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#77776F]">
                  Technology Stack
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-[#252522]">
                  {project.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < project.techStack.length - 1 && (
                        <span className="text-[#C9C8BE]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Breakdown */}
      <section className="border-b border-[#C9C8BE] bg-[#E8E7DE]/40">
        <SectionHeaderBar
          number="02"
          label="Design & Build Process"
          metaRight="03 PHASES"
        />
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#C9C8BE] bg-[#F2F1E9] divide-y md:divide-y-0 md:divide-x divide-[#C9C8BE]">
            {project.processSteps.map((step) => (
              <div key={step.phase} className="p-6 sm:p-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F04427]">
                  {step.phase}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#252522]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#77776F]">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interface Previews & Interactive Demonstration */}
      <section className="border-b border-[#C9C8BE]">
        <SectionHeaderBar
          number="03"
          label="Interface Previews & Interaction Demo"
          metaRight="LIVE SPECIMEN"
        />
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-12 gap-8">
            {project.interfacePreviewNotes.map((preview, idx) => (
              <div
                key={preview.label}
                className="col-span-12 lg:col-span-6 border border-[#C9C8BE] bg-[#E8E7DE]/50 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#77776F] mb-4">
                  <span>{preview.label}</span>
                  <span>SCREEN 0{idx + 1}</span>
                </div>
                <div className="aspect-[16/10] border border-[#C9C8BE] bg-[#F2F1E9] p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#C9C8BE] pb-3 font-mono text-[10px] text-[#77776F]">
                    <span>{project.title}</span>
                    <span>{preview.layoutType.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-3 my-4 flex-1 items-center">
                    <div className="col-span-7 space-y-2">
                      <div className="h-3.5 w-4/5 bg-[#252522]" />
                      <div className="h-3.5 w-3/5 bg-[#252522]/80" />
                      <div className="h-2 w-full bg-[#C9C8BE] mt-4" />
                      <div className="h-2 w-5/6 bg-[#C9C8BE]" />
                    </div>
                    <div className="col-span-5 h-full border border-[#252522] bg-[#E8E7DE] flex items-center justify-center">
                      <div className="h-8 w-8 bg-[#F04427]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#77776F]">
                    <span>SWISS 12-COL</span>
                    <span className="text-[#F04427]">UI SPEC</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#77776F]">{preview.caption}</p>
              </div>
            ))}
          </div>

          {/* Interactive State Demonstration */}
          <div className="mt-10 border border-[#252522] bg-[#F2F1E9] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C9C8BE]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F04427]">
                  Interaction Demonstration
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[#252522]">
                  {project.interactionDemo.title}
                </h3>
                <p className="mt-1 text-sm text-[#77776F]">
                  {project.interactionDemo.description}
                </p>
              </div>

              <div className="inline-flex border border-[#C9C8BE]">
                {project.interactionDemo.states.map((stateLabel, idx) => (
                  <button
                    key={stateLabel}
                    type="button"
                    onClick={() => setDemoStateIdx(idx)}
                    data-cursor="link"
                    className={`px-3.5 py-2 font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      demoStateIdx === idx
                        ? 'bg-[#F04427] text-white'
                        : 'bg-[#F2F1E9] text-[#252522] hover:bg-[#E8E7DE]'
                    }`}
                  >
                    {stateLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 md:col-span-8">
                <div
                  className={`h-44 border border-[#C9C8BE] p-6 flex flex-col justify-between transition-colors duration-300 ${
                    demoStateIdx === 0
                      ? 'bg-[#F2F1E9] ui-canvas-grid'
                      : demoStateIdx === 1
                        ? 'bg-[#E8E7DE]'
                        : 'bg-[#252522] text-[#F2F1E9]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
                    <span>STATE 0{demoStateIdx + 1}</span>
                    <span className="text-[#F04427]">
                      {project.interactionDemo.states[demoStateIdx]}
                    </span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    {project.title} — {project.interactionDemo.states[demoStateIdx]}
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#77776F]">
                  Final Outcome
                </h4>
                <p className="mt-2.5 text-sm leading-[1.7] text-[#252522]">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Link */}
      <section className="border-b border-[#C9C8BE] bg-[#E8E7DE]/55">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
          <Link
            to={`/work/${nextProject.slug}`}
            onClick={() => setDemoStateIdx(0)}
            data-cursor="project"
            data-cursor-label="NEXT CASE"
            className="group flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#77776F]">
                Next Case Study · Project {nextProject.number}
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#252522] group-hover:text-[#F04427] transition-colors">
                {nextProject.title}
              </h2>
            </div>
            <span className="inline-flex h-14 w-14 items-center justify-center border border-[#252522] text-[#252522] group-hover:bg-[#F04427] group-hover:border-[#F04427] group-hover:text-white transition-colors">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};
