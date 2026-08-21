import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/posts.js'
import PhotoUpload from '../components/PhotoUpload.jsx'
import { supabase } from '../lib/supabaseClient.js'
import './WritePage.css'

export default function WritePage({ onAddPost }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)

  async function handleAiAssist() {
    if (!content.trim()) {
      setError('AI 작성도우미를 쓰려면 내용을 먼저 짧게라도 적어주세요.')
      return
    }

    setError('')
    setAiLoading(true)
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const res = await fetch('/api/ai-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ draft: content.trim() }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'AI 작성도우미 호출에 실패했습니다.')

      setTitle(result.title)
      setContent(result.content)
      setCategory(result.category)
    } catch (err) {
      console.error('AI assist failed:', err)
      setError(err.message || 'AI 작성도우미 호출에 실패했습니다.')
    } finally {
      setAiLoading(false)
    }
  }

  function handlePhotoChange(file) {
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handlePhotoRemove() {
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !category) {
      setError('제목·내용·분야를 모두 입력해 주세요.')
      return
    }

    setSubmitting(true)
    try {
      await onAddPost({
        title: title.trim(),
        content: content.trim(),
        category,
        photoFile,
      })
      navigate('/')
    } catch (err) {
      console.error('Failed to save post:', err)
      setError('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      setSubmitting(false)
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
          <div className="write-form__field-header">
            <label htmlFor="content">내용</label>
            <button
              type="button"
              className="btn-secondary write-form__ai-btn"
              onClick={handleAiAssist}
              disabled={aiLoading}
            >
              {aiLoading ? 'AI 작성 중...' : 'AI 작성도우미'}
            </button>
          </div>
          <textarea
            id="content"
            className="input-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="짧게라도 적고 'AI 작성도우미'를 눌러보세요. 언제, 어디서 겪은 일인지 적어주시면 더 좋아요."
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

        <button type="submit" className="btn-primary write-form__submit" disabled={submitting}>
          {submitting ? '저장 중...' : '글 남기기'}
        </button>
      </form>
    </section>
  )
}
