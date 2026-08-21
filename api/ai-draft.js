import { createClient } from '@supabase/supabase-js'

const MODEL = 'gemini-3.5-flash-lite'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const CATEGORIES = ['안전', '시설물', '환경', '교통', '기타']

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = (req.headers.authorization || '').replace('Bearer ', '')
  if (!token) {
    res.status(401).json({ error: '로그인이 필요합니다.' })
    return
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token)
  if (authError || !user) {
    res.status(401).json({ error: '로그인이 필요합니다.' })
    return
  }

  const draft = (req.body?.draft || '').trim()
  if (!draft) {
    res.status(400).json({ error: '내용을 입력해 주세요.' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured')
    res.status(500).json({ error: '서버에 AI 기능이 설정되어 있지 않습니다.' })
    return
  }

  const prompt = `당신은 지역 주민 민원 접수 서비스의 작성 도우미입니다. 주민이 짧게 적은 메모를 정식 민원 글로 다듬어 주세요.

주민이 적은 내용: "${draft}"

요구사항:
- title: 민원 제목 (한 문장, 20자 내외)
- content: 민원 본문 (2~4문장, 언제·어디서·무엇이 문제인지 정중하고 명확하게 작성. 주민이 적지 않은 사실을 지어내지 말 것)
- category: 다음 중 정확히 하나를 선택 — ${CATEGORIES.join(', ')}

반드시 지정된 JSON 스키마로만 응답하세요.`

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              content: { type: 'string' },
              category: { type: 'string', enum: CATEGORIES },
            },
            required: ['title', 'content', 'category'],
          },
        },
      }),
    })

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API error:', geminiRes.status, errText)
      res.status(502).json({ error: 'AI 작성 도우미 호출에 실패했습니다.' })
      return
    }

    const geminiData = await geminiRes.json()
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      console.error('Unexpected Gemini response:', JSON.stringify(geminiData))
      res.status(502).json({ error: 'AI 응답을 읽을 수 없습니다.' })
      return
    }

    const result = JSON.parse(text)
    res.status(200).json(result)
  } catch (err) {
    console.error('AI draft generation failed:', err)
    res.status(500).json({ error: 'AI 작성 도우미 호출 중 오류가 발생했습니다.' })
  }
}
