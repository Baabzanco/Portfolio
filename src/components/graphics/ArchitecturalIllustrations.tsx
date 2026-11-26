import React from 'react';

/**
 * Hero Architectural Wireframe SVG.
 * Uses semantic CSS classes (.hero-draw-line, .hero-marker, .hero-annotation)
 * so GSAP can choreograph progressive stroke-dashoffset drawing and scroll parallax.
 */
export const HeroArchitecturalWireframe: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 920 540"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full ${className}`}
    aria-hidden="true"
  >
    {/* Background perspective construction guides */}
    <g stroke="#C9C8BE" strokeWidth="0.9">
      <line className="hero-draw-line" x1="40" y1="60" x2="880" y2="60" />
      <line className="hero-draw-line" x1="40" y1="480" x2="880" y2="480" />
      <line className="hero-draw-line" x1="120" y1="20" x2="120" y2="520" />
      <line className="hero-draw-line" x1="460" y1="20" x2="460" y2="520" strokeDasharray="4 4" />
      <line className="hero-draw-line" x1="800" y1="20" x2="800" y2="520" />
      <line className="hero-draw-line" x1="120" y1="480" x2="800" y2="60" strokeDasharray="3 5" />
    </g>

    {/* Primary isometric architectural pavilion wireframe */}
    <g stroke="#252522" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter">
      {/* Plinth base */}
      <polygon
        className="hero-draw-line"
        points="150,370 460,465 780,340 480,255"
      />
      <polyline
        className="hero-draw-line"
        points="150,370 150,398 460,493 780,368 780,340"
      />
      <line className="hero-draw-line" x1="460" y1="465" x2="460" y2="493" />

      {/* Left cantilevered gallery volume */}
      <polygon
        className="hero-draw-line"
        points="210,210 470,122 575,152 315,240"
      />
      <polyline
        className="hero-draw-line"
        points="210,210 210,335 315,365 315,240"
      />
      <line className="hero-draw-line" x1="575" y1="152" x2="575" y2="270" />
      <line className="hero-draw-line" x1="315" y1="365" x2="510" y2="298" />

      {/* Right monolithic portal volume */}
      <polygon
        className="hero-draw-line"
        points="515,205 630,165 735,195 620,235"
      />
      <polyline
        className="hero-draw-line"
        points="515,205 515,360 620,392 620,235"
      />
      <polyline
        className="hero-draw-line"
        points="620,392 735,350 735,195"
      />

      {/* Courtyard interior framing & aperture */}
      <polyline
        className="hero-draw-line"
        points="315,286 445,326 515,302"
      />
      <rect className="hero-draw-line" x="546" y="256" width="44" height="92" transform="skewY(16)" />
      <line className="hero-draw-line" x1="445" y1="326" x2="445" y2="412" />
    </g>

    {/* Fine architectural dimension callouts */}
    <g stroke="#77776F" strokeWidth="0.85">
      <line className="hero-draw-line" x1="150" y1="435" x2="460" y2="520" />
      <line className="hero-draw-line" x1="825" y1="165" x2="825" y2="368" />
      <line className="hero-draw-line" x1="818" y1="165" x2="832" y2="165" />
      <line className="hero-draw-line" x1="818" y1="368" x2="832" y2="368" />
      <circle className="hero-draw-line" cx="460" cy="270" r="145" strokeDasharray="2 6" />
    </g>

    {/* Vermilion architectural origin & focal geometry */}
    <g className="hero-marker">
      <circle cx="515" cy="404" r="22" stroke="#F04427" strokeWidth="1.2" />
      <rect x="510" y="399" width="10" height="10" fill="#F04427" />
      <line x1="515" y1="366" x2="515" y2="442" stroke="#F04427" strokeWidth="0.9" />
      <line x1="477" y1="404" x2="553" y2="404" stroke="#F04427" strokeWidth="0.9" />
    </g>

    {/* Subtle technical drafting coordinates */}
    <g
      className="hero-annotation"
      fill="#77776F"
      fontFamily="IBM Plex Mono, monospace"
      fontSize="10"
      letterSpacing="0.1em"
    >
      <text x="128" y="48">AXIS A · ELEVATION 01</text>
      <text x="655" y="48">SCALE 1:100 · SYSTEM</text>
      <text x="836" y="272">H 204</text>
      <text x="544" y="410" fill="#F04427">ORIGIN 00</text>
    </g>
  </svg>
);

/**
 * Challenge Section 4 Bespoke Architectural SVG Illustrations
 */
