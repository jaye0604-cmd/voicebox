---
name: 남양주환경교육사회적협동조합
colors:
  background: "#FFFFFF"
  surface: "#FFFFFF"
  surface-alt: "#F7F5F0"
  on-background: "#1E2A22"
  on-surface-variant: "#5C7A5A"
  primary: "#1E2A22"
  on-primary: "#FFFFFF"
  secondary: "#5C7A5A"
  on-secondary: "#FFFFFF"
  border: "#DDE3D8"
  accent-terracotta: "#D9603D"
  accent-mustard: "#E8A93A"
  accent-sage: "#4C6A4A"
  accent-brown: "#8B5E3C"
  shadow: "rgba(30, 42, 34, 0.12)"
  photo-placeholder-bg: "#DADADA"
  photo-placeholder-fg: "#96968F"
  google-button-border: "#DADCE0"
  google-button-text: "#3C4043"
typography:
  title-lg:
    fontFamily: Gowun Batang
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Gowun Batang
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
  title-sm:
    fontFamily: Gowun Batang
    fontSize: 18px
    fontWeight: "700"
    lineHeight: 26px
  title-xs:
    fontFamily: Gowun Batang
    fontSize: 15px
    fontWeight: "700"
    lineHeight: 22px
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 30px
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  body-sm:
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  meta:
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
    letterSpacing: 0.02em
  button:
    fontFamily: Noto Sans KR
    fontSize: 15px
    fontWeight: "700"
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 4px
  DEFAULT: 8px
  lg: 16px
  full: 9999px
spacing:
  base: 8px
  2xs: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 24px
shadow:
  sm: "0 2px 8px rgba(30, 42, 34, 0.08)"
  md: "0 8px 24px rgba(30, 42, 34, 0.12)"
breakpoints:
  mobile: "0–767px"
  tablet: "768–1023px"
  desktop: "1024px+"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm} {spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm} {spacing.md}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-alt}"
  button-google:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.google-button-text}"
    border: "1px solid {colors.google-button-border}"
    typography: "{typography.button}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.xs} {spacing.md}"
  button-google-hover:
    shadow: "{shadow.sm}"
  status-badge-received:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.secondary}"
    textColor: "{colors.secondary}"
    typography: "{typography.meta}"
    fontWeight: "700"
    rounded: "{rounded.full}"
    padding: "{spacing.2xs} {spacing.xs}"
  status-badge-progress:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.meta}"
    fontWeight: "700"
    rounded: "{rounded.full}"
    padding: "{spacing.2xs} {spacing.xs}"
  status-badge-done:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.meta}"
    fontWeight: "700"
    rounded: "{rounded.full}"
    padding: "{spacing.2xs} {spacing.xs}"
  category-chip:
    backgroundColor: "{colors.surface-alt}"
    border: "1px solid {colors.border}"
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "{spacing.2xs} {spacing.xs}"
  category-chip-selected:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.secondary}"
    textColor: "{colors.secondary}"
  status-filter-btn:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.border}"
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "{spacing.2xs} {spacing.xs}"
  status-filter-btn-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    border: "1px solid {colors.primary}"
  tab-item:
    typography: "{typography.button}"
    textColor: "{colors.secondary}"
    padding: "{spacing.xs} {spacing.md}"
    borderBottom: "2px solid transparent"
  tab-item-active:
    textColor: "{colors.primary}"
    borderBottom: "2px solid {colors.primary}"
  post-card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    shadow: "{shadow.sm}"
  post-card-hover:
    shadow: "{shadow.md}"
  post-card-photo:
    backgroundColor: "{colors.photo-placeholder-bg}"
    textColor: "{colors.photo-placeholder-fg}"
  input-field:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.border}"
    rounded: "{rounded.DEFAULT}"
    typography: "{typography.body-md}"
    padding: "{spacing.xs} {spacing.sm}"
  input-field-focus:
    border: "1px solid {colors.secondary}"
    shadow: "{shadow.sm}"
  photo-upload-empty:
    backgroundColor: "{colors.surface-alt}"
    border: "1px dashed {colors.secondary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.DEFAULT}"
  photo-upload-remove:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
  admin-status-btn:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.border}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
  admin-status-btn-selected-received:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.secondary}"
    border: "1px solid {colors.secondary}"
  admin-status-btn-selected-progress:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    border: "1px solid {colors.secondary}"
  admin-status-btn-selected-done:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    border: "1px solid {colors.primary}"
  list-row:
    borderBottom: "1px solid {colors.border}"
    padding: "{spacing.sm} 0"
  icon-block:
    border: "3px solid {colors.primary}"
    rounded: "{rounded.DEFAULT}"
    shadow: "{shadow.sm}"
  meta-text:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.meta}"
