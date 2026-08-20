import { useRef } from 'react'
import './PhotoUpload.css'

export default function PhotoUpload({ preview, onChange, onRemove }) {
  const inputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) onChange(file)
    e.target.value = ''
  }

  if (preview) {
    return (
      <div className="photo-upload photo-upload--filled">
        <img src={preview} alt="첨부한 사진 미리보기" />
        <button
          type="button"
          className="photo-upload__remove"
          onClick={onRemove}
          aria-label="사진 삭제"
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className="photo-upload photo-upload--empty"
      onClick={() => inputRef.current?.click()}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
          fill="none"
          stroke="#5C7A5A"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="14" r="3.4" fill="none" stroke="#5C7A5A" strokeWidth="1.6" />
      </svg>
      <span>사진 추가</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="visually-hidden"
      />
    </button>
  )
}
