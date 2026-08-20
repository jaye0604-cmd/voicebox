import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import CategoryChip from './CategoryChip.jsx'
import './PostCard.css'

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <div className="post-card__photo">
        {post.photo ? (
          <img src={post.photo} alt="" />
        ) : (
          <span>사진</span>
        )}
      </div>
      <div className="post-card__body">
        <div className="post-card__top">
          <StatusBadge status={post.status} />
          <CategoryChip label={post.category} />
        </div>
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__excerpt">{post.content}</p>
        <div className="post-card__meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  )
}
