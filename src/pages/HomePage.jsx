import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusFilterBar, { ALL } from '../components/StatusFilterBar.jsx'
import PostCard from '../components/PostCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './HomePage.css'

const SERVICE_ONE_LINER = '동네에서 겪은 불편이나 제안을 남겨보세요'
const SERVICE_DESC =
  '가로등이 안 켜진다, 그네가 삐걱거린다 같은 이야기를 글로 남기면, 저희가 모아서 확인하고 처리 상황을 접수 · 처리중 · 완료 단계로 알려드립니다.'

export default function HomePage({ posts }) {
  const { user } = useAuth()
  const [status, setStatus] = useState(ALL)
  const [category, setCategory] = useState(ALL)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const okStatus = status === ALL || post.status === status
      const okCategory = category === ALL || post.category === category
      return okStatus && okCategory
    })
  }, [posts, status, category])

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">우리 동네 목소리함</p>

        <div className="hero__copy hero__copy--desktop">
          <h1 className="hero__title">{SERVICE_ONE_LINER}</h1>
          <p className="hero__desc">{SERVICE_DESC}</p>
        </div>

        <div className="hero__copy hero__copy--mobile">
          <h1 className="hero__title">동네 불편, 말하면 달라집니다</h1>
          <p className="hero__desc">
            골목 가로등부터 놀이터 그네까지 — 남긴 글은 접수 → 처리중 → 완료로 진행 상황이 남습니다.
          </p>
        </div>

        <Link to={user ? '/write' : '/login'} className="btn-primary">
          의견 남기기
        </Link>
      </section>

      <StatusFilterBar
        selectedStatus={status}
        onStatusChange={setStatus}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <section className="list-section">
        <div className="card-grid">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {filtered.length === 0 && <p className="empty-msg">조건에 맞는 글이 없습니다.</p>}
      </section>
    </>
  )
}
