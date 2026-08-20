import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge.jsx'
import CategoryChip from '../components/CategoryChip.jsx'
import './PostDetailPage.css'

export default function PostDetailPage({ posts }) {
  const { id } = useParams()
  const post = posts.find((p) => String(p.id) === id)

  if (!post) {
    return (
      <section className="post-detail post-detail--empty">
        <p>글을 찾을 수 없습니다.</p>
        <Link to="/" className="btn-secondary">
          목록으로
        </Link>
      </section>
    )
  }

  return (
    <section className="post-detail">
      <Link to="/" className="post-detail__back">
        ← 목록으로
      </Link>

      {post.photo && (
        <div className="post-detail__photo">
          <img src={post.photo} alt="" />
        </div>
      )}

      <div className="post-detail__top">
        <StatusBadge status={post.status} />
        <CategoryChip label={post.category} />
      </div>

      <h1 className="post-detail__title">{post.title}</h1>

      <div className="post-detail__meta">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>

      <p className="post-detail__content">{post.content}</p>
    </section>
  )
}
