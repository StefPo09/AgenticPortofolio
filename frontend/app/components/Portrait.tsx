/**
 * Original monochrome SVG portrait placeholder with a red rim light.
 * PLACEHOLDER: replace this component's contents with your own photo
 * (for example a local <img src="/portrait.webp"> in /public).
 */
export default function Portrait() {
  return (
    <svg
      className="portrait-svg"
      viewBox="0 0 400 560"
      role="img"
      aria-label="Placeholder portrait illustration"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="p-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9d9d6" />
          <stop offset="1" stopColor="#8d8d8a" />
        </linearGradient>
        <linearGradient id="p-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1b1c" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="p-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff4d1f" stopOpacity=".95" />
          <stop offset=".18" stopColor="#ff4d1f" stopOpacity="0" />
          <stop offset=".82" stopColor="#ff4d1f" stopOpacity="0" />
          <stop offset="1" stopColor="#ff4d1f" stopOpacity=".7" />
        </linearGradient>
        <radialGradient id="p-glow" cx=".5" cy=".38" r=".6">
          <stop offset="0" stopColor="#ff5a2a" stopOpacity=".42" />
          <stop offset="1" stopColor="#ff5a2a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="230" rx="230" ry="260" fill="url(#p-glow)" />
      {/* hair: a curly mass built from overlapping shapes, with a natural hairline */}
      <g fill="#0b0b0b">
        <circle cx="128" cy="172" r="30" />
        <circle cx="146" cy="130" r="34" />
        <circle cx="186" cy="104" r="36" />
        <circle cx="228" cy="104" r="36" />
        <circle cx="262" cy="132" r="34" />
        <circle cx="276" cy="174" r="29" />
        <ellipse cx="200" cy="140" rx="84" ry="52" />
      </g>
      {/* neck + ears + face */}
      <path d="M168 296h64v62h-64z" fill="#6a6a67" />
      <ellipse cx="130" cy="236" rx="11" ry="20" fill="#9a9a97" />
      <ellipse cx="270" cy="236" rx="11" ry="20" fill="#7d7d7a" />
      <ellipse cx="200" cy="232" rx="68" ry="86" fill="url(#p-skin)" />
      <path d="M130 214c6-52 36-70 70-70s64 18 70 70c-10-30-36-46-70-46s-60 16-70 46z" fill="#0b0b0b" />
      {/* face details */}
      <path d="M160 222c8-5 18-5 26 0M214 222c8-5 18-5 26 0" stroke="#1d1d1d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="173" cy="236" rx="7" ry="3.6" fill="#262626" />
      <ellipse cx="227" cy="236" rx="7" ry="3.6" fill="#262626" />
      <path d="M200 240v28c-4 2-8 3-10 2" stroke="#6b6b69" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M182 290c12 4 24 4 36 0" stroke="#4b4b49" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* suit */}
      <path d="M20 560c4-110 40-190 150-216l30 40 30-40c110 26 146 106 150 216z" fill="url(#p-suit)" />
      <path d="M170 344l30 216-70 0c-12-90-30-150-70-200z" fill="#0d0d0e" />
      <path d="M170 344l30 56 30-56 22 216h-104z" fill="#ededea" />
      <path d="M170 344l30 56-18 30z" fill="#cfcfcb" />
      <path d="M284 430l36-6 8 30-40 6z" fill="#f2f2ef" />
      {/* rim light */}
      <path d="M20 560c4-110 40-190 150-216l30 40 30-40c110 26 146 106 150 216z" fill="url(#p-rim)" />
    </svg>
  );
}