export const ChallengeDiagram: React.FC<{
  type: 'clarity' | 'structure' | 'interaction' | 'performance';
  active: boolean;
}> = ({ type, active }) => {
  if (type === 'clarity') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        {/* Outer reference grid */}
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        <line x1="130" y1="16" x2="130" y2="164" stroke="#C9C8BE" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="16" y1="90" x2="244" y2="90" stroke="#C9C8BE" strokeWidth="0.75" strokeDasharray="3 3" />

        {/* Concentric optical aperture converging into focal clarity */}
        <circle
          cx="130"
          cy="90"
          r="56"
          stroke="#252522"
          strokeWidth="1"
          className="challenge-draw-path transition-transform duration-500 origin-center"
          style={{ transform: active ? 'scale(0.92)' : 'scale(1)' }}
        />
        <rect
          x="86"
          y="46"
          width="88"
          height="88"
          stroke="#252522"
          strokeWidth="1"
          className="challenge-draw-path transition-transform duration-500 origin-center"
          style={{ transform: active ? 'rotate(45deg) scale(0.84)' : 'rotate(0deg) scale(1)' }}
        />
        <line
          x1="44"
          y1="90"
          x2="216"
          y2="90"
          stroke="#252522"
          strokeWidth="1"
          className="challenge-draw-path"
        />
        <circle
          cx="130"
          cy="90"
          r={active ? 14 : 9}
          fill="#F04427"
          className="transition-all duration-300"
        />
        <text x="24" y="32" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
          FOCUS 01
        </text>
      </svg>
    );
  }

  if (type === 'structure') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        {/* Swiss modular ratio grid */}
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        <g stroke="#252522" strokeWidth="1.05">
          <rect
            x="28"
            y="28"
            width="116"
            height="124"
            className="challenge-draw-path"
            fill={active ? '#E8E7DE' : 'transparent'}
          />
          <rect x="154" y="28" width="78" height="72" className="challenge-draw-path" />
          <rect x="154" y="110" width="34" height="42" className="challenge-draw-path" />
          <rect
            x="198"
            y="110"
            width="34"
            height="42"
            fill={active ? '#F04427' : 'transparent'}
            stroke={active ? '#F04427' : '#252522'}
            className="challenge-draw-path transition-colors duration-300"
          />
        </g>
        {/* Golden ratio arc */}
        <path
          d="M 28 152 A 116 116 0 0 1 144 36"
          stroke="#F04427"
          strokeWidth="1.1"
          strokeDasharray={active ? '0' : '4 4'}
          className="challenge-draw-path transition-all duration-300"
        />
        <text x="36" y="46" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
          1 : 1.618
        </text>
      </svg>
    );
  }

  if (type === 'interaction') {
    return (
      <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
        <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
        {/* Interactive vector impulse curve */}
        <path
          d="M 32 134 C 76 134, 86 48, 130 48 C 174 48, 184 134, 228 134"
          stroke="#252522"
          strokeWidth="1.2"
          className="challenge-draw-path"
        />
        <line x1="32" y1="134" x2="228" y2="134" stroke="#C9C8BE" strokeWidth="0.8" />
        {/* Tangent handles */}
        <line
          x1="86"
          y1="48"
          x2="174"
          y2="48"
          stroke="#F04427"
          strokeWidth="1"
          className="transition-opacity duration-300"
          opacity={active ? 1 : 0.6}
        />
        <circle cx="86" cy="48" r="3.5" fill="#F2F1E9" stroke="#F04427" strokeWidth="1.2" />
        <circle cx="174" cy="48" r="3.5" fill="#F2F1E9" stroke="#F04427" strokeWidth="1.2" />

        {/* Impulse rings */}
        <circle
          cx="130"
          cy="48"
          r={active ? 26 : 16}
          stroke="#F04427"
          strokeWidth="0.9"
          opacity={active ? 0.55 : 0.25}
          className="transition-all duration-500"
        />
        <circle cx="130" cy="48" r="5" fill="#F04427" />
        <text x="24" y="32" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
          RESPONSE
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
      <rect x="16" y="16" width="228" height="148" stroke="#C9C8BE" strokeWidth="0.9" />
      {/* Precision frame-cadence bars */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const x = 34 + i * 17.2;
        const baseHeight = [42, 62, 54, 78, 86, 72, 92, 84, 68, 74, 58, 48][i];
        const height = active ? Math.min(104, baseHeight + 12) : baseHeight;
        const isPeak = i === 6;
        return (
          <g key={i}>
            <line
              x1={x}
              y1={146}
              x2={x}
              y2={146 - height}
              stroke={isPeak ? '#F04427' : '#252522'}
              strokeWidth={isPeak ? '2.2' : '1.25'}
              className="challenge-draw-path transition-all duration-300"
            />
            <rect
              x={x - 2}
              y={146 - height - 2}
              width="4"
              height="4"
              fill={isPeak ? '#F04427' : '#252522'}
            />
          </g>
        );
      })}
      <line x1="28" y1="54" x2="232" y2="54" stroke="#F04427" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="24" y="32" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="9">
        16.6MS BUDGET
      </text>
    </svg>
  );
};

