import { STATUS_LIST, CATEGORIES } from '../data/posts.js'
import CategoryChip from './CategoryChip.jsx'
import './StatusFilterBar.css'

const ALL = '전체'

export default function StatusFilterBar({
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section className="filter-bar" aria-label="의견 목록 필터">
      <div className="filter-group filter-group--status" role="group" aria-label="처리상태 필터">
        <button
          type="button"
          className={`status-filter-btn ${selectedStatus === ALL ? 'status-filter-btn--active' : ''}`}
          onClick={() => onStatusChange(ALL)}
        >
          전체
        </button>
        {STATUS_LIST.map((status) => (
          <button
            key={status}
            type="button"
            className={`status-filter-btn ${selectedStatus === status ? 'status-filter-btn--active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="filter-group filter-group--cat" role="group" aria-label="분야 필터">
        <CategoryChip label="전체 분야" selected={selectedCategory === ALL} onClick={() => onCategoryChange(ALL)} />
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            selected={selectedCategory === cat}
            onClick={() => onCategoryChange(cat)}
          />
        ))}
      </div>
    </section>
  )
}

export { ALL }
