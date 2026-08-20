import './CategoryChip.css'

export default function CategoryChip({ label, selected = false, onClick }) {
  const className = `category-chip ${selected ? 'category-chip--selected' : ''}`

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {label}
      </button>
    )
  }

  return <span className={className}>{label}</span>
}