---

## Brand & Style

남양주환경교육사회적협동조합의 디자인은 "이론이 아니라 삶에 닿는 환경교육"이라는 한 줄 소개를 그대로 시각화한다. 브랜드 성격은 차분하고 신뢰감 있으며, 자연을 다루되 감상적이지 않다.

> 단체는 초록 나무·갈색 줄기·파란 순환 화살표 엠블럼과 슬로건 "교육과 활동이 함께, 행동하는 교육"으로 구성된 기존 공식 로고를 보유하고 있다. 이 로고는 공식 문서·간판 등에 원본 그대로 쓰는 별개 자산이며, 이 DESIGN.md의 색·아이콘 시스템에는 로고 색상을 섞지 않는다.

스타일은 **에디토리얼(Editorial)**을 기본으로 하고, 아이콘·포인트 요소에서만 **볼드 팝아트 블록**을 섞는다. 본문·레이아웃은 잡지 지면처럼 여백과 타이포그래피로 위계를 만들고, 무거운 장식은 쓰지 않는다. 색과 형태의 에너지는 아이콘(새싹·나무·나이테)에 집중시키고, 그 외 화면은 다크그린과 화이트를 중심으로 조용하게 둔다.

이 문서의 서비스 이름은 **우리 동네 목소리함** — 주민이 동네 불편·제안을 글로 남기면 단체가 접수 → 처리중 → 완료로 처리하고 알려주는 서비스다.

## Colors

팔레트는 다크그린 `primary`를 축으로 하고, 딥세이지 `secondary`가 보조 톤을 받친다. 색은 텍스트/구조용(주색·보조색·배경·테두리)과 아이콘 전용 포인트 컬러(테라코타·머스터드·딥세이지·브라운) 두 그룹으로 엄격히 나눈다.

- **Primary (`#1E2A22`)**: 제목, 본문 텍스트, 버튼, 아이콘 윤곽선 등 구조를 지탱하는 모든 곳에 사용.
- **Secondary (`#5C7A5A`)**: 보조 텍스트(메타 정보), 호버 상태, 포인트 라인(숲 라인 일러스트)에 사용.
- **Background/Surface (`#FFFFFF`, `#F7F5F0`)**: 기본 배경은 순백, 섹션을 구분할 때만 `surface-alt`의 아주 옅은 오프화이트를 사용해 톤 차이를 만든다.
- **Border (`#DDE3D8`)**: 카드·구분선에 쓰는 옅은 세이지 계열 헤어라인. 절대 진하게 쓰지 않는다.
- **Accent 4종 (테라코타·머스터드·딥세이지·브라운)**: 오직 아이콘 블록 채색에만 사용. UI 배경색, 버튼색, 큰 면적, 상태 배지·분야 칩에는 쓰지 않는다.

**팔레트 예외 2가지** (둘 다 브랜드 색이 아니라 기능상 이유로 고정된 중립색이며, 아래 용도 외에는 쓰지 않는다):
- **사진 자리표시자 회색** (`photo-placeholder-bg #DADADA` / `photo-placeholder-fg #96968F`): 게시글 카드의 사진 영역, 사진 업로드 빈 상태 아이콘·라벨에만 사용.
- **구글 버튼 회색** (`google-button-border #DADCE0` / `google-button-text #3C4043`): 구글 로그인 버튼 하나에만 사용. 구글 OAuth 브랜드 가이드라인을 지키기 위한 고정 자산이며, 다른 버튼에 이 색을 쓰지 않는다.

## Typography

제목은 **Gowun Batang**(세리프, 400/700), 본문은 **Noto Sans KR**(400~800)로 역할을 고정한다. 대체 폰트는 Malgun Gothic. 두 폰트를 섞어 쓰는 것이 아니라 "제목=세리프의 무게감, 본문=산세리프의 가독성"으로 명확히 분리하는 것이 이 시스템의 핵심이다.

