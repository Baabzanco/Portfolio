import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useSmoothScroll } from '../animations/SmoothScroll';

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    scrollTo(href, { offset: -64 });
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      scrollTo(0, { offset: 0 });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-[#F2F1E9]/94 backdrop-blur-md border-[#C9C8BE]'
          : 'bg-[#F2F1E9]/82 backdrop-blur-sm border-[#C9C8BE]/80'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Strict 3-zone single-row Top Bar Contract */}
        <div className="flex h-14 lg:h-16 items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark only */}
          <Link
            to="/"
            onClick={handleBrandClick}
            data-cursor="link"
            className="font-display text-sm sm:text-[15px] font-semibold tracking-[0.06em] text-[#252522] hover:text-[#F04427] transition-colors whitespace-nowrap shrink-0"
          >
            {siteConfig.brand.name}
          </Link>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                data-cursor="link"
                className="relative py-1 text-[13px] font-medium tracking-[0.02em] text-[#77776F] hover:text-[#252522] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#F04427] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary action (desktop) + mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              data-cursor="link"
              className="hidden sm:inline-flex items-center justify-center bg-[#252522] px-4 py-2 text-xs font-medium tracking-[0.06em] text-[#F2F1E9] hover:bg-[#F04427] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Let&apos;s Talk
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center border border-[#C9C8BE] text-[#252522] hover:border-[#252522] transition-colors"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#C9C8BE] bg-[#F2F1E9]">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-[1600px] px-4 py-4 flex flex-col divide-y divide-[#C9C8BE]/70"
          >
            {siteConfig.navigation.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="flex items-center justify-between py-3.5 text-base font-display font-medium text-[#252522] hover:text-[#F04427] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#77776F] tabular-nums">
                  0{idx + 1}
                </span>
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="flex w-full items-center justify-center bg-[#252522] px-5 py-3 text-xs font-medium tracking-[0.08em] text-[#F2F1E9] hover:bg-[#F04427] transition-colors"
              >
                LET&apos;S TALK
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
