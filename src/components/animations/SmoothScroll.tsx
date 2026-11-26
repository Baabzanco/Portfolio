import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
  reducedMotion: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  reducedMotion: false,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Reset scroll position and recalculate ScrollTrigger geometry on route change
  useEffect(() => {
    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl instanceof HTMLElement) {
        window.setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { offset: -64, immediate: false });
          } else {
            targetEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
          }
          ScrollTrigger.refresh();
        }, 80);
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(refreshTimeout);
  }, [location.pathname, location.hash, reducedMotion]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean }
  ) => {
    const offset = options?.offset ?? -64;
    if (lenisRef.current && !reducedMotion) {
      lenisRef.current.scrollTo(target, {
        offset,
        immediate: options?.immediate ?? false,
        duration: 1.25,
      });
      return;
    }

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, reducedMotion }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
