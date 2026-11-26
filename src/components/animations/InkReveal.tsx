import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface InkRevealProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
  scrub?: boolean;
  priority?: boolean;
}

/**
 * Organic ink-like SVG mask reveal for editorial digital imagery.
 * Uses feTurbulence + feDisplacementMap to create organic ink edges
 * that bloom smoothly as the element scrolls into view (reversing on upward scroll).
 */
export const InkReveal: React.FC<InkRevealProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  fallbackTitle = 'Digital Interface Preview',
  scrub = false,
  priority = false,
}) => {
  const uid = useId().replace(/:/g, '');
  const filterId = `ink-displace-${uid}`;
  const maskId = `ink-mask-${uid}`;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blotPrimaryRef = useRef<SVGCircleElement | null>(null);
  const blotSecondaryRef = useRef<SVGCircleElement | null>(null);
  const blotTertiaryRef = useRef<SVGCircleElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgError, setImgError] = useState(false);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const b1 = blotPrimaryRef.current;
    const b2 = blotSecondaryRef.current;
    const b3 = blotTertiaryRef.current;
    const img = imgRef.current;

    if (!wrapper || !b1 || !b2 || !b3) return;

    if (reducedMotion) {
      gsap.set([b1, b2, b3], { attr: { r: 95 } });
      if (img) gsap.set(img, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 88%',
          end: scrub ? 'top 25%' : 'top 35%',
          scrub: scrub ? 0.8 : false,
          toggleActions: scrub ? undefined : 'play none none reverse',
        },
      });

      tl.fromTo(
        b1,
        { attr: { r: 0 } },
        { attr: { r: 82 }, duration: 1.25, ease: 'power3.out' },
        0
      )
        .fromTo(
          b2,
          { attr: { r: 0 } },
          { attr: { r: 68 }, duration: 1.15, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          b3,
          { attr: { r: 0 } },
          { attr: { r: 74 }, duration: 1.2, ease: 'power2.out' },
          0.16
        );

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.07 },
          { scale: 1, duration: 1.35, ease: 'power3.out' },
          0
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [reducedMotion, scrub]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden bg-[#E8E7DE] ${aspectClass} ${className}`}
    >
      {/* Underlying UI browser wireframe visible before/around ink bloom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 ui-canvas-grid opacity-80 flex items-center justify-center"
      >
        <svg viewBox="0 0 220 150" className="w-2/3 h-2/3 text-[#C9C8BE]" fill="none">
          <rect x="18" y="18" width="184" height="114" rx="2" stroke="currentColor" strokeWidth="0.9" />
          <line x1="18" y1="36" x2="202" y2="36" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="28" cy="27" r="2" fill="currentColor" />
          <circle cx="36" cy="27" r="2" fill="currentColor" />
          <circle cx="44" cy="27" r="2" fill="currentColor" />
          <rect x="30" y="48" width="74" height="10" stroke="currentColor" strokeWidth="0.8" />
          <rect x="30" y="66" width="54" height="6" stroke="currentColor" strokeWidth="0.7" />
          <rect x="116" y="48" width="74" height="68" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Organic SVG displacement mask layer */}
      {!imgError ? (
        <>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0"
          >
            <defs>
              <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.032"
                  numOctaves="3"
                  seed="7"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="16"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <mask
                id={maskId}
                maskUnits="objectBoundingBox"
                maskContentUnits="objectBoundingBox"
              >
                <g
                  transform="scale(0.01, 0.01)"
                  filter={reducedMotion ? undefined : `url(#${filterId})`}
                >
                  <circle ref={blotPrimaryRef} cx="46" cy="52" r="0" fill="white" />
                  <circle ref={blotSecondaryRef} cx="78" cy="30" r="0" fill="white" />
                  <circle ref={blotTertiaryRef} cx="26" cy="78" r="0" fill="white" />
                </g>
              </mask>
            </defs>
          </svg>

          <div
            className="relative h-full w-full"
            style={{
              maskImage: `url(#${maskId})`,
              WebkitMaskImage: `url(#${maskId})`,
              mask: `url(#${maskId})`,
            }}
          >
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setImgError(true)}
              className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
            />
          </div>
        </>
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center border border-[#C9C8BE] bg-[#E8E7DE] p-6 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#77776F]">
            Digital Preview
          </span>
          <span className="mt-2 font-display text-lg font-medium text-[#252522]">
            {fallbackTitle}
          </span>
        </div>
      )}
    </div>
  );
};