| 단계 | 용도 | 크기/굵기 |
|---|---|---|
| 제목 (title) | 페이지·섹션 타이틀 | title-lg 32px/700 · title-md 24px/700 · title-sm 18px/700 · title-xs 15px/700 |
| 본문 (body) | 설명글, 본문 단락 | body-lg 18px/400 · body-md 16px/400 · body-sm 13px/400 |
| 메타 (meta) | 날짜, 태그, 캡션, 배지, 분야 칩 | 13px/500(칩) · 13px/700(배지 강조), 자간 +0.02em, `secondary` 색상 |
| 버튼 (button) | CTA, 탭, 폼 제출, 상태 지정 버튼 | 15px/700, 자간 +0.01em |

`title-xs`(15px)와 `body-sm`(13px)은 오늘 정의한 게시글 카드처럼 한 화면에 많은 항목을 촘촘히 보여줘야 하는 곳 전용이다. 일반 섹션 제목·본문에는 기존 title-sm/body-md를 그대로 쓴다.

## Layout & Spacing

간격은 8px 배수로 고정한다 — `2xs 4 · xs 8 · sm 16 · md 24 · lg 40 · xl 64`. `2xs`는 배지·칩처럼 아주 작은 pill 내부 여백 전용이고, 나머지는 레이아웃(카드 안쪽 여백, 섹션 사이, 그리드 gutter)에 쓴다. 이 6개 값 밖의 임의 간격은 쓰지 않는다. 모서리도 `sm 4 · DEFAULT 8 · lg 16 · full(pill)` 4단계로 고정한다.

### 반응형 3폭

| 화면 | 폭 | 컬럼 | gutter |
|---|---|---|---|
| PC (desktop) | 1024px 이상, 컨테이너 최대 1200px | 3열 | 24px |
| 태블릿 (tablet) | 768–1023px | 2열 | 20px |
| 모바일 (mobile) | 767px 이하 | 1열 | 16px |

게시글 카드 그리드는 위 3폭 대신 `auto-fill(minmax(190px,1fr))`로 자동 조절한다 — 767px 이하에서는 1열로 자연스럽게 접히고, 768px 이상에서는 화면 폭에 따라 3~5열까지 늘어난다. 이 규칙과 히어로·필터 UI의 상세 반응형 판단은 아래 **Page Skeleton**을 따른다.

## Elevation & Depth

그림자는 **딱 2단계**로 고정한다: `shadow.sm`(기본 카드), `shadow.md`(호버·강조). 둘 다 다크그린을 8~12% 섞은 은은한 톤만 쓰고, 순수 검정(`rgba(0,0,0,...)`) 그림자는 쓰지 않는다.

아이콘 블록만 예외적으로 진한 다크그린 윤곽선(3px) + `shadow.sm`을 함께 써서 판화/만화 인쇄 같은 입체감을 낸다.

## Shapes

- **버튼/입력/구글 버튼**: `rounded.DEFAULT`(8px).
- **카드**: `rounded.lg`(16px).
- **배지/칩/상태 지정 버튼**: `rounded.full`(pill).
- **아이콘 블록**: 팝아트 판화 스타일이므로 굵은 윤곽선을 우선하고, 내부 도형은 완전한 사각/원보다 살짝 각진 유기적 블록으로 그린다.

## Page Skeleton (헤더 · 히어로 · 푸터)

확정한 홈 화면 시안(`home-시안.html`)의 골격을 그대로 규격화한다. 헤더·푸터는 로그인/마이페이지/관리자 화면을 포함한 전체 페이지에서 공통으로 쓰고, 히어로는 홈 화면 전용이다.

**헤더**: 아이콘(`icon-tree` 심볼, 34×34px) + 단체명("남양주환경교육사회적협동조합", title-xs 굵기의 `button` 타이포) 좌측 정렬, 아래 `border` 1px 헤어라인. 패딩 상하 `spacing.xs`(8px) · 좌우 `spacing.sm`(16px). 모든 페이지 공통.

**히어로 (홈 화면 전용)**: 767px 이하와 768px 이상에서 톤 자체가 다르다 — 별도 컴포넌트가 아니라 문구 두 벌을 두고 미디어쿼리로 전환한다.
- 768px 이상(기본): 좌측 정렬, 최대폭 720px. 제목 "동네에서 겪은 불편이나 제안을 남겨보세요"(title, clamp 20~25px), 설명 "가로등이 안 켜진다, 그네가 삐걱거린다 같은 이야기를 글로 남기면, 저희가 모아서 확인하고 처리 상황을 접수 · 처리중 · 완료 단계로 알려드립니다."
- 767px 이하: 중앙 정렬. 제목 "동네 불편, 말하면 달라집니다"(clamp 24~30px), 설명 "골목 가로등부터 놀이터 그네까지 — 남긴 글은 접수 → 처리중 → 완료로 진행 상황이 남습니다."
- 공통: eyebrow "우리 동네 목소리함"(meta, secondary), CTA `button-primary` "의견 남기기" 1개뿐.

