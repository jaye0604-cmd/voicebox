import './Footer.css'

const ORG_NAME = '남양주환경교육사회적협동조합'
const ORG_TAGLINE = '이론이 아니라 삶에 닿는 환경교육'

const FOREST_UNITS = [30, 75, 120, 165, 210, 255, 300, 345, 390, 435, 480, 525, 570, 615, 660, 705]

export default function Footer() {
  return (
    <footer className="site-footer">
      <svg
        className="forest-line"
        viewBox="0 0 720 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="32" x2="720" y2="32" stroke="#5C7A5A" strokeWidth="1.5" strokeLinecap="round" />
        {FOREST_UNITS.map((x, i) => (
          <g key={x}>
            {i % 2 === 0 ? (
              <polygon points={`${x},8 ${x - 10},28 ${x + 10},28`} fill="#5C7A5A" />
            ) : (
              <circle cx={x} cy="21" r="9" fill="#5C7A5A" />
            )}
          </g>
        ))}
      </svg>
      <div className="site-footer__row">
        <span>{ORG_NAME}</span>
        <span>{ORG_TAGLINE}</span>
      </div>
      <p className="site-footer__copy">© 2026. 우리 동네 목소리함</p>
    </footer>
  )
}
