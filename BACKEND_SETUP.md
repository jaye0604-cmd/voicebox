# 우리 동네 목소리함 — 백엔드 연동 작업 정리

이 문서는 프론트엔드(React+Vite)만 있던 앱에 **Supabase(DB·로그인·파일저장) + Vercel(배포·서버) + Gemini(AI)** 를 붙인 과정을 정리한 문서입니다. 특히 **구글 로그인**과 **AI 작성도우미** 두 파트는 처음 다룰 때 헷갈리기 쉬운 부분이라, 나중에 다른 프로젝트에서 다시 적용할 때 그대로 따라 할 수 있도록 자세히 적었습니다.

---

## 목차

1. [전체 그림](#1-전체-그림)
2. [Supabase 기본 연동 (DB·사진저장)](#2-supabase-기본-연동-db사진저장)
3. [구글 로그인 / 회원가입](#3-구글-로그인--회원가입) ⭐ 핵심
4. [AI 작성도우미 (Gemini API)](#4-ai-작성도우미-gemini-api) ⭐ 핵심
5. [다음에 또 적용할 때 체크리스트](#5-다음에-또-적용할-때-체크리스트)
6. [우리가 실제로 겪었던 에러들](#6-우리가-실제로-겪었던-에러들)

---

## 1. 전체 그림

```
[브라우저(React 앱)]
     │
     ├─ 글 목록/저장/사진   →  Supabase (DB + Storage)
     ├─ 로그인              →  Supabase Auth  →  Google
     └─ AI 작성도우미       →  /api/ai-draft (Vercel 서버 함수)  →  Gemini API
```

- **Supabase**: 무료 백엔드 서비스. DB(Postgres), 로그인(Auth), 파일저장(Storage)을 한 번에 제공.
- **Vercel**: 이 사이트가 배포되는 곳. 프론트엔드뿐 아니라 `api/` 폴더에 넣은 파일은 **서버에서만 실행되는 함수**로도 자동 배포해줌.
- **Gemini API**: 구글의 AI 모델 API. API 키가 있어야 호출 가능하고, 이 키는 절대 브라우저에 노출되면 안 됨 → 그래서 Vercel 서버 함수를 거쳐서 호출.

핵심 원칙 하나: **브라우저(클라이언트)에 노출되면 안 되는 값(Gemini API 키)은 서버 함수 안에서만 쓰고, 브라우저에 노출돼도 되는 값(Supabase URL, anon key)은 `VITE_` 접두사를 붙여 프론트에서 직접 씀.**

---

## 2. Supabase 기본 연동 (DB·사진저장)

### 2.1 준비

1. Supabase 프로젝트 생성 (`voicebox`)
2. `npm install @supabase/supabase-js`
3. `src/lib/supabaseClient.js` 에서 클라이언트 하나 생성해서 앱 전체에서 재사용

```js
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

4. `.env`에 값 저장, `.gitignore`에 `.env` 추가 (깃허브에 안 올라가게)

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxx
```

> ⚠️ **중요**: 이건 로컬 `.env` 얘기고, **Vercel에 배포된 사이트는 Vercel 프로젝트 자체의 Environment Variables 설정에 따로 등록해야** 값을 읽습니다. 로컬 `.env`는 Vercel과 자동으로 연결되지 않습니다.

### 2.2 posts 테이블

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author text not null,
  author_id uuid references auth.users(id) on delete set null, -- 로그인 붙이면서 추가
  photo_url text,
  status text not null default '접수' check (status in ('접수', '처리중', '완료')),
  category text not null,
  created_at timestamptz not null default now()
);
```

### 2.3 사진 저장 (Storage)

- `photos`라는 이름의 **공개(public) 버킷** 생성
- 프론트에서 파일 업로드 → 공개 URL 받아서 `posts.photo_url`에 저장

```js
const { error } = await supabase.storage.from('photos').upload(filePath, file)
const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(filePath)
```

### 2.4 RLS(행 단위 보안) — 이거 꼭 켜야 함

테이블을 만들면 기본적으로 **RLS가 꺼져 있어서 사실상 전체 공개(읽기/쓰기/수정/삭제 다 가능)** 상태입니다. 로그인을 붙이기 전까진 "일단 열어두고", 로그인을 붙인 뒤에는 반드시 잠가야 합니다. (아래 3장 참고)

---

## 3. 구글 로그인 / 회원가입

### 3.1 개념부터: 왜 이렇게 복잡하게 느껴지나

우리 앱이 직접 구글과 통신하는 게 아니라, **Supabase가 중간다리 역할**을 합니다.

```
사용자가 "Google로 계속하기" 클릭
   ↓
① 우리 앱이 Supabase에게 "구글로 로그인시켜줘" 요청
   ↓
② Supabase가 구글 로그인 화면으로 브라우저를 보냄
   ↓
③ 사용자가 구글 계정 선택 + 동의
   ↓
④ 구글이 Supabase 서버로 "이 사람 맞음" 신호를 보냄 (콜백)
   ↓
⑤ Supabase가 세션(로그인 토큰)을 만들어서 우리 앱 주소로 다시 보내줌
   ↓
⑥ 우리 앱이 그 세션을 받아서 "로그인된 상태"로 인식
```

우리가 코드에서 하는 일은 사실 ①과 ⑥ 뿐입니다. ②~⑤는 Supabase와 구글이 알아서 처리합니다. 그런데 ②~⑤가 되려면 **미리 구글 쪽과 Supabase 쪽에 서로를 "믿을 수 있는 상대"로 등록**해둬야 하고, 이 등록 작업이 헷갈리는 부분입니다.

### 3.2 사전 준비 (외부 설정, 코드 아님) — 3곳에 등록

**① Google Cloud Console** (console.cloud.google.com) — OAuth 클라이언트 생성
   - **승인된 JavaScript 원본**: 우리 사이트 주소들
     - `http://localhost:5173` (로컬 개발용, Vite 기본 포트)
     - `https://voicebox-lime.vercel.app` (배포 주소)
   - **승인된 리디렉션 URI**: **Supabase가 실제로 콜백을 받는 주소** (우리 사이트 주소 아님! 헷갈리기 쉬운 부분)
     - `https://xxxx.supabase.co/auth/v1/callback`
   - 여기서 **Client ID / Client Secret** 발급받음

**② Supabase 대시보드** → Authentication → Providers → Google
   - 활성화(Enable) 후 ①에서 받은 Client ID / Client Secret 입력

**③ Supabase 대시보드** → Authentication → URL Configuration
   - **Redirect URLs**에 우리 사이트 주소들 추가 (`http://localhost:5173`, `https://voicebox-lime.vercel.app`)
   - 이게 없으면 로그인은 되는데 엉뚱한 곳으로 튕기거나 에러가 남

> 이 3개 중 하나라도 빠지면 "Google 로그인" 버튼을 눌러도 에러가 나거나, 구글 화면까지는 가는데 우리 앱으로 못 돌아옵니다.

### 3.3 코드 구조

**`src/context/AuthContext.jsx`** — 로그인 상태를 앱 전체에서 공유하는 곳

핵심 함수 3개:

```js
// 로그인 상태 감지 (앱 켜질 때 + 로그인/로그아웃 될 때마다 자동 실행)
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null)
  })

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null)
    // ... 아래 "신규/기존 회원 구분" 로직도 여기서 처리
  })

  return () => subscription.unsubscribe()
}, [])

// 구글 로그인 시작 (① 단계)
async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }, // 로그인 끝나면 홈으로
  })
}

// 로그아웃
async function signOut() {
  await supabase.auth.signOut()
}
```

`useAuth()` 훅으로 어느 컴포넌트에서든 `const { user } = useAuth()` 하면 로그인 여부 확인 가능. `user`가 `null`이면 비로그인.

**신규 회원 vs 기존 회원 구분하는 트릭**

Supabase는 "이번이 첫 로그인인지"를 직접 알려주지 않습니다. 대신 유저 정보에 있는 두 시간값을 비교해서 유추합니다:

```js
const isNewUser =
  Math.abs(new Date(user.last_sign_in_at) - new Date(user.created_at)) < 5000
// 계정이 "방금" 만들어졌으면 created_at과 last_sign_in_at이 거의 같은 시각
```

**확인 팝업 → 로그인 시작 사이에 "지금 로그인 시도 중"이라는 표시를 남기는 트릭**

토스트 메시지("로그인되었습니다" 등)를 아무 때나 띄우면 안 되고, **사용자가 방금 구글 로그인을 시도했을 때만** 띄워야 합니다. 그래서 로그인 시작 직전에 `sessionStorage`에 표시를 남기고, 로그인 완료 시 그 표시가 있을 때만 토스트를 띄우고 지웁니다.

```js
sessionStorage.setItem('voicebox_oauth_pending', '1')  // 로그인 시작 전
// ...
if (event === 'SIGNED_IN' && sessionStorage.getItem('voicebox_oauth_pending')) {
  sessionStorage.removeItem('voicebox_oauth_pending')
  showToast(isNewUser ? '가입을 마쳤습니다. 환영해요!' : '로그인되었습니다.')
}
```

**라우트 보호 (로그인 안 하면 못 들어가는 페이지)**

`src/App.jsx`에 작은 헬퍼 함수 하나로 처리:

```js
function guard(element) {
  if (loading) return null            // 세션 확인 중이면 잠깐 빈 화면
  return user ? element : <Navigate to="/login" replace />
}

<Route path="/write" element={guard(<WritePage onAddPost={addPost} />)} />
<Route path="/mypage" element={guard(<MyPage />)} />
```

**헤더에서 로그인 상태에 따라 다른 UI**

```jsx
{user ? (
  <button onClick={() => navigate('/mypage')}>
    <img src={user.user_metadata?.avatar_url} /> {/* 구글 프로필 사진 */}
  </button>
) : (
  <>
    <Link to="/login">로그인</Link>
    <Link to="/signup">회원가입</Link>
  </>
)}
```

`user.user_metadata`에 구글이 준 이름(`full_name`)·이메일·프로필사진(`avatar_url`)이 자동으로 들어있습니다. 우리가 따로 물어볼 필요 없음.

### 3.4 DB 쪽: RLS로 "내 글만 수정/삭제" 강제하기

```sql
alter table public.posts enable row level security;

-- 누구나 읽기는 가능
create policy "posts are publicly readable"
  on public.posts for select
  to anon, authenticated
  using (true);

-- 로그인한 사람만, 자기 author_id로만 글쓰기 가능
create policy "authenticated users can insert own posts"
  on public.posts for insert
  to authenticated
  with check (author_id = auth.uid());

-- 자기 글만 수정 가능
create policy "users can update own posts"
  on public.posts for update
  to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid());

-- 자기 글만 삭제 가능
create policy "users can delete own posts"
  on public.posts for delete
  to authenticated
  using (author_id = auth.uid());
```

`auth.uid()`는 Supabase가 로그인한 사람의 토큰에서 자동으로 꺼내주는 값입니다. 즉 **DB 레벨에서** "너 이 글 주인 아니잖아" 를 막아주는 것 — 프론트 코드를 조작해도 뚫리지 않습니다.

---

## 4. AI 작성도우미 (Gemini API)

### 4.1 왜 서버 파일이 필요한가

Gemini API를 호출하려면 API 키가 필요한데, **이 키를 프론트엔드 코드(브라우저에서 실행되는 JS)에 넣으면 누구나 개발자도구로 훔쳐볼 수 있습니다.** 그래서:

- 브라우저 → **우리 서버(Vercel 함수)** → Gemini API
- 키는 서버 함수 안에만 존재, 브라우저에는 절대 안 보임

### 4.2 Vercel의 `api/` 폴더 규칙

Vite로 만든 일반 프론트엔드 프로젝트라도, **루트에 `api/` 폴더를 만들고 그 안에 `.js` 파일을 넣으면 Vercel이 자동으로 "서버 함수"로 인식**합니다. 별도 백엔드 서버(Express 등)를 띄울 필요가 없습니다.

```
api/
  ai-draft.js   →  배포하면 https://내사이트.vercel.app/api/ai-draft 로 호출 가능
```

파일 하나가 요청 하나를 처리하는 함수입니다:

```js
export default async function handler(req, res) {
  // req.body, req.headers 등으로 요청 읽고
  // res.status(200).json({...}) 로 응답
}
```

> ⚠️ 로컬 `npm run dev`(Vite)로는 이 `api/` 폴더가 동작하지 않습니다. Vite는 프론트엔드만 서빙합니다. 로컬에서 테스트하려면 Vercel CLI의 `vercel dev`를 쓰거나, 그냥 배포된 사이트에서 테스트해야 합니다.

### 4.3 전체 흐름

```
[WritePage.jsx]
  사용자가 내용 짧게 입력 → "AI 작성도우미" 클릭
      ↓
  supabase.auth.getSession() 으로 내 로그인 토큰 꺼내기
      ↓
  fetch('/api/ai-draft', { headers: { Authorization: `Bearer ${토큰}` }, body: {draft: 내용} })
      ↓
[api/ai-draft.js] (서버)
  1. 토큰으로 "진짜 로그인한 사람 맞는지" Supabase에 확인
  2. GEMINI_API_KEY로 Gemini API 호출 (프롬프트 + JSON 스키마 지정)
  3. Gemini가 준 {title, content, category} 그대로 응답
      ↓
[WritePage.jsx]
  받은 값으로 제목·내용·분야 폼 자동 채우기
```

### 4.4 서버 함수 핵심 코드 (`api/ai-draft.js`)

**① 로그인 여부 확인** — 아무나 우리 API 키로 Gemini를 공짜로 못 쓰게 막는 부분

```js
const token = (req.headers.authorization || '').replace('Bearer ', '')
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
const { data: { user }, error } = await supabase.auth.getUser(token)
if (error || !user) {
  res.status(401).json({ error: '로그인이 필요합니다.' })
  return
}
```

**② Gemini 호출 — JSON 형식으로 답을 강제하는 부분 (`responseSchema`)**

Gemini에게 그냥 "제목/본문/카테고리 알려줘"라고 하면 자유 형식 텍스트로 답할 수 있어서, 파싱이 불안정해집니다. 대신 `responseSchema`로 **정확히 이 모양의 JSON으로만 답하라고 강제**합니다:

```js
generationConfig: {
  responseMimeType: 'application/json',
  responseSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      category: { type: 'string', enum: ['안전', '시설물', '환경', '교통', '기타'] },
    },
    required: ['title', 'content', 'category'],
  },
}
```

`enum`으로 카테고리 후보를 못박아두면, Gemini가 우리 앱에 없는 이상한 카테고리를 만들어낼 걱정이 없습니다.

**③ 응답 처리**

```js
const geminiData = await geminiRes.json()
const text = geminiData.candidates[0].content.parts[0].text  // JSON 문자열
const result = JSON.parse(text)                              // {title, content, category}
res.status(200).json(result)
```

### 4.5 환경변수 설정

**Vercel 대시보드 → 프로젝트 → Settings → Environment Variables**

| 이름 | 값 | 어디서 씀 |
|---|---|---|
| `GEMINI_API_KEY` | AI Studio에서 발급받은 키 | 서버 함수(`api/ai-draft.js`)에서만. `VITE_` 접두사 **붙이면 안 됨** — 붙이면 브라우저에 노출됩니다 |

> ⚠️ **환경변수를 새로 등록하거나 값을 바꾸면, 반드시 재배포(Redeploy)해야 반영됩니다.** Vercel은 빌드 시점에 환경변수를 읽어가기 때문에, 이미 빌드된 배포판은 예전 값(또는 값 없음)을 그대로 씁니다. Deployments 탭 → 최신 배포 → `···` → Redeploy.

### 4.6 API 키는 어디서 발급받나

- Gemini API 키는 **Google Cloud Console이 아니라 https://aistudio.google.com/apikey 에서 발급**받습니다.
- `AIzaSy...`로 시작하는 문자열입니다.
- Vercel 환경변수 값 입력할 때 **앞뒤 따옴표나 공백 없이 문자열만** 붙여넣어야 합니다.

---

## 5. 다음에 또 적용할 때 체크리스트

**구글 로그인 붙일 때:**
- [ ] Google Cloud Console에서 OAuth 클라이언트 생성 (승인된 원본 + **Supabase 콜백 주소**를 리디렉션 URI로)
- [ ] Supabase → Authentication → Providers → Google 활성화 + Client ID/Secret 입력
- [ ] Supabase → Authentication → URL Configuration → Redirect URLs에 우리 사이트 주소 추가
- [ ] `AuthContext` 만들어서 로그인 상태 전역 공유
- [ ] DB에 `author_id` 컬럼 + RLS 정책으로 "내 글만 수정/삭제" 강제

**AI 기능(Gemini 등) 붙일 때:**
- [ ] API 키는 무조건 `api/` 폴더의 서버 함수 안에서만 사용 (프론트 코드에 절대 넣지 않기)
- [ ] Vercel 환경변수에 키 등록 (VITE\_ 접두사 붙이지 않기 = 서버 전용)
- [ ] 환경변수 등록/수정 후에는 **꼭 재배포**
- [ ] 서버 함수에서 로그인 여부 확인 로직 넣기 (안 그러면 아무나 우리 API 키로 공짜 호출 가능)
- [ ] 구조화된 응답이 필요하면 `responseSchema`로 JSON 형식 강제

---

## 6. 우리가 실제로 겪었던 에러들

이번 작업 중 실제로 만났던 문제와 원인, 나중에 비슷한 상황 만나면 참고할 것.

| 증상 | 원인 | 해결 |
|---|---|---|
| Vercel 배포 사이트에서 Supabase 연동이 전혀 안 됨 | 로컬 `.env`만 만들고 Vercel 프로젝트 환경변수는 등록 안 함 | Vercel 대시보드에 동일한 환경변수 등록 |
| 환경변수 등록했는데도 여전히 안 됨 | 환경변수를 **등록하기 전에 빌드된** 배포판을 그대로 쓰고 있었음 | Redeploy 한 번 실행 (환경변수는 빌드 시점에만 반영) |
| Supabase 테이블에 아무나 읽기/쓰기 가능 | 테이블 생성 시 RLS를 켜지 않으면 기본이 "전체 공개" | `enable row level security` + 정책 추가 |
| Storage 버킷 이름을 바꾸고 싶은데 SQL로 안 지워짐 | `storage.buckets`는 보안상 SQL `delete`가 막혀있음 (Storage API로만 삭제 가능) | 새 버킷을 만들고 코드에서 참조만 바꿈 (기존 빈 버킷은 대시보드에서 수동 삭제) |
| 구글 로그인 첫 시도 때 계정이 실제로 안 만들어짐 | Google Cloud Console / Supabase Provider 설정이 아직 안 끝난 상태에서 테스트함 | 3.2의 3곳 설정을 모두 마친 뒤 재시도 |
| AI 작성도우미: "AI 작성 도우미 호출에 실패했습니다" | Gemini API가 **401 UNAUTHENTICATED / ACCESS_TOKEN_TYPE_UNSUPPORTED** 반환 → `GEMINI_API_KEY` 값이 진짜 API 키가 아니거나 형식이 잘못됨 | https://aistudio.google.com/apikey 에서 발급받은 키를 따옴표/공백 없이 정확히 등록 후 재배포 |

---

*작성일: 2026-08-21. `claude/supabase-project-review-31e5e0` 브랜치 작업 기준.*