**필터 바 (히어로와 카드 그리드 사이, 홈·마이페이지·의견 관리 공용)**: 처리상태 필터 `status-filter-btn`/`status-filter-btn-active` 4개("전체"·"접수"·"처리중"·"완료" — 개수 고정이라 줄바꿈 없이 항상 한 줄로 노출) + 분야 필터 `category-chip`/`category-chip-selected`(분야는 늘어날 수 있어 767px 이하는 줄바꿈, 768px 이상은 가로 스크롤). 상태 필터는 상태별로 색을 구분하지 않는다 — "무엇이 접수/처리중/완료인지"가 아니라 "지금 어떤 걸 보고 있는지"만 나타내면 되므로, 네 버튼 모두 선택 시 동일하게 `primary` 채움으로 바뀐다. 이 점에서 3단계로 색이 갈리는 `status-badge`, `admin-status-btn`과 다르다 — 같은 "상태처럼 생긴 pill"이라도 셋의 역할이 다르다: `status-badge`(카드 위, 읽기전용) · `status-filter-btn`(목록 필터링, 클릭해도 글 상태는 안 바뀜) · `admin-status-btn`(관리자 전용, 클릭하면 실제로 글 상태가 바뀜).

**푸터**: `.forest-line` 장식 SVG(전나무·둥근 나무가 가로로 이어진 라인, `secondary` 색 · 투명도 0.5) + 단체명·서비스명 텍스트 줄 + "© 2026" 저작권 줄. 배경 `surface-alt`, 위쪽 `border` 헤어라인. 모든 페이지 공통.

## Components

### 1. 글 저장하기 — 작성 폼

저장 필드는 제목·내용·작성자·작성시간·분야 다섯 가지다. 작성자는 로그인한 구글 계정에서, 작성시간은 서버에서 자동으로 채운다. 분야는 (지난 결정을 뒤집어) **작성자가 글쓰기 시점에 직접 고른다** — 폼에는 제목·내용·분야 세 입력을 둔다.

- `input-field` (제목): 한 줄 텍스트. 배경 흰색, `border` 1px, `rounded.DEFAULT`, 패딩 `spacing.xs spacing.sm`, 타이포 `body-md`. 포커스 시 테두리 `secondary` + `shadow.sm`.
- `input-field` (내용, textarea): 위와 동일한 규격 + `min-height: 160px`, 세로로만 리사이즈.
- `input-field` (분야, select): 위와 동일한 규격의 드롭다운. 옵션은 현재 사용 중인 분야 목록(안전·시설물·환경·교통·기타)을 그대로 쓴다.
- 라벨: 입력 위 `spacing.2xs`(4px) 간격, `meta` 타이포 700굵기, `primary` 색.
- 제출 버튼: `button-primary` "글 남기기" — 히어로의 CTA와 같은 문구·규격을 폼 하단에서도 그대로 쓴다.

### 2. 사진 올리기 — 업로드

게시글 하나당 사진 한 장. 실제 업로드된 사진은 사용자 콘텐츠이므로 "실사진 금지" 규칙의 예외이며, 대신 **꾸밈용 사진(스톡 이미지·장식 일러스트)은 여전히 금지**다.

- `photo-upload-empty` (빈 상태): `surface-alt` 배경, `secondary` 색 1px 파선(dashed) 테두리, `rounded.DEFAULT`. 가운데 카메라 모양 인라인 SVG 아이콘(`secondary` 색, 24px) + "사진 추가"(`meta` 타이포) 세로 배치. 클릭하면 파일 선택.
- 업로드 후: 같은 박스 안에 실제 사진을 `rounded.DEFAULT`로 채워 보여주고, 우상단에 `photo-upload-remove`(primary 배경 원형, 흰 × 아이콘, 28px) 오버레이로 삭제 가능.
- 카드에 표시될 때는 `post-card-photo` 규격(아래)을 따른다.

### 3. 로그인 & 회원가입

