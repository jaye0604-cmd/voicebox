import { useState } from 'react'
import { Link } from 'react-router-dom'
import IconTree from '../components/IconTree.jsx'
import GoogleButton from '../components/GoogleButton.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './AuthGatePage.css'

const COPY = {
  login: { title: '로그인', switchTo: '/signup', switchLabel: '회원가입' },
  signup: { title: '회원가입', switchTo: '/login', switchLabel: '로그인' },
}

export default function AuthGatePage({ mode }) {
  const { signInWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const { title, switchTo, switchLabel } = COPY[mode]

  async function handleGoogleClick() {
    const confirmed = window.confirm(
      '구글 계정으로 계속합니다. 처음이면 회원가입이, 이미 회원이면 로그인이 진행됩니다. 계속할까요?',
    )
    if (!confirmed) return

    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      console.error('Google sign-in failed:', err)
      setError('구글 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <section className="auth-gate">
      <IconTree size={48} />
      <h1 className="auth-gate__title">{title}</h1>
      <p className="auth-gate__desc">구글 계정 하나로 로그인과 회원가입이 함께 처리됩니다.</p>
      <GoogleButton onClick={handleGoogleClick} />
      {error && <p className="auth-gate__error">{error}</p>}
      <p className="auth-gate__switch">
        <Link to={switchTo}>{switchLabel}</Link>
      </p>
    </section>
  )
}
