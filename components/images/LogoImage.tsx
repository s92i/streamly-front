export function LogoImage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 600 600"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Logo</title>

      <defs>
        <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff944a" />
          <stop offset="50%" stopColor="#ff6a2a" />
          <stop offset="100%" stopColor="#ff4a2a" />
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="12"
            floodColor="#000"
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      <g transform="translate(0, -20)">
        <rect
          x="90"
          y="80"
          width="420"
          height="260"
          rx="40"
          ry="40"
          fill="url(#g1)"
          filter="url(#shadow)"
        />

        <polygon points="270,170 370,210 270,250" fill="#ffffff" />

        <path
          d="M110 80 Q110 80 130 70 L470 70 Q470 70 490 80 Q490 80 470 80 L130 80 Q110 80 110 80 Z"
          fill="rgba(255,255,255,0.03)"
          transform="translate(0,0)"
        />
      </g>

      <text
        x="300"
        y="440"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
        fontWeight="700"
        fontSize="64"
        fill="#fff"
        letterSpacing="2"
      >
        STREAMLY
      </text>
    </svg>
  );
}