`/login`, `/signup` 두 경로 모두 같은 레이아웃을 쓴다 — 구글 인증 하나로 로그인·가입이 동시에 처리되므로 화면 차이는 제목 문구뿐이다.

- 게이트 화면: 화면 중앙 세로 배치, 최대폭 360px. 아이콘(`icon-tree`, 48px) → 페이지 제목(`/login`="로그인", `/signup`="회원가입", title-md) → 설명 한 줄(body-sm, secondary) → `button-google`.
- `button-google`: 흰 배경, `google-button-border` 1px 테두리, `rounded.DEFAULT`, 좌측에 구글 'G' 로고 20px, 텍스트 "Google로 계속하기"(`button` 타이포, `google-button-text` 색). 구글 OAuth 브랜드 가이드라인을 따르는 유일한 예외 컴포넌트라 이 문서의 주색·보조색을 쓰지 않는다. 호버 시 `shadow.sm`만 추가.
- 두 화면을 잇는 링크(로그인 화면 하단 "회원가입" / 회원가입 화면 하단 "로그인")는 `secondary` 색 밑줄 텍스트, body-sm.

**마이페이지 (`/mypage`, 로그인 후 진입, 2탭)**: 헤더 아래 페이지 제목 "마이페이지"(title-md) + `tab-item`/`tab-item-active` 2개.
- **[내가 쓴 글]**: 홈 화면과 동일한 `post-card` 그리드를 재사용하되, 로그인한 사용자가 쓴 글만 필터링해서 보여준다. 상태 필터·분야 필터도 홈과 동일 규격 그대로 위에 둔다.
- **[내 정보]**: `list-row` 반복 — 각 행은 왼쪽 라벨(`meta`, secondary) + 오른쪽 값(`body-md`, primary), 아래 `border` 헤어라인 1px, 상하 패딩 `spacing.sm`. 구글 계정에서 받아온 이름·이메일 등을 이 행 형식으로 나열한다.

### 4. 처리상태 & 관리자 화면

**공개 화면 배지 (읽기 전용)** — `status-badge-received`(흰 배경 + secondary 테두리·글자) → `status-badge-progress`(secondary 배경 채움) → `status-badge-done`(primary 배경 채움) 순으로 갈수록 채도·무게가 올라가 진행감을 준다. 셋 다 `meta` 타이포에 700굵기, 패딩 `spacing.2xs spacing.xs`, `rounded.full`.

**관리자 상태 지정 버튼 (조작용)** — 의견 관리 화면에서 글마다 상태를 바꾸는 3버튼 그룹. `admin-status-btn`(흰 배경, `border` 1px, `button` 타이포, `rounded.full`, 패딩 `spacing.xs spacing.sm`) 세 개가 나란히 붙는다. 이 중 그 글의 **현재 상태에 해당하는 버튼만** 색이 바뀌는데, 무조건 같은 색이 아니라 위 공개 배지와 정확히 같은 색 규칙을 따른다 — 접수가 현재 상태면 `admin-status-btn-selected-received`(흰 배경 + secondary 테두리·글자), 처리중이면 `admin-status-btn-selected-progress`(secondary 채움), 완료면 `admin-status-btn-selected-done`(primary 채움). 나머지 두 버튼은 항상 기본 `admin-status-btn`으로 둔다. 클릭하면 즉시 그 글의 상태가 바뀐다 — 필터 버튼과 생김새는 비슷해도 "고르면 걸러지는" 게 아니라 "누르면 실제로 바뀌는" 조작 버튼이라는 점이 다르다.

**관리자 화면 (`/admin`, 2탭)**: 헤더 아래 페이지 제목 "관리자"(title-md) + `tab-item` 2개.
- **[의견 관리]**: 접수된 글을 목록(행 또는 압축 카드)으로 보여주고, 각 행에 제목·작성자·분야 칩·날짜와 `admin-status-btn` 3버튼을 함께 배치. 상태·분야 필터는 홈 화면과 같은 규격을 그대로 쓴다.
- **[분야 관리]**: `list-row` 반복으로 현재 분야 목록을 보여주고, 각 행 우측에 수정·삭제 아이콘 버튼(`primary` 색 인라인 SVG, 18px). 목록 아래 `input-field`(분야 이름) + `button-secondary`("추가") 한 줄로 새 분야를 추가한다.

### 5. 게시글 카드 (홈 · 마이페이지 · 의견 관리 공용)

