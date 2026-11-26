import React, { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { useSmoothScroll } from '../animations/SmoothScroll';
import { RegistrationMark } from './GridSystem';

export const Footer: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const inkFilterId = `footer-ink-filter-${uid}`;
  const inkMaskId = `footer-ink-mask-${uid}`;

  const wordmarkRef = useRef<SVGSVGElement | null>(null);
  const blotMainRef = useRef<SVGCircleElement | null>(null);
  const blotTrailRef = useRef<SVGCircleElement | null>(null);
  const blotAccentRef = useRef<SVGCircleElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo, reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const svg = wordmarkRef.current;
    const main = blotMainRef.current;
    const trail = blotTrailRef.current;
    const accent = blotAccentRef.current;
    if (!svg || !main || !trail || !accent) return;

    if (reducedMotion) {
      gsap.set(main, { attr: { cx: 600, cy: 115, r: 620 } });
      return;
    }

    const mainX = gsap.quickTo(main, 'attr:cx', { duration: 0.32, ease: 'power3.out' });
    const mainY = gsap.quickTo(main, 'attr:cy', { duration: 0.32, ease: 'power3.out' });
    const trailX = gsap.quickTo(trail, 'attr:cx', { duration: 0.65, ease: 'power2.out' });
    const trailY = gsap.quickTo(trail, 'attr:cy', { duration: 0.65, ease: 'power2.out' });
    const accentX = gsap.quickTo(accent, 'attr:cx', { duration: 0.45, ease: 'power2.out' });
    const accentY = gsap.quickTo(accent, 'attr:cy', { duration: 0.45, ease: 'power2.out' });

    const toSvgCoords = (clientX: number, clientY: number) => {
      const rect = svg.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 1200;
      const y = ((clientY - rect.top) / rect.height) * 230;
      return { x, y };
    };

    const handleMove = (e: MouseEvent) => {
      const { x, y } = toSvgCoords(e.clientX, e.clientY);
      mainX(x);
      mainY(y);
      trailX(x - 42);
      trailY(y + 12);
      accentX(x + 36);
      accentY(y - 10);
    };

    const handleEnter = (e: MouseEvent) => {
      const { x, y } = toSvgCoords(e.clientX, e.clientY);
      gsap.set([main, trail, accent], { attr: { cx: x, cy: y } });
      gsap.to(main, { attr: { r: 175 }, duration: 0.55, ease: 'power3.out' });
      gsap.to(trail, { attr: { r: 120 }, duration: 0.72, ease: 'power2.out' });
      gsap.to(accent, { attr: { r: 90 }, duration: 0.6, ease: 'power2.out' });
    };

    const handleLeave = () => {
      gsap.to([main, trail, accent], { attr: { r: 0 }, duration: 0.65, ease: 'power2.inOut' });
    };

    svg.addEventListener('mousemove', handleMove);
    svg.addEventListener('mouseenter', handleEnter);
    svg.addEventListener('mouseleave', handleLeave);

    return () => {
      svg.removeEventListener('mousemove', handleMove);
      svg.removeEventListener('mouseenter', handleEnter);
      svg.removeEventListener('mouseleave', handleLeave);
    };
  }, [reducedMotion]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    scrollTo(href, { offset: -64 });
  };

  return (
    <footer className="relative z-10 bg-[#F2F1E9] text-[#252522]">
      {/* Upper Digital Editorial Index Grid */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14 lg:py-16 border-b border-[#C9C8BE]">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Identity & Statement */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#77776F]">
              <RegistrationMark accent />
              <span>10 · Digital Index</span>
            </div>
            <p className="mt-4 font-display text-lg font-semibold tracking-[0.04em] text-[#252522]">
              {siteConfig.brand.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#77776F]">
              {siteConfig.brand.role}. Crafting expressive visual systems, motion choreography, and interactive websites.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#77776F]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    data-cursor="link"
                    className="text-[#252522] hover:text-[#F04427] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Placeholders */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#77776F]">
              Channels (Editable)
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    onClick={(e) => handleNavClick(e, social.href)}
                    data-cursor="link"
                    className="inline-flex items-baseline gap-2 text-[#252522] hover:text-[#F04427] transition-colors"
                  >
                    <span>{social.label}</span>
                    <span className="font-mono text-[10px] text-[#77776F]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact + Back to Top */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 flex flex-col justify-between items-start lg:items-end">
            <div className="lg:text-right">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#77776F]">
                Direct
              </h3>
              <a
                href={`mailto:${siteConfig.contact.emailPlaceholder}`}
                data-cursor="link"
                className="mt-4 inline-block text-sm text-[#252522] hover:text-[#F04427] transition-colors break-all"
              >
                {siteConfig.contact.emailPlaceholder}
              </a>
            </div>

            <button
              type="button"
              onClick={() => scrollTo(0, { offset: 0 })}
              data-cursor="link"
              className="mt-8 inline-flex items-center gap-2 border border-[#C9C8BE] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#252522] hover:border-[#252522] hover:bg-[#252522] hover:text-[#F2F1E9] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Signature Oversized Outlined Editorial Wordmark with Organic Ink Reveal */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 pt-8 pb-6">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#77776F]">
          <span>INTERACTIVE TYPE SPECIMEN · MOVE CURSOR OVER LETTERFORMS FOR INK FILL</span>
          <span className="hidden sm:inline">SVG INK MASK</span>
        </div>

        <div className="border border-[#C9C8BE] bg-[#E8E7DE]/35 px-2 sm:px-4 py-4 sm:py-6 overflow-hidden">
          <svg
            ref={wordmarkRef}
            viewBox="0 0 1200 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-cursor="ink"
            className="w-full h-auto select-none cursor-crosshair"
            role="img"
            aria-label="AMIR MORADSALEH oversized outlined typography wordmark with interactive cursor ink reveal"
          >
            <defs>
              <filter id={inkFilterId} x="-30%" y="-30%" width="160%" height="160%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.022"
                  numOctaves="3"
                  seed="19"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="34"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />
                <feGaussianBlur in="displaced" stdDeviation="6" />
              </filter>

              <mask id={inkMaskId}>
                <g filter={`url(#${inkFilterId})`}>
                  <circle ref={blotMainRef} cx="600" cy="115" r="0" fill="white" />
                  <circle ref={blotTrailRef} cx="600" cy="115" r="0" fill="white" />
                  <circle ref={blotAccentRef} cx="600" cy="115" r="0" fill="white" />
                </g>
              </mask>
            </defs>

            {/* Fine editorial typography cap-height and baseline grid lines */}
            <g stroke="#C9C8BE" strokeWidth="0.8">
              <line x1="16" y1="36" x2="1184" y2="36" strokeDasharray="3 4" />
              <line x1="16" y1="184" x2="1184" y2="184" />
              <line x1="16" y1="110" x2="1184" y2="110" strokeDasharray="2 6" />
            </g>

            {/* Layer 1: Outlined Editorial Wordmark */}
            <text
              x="600"
              y="162"
              textAnchor="middle"
              fontFamily="Bricolage Grotesque, sans-serif"
              fontSize="126"
              fontWeight="700"
              letterSpacing="-0.03em"
              fill="none"
              stroke="#252522"
              strokeWidth="1.25"
            >
              AMIR MORADSALEH
            </text>

            {/* Layer 2: Organic Ink-Filled Letterforms revealed inside cursor mask */}
            <g mask={`url(#${inkMaskId})`}>
              <text
                x="600"
                y="162"
                textAnchor="middle"
                fontFamily="Bricolage Grotesque, sans-serif"
                fontSize="126"
                fontWeight="700"
                letterSpacing="-0.03em"
                fill="#252522"
              >
                AMIR MORADSALEH
              </text>
              <line x1="36" y1="184" x2="1164" y2="184" stroke="#F04427" strokeWidth="3" />
            </g>
          </svg>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-5 pb-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#77776F]">
          <span>
            © {siteConfig.brand.year} {siteConfig.brand.name}. All rights reserved.
          </span>
          <span>
            FROM WIREFRAME TO EXPERIENCE · DIGITAL PORTFOLIO
          </span>
        </div>
      </div>
    </footer>
  );
};
