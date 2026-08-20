export default function IconTree({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect x="0" y="0" width="512" height="512" rx="112" fill="#FFFFFF" />
      <g transform="translate(64,64) scale(9.6)">
        <ellipse cx="21" cy="21" rx="16" ry="16" fill="#1E2A22" opacity="0.08" />
        <path
          fill="#4C6A4A"
          stroke="#1E2A22"
          strokeWidth="2.4"
          strokeLinejoin="round"
          d="M20,4 C27,3 33,8 33,15 C33,17 32,19 31,20 C32,23 30,27 26,28 C24,30 17,30 15,28 C10,28 7,24 8,20 C6,18 6,14 8,11 C10,6 15,4 20,4 Z"
        />
        <path
          fill="#8B5E3C"
          stroke="#1E2A22"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M17,29 L23,29 L22,36 L18,36 Z"
        />
        <path stroke="#1E2A22" strokeWidth="2.4" strokeLinecap="round" d="M12,36 L28,36" />
        <circle cx="16" cy="15" r="1.8" fill="#E8A93A" stroke="#1E2A22" strokeWidth="1.2" />
        <circle cx="25" cy="20" r="1.8" fill="#D9603D" stroke="#1E2A22" strokeWidth="1.2" />
      </g>
    </svg>
  )
}
