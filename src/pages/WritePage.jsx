import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/posts.js'
import PhotoUpload from '../components/PhotoUpload.jsx'
import './WritePage.css'

export default function WritePage({ onAddPost }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [error, setError] = useState('')

  function handlePhotoChange(file) {
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handlePhotoRemove() {
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setPhotoPreview(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !category) {
      setError('제목·내용·분야를 모두 입력해 주세요.')
      return
    }

    try {
      await onAddPost({
        title: title.trim(),
        content: content.trim(),
        category,
      })
      navigate('/')
    } catch (err) {
      console.error('Failed to save post:', err)
      setError('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <section className="write-page">
      <h1 className="write-page__title">의견 남기기</h1>
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form__field">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            className="input-field"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="어떤 불편이나 제안인가요?"
          />
        </div>

        <div className="write-form__field">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="input-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="언제, 어디서 겪은 일인지 자세히 적어주세요."
          />
        </div>

        <div className="write-form__field">
          <label htmlFor="category">분야</label>
          <select
            id="category"
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">분야를 선택해 주세요</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="write-form__field">
          <label>사진 (선택, 최대 1장)</label>
          <PhotoUpload
            preview={photoPreview}
            onChange={handlePhotoChange}
            onRemove={handlePhotoRemove}
          />
        </div>

        {error && <p className="write-form__error">{error}</p>}

        <button type="submit" className="btn-primary write-form__submit">
          글 남기기
        </button>
      </form>
    </section>
  )
}
