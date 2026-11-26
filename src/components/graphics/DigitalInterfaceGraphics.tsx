import React from 'react';

/**
 * Hero Browser & Digital Interface Wireframe SVG.
 * Represents a contemporary experimental website layout being assembled:
 * layered browser windows, top navigation bar, modular web grid, typography guides,
 * media frames, button components, and vermilion interactive UI markers.
 */
export const HeroBrowserWireframe: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 920 540"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full ${className}`}
    aria-hidden="true"
  >
    {/* Modular website column guides */}
    <g stroke="#C9C8BE" strokeWidth="0.85">
      <line className="hero-draw-line" x1="64" y1="36" x2="64" y2="504" />
      <line className="hero-draw-line" x1="252" y1="36" x2="252" y2="504" strokeDasharray="3 4" />
      <line className="hero-draw-line" x1="460" y1="36" x2="460" y2="504" strokeDasharray="3 4" />
      <line className="hero-draw-line" x1="668" y1="36" x2="668" y2="504" strokeDasharray="3 4" />
      <line className="hero-draw-line" x1="856" y1="36" x2="856" y2="504" />
      <line className="hero-draw-line" x1="40" y1="104" x2="880" y2="104" />
      <line className="hero-draw-line" x1="40" y1="448" x2="880" y2="448" />
    </g>

    {/* Secondary background floating browser window (layered depth) */}
    <g stroke="#77776F" strokeWidth="1">
      <rect className="hero-draw-line" x="488" y="42" width="388" height="252" rx="2" />
      <line className="hero-draw-line" x1="488" y1="70" x2="876" y2="70" />
      <rect className="hero-draw-line" x="510" y="92" width="156" height="14" />
      <rect className="hero-draw-line" x="510" y="120" width="220" height="8" />
      <rect className="hero-draw-line" x="510" y="138" width="176" height="8" />
    </g>

    {/* Primary foreground experimental website browser window */}
    <g stroke="#252522" strokeWidth="1.25">
      {/* Outer browser chrome */}
      <rect className="hero-draw-line" x="64" y="84" width="724" height="396" rx="2" fill="#F2F1E9" fillOpacity="0.62" />
      {/* Browser toolbar & URL rail */}
      <line className="hero-draw-line" x1="64" y1="120" x2="788" y2="120" />
      <circle className="hero-draw-line" cx="86" cy="102" r="4" />
      <circle className="hero-draw-line" cx="102" cy="102" r="4" />
      <circle className="hero-draw-line" cx="118" cy="102" r="4" />
      <rect className="hero-draw-line" x="260" y="94" width="290" height="16" />

      {/* Website header navigation wireframe */}
      <line className="hero-draw-line" x1="64" y1="164" x2="788" y2="164" />
      <rect className="hero-draw-line" x="92" y="136" width="118" height="12" />
      <line className="hero-draw-line" x1="418" y1="142" x2="462" y2="142" />
      <line className="hero-draw-line" x1="484" y1="142" x2="530" y2="142" />
      <line className="hero-draw-line" x1="552" y1="142" x2="594" y2="142" />
      <rect className="hero-draw-line" x="688" y="132" width="72" height="20" />

      {/* Left editorial typography wireframe column */}
      <line className="hero-draw-line" x1="448" y1="164" x2="448" y2="412" />
      <rect className="hero-draw-line" x="92" y="192" width="296" height="24" />
      <rect className="hero-draw-line" x="92" y="226" width="320" height="24" />
      <rect className="hero-draw-line" x="92" y="260" width="218" height="24" />
      <line className="hero-draw-line" x1="92" y1="308" x2="352" y2="308" />
      <line className="hero-draw-line" x1="92" y1="324" x2="314" y2="324" />

      {/* Primary & Secondary UI CTA buttons */}
      <rect className="hero-draw-line" x="92" y="352" width="142" height="36" stroke="#F04427" strokeWidth="1.5" />
      <rect className="hero-draw-line" x="248" y="352" width="114" height="36" />

      {/* Right modular UI media card placeholder */}
      <rect className="hero-draw-line" x="476" y="192" width="284" height="196" />
      <line className="hero-draw-line" x1="476" y1="192" x2="760" y2="388" stroke="#77776F" strokeWidth="0.8" />
      <line className="hero-draw-line" x1="760" y1="192" x2="476" y2="388" stroke="#77776F" strokeWidth="0.8" />

      {/* Bottom 3-column UI component strip */}
      <line className="hero-draw-line" x1="64" y1="412" x2="788" y2="412" />
      <line className="hero-draw-line" x1="306" y1="412" x2="306" y2="480" />
      <line className="hero-draw-line" x1="548" y1="412" x2="548" y2="480" />
    </g>

    {/* Floating mobile responsive breakpoint preview frame */}
    <g stroke="#252522" strokeWidth="1.2">
      <rect className="hero-draw-line" x="724" y="266" width="146" height="236" rx="6" fill="#F2F1E9" fillOpacity="0.88" />
      <line className="hero-draw-line" x1="724" y1="294" x2="870" y2="294" />
      <rect className="hero-draw-line" x="742" y="312" width="110" height="16" />
      <rect className="hero-draw-line" x="742" y="338" width="84" height="10" />
      <rect className="hero-draw-line" x="742" y="362" width="110" height="84" />
      <rect className="hero-draw-line" x="742" y="458" width="76" height="24" stroke="#F04427" />
    </g>

    {/* Vermilion interactive pointer & UI state marker */}
    <g className="hero-marker">
      <circle cx="234" cy="370" r="20" stroke="#F04427" strokeWidth="1.15" fill="#F04427" fillOpacity="0.08" />
      <polygon points="232,364 232,382 238,377 244,386 247,384 241,375 248,375" fill="#F04427" />
      <line x1="254" y1="370" x2="476" y2="290" stroke="#F04427" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="472" y="286" width="8" height="8" fill="#F04427" />
    </g>

    {/* Subtle digital UI metadata annotations */}
    <g
      className="hero-annotation"
      fill="#77776F"
      fontFamily="IBM Plex Mono, monospace"
      fontSize="9.5"
      letterSpacing="0.1em"
    >
      <text x="72" y="66">VIEWPORT · 1440 × 900</text>
      <text x="502" y="60">LAYER 02 · COMPONENT SYSTEM</text>
      <text x="742" y="284" fill="#252522">MOBILE 390PX</text>
      <text x="92" y="402" fill="#F04427">INTERACTIVE CTA · ACTIVE</text>
    </g>
  </svg>
);

