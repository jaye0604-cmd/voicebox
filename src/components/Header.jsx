import { Link } from 'react-router-dom'
import IconTree from './IconTree.jsx'
import './Header.css'

const ORG_NAME = '남양주환경교육사회적협동조합'

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        <IconTree size={34} />
        <span className="site-header__org">{ORG_NAME}</span>
      </Link>
    </header>
  )
}
