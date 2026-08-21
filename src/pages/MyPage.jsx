import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import PostCard from '../components/PostCard.jsx'
import './MyPage.css'

const TABS = [
  { key: 'posts', label: '내가 쓴 글' },
  { key: 'info', label: '내 정보' },
]

export default function MyPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('posts')
  const [myPosts, setMyPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    if (!user) return

    async function loadMyPosts() {
      setLoadingPosts(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to load my posts:', error)
      } else {
        setMyPosts(data)
      }
      setLoadingPosts(false)
    }

    loadMyPosts()
  }, [user])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (!user) return null

  return (
    <section className="mypage">
      <h1 className="mypage__title">마이페이지</h1>

      <div className="tab-bar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`tab-item ${activeTab === tab.key ? 'tab-item-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'posts' &&
        (loadingPosts ? (
          <p className="mypage__empty">불러오는 중...</p>
        ) : myPosts.length === 0 ? (
          <p className="mypage__empty">아직 작성한 글이 없습니다.</p>
        ) : (
          <div className="card-grid">
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}

      {activeTab === 'info' && (
        <div className="mypage__info">
          <div className="list-row">
            <span className="list-row__label">이름</span>
            <span className="list-row__value">
              {user.user_metadata?.full_name || user.user_metadata?.name || '-'}
            </span>
          </div>
          <div className="list-row">
            <span className="list-row__label">이메일</span>
            <span className="list-row__value">{user.email}</span>
          </div>
          <button type="button" className="btn-secondary mypage__signout" onClick={handleSignOut}>
            로그아웃
          </button>
        </div>
      )}
    </section>
  )
}