/**
 * Capability Accordion Accompanying Architectural Illustration
 */
export const CapabilitySpecimenSvg: React.FC<{ capabilityId: string }> = ({ capabilityId }) => {
  return (
    <svg viewBox="0 0 420 340" fill="none" className="w-full h-full">
      {/* Persistent drafting frame */}
      <rect x="20" y="20" width="380" height="300" stroke="#C9C8BE" strokeWidth="1" />
      <line x1="20" y1="68" x2="400" y2="68" stroke="#C9C8BE" strokeWidth="0.8" />
      <line x1="210" y1="20" x2="210" y2="320" stroke="#C9C8BE" strokeWidth="0.7" strokeDasharray="3 4" />
      <line x1="20" y1="194" x2="400" y2="194" stroke="#C9C8BE" strokeWidth="0.7" strokeDasharray="3 4" />

      {capabilityId === 'web-design' && (
        <g>
          <rect x="48" y="92" width="144" height="196" fill="#E8E7DE" stroke="#252522" strokeWidth="1.2" />
          <rect x="212" y="92" width="160" height="90" stroke="#252522" strokeWidth="1.2" />
          <rect x="212" y="198" width="72" height="90" stroke="#252522" strokeWidth="1.2" />
          <rect x="300" y="198" width="72" height="90" fill="#F04427" />
          <line x1="68" y1="126" x2="172" y2="126" stroke="#252522" strokeWidth="2.4" />
          <line x1="68" y1="146" x2="148" y2="146" stroke="#252522" strokeWidth="2.4" />
          <line x1="68" y1="176" x2="162" y2="176" stroke="#77776F" strokeWidth="1" />
          <line x1="68" y1="192" x2="152" y2="192" stroke="#77776F" strokeWidth="1" />
        </g>
      )}

      {capabilityId === 'creative-development' && (
        <g>
          <polygon points="210,88 336,158 210,228 84,158" fill="#E8E7DE" stroke="#252522" strokeWidth="1.2" />
          <polygon points="210,126 336,196 210,266 84,196" stroke="#252522" strokeWidth="1.2" />
          <polygon points="210,162 336,232 210,302 84,232" stroke="#77776F" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="210" cy="158" r="14" fill="#F04427" />
          <line x1="210" y1="88" x2="210" y2="302" stroke="#252522" strokeWidth="0.9" />
        </g>
      )}

      {capabilityId === 'interaction-design' && (
        <g>
          <circle cx="136" cy="194" r="64" stroke="#252522" strokeWidth="1.2" />
          <circle cx="284" cy="194" r="64" stroke="#252522" strokeWidth="1.2" fill="#E8E7DE" />
          <path d="M 136 130 C 188 92, 232 92, 284 130" stroke="#F04427" strokeWidth="1.5" />
          <path d="M 284 258 C 232 296, 188 296, 136 258" stroke="#252522" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="136" cy="194" r="7" fill="#252522" />
          <circle cx="284" cy="194" r="11" fill="#F04427" />
        </g>
      )}

      {capabilityId === 'digital-experience' && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={64 + i * 28}
              y={96 + i * 24}
              width={210}
              height={128}
              fill={i === 3 ? '#E8E7DE' : '#F2F1E9'}
              stroke={i === 3 ? '#F04427' : '#252522'}
              strokeWidth={i === 3 ? '1.6' : '1.1'}
            />
          ))}
          <circle cx="320" cy="142" r="24" stroke="#F04427" strokeWidth="1.2" />
          <rect x="315" y="137" width="10" height="10" fill="#F04427" />
        </g>
      )}

      {capabilityId === 'experimental-web' && (
        <g>
          <circle cx="210" cy="194" r="96" stroke="#252522" strokeWidth="1.1" />
          <circle cx="210" cy="194" r="68" stroke="#252522" strokeWidth="1.1" strokeDasharray="5 4" />
          <circle cx="210" cy="194" r="38" fill="#F04427" />
          <line x1="70" y1="194" x2="350" y2="194" stroke="#252522" strokeWidth="1" />
          <line x1="210" y1="78" x2="210" y2="310" stroke="#252522" strokeWidth="1" />
          <rect x="114" y="114" width="192" height="160" stroke="#252522" strokeWidth="0.9" transform="rotate(12 210 194)" />
        </g>
      )}

      <text x="36" y="48" fill="#77776F" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.12em">
        SPECIMEN · {capabilityId.toUpperCase()}
      </text>
      <text x="330" y="48" fill="#F04427" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.1em">
        ACTIVE
      </text>
    </svg>
  );
};
