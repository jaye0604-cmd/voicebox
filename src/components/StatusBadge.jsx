import { STATUS } from '../data/posts.js'
import './StatusBadge.css'

const VARIANT_CLASS = {
  [STATUS.RECEIVED]: 'status-badge--received',
  [STATUS.PROGRESS]: 'status-badge--progress',
  [STATUS.DONE]: 'status-badge--done',
}

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${VARIANT_CLASS[status] ?? ''}`}>{status}</span>
}
