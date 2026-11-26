import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { SectionHeaderBar, RegistrationMark } from '../layout/GridSystem';
import { TextReveal } from '../animations/TextReveal';
import { useSmoothScroll } from '../animations/SmoothScroll';

export const ContactSection: React.FC = () => {
  const markerStageRef = useRef<HTMLDivElement | null>(null);
  const markerCircleRef = useRef<HTMLDivElement | null>(null);

  const [briefOpen, setBriefOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('Web Design & Creative Development');
  const [message, setMessage] = useState('');

  const { reducedMotion } = useSmoothScroll();

  const handleStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !markerStageRef.current || !markerCircleRef.current) return;
    const rect = markerStageRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.14;

    gsap.to(markerCircleRef.current, {
      x: dx,
      y: dy,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleStageLeave = () => {
    if (!markerCircleRef.current) return;
    gsap.to(markerCircleRef.current, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.emailPlaceholder);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 border-b border-[#C9C8BE] bg-[#E8E7DE]/55"
    >
      <SectionHeaderBar
        number={siteConfig.contactSection.sectionNumber}
        label={siteConfig.contactSection.sectionLabel}
        metaRight="INQUIRIES & COLLABORATIONS"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-16 sm:py-22 lg:py-28">
        <div
          ref={markerStageRef}
          onPointerMove={handleStageMove}
          onPointerLeave={handleStageLeave}
          className="grid grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Oversized Typographic Call to Action */}
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F04427] mb-5">
              Start a Dialogue
            </p>

            <TextReveal
              as="h2"
              text={siteConfig.contactSection.headline}
              highlightWords={['REAL.']}
              className="font-display text-[2.6rem] sm:text-[4rem] lg:text-[5.2rem] xl:text-[6rem] font-semibold leading-[0.93] tracking-[-0.035em] text-[#252522]"
            />

            <p className="mt-7 max-w-xl text-[15px] sm:text-base leading-[1.7] text-[#77776F]">
              {siteConfig.contactSection.supportingCopy}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setBriefOpen((prev) => !prev);
                  setSubmitted(false);
                }}
                data-cursor="link"
                className="inline-flex items-center gap-3 bg-[#F04427] px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white hover:bg-[#252522] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{briefOpen ? 'CLOSE PROJECT BRIEF' : siteConfig.contactSection.primaryCta}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href={`mailto:${siteConfig.contact.emailPlaceholder}`}
                data-cursor="link"
                className="inline-flex items-center gap-3 border border-[#252522] px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#252522] hover:bg-[#252522] hover:text-[#F2F1E9] transition-colors duration-200 whitespace-nowrap shrink-0"
              >
                <span>{siteConfig.contactSection.secondaryCta}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="link"
                className="inline-flex items-center gap-2 border border-[#C9C8BE] bg-[#F2F1E9] px-4 py-4 font-mono text-xs text-[#252522] hover:border-[#252522] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#F04427]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#77776F]" />
                    <span>{siteConfig.contact.emailPlaceholder}</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 font-mono text-[10px] tracking-[0.08em] text-[#77776F]">
              {siteConfig.contact.emailNote}
            </p>
          </div>

          {/* Right Striking Architectural Geometric Visual with Interactive Vermilion Marker */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] aspect-square border border-[#C9C8BE] bg-[#F2F1E9] flex items-center justify-center overflow-hidden p-6">
              {/* Architectural coordinate lines */}
              <svg
                viewBox="0 0 320 320"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                <line x1="160" y1="0" x2="160" y2="320" stroke="#C9C8BE" strokeWidth="1" />
                <line x1="0" y1="160" x2="320" y2="160" stroke="#C9C8BE" strokeWidth="1" />
                <circle cx="160" cy="160" r="118" stroke="#252522" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="42" y="42" width="236" height="236" stroke="#C9C8BE" strokeWidth="0.9" />
              </svg>

              {/* Interactive pointer-reactive vermilion architectural focal circle */}
              <div
                ref={markerCircleRef}
                data-cursor="interactive"
                onClick={() => {
                  setBriefOpen(true);
                  setSubmitted(false);
                }}
                className="relative z-10 h-36 w-36 rounded-full bg-[#F04427] flex flex-col items-center justify-center text-white cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  INQUIRE
                </span>
                <span className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  2026
                </span>
              </div>

              <div className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] text-[#77776F]">
                FIG 09 · ORIGIN
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-[#252522]">
                OPEN BRIEF
              </div>
            </div>
          </div>
        </div>

        {/* Inline Architectural Project Brief Composer */}
        {briefOpen && (
          <div className="mt-12 border border-[#252522] bg-[#F2F1E9] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C9C8BE]">
              <div className="flex items-center gap-3">
                <RegistrationMark accent />
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#252522]">
                  Project Brief Specification
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#77776F]">
                DIRECT INQUIRY DRAFT
              </span>
            </div>

            {submitted ? (
              <div className="py-10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#F04427]">
                  Brief Recorded Locally
                </p>
                <h4 className="mt-2 font-display text-2xl font-semibold text-[#252522]">
                  Thank you, {name}. Your project outline is ready.
                </h4>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#77776F]">
                  Connect this form to your preferred email endpoint or send directly to{' '}
                  <span className="text-[#252522] font-medium">
                    {siteConfig.contact.emailPlaceholder}
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-6 border border-[#252522] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-[#252522] hover:bg-[#252522] hover:text-[#F2F1E9] transition-colors cursor-pointer"
                >
                  Compose Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="brief-name"
                    className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#77776F] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="brief-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name or studio"
                    className="w-full border border-[#C9C8BE] bg-white px-4 py-3 text-sm text-[#252522] placeholder:text-[#77776F]/60 focus:border-[#252522]"
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="brief-email"
                    className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#77776F] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="brief-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@studio.com"
                    className="w-full border border-[#C9C8BE] bg-white px-4 py-3 text-sm text-[#252522] placeholder:text-[#77776F]/60 focus:border-[#252522]"
                  />
                </div>

                <div className="col-span-12">
                  <label
                    htmlFor="brief-scope"
                    className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#77776F] mb-2"
                  >
                    Primary Discipline
                  </label>
                  <select
                    id="brief-scope"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full border border-[#C9C8BE] bg-white px-4 py-3 text-sm text-[#252522] focus:border-[#252522]"
                  >
                    <option>Web Design &amp; Creative Development</option>
                    <option>Brand Digital Flagship</option>
                    <option>Interaction Design &amp; Motion Choreography</option>
                    <option>Experimental Web Narrative</option>
                  </select>
                </div>

                <div className="col-span-12">
                  <label
                    htmlFor="brief-message"
                    className="block font-mono text-[11px] uppercase tracking-[0.1em] text-[#77776F] mb-2"
                  >
                    Project Overview &amp; Ambition
                  </label>
                  <textarea
                    id="brief-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your goals, timeline, and what you want to build together..."
                    className="w-full border border-[#C9C8BE] bg-white px-4 py-3 text-sm text-[#252522] placeholder:text-[#77776F]/60 focus:border-[#252522]"
                  />
                </div>

                <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-mono text-[11px] text-[#77776F]">
                    Or write directly to {siteConfig.contact.emailPlaceholder}
                  </span>
                  <button
                    type="submit"
                    data-cursor="link"
                    className="inline-flex items-center gap-2.5 bg-[#252522] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-[#F2F1E9] hover:bg-[#F04427] transition-colors cursor-pointer"
                  >
                    <span>SEND PROJECT BRIEF</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
