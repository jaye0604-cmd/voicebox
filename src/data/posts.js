export const STATUS = {
  RECEIVED: '접수',
  PROGRESS: '처리중',
  DONE: '완료',
}

export const STATUS_LIST = [STATUS.RECEIVED, STATUS.PROGRESS, STATUS.DONE]

export const CATEGORIES = ['안전', '시설물', '환경', '교통', '기타']

export function formatDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}
