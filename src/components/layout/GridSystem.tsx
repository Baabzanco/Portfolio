import React from 'react';

/**
 * Persistent full-page vertical architectural grid rails (Swiss 4-column desktop guide lines).
 * Stays subtle behind page content to establish consistent technical structure across sections.
 */
export const ArchitecturalBackdropGrid: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10"
    >
      <div className="grid h-full grid-cols-4 lg:grid-cols-12">
        <div className="border-l border-[#C9C8BE]/45 h-full col-span-1 lg:col-span-3" />
        <div className="border-l border-[#C9C8BE]/45 h-full col-span-1 lg:col-span-3" />
        <div className="border-l border-[#C9C8BE]/45 h-full col-span-1 lg:col-span-3" />
        <div className="border-l border-r border-[#C9C8BE]/45 h-full col-span-1 lg:col-span-3" />
      </div>
    </div>
  );
};

/**
 * Architectural registration cross (+) used at grid intersections.
 */
export const RegistrationMark: React.FC<{
  className?: string;
  accent?: boolean;
}> = ({ className = '', accent = false }) => (
  <svg
    aria-hidden="true"
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className={`shrink-0 ${accent ? 'text-[#F04427]' : 'text-[#77776F]'} ${className}`}
  >
    <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

interface SectionHeaderBarProps {
  number: string;
  label: string;
  metaRight?: string;
}

/**
 * Consistent architectural header band at the top of each chapter.
 * Uses clean unboxed editorial typography—zero pill badges or mechanical comment syntax.
 */
export const SectionHeaderBar: React.FC<SectionHeaderBarProps> = ({
  number,
  label,
  metaRight,
}) => {
  return (
    <div className="relative z-10 border-t border-b border-[#C9C8BE] bg-[#F2F1E9]/85">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 items-center py-3 text-xs">
          <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
            <RegistrationMark accent />
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#252522] tabular-nums">
              {number}
            </span>
            <span className="text-[#C9C8BE]" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#77776F]">
              {label}
            </span>
          </div>
          <div className="hidden lg:block lg:col-span-6" />
          <div className="col-span-6 lg:col-span-3 text-right font-mono text-[11px] tracking-[0.08em] text-[#77776F] tabular-nums">
            {metaRight || 'AMIR MORADSALEH'}
          </div>
        </div>
      </div>
    </div>
  );
};
