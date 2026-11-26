import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { CapabilityInterfaceSpecimen } from '../graphics/DigitalInterfaceGraphics';
import { TextReveal } from '../animations/TextReveal';

export const CapabilitiesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(siteConfig.capabilities.items[0].id);

  const activeCapability =
    siteConfig.capabilities.items.find((item) => item.id === activeId) ||
    siteConfig.capabilities.items[0];

  return (
    <section
      id="capabilities"
      className="relative z-10 border-b border-[#C9C8BE]"
    >
      <SectionHeaderBar
        number={siteConfig.capabilities.sectionNumber}
        label={siteConfig.capabilities.sectionLabel}
        metaRight="05 DIGITAL DISCIPLINES"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Modular Editorial Accordion */}
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-4">
              What I Do
            </p>
            <TextReveal
              as="h2"
              text="SYSTEMS, INTERFACES & INTERACTIVE CRAFT."
              className="font-display text-[2.2rem] sm:text-[3.1rem] lg:text-[3.75rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#252522]"
            />

            <div className="mt-10 border-t border-[#C9C8BE] divide-y divide-[#C9C8BE]">
              {siteConfig.capabilities.items.map((item) => {
                const isOpen = item.id === activeId;
                return (
                  <div
                    key={item.id}
                    className={`transition-colors duration-200 ${
                      isOpen ? 'bg-[#E8E7DE]/65' : 'bg-transparent hover:bg-[#E8E7DE]/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      aria-expanded={isOpen}
                      data-cursor="link"
                      className="w-full py-6 px-3 sm:px-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className={`font-mono text-xs tabular-nums transition-colors ${
                            isOpen ? 'text-[#F04427] font-medium' : 'text-[#77776F]'
                          }`}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`font-display text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-[-0.02em] transition-colors ${
                            isOpen ? 'text-[#F04427]' : 'text-[#252522]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-colors ${
                          isOpen
                            ? 'border-[#F04427] bg-[#F04427] text-white'
                            : 'border-[#C9C8BE] text-[#252522]'
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-5 pb-7 pt-1 sm:pl-[4.25rem]">
                          <p className="text-[15px] font-medium text-[#252522]">
                            {item.shortDescription}
                          </p>
                          <p className="mt-2.5 text-[15px] leading-[1.65] text-[#77776F] max-w-2xl">
                            {item.extendedDescription}
                          </p>

                          <div className="mt-5 pt-4 border-t border-[#C9C8BE]/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {item.deliverables.map((deliverable) => (
                              <div
                                key={deliverable}
                                className="flex items-center gap-2.5 text-sm text-[#252522]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 bg-[#F04427] shrink-0"
                                />
                                <span>{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Synced Live Digital Interface Specimen */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-24">
            <div className="border border-[#C9C8BE] bg-[#E8E7DE]/50 p-5 sm:p-6">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F] mb-4">
                <span className="flex items-center gap-2">
                  <RegistrationMark accent />
                  <span>DISCIPLINE {activeCapability.number}</span>
                </span>
                <span className="text-[#252522]">{activeCapability.diagramSpec}</span>
              </div>

              <div className="aspect-[42/34] w-full bg-[#F2F1E9] border border-[#C9C8BE] p-3">
                <CapabilityInterfaceSpecimen capabilityId={activeCapability.id} />
              </div>

              <div className="mt-5 pt-4 border-t border-[#C9C8BE] flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-[#252522]">
                    {activeCapability.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#77776F]">
                    {activeCapability.shortDescription}
                  </p>
                </div>
                <span className="font-mono text-2xl font-medium text-[#F04427] tabular-nums">
                  {activeCapability.number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