`post-card` = 흰 배경, `border` 1px, `rounded.lg`(16px), `shadow.sm` → 호버 `shadow.md`. 그리드는 `auto-fill(minmax(190px,1fr))`, gutter `spacing.sm`(16px).

| 요소 | 768px 이상(기본) | 767px 이하 |
|---|---|---|
| 사진 (`post-card-photo`) | 16:9, 최대 높이 84px | 4:3 |
| 카드 안쪽 패딩 | `spacing.xs`(8px) | `spacing.sm`(16px) |
| 제목 | `title-xs`(15px/700, Gowun Batang) | `title-sm`(18px/700) |
| 본문 앞부분 | `body-sm`(13px), 1줄에서 자르기 | `body-sm`(13px), 2줄에서 자르기 |
| 작성자·날짜 | `meta`(13px/500, secondary) | 동일 |
| 상태 배지·분야 칩 | 위 배지/칩 규격 그대로 | 동일 |

두 규격 모두 카드 상단에 `상태 배지`(`status-badge-received/progress/done` 중 하나) + `분야 칩`을 나란히 놓고, 그 아래 제목 → 본문 앞부분 → (여백을 밀어내고) 작성자·날짜 순으로 쌓는다. 카드의 분야 칩은 필터 바의 `category-chip`과 같은 컴포넌트다 — 카드에서는 항상 기본(미선택) 모양만 쓰고, `category-chip-selected`는 필터 바에서 사용자가 그 분야를 눌러 선택했을 때만 쓴다.

### 6. 탭 (마이페이지 · 관리자 공용)

`tab-item` 두 개가 가로로 붙고, 컨테이너 아래에 `border` 1px 헤어라인이 깔린다. 비활성 탭은 `secondary` 색 텍스트, 활성 탭은 `primary` 색 텍스트 + 밑줄 2px(`tab-item-active`)로 컨테이너 헤어라인 위에 덧그린다. 탭 전환 시 즉시 내용이 바뀌고 전환 애니메이션은 쓰지 않는다 — 텍스트 색과 밑줄만 150ms ease-out으로 바뀐다.

## Don'ts (하지 말 것)

1. **팔레트 밖 색 금지** — 주색·보조색·배경·테두리·포인트 4색(테라코타·머스터드·딥세이지·브라운) 외의 색을 새로 만들지 않는다. 특히 순수 검정(#000)이나 임의 회색 텍스트 금지 — 텍스트는 항상 `#1E2A22`. 사진 자리표시자 회색과 구글 버튼 회색, 단 두 가지만 예외이며 각각 정해진 자리에만 쓴다.
2. **꾸밈용 사진·래스터 이미지 금지** — 스톡 이미지, 장식용 PNG 일러스트는 쓰지 않는다. 브랜드 비주얼은 인라인 SVG(아이콘, 숲 라인 일러스트)로만 만든다. 단, 주민이 **직접 올린 제보 사진**은 서비스의 실제 콘텐츠이므로 예외로 그대로 보여준다.
3. **폰트 역할 교체 금지** — 제목에 Noto Sans KR, 본문에 Gowun Batang을 쓰지 않는다. 세리프=제목, 산세리프=본문 규칙은 항상 고정.
4. **그림자 단계 임의 추가 금지** — `shadow.sm`/`shadow.md` 두 값 외의 그림자(네온, 글래스모피즘, 진한 드롭섀도우)를 쓰지 않는다.
5. **간격·모서리 임의값 금지** — spacing 6단계(2xs 포함), rounded 4단계 밖의 숫자를 쓰지 않는다.
6. **아이콘 윤곽선 약화 금지** — 아이콘의 굵은 다크그린 윤곽선을 얇게 하거나 생략하지 않는다.
7. **관리자 조작 버튼과 공개 배지 색 어긋남 금지** — `admin-status-btn-selected-received/progress/done`은 반드시 같은 이름의 `status-badge-received/progress/done`과 같은 색을 써야 한다. 관리자 화면과 공개 화면에서 같은 상태가 다른 색으로 보이면 안 된다. 목록 필터용 `status-filter-btn`은 이 규칙과 무관하다 — 필터는 상태별 색 구분 없이 선택 시 항상 동일한 `primary` 채움을 쓴다.
8. **구글 버튼 커스터마이징 금지** — `button-google`의 배경·테두리색·로고를 브랜드 색으로 바꾸거나 로고를 빼지 않는다. 구글 OAuth 브랜드 가이드라인을 어기지 않기 위한 고정 규격이다.
