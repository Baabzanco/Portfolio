import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  trigger?: 'mount' | 'scroll';
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.045,
  highlightWords = [],
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { reducedMotion } = useSmoothScroll();

  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      const innerWords = el.querySelectorAll<HTMLElement>('.tr-word-inner');
      if (!innerWords.length) return;

      if (trigger === 'mount') {
        gsap.fromTo(
          innerWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            stagger,
            ease: 'power4.out',
          }
        );
      } else {
        gsap.fromTo(
          innerWords,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              end: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, reducedMotion, stagger, text, trigger]);

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      aria-label={text}
    >
      {words.map((word, idx) => {
        const normalized = word.replace(/[.,?!]/g, '').toUpperCase();
        const isHighlighted = highlightWords.includes(normalized);
        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.06em] mr-[0.26em] last:mr-0"
            aria-hidden="true"
          >
            <span
              className={`tr-word-inner inline-block will-change-transform ${
                isHighlighted ? 'text-[#F04427]' : ''
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};