/**
 * Section 03 — Four Web-Design Challenge Diagrams:
 * 01 CLARITY (Typography hierarchy & content organization)
 * 02 STRUCTURE (Modular website grid & reusable UI components)
 * 03 INTERACTION (Cursor states, buttons, hover micro-interactions)
 * 04 PERFORMANCE (Browser compositor layers, loading states & 60fps cadence)
 */
export const ChallengeInterfaceDiagram: React.FC<{
  type: 'clarity' | 'structure' | 'interaction' | 'performance';
  active: boolean;
}> = ({ type, active }) => {
  if (type === 'clarity') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        {/* Clean editorial browser canvas */}
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        <line x1="16" y1="36" x2="244" y2="36" stroke="#C9C8BE" strokeWidth="0.8" />
        <text x="24" y="29" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
          TYPE HIERARCHY · H1—P
        </text>

        {/* H1 Oversized Display Block */}
        <text
          x="28"
          y="74"
          fill="#252522"
          fontFamily="Bricolage Grotesque, sans-serif"
          fontSize="28"
          fontWeight="700"
          className="transition-transform duration-300"
          style={{ transform: active ? 'translateX(4px)' : 'translateX(0px)' }}
        >
          Aa
        </text>
        <rect
          x="74"
          y="52"
          width={active ? 152 : 128}
          height="10"
          fill="#252522"
          className="challenge-draw-path transition-all duration-300"
        />
        <rect
          x="74"
          y="68"
          width={active ? 114 : 96}
          height="7"
          fill="#77776F"
          className="challenge-draw-path transition-all duration-300"
        />

        {/* Structured content reading blocks with vermilion focal hierarchy rule */}
        <line x1="28" y1="94" x2="232" y2="94" stroke="#C9C8BE" strokeWidth="0.8" />
        <rect
          x="28"
          y="108"
          width="6"
          height="38"
          fill={active ? '#F04427' : '#252522'}
          className="transition-colors duration-300"
        />
        <line x1="44" y1="112" x2="174" y2="112" stroke="#252522" strokeWidth="2" className="challenge-draw-path" />
        <line x1="44" y1="125" x2="218" y2="125" stroke="#77776F" strokeWidth="1.3" className="challenge-draw-path" />
        <line x1="44" y1="138" x2="192" y2="138" stroke="#77776F" strokeWidth="1.3" className="challenge-draw-path" />
        <text x="196" y="154" fill={active ? '#F04427' : '#77776F'} fontFamily="IBM Plex Mono, monospace" fontSize="8">
          68CH MAX
        </text>
      </svg>
    );
  }

  if (type === 'structure') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        {/* Browser window + modular 12-col layout grid */}
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        {/* Faint column overlay */}
        {[34, 68, 102, 136, 170, 204].map((x) => (
          <rect
            key={x}
            x={x}
            y="24"
            width="22"
            height="132"
            fill={active ? '#F04427' : '#C9C8BE'}
            fillOpacity={active ? 0.08 : 0.16}
            className="transition-colors duration-300"
          />
        ))}

        {/* Modular UI layout components snapping cleanly onto columns */}
        <g stroke="#252522" strokeWidth="1.05">
          {/* Header component */}
          <rect x="28" y="28" width="204" height="20" fill="#F2F1E9" className="challenge-draw-path" />
          {/* Sidebar nav component */}
          <rect x="28" y="56" width="56" height="96" fill="#E8E7DE" className="challenge-draw-path" />
          {/* Hero module */}
          <rect x="92" y="56" width="140" height="48" fill="#F2F1E9" className="challenge-draw-path" />
          {/* Two reusable card components */}
          <rect x="92" y="112" width="66" height="40" fill="#F2F1E9" className="challenge-draw-path" />
          <rect
            x="166"
            y="112"
            width="66"
            height="40"
            fill={active ? '#F04427' : '#F2F1E9'}
            stroke={active ? '#F04427' : '#252522'}
            className="challenge-draw-path transition-colors duration-300"
          />
        </g>

        <text x="34" y="41" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8">
          NAV · 12-COL SYSTEM
        </text>
      </svg>
    );
  }

  if (type === 'interaction') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        <text x="24" y="31" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
          UI STATES · HOVER / PRESS
        </text>

        {/* Top interactive toggle / pill switch */}
        <rect x="30" y="46" width="66" height="24" rx="12" stroke="#252522" strokeWidth="1.1" fill="#F2F1E9" />
        <circle
          cx={active ? 82 : 44}
          cy="58"
          r="8"
          fill={active ? '#F04427' : '#252522'}
          className="transition-all duration-300"
        />

        {/* State label lines */}
        <rect x="114" y="48" width="116" height="20" stroke="#C9C8BE" strokeWidth="0.9" />
        <line x1="124" y1="58" x2={active ? 214 : 176} y2="58" stroke="#252522" strokeWidth="1.5" className="transition-all duration-300" />

        {/* Interactive Button Component */}
        <rect
          x="30"
          y="96"
          width="132"
          height="42"
          fill={active ? '#F04427' : '#252522'}
          className="challenge-draw-path transition-colors duration-300"
        />
        <text x="52" y="121" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.1em">
          {active ? 'STATE: ACTIVE' : 'EXPLORE UI'}
        </text>

        {/* Hover ripple halo + crisp pointer cursor */}
        <circle
          cx="154"
          cy="124"
          r={active ? 24 : 13}
          stroke="#F04427"
          strokeWidth="1"
          opacity={active ? 0.65 : 0.25}
          className="transition-all duration-300"
        />
        <g
          className="transition-transform duration-300"
          style={{ transform: active ? 'translate(-8px, -6px)' : 'translate(0px, 0px)' }}
        >
          <polygon
            points="154,116 154,142 162,135 169,147 174,144 167,132 176,132"
            fill="#F2F1E9"
            stroke="#252522"
            strokeWidth="1.4"
          />
        </g>

        {/* Easing curve indicator */}
        <path
          d="M 184 138 C 194 138, 198 98, 232 98"
          stroke="#F04427"
          strokeWidth="1.2"
          className="challenge-draw-path"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
      <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
      <text x="24" y="31" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
        BROWSER COMPOSITOR · 60FPS
      </text>

      {/* Stacked GPU render layers (DOM -> Layout -> Composite) */}
      <g className="transition-transform duration-300">
        <rect
          x="32"
          y={active ? 44 : 50}
          width="116"
          height="32"
          fill="#E8E7DE"
          stroke="#252522"
          strokeWidth="1"
          className="challenge-draw-path transition-all duration-300"
        />
        <text x="42" y={active ? 63 : 69} fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="8">
          01 · GPU LAYER
        </text>

        <rect
          x="44"
          y="86"
          width="116"
          height="30"
          fill="#F2F1E9"
          stroke="#252522"
          strokeWidth="1"
          className="challenge-draw-path"
        />
        <text x="54" y="104" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8">
          02 · LAZY MEDIA
        </text>

        <rect
          x="56"
          y={active ? 124 : 120}
          width="116"
          height="26"
          fill={active ? '#F04427' : '#252522'}
          className="transition-all duration-300"
        />
        <text x="66" y={active ? 140 : 136} fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="8">
          16.6MS FRAME OK
        </text>
      </g>

      {/* Live frame-time cadence bars on right */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 52 + i * 20;
        const w = active ? [52, 46, 56, 48, 54][i] : [36, 44, 30, 48, 38][i];
        return (
          <g key={i}>
            <rect x="178" y={y} width="54" height="8" fill="#E8E7DE" />
            <rect
              x="178"
              y={y}
              width={w}
              height="8"
              fill={i === 2 ? '#F04427' : '#252522'}
              className="transition-all duration-300"
            />
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Section 07 — Capabilities Digital Design Specimen SVG
 * Displays a distinct web-design / UI artifact for each discipline.
 */
export const CapabilityInterfaceSpecimen: React.FC<{ capabilityId: string }> = ({
  capabilityId,
}) => {
  return (
    <svg viewBox="0 0 420 340" fill="none" className="w-full h-full">
      {/* Clean browser window canvas */}
      <rect x="20" y="20" width="380" height="300" stroke="#C9C8BE" strokeWidth="1" fill="#F2F1E9" />
      <line x1="20" y1="54" x2="400" y2="54" stroke="#C9C8BE" strokeWidth="0.9" />
      <circle cx="38" cy="37" r="4" stroke="#77776F" strokeWidth="1" />
      <circle cx="52" cy="37" r="4" stroke="#77776F" strokeWidth="1" />
      <circle cx="66" cy="37" r="4" fill="#F04427" />
      <text x="86" y="40" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" letterSpacing="0.1em">
        PREVIEW · {capabilityId.toUpperCase()}
      </text>

      {capabilityId === 'web-design' && (
        <g>
          {/* Editorial website layout grid */}
          <rect x="40" y="72" width="340" height="28" fill="#E8E7DE" stroke="#252522" strokeWidth="1" />
          <text x="52" y="90" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            BRAND    WORK   JOURNAL   CONTACT
          </text>
          <rect x="40" y="114" width="170" height="184" fill="#F2F1E9" stroke="#252522" strokeWidth="1.1" />
          <text x="54" y="150" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="22" fontWeight="700">
            EDITORIAL
          </text>
          <text x="54" y="176" fill="#252522" fontFamily="Bricolage Grotesque, sans-serif" fontSize="22" fontWeight="700">
            SYSTEMS.
          </text>
          <line x1="54" y1="200" x2="188" y2="200" stroke="#77776F" strokeWidth="1.2" />
          <line x1="54" y1="214" x2="164" y2="214" stroke="#77776F" strokeWidth="1.2" />
          <rect x="54" y="242" width="102" height="32" fill="#F04427" />
          <text x="70" y="262" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            VIEW WORK
          </text>

          <rect x="224" y="114" width="156" height="114" fill="#E8E7DE" stroke="#252522" strokeWidth="1.1" />
          <rect x="224" y="240" width="72" height="58" stroke="#252522" strokeWidth="1" />
          <rect x="308" y="240" width="72" height="58" fill="#252522" />
          <text x="236" y="176" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            HERO MEDIA 4:3
          </text>
        </g>
      )}

      {capabilityId === 'creative-development' && (
        <g>
          {/* Split Code Editor + Live Component Output */}
          <rect x="38" y="74" width="166" height="224" fill="#252522" />
          <text x="52" y="100" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            &lt;InteractiveCanvas /&gt;
          </text>
          <line x1="52" y1="120" x2="164" y2="120" stroke="#77776F" strokeWidth="2" />
          <line x1="64" y1="138" x2="182" y2="138" stroke="#C9C8BE" strokeWidth="2" />
          <line x1="64" y1="156" x2="148" y2="156" stroke="#F04427" strokeWidth="2" />
          <line x1="64" y1="174" x2="176" y2="174" stroke="#C9C8BE" strokeWidth="2" />
          <line x1="52" y1="196" x2="136" y2="196" stroke="#77776F" strokeWidth="2" />
          <rect x="52" y="246" width="136" height="32" stroke="#77776F" strokeWidth="0.9" />
          <text x="64" y="266" fill="#E8E7DE" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
            TSX · 60FPS · CLEAN
          </text>

          {/* Live rendered UI component preview */}
          <rect x="218" y="74" width="164" height="224" fill="#E8E7DE" stroke="#252522" strokeWidth="1.1" />
          <rect x="236" y="96" width="128" height="76" fill="#F2F1E9" stroke="#252522" strokeWidth="1" />
          <circle cx="300" cy="134" r="22" fill="#F04427" />
          <rect x="236" y="190" width="128" height="34" fill="#F2F1E9" stroke="#252522" strokeWidth="1" />
          <rect x="236" y="238" width="84" height="32" fill="#252522" />
          <text x="252" y="258" fill="#F2F1E9" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            RENDERED
          </text>
        </g>
      )}

      {capabilityId === 'interaction-design' && (
        <g>
          {/* Motion curve & component state choreography */}
          <rect x="40" y="76" width="340" height="122" fill="#E8E7DE" stroke="#252522" strokeWidth="1" />
          <path d="M 64 176 C 128 176, 148 98, 240 98 C 304 98, 324 148, 356 148" stroke="#F04427" strokeWidth="2" />
          <line x1="64" y1="176" x2="148" y2="176" stroke="#252522" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="148" y1="98" x2="240" y2="98" stroke="#252522" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="64" cy="176" r="5" fill="#252522" />
          <circle cx="240" cy="98" r="8" fill="#F04427" />
          <circle cx="356" cy="148" r="5" fill="#252522" />
          <text x="54" y="96" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
            CUBIC-BEZIER(0.16, 1, 0.3, 1)
          </text>

          {/* 3 UI Interaction States */}
          <rect x="40" y="216" width="104" height="78" stroke="#C9C8BE" strokeWidth="1" fill="#F2F1E9" />
          <text x="54" y="238" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">01 IDLE</text>
          <rect x="54" y="252" width="76" height="24" stroke="#252522" strokeWidth="1" />

          <rect x="158" y="216" width="104" height="78" stroke="#252522" strokeWidth="1.1" fill="#F2F1E9" />
          <text x="172" y="238" fill="#252522" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">02 HOVER</text>
          <rect x="172" y="252" width="76" height="24" fill="#252522" />

          <rect x="276" y="216" width="104" height="78" stroke="#F04427" strokeWidth="1.2" fill="#E8E7DE" />
          <text x="290" y="238" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">03 ACTIVE</text>
          <rect x="290" y="252" width="76" height="24" fill="#F04427" />
        </g>
      )}

      {capabilityId === 'digital-experience' && (
        <g>
          {/* Responsive ecosystem: Desktop + Tablet + Mobile viewports */}
          <rect x="38" y="76" width="236" height="162" fill="#E8E7DE" stroke="#252522" strokeWidth="1.1" />
          <line x1="38" y1="100" x2="274" y2="100" stroke="#252522" strokeWidth="0.9" />
          <rect x="54" y="116" width="104" height="18" fill="#252522" />
          <rect x="54" y="144" width="84" height="10" fill="#77776F" />
          <rect x="172" y="116" width="86" height="98" fill="#F2F1E9" stroke="#252522" strokeWidth="1" />
          <rect x="54" y="186" width="74" height="26" fill="#F04427" />

          {/* Mobile responsive viewport overlapping cleanly */}
          <rect x="292" y="112" width="90" height="184" rx="6" fill="#F2F1E9" stroke="#252522" strokeWidth="1.25" />
          <line x1="292" y1="134" x2="382" y2="134" stroke="#C9C8BE" strokeWidth="0.9" />
          <rect x="304" y="146" width="66" height="14" fill="#252522" />
          <rect x="304" y="168" width="66" height="72" fill="#E8E7DE" stroke="#252522" strokeWidth="0.9" />
          <rect x="304" y="252" width="66" height="24" fill="#F04427" />

          <text x="42" y="268" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            DESKTOP 1440  ↔  MOBILE 390
          </text>
          <path d="M 244 264 L 284 264" stroke="#F04427" strokeWidth="1.4" />
        </g>
      )}

      {capabilityId === 'experimental-web' && (
        <g>
          {/* Expressive editorial typography + layered interactive canvas */}
          <rect x="44" y="80" width="224" height="152" fill="#252522" />
          <text x="60" y="142" fill="#F2F1E9" fontFamily="Bricolage Grotesque, sans-serif" fontSize="42" fontWeight="700">
            SCROLL
          </text>
          <text x="60" y="190" fill="none" stroke="#F2F1E9" strokeWidth="1.2" fontFamily="Bricolage Grotesque, sans-serif" fontSize="42" fontWeight="700">
            MOTION
          </text>

          <rect x="196" y="156" width="184" height="136" fill="#F2F1E9" stroke="#252522" strokeWidth="1.2" />
          <line x1="196" y1="180" x2="380" y2="180" stroke="#C9C8BE" strokeWidth="0.9" />
          <circle cx="288" cy="236" r="34" fill="#F04427" fillOpacity="0.92" />
          <text x="210" y="172" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="8.5">
            CANVAS · INK MASK
          </text>
        </g>
      )}
    </svg>
  );
};
