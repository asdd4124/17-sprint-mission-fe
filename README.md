# 판다마켓 중고마켓 (Sprint Mission 4)

코드잇 풀스택 17기 스프린트 미션 4입니다.
판다마켓의 **중고마켓 페이지**(`/`)를 React로 만들었습니다.

## 실행 방법

Node.js 20.19 이상이 필요합니다 (Vite 8 기준).

```bash
npm install
npm run dev
```

터미널에 나온 주소(기본 `http://localhost:5173`)로 접속합니다.

| 명령어          | 하는 일                          |
| --------------- | -------------------------------- |
| `npm run dev`   | 개발 서버 실행                   |
| `npm run build` | 배포용 파일 만들기 (`dist` 폴더) |
| `npm run lint`  | ESLint 검사                      |

## 기술 스택

- React 19 + Vite
- axios (API 요청)
- CSS (컴포넌트별 CSS 파일, 디자인 토큰 `tokens.css`)

## 구현 기능

### 기본 요구사항

- [x] PC·태블릿·모바일 반응형 중고마켓 페이지
- [x] 랜딩 페이지와 같은 스타일의 헤더·푸터
- [x] 베스트 상품: 좋아요 많은 순(`orderBy=favorite`)
- [x] 전체 상품: `GET /products`로 목록 불러오기
- [x] 최신순·좋아요순 정렬 드롭다운 (정렬을 바꾸면 1페이지로 이동)
- [x] 상품 검색 (검색어 입력 후 Enter, 검색하면 1페이지로 이동)
- [x] 페이지네이션 (페이지 번호 5개씩 묶음, 이전·다음 버튼)

### 심화 요구사항

- [x] 커스텀 훅 사용 (`useWindowWidth`, `usePageSize`, `useProducts`)
- [x] 화면 크기별 카드 열 개수

| 화면   | 너비           | 베스트 상품 | 전체 상품        |
| ------ | -------------- | ----------- | ---------------- |
| PC     | 1200px 이상    | 4열 (4개)   | 5열 × 2줄 (10개) |
| 태블릿 | 744px ~ 1199px | 2열 (2개)   | 3열 × 2줄 (6개)  |
| 모바일 | 743px 이하     | 1열 (1개)   | 2열 × 2줄 (4개)  |

- [x] 화면 크기에 맞는 `pageSize`를 서버에 요청 (PC·태블릿·모바일 구간이 바뀌면 1페이지부터 다시 불러오기)

### 추가로 한 것

- 상품 이미지가 없거나 깨지면 판다마켓 기본 이미지 표시
- 긴 상품명은 한 줄 말줄임(…) 처리
- 불러오는 중 · 불러오기 실패 · 검색 결과 없음 상태 문구 표시
- 상품 등록하기 버튼 (`/registration`으로 이동, 등록 페이지는 이후 미션에서 구현)
- 모바일에서는 정렬 버튼을 아이콘으로 표시
- 판다마켓 로고 파비콘

## 폴더 구조

```
src
├─ api
│  └─ products.js        # axios로 GET /products 요청
├─ hooks
│  ├─ useWindowWidth.js  # 현재 화면 너비
│  ├─ usePageSize.js     # 화면 크기별 개수 (PC·태블릿·모바일)
│  └─ useProducts.js     # 상품 목록·전체 개수·로딩·에러 불러오기
├─ components
│  ├─ Header / Footer
│  ├─ BestProducts       # 베스트 상품
│  ├─ AllProducts        # 전체 상품 (검색·정렬·페이지 상태)
│  ├─ ProductCard        # 상품 카드 한 개
│  ├─ SearchForm         # 검색창
│  ├─ SortDropdown       # 정렬 드롭다운
│  └─ Pagination         # 페이지 번호
├─ styles
│  ├─ reset.css          # 브라우저 기본 스타일 초기화
│  └─ tokens.css         # Figma 색·글꼴·크기 값
├─ App.jsx
├─ index.css             # 페이지 공통 스타일
└─ main.jsx
```

## 구현하면서 신경 쓴 점

- **중복 없애기:** 베스트·전체 상품에 똑같이 있던 불러오기 코드를 `useProducts` 훅으로, 화면별 개수 계산을 `usePageSize` 훅으로, 파란 버튼 스타일을 `btn-primary` 클래스로 모았습니다.
- **역할 나누기:** 화면 모양(열 개수, 여백, 배치)은 CSS 미디어쿼리로, 서버에 보낼 값(`pageSize`)은 JS 훅으로 처리했습니다.
- **늦게 온 응답 무시:** 검색이나 페이지를 빠르게 바꿀 때 이전 요청 결과가 최신 결과를 덮어쓰지 않도록 `useProducts`에서 이전 요청의 응답은 무시합니다.
- **조건 표시 규칙:** JSX 안에서 "A 또는 B"는 삼항 연산자, "보이거나 말거나"는 `&&`로 통일했습니다.

## 사용 API

- `GET https://panda-market-api.vercel.app/products` ([API 명세](https://panda-market-api.vercel.app/docs/))
  - `page`, `pageSize`, `orderBy`(`recent` | `favorite`), `keyword`
  - 검색은 API의 `keyword`를 그대로 사용해서, 상품명뿐 아니라 상품 설명에 검색어가 들어간 상품도 결과에 나옵니다.

## 이번 범위에 포함하지 않은 것

- 상품 등록(`/registration`), 로그인, 자유게시판, Privacy·FAQ 페이지 (링크만 연결)
- 상품 상세 페이지 (상품 카드를 눌러도 이동하지 않음)
- 좋아요 누르기 (좋아요 수는 표시만)
