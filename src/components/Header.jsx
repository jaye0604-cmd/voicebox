import { Link, useNavigate } from 'react-router-dom'
import IconTree from './IconTree.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './Header.css'

const ORG_NAME = '남양주환경교육사회적협동조합'

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        <IconTree size={34} />
        <span className="site-header__org">{ORG_NAME}</span>
      </Link>

      {user ? (
        <button
          type="button"
          className="site-header__avatar-btn"
          onClick={() => navigate('/mypage')}
          aria-label="마이페이지"
        >
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="" className="site-header__avatar" />
          ) : (
            <span className="site-header__avatar site-header__avatar--fallback">
              {(user.user_metadata?.full_name || user.email || '?').charAt(0)}
            </span>
          )}
        </button>
      ) : (
        <nav className="site-header__auth-links">
          <Link to="/login" className="site-header__auth-link">
            로그인
          </Link>
          <Link to="/signup" className="site-header__auth-link">
            회원가입
          </Link>
        </nav>
      )}
    </header>
  )
}
