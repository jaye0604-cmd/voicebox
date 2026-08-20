export const STATUS = {
  RECEIVED: '접수',
  PROGRESS: '처리중',
  DONE: '완료',
}

export const STATUS_LIST = [STATUS.RECEIVED, STATUS.PROGRESS, STATUS.DONE]

export const CATEGORIES = ['안전', '시설물', '환경', '교통', '기타']

export const initialPosts = [
  {
    id: 1,
    title: '정자동 세월교 앞 가로등이 계속 꺼져 있어요',
    content:
      '밤에 산책하는데 가로등이 사흘째 안 들어와요. 어두워서 자전거랑 부딪힐 뻔했습니다. 빠른 확인 부탁드려요.',
    status: STATUS.RECEIVED,
    category: '안전',
    author: '산책러',
    date: '2026.08.18',
    photo: null,
  },
  {
    id: 2,
    title: '정자근린공원 놀이터 그네가 삐걱거려요',
    content:
      '그네 체인 쪽에서 계속 끼익 소리가 나요. 아이들이 타기 무서워합니다. 점검이 필요할 것 같아요.',
    status: STATUS.PROGRESS,
    category: '시설물',
    author: '놀이터맘',
    date: '2026.08.15',
    photo: null,
  },
  {
    id: 3,
    title: '다산동 버스정류장에 비 가릴 지붕이 없어요',
    content:
      '출퇴근 시간에 비 오면 우산 쓰고 서 있어야 해요. 근처 정류장은 다 지붕이 있는데 여기만 없네요.',
    status: STATUS.RECEIVED,
    category: '교통',
    author: '출근러',
    date: '2026.08.12',
    photo: null,
  },
  {
    id: 4,
    title: '왕숙천 산책로에 쓰레기가 계속 쌓여요',
    content:
      '주말마다 치워도 다음날이면 다시 쌓여 있어요. 분리수거함이 하나뿐이라 부족한 것 같습니다.',
    status: STATUS.PROGRESS,
    category: '환경',
    author: '강변주민',
    date: '2026.08.09',
    photo: null,
  },
  {
    id: 5,
    title: '경로당 앞 인도 턱 낮춰주셔서 감사합니다',
    content:
      '휠체어로 다니기 힘들었던 턱을 낮춰주셨더라고요. 어르신들이 다니기 훨씬 편해졌다고 하십니다.',
    status: STATUS.DONE,
    category: '안전',
    author: '동네주민',
    date: '2026.07.28',
    photo: null,
  },
]

export function formatToday() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}
