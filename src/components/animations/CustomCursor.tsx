import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSmoothScroll } from './SmoothScroll';

type CursorVariant = 'default' | 'link' | 'project' | 'interactive' | 'ink';

export const CustomCursor: React.FC = () => {
  const { reducedMotion } = useSmoothScroll();
  const [enabled, setEnabled] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const hLineRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const coordsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) {
      setEnabled(false);
      return;
    }

    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setEnabled(pointerQuery.matches);
    update();
    pointerQuery.addEventListener('change', update);
    return () => pointerQuery.removeEventListener('change', update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const hLine = hLineRef.current;
    const vLine = vLineRef.current;
    const label = labelRef.current;
    const coords = coordsRef.current;
    const root = rootRef.current;

    if (!dot || !ring || !hLine || !vLine || !label || !coords || !root) return;

    let visible = false;
    let currentVariant: CursorVariant = 'default';

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });
    const guideY = gsap.quickTo(hLine, 'y', { duration: 0.16, ease: 'power2.out' });
    const guideX = gsap.quickTo(vLine, 'x', { duration: 0.16, ease: 'power2.out' });

    const applyVariant = (variant: CursorVariant, customText?: string) => {
      if (variant === currentVariant && !customText) return;
      currentVariant = variant;

      if (variant === 'project') {
        gsap.to(ring, { width: 88, height: 32, borderRadius: 2, borderColor: '#F04427', backgroundColor: 'rgba(240, 68, 39, 0.94)', duration: 0.22, ease: 'power3.out' });
        label.textContent = customText || 'VIEW CASE';
        gsap.to(label, { opacity: 1, duration: 0.18 });
      } else if (variant === 'link') {
        gsap.to(ring, { width: 34, height: 34, borderRadius: 0, borderColor: '#F04427', backgroundColor: 'rgba(240, 68, 39, 0.08)', duration: 0.2, ease: 'power3.out' });
        label.textContent = '';
        gsap.to(label, { opacity: 0, duration: 0.14 });
      } else if (variant === 'interactive') {
        gsap.to(ring, { width: 42, height: 42, borderRadius: 0, borderColor: '#252522', backgroundColor: 'rgba(242, 241, 233, 0.45)', duration: 0.2, ease: 'power3.out' });
        label.textContent = customText || '';
        gsap.to(label, { opacity: customText ? 1 : 0, duration: 0.16 });
      } else if (variant === 'ink') {
        gsap.to(ring, { width: 54, height: 54, borderRadius: 999, borderColor: '#F04427', backgroundColor: 'rgba(240, 68, 39, 0.06)', duration: 0.24, ease: 'power3.out' });
        label.textContent = '';
        gsap.to(label, { opacity: 0, duration: 0.14 });
      } else {
        gsap.to(ring, { width: 22, height: 22, borderRadius: 0, borderColor: 'rgba(37, 37, 34, 0.42)', backgroundColor: 'transparent', duration: 0.22, ease: 'power3.out' });
        label.textContent = '';
        gsap.to(label, { opacity: 0, duration: 0.14 });
      }
    };

    const handleMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(root, { opacity: 1, duration: 0.25 });
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      guideY(e.clientY);
      guideX(e.clientX);

      coords.textContent = `${String(Math.round(e.clientX)).padStart(4, '0')} · ${String(Math.round(e.clientY)).padStart(4, '0')}`;

      const target = e.target as HTMLElement | null;
      const cursorHost = target?.closest<HTMLElement>('[data-cursor]');
      if (cursorHost) {
        const type = (cursorHost.dataset.cursor as CursorVariant) || 'link';
        applyVariant(type, cursorHost.dataset.cursorLabel);
        return;
      }

      if (target?.closest('a, button, [role="button"], input, textarea, select')) {
        applyVariant('link');
      } else {
        applyVariant('default');
      }
    };

    const handleLeave = () => {
      visible = false;
      gsap.to(root, { opacity: 0, duration: 0.2 });
    };

    const handleDown = () => {
      gsap.to(dot, { scale: 1.6, duration: 0.12 });
    };

    const handleUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.16 });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-0 select-none"
    >
      {/* Subtle full-viewport architectural crosshair hairlines */}
      <div
        ref={hLineRef}
        className="fixed top-0 left-0 h-px w-full bg-[#252522]/[0.07]"
      />
      <div
        ref={vLineRef}
        className="fixed top-0 left-0 h-full w-px bg-[#252522]/[0.07]"
      />

      {/* Trailing architectural frame + contextual state label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-[#252522]/40"
        style={{ width: 22, height: 22 }}
      >
        <div
          ref={labelRef}
          className="font-mono text-[10px] tracking-[0.14em] text-white whitespace-nowrap opacity-0"
        />
      </div>

      {/* Crisp vermilion architectural square marker + live coordinates */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[6px] w-[6px] bg-[#F04427]" />
        <div
          ref={coordsRef}
          className="absolute top-3 left-3 font-mono text-[9px] leading-none tracking-[0.08em] text-[#77776F] tabular-nums whitespace-nowrap"
        />
      </div>
    </div>
  );
};
