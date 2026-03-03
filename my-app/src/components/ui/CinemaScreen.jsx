export default function CinemaScreen() {
  return (
    <svg viewBox="0 0 600 120" className="w-full h-24">
      <defs>
        {/* Glow Effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Curved Line */}
      <path
       d="M0 80 Q300 0 600 80"
        stroke="#3b82f6"
        strokeWidth="4"
        fill="transparent"
        filter="url(#glow)"
      />

    </svg>
  );
}
