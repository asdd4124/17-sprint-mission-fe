# 판다마켓 프론트엔드 (Sprint Mission 5)

코드잇 풀스택 17기 스프린트 미션 5입니다.
미션 1의 **랜딩 페이지**를 React로 옮기고, 미션 4의 **중고마켓 페이지**를 직접 만든 백엔드와 연결했으며, **상품 등록 페이지**를 새로 만들었습니다.

## 배포 주소

- 사이트: https://panda-market-fe.onrender.com
- API 서버: https://panda-market-be-7ke0.onrender.com
- 백엔드가 무료 플랜이라 한동안 요청이 없으면 잠듭니다. 첫 접속에서 "상품을 불러오지 못했어요."가 보이면 잠시 뒤 새로고침해 주세요.

## 실행 방법

Node.js 22.22 이상이 필요합니다 (react-router 8 기준).

```bash
npm install
cp .env.example .env
npm run dev
```

`.env`의 `VITE_API_URL`에 백엔드 주소를 넣은 뒤 실행합니다. 터미널에 나온 주소(기본 `http://localhost:5173`)로 접속합니다.

| 명령어          | 하는 일                          |
| --------------- | -------------------------------- |
| `npm run dev`   | 개발 서버 실행                   |
| `npm run build` | 배포용 파일 만들기 (`dist` 폴더) |
| `npm run lint`  | ESLint 검사                      |

### 환경 변수

| 이름           | 설명                                                            |
| -------------- | --------------------------------------------------------------- |
| `VITE_API_URL` | 백엔드 API 주소 (끝에 `/` 없이). 개발은 `http://localhost:3000` |

- 배포 사이트는 Render 환경 변수에 배포된 API 서버 주소를 넣어 사용합니다.

## 기술 스택

- React 19 + Vite
- react-router (페이지 주소 연결)
- axios (API 요청)
- CSS (컴포넌트별 CSS 파일, 디자인 토큰 `tokens.css`)
- Render (Static Site 배포)

## 페이지

| 주소                | 페이지                |
| ------------------- | --------------------- |
| `/`                 | 랜딩 페이지           |
| `/items`            | 중고마켓              |
| `/registration`     | 상품 등록             |
| `/items/:productId` | 상품 상세 (빈 페이지) |

## 구현 기능

### 기본 요구사항

- [x] 미션 1에서 HTML·CSS로 만든 랜딩 페이지를 React로 마이그레이션 (`/`)
- [x] 중고마켓 페이지 주소 `/items`, 이 페이지에서 상단 "중고마켓" 메뉴 색상 `#3692FF`
- [x] 판매 중인 상품: 직접 만든 백엔드의 `GET /products` 사용
  - 좋아요순 정렬 제외 (최신순만)
  - 상품 사진은 프론트엔드에서 디폴트 이미지로 표시
  - 베스트 상품 목록 삭제
- [x] '상품 등록하기' 버튼을 누르면 `/registration`으로 이동
- [x] PC·태블릿·모바일 디자인의 상품 등록 페이지 (`/registration`)
- [x] 상품 등록: 직접 만든 백엔드의 `POST /products` 사용
- [x] 등록 성공 시 해당 상품 상세 페이지(`/items/:productId`, 빈 페이지)로 이동

### 심화 요구사항

- [x] 입력칸에 빈 값이 있으면 등록 버튼 비활성화
  - 상품명·상품 소개·판매 가격이 비어 있거나, 유효성 검사 에러가 하나라도 있으면 비활성화
  - 태그는 Enter를 누를 때마다 비워지는 칸이고 백엔드에서도 선택 값이라, 비어 있어도 등록할 수 있음
- [x] 태그 입력 후 Enter를 누르면 칩 형태로 쌓기
  - 같은 태그는 한 번만 추가, 칩의 X 버튼으로 삭제
  - Enter로 칩이 된 태그만 등록 (입력칸에 남아 있는 글자는 보내지 않음)
- [x] 상품명·상품 소개·판매 가격·태그 유효성 검사 Custom Hook (`useProductValidation`, 빨간 테두리 + 빨간 에러 메시지)
  - 상품명 10자 이내 · 상품 소개 10자 이상 100자 이내 · 판매 가격 숫자만(0 이상의 정수) · 태그 5글자 이내 (백엔드 검사 규칙에 맞춤)

### 추가로 한 것

- 등록 중에는 등록 버튼을 막아서 같은 상품이 두 번 등록되지 않도록 처리
- 등록 실패 시 안내 문구 표시
- 판매 가격 입력칸에서 휴대폰 숫자 키패드 표시 (`inputMode="numeric"`)
- 라벨을 누르면 해당 입력칸으로 커서 이동
- 랜딩 페이지에서는 미션 1 디자인처럼 상단 메뉴 숨기기
- 상품 검색(Enter), 페이지네이션(번호 5개씩 묶음), 화면 크기별 상품 개수(PC 10개 · 태블릿 6개 · 모바일 4개) (미션 4)
- 불러오는 중 · 불러오기 실패 · 상품 없음 · 검색 결과 없음 상태 문구 표시 (미션 4)
- 긴 상품명 한 줄 말줄임(…), 모바일 정렬 버튼 아이콘 (미션 4)

## 멘토님 피드백 반영 (미션 4)

[미션 4 PR](https://github.com/codeit-sprint-fullstack/17-sprint-mission-fe/pull/57)에서 받은 리뷰를 반영했습니다.

| 피드백                            | 반영 내용                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| 화면 너비 대신 기기 구간을 상태로 | `useWindowWidth`를 `useDeviceType`(`pc`·`tablet`·`mobile`)으로 바꿔 구간이 바뀔 때만 다시 그리기 |
| 정렬 값을 상수로                  | `constants/product.js`의 `ORDER_BY`로 통일                                                       |
| API 주소를 환경 변수로            | `.env`의 `VITE_API_URL` 사용 (`.env.example` 추가)                                               |
| 페이지 번호 배열 만들기           | `Array.from`으로 변경                                                                            |
| 정렬 드롭다운 바깥을 누르면 닫기  | `useRef` + `document`의 `mousedown` 이벤트로 처리                                                |

## 폴더 구조

```
src
├─ api
│  └─ products.js          # 상품 목록 조회(GET)·등록(POST)
├─ constants
│  └─ product.js           # 정렬 값 상수 (ORDER_BY)
├─ hooks
│  ├─ useDeviceType.js     # 화면 너비 → 기기 구간 (pc·tablet·mobile)
│  ├─ usePageSize.js       # 기기 구간별 개수
│  ├─ useProductValidation.js # 상품 등록 입력값 유효성 검사
│  └─ useProducts.js       # 상품 목록·전체 개수·로딩·에러 불러오기
├─ pages
│  ├─ LandingPage          # 랜딩 페이지 (/)
│  ├─ MarketPage           # 중고마켓 (/items)
│  ├─ RegistrationPage     # 상품 등록 (/registration)
│  └─ ProductDetailPage    # 상품 상세 (/items/:productId, 빈 페이지)
├─ components
│  ├─ Layout               # 모든 페이지 공통 틀 (헤더 + 페이지 내용 + 푸터)
│  ├─ Header / Footer
│  ├─ AllProducts          # 판매 중인 상품 (검색·정렬·페이지 상태)
│  ├─ ProductCard          # 상품 카드 한 개
│  ├─ SearchForm           # 검색창
│  ├─ SortDropdown         # 정렬 드롭다운
│  ├─ Pagination           # 페이지 번호
│  └─ RegistrationForm     # 상품 등록 폼
├─ styles
│  ├─ reset.css            # 브라우저 기본 스타일 초기화
│  └─ tokens.css           # Figma 색·글꼴·크기 값
├─ App.jsx                 # 주소별 페이지 연결
├─ index.css               # 페이지 공통 스타일
└─ main.jsx
```

## 구현하면서 신경 쓴 점

- **공통 틀은 한 번만:** 헤더와 푸터를 `Layout`에 두고 각 페이지는 `Outlet` 자리에 들어가게 해서, 페이지마다 헤더·푸터를 반복하지 않았습니다.
- **현재 페이지 표시:** 상단 메뉴를 `NavLink`로 바꿔, 현재 주소의 메뉴에 붙는 `active` 클래스로 색을 바꿨습니다.
- **스타일 재사용:** 중고마켓과 상품 등록 페이지가 같은 폭·여백 규칙(`.market`, `.registration`)을 함께 쓰고, 등록 버튼은 기존 `btn-primary`를, 입력칸 색·모서리는 디자인 토큰을 사용했습니다. 상품 등록 화면의 입력칸·버튼·에러 문구·태그 칩의 크기와 간격은 Figma에서 잰 값에 맞췄습니다.
- **입력값은 하나의 상태로:** 상품 등록 입력칸 4개의 값을 객체 하나(`values`)에 모으고, 입력칸의 `name`으로 바꿀 값을 찾는 `handleChange` 하나로 처리했습니다.
- **백엔드 규칙에 맞춘 값:** 입력칸 값은 항상 문자열이라 판매 가격은 숫자로 바꾸고, 태그는 칩 목록 배열로 보냅니다.
- **유효성 검사 기준은 한 곳에:** 글자 수·숫자 기준을 `useProductValidation` 맨 위 상수로 모으고 백엔드 `CreateProduct` 규칙에 맞췄습니다. 판매 가격은 원 단위라 소수점 없이 숫자만 받습니다. 앞뒤 공백을 지운 값으로 검사해서 공백만 입력하면 빈 값으로 봅니다.
- **에러를 보여 주는 시점:** 입력칸을 한 번 벗어난(`onBlur`) 뒤부터(태그는 Enter를 눌렀을 때도) 에러 문구를 보여 줘서, 아직 쓰는 중에는 빨간색이 뜨지 않게 했습니다. 등록 버튼은 벗어났는지와 상관없이 실제 값으로 판단합니다.
- **한글 태그 입력:** 한글을 조합하는 중에 누른 Enter(`isComposing`)는 무시해서 Enter 한 번에 태그가 두 번 처리되지 않게 했고, 태그 칸의 Enter로 폼이 제출되지 않도록 막았습니다.
- **늦게 온 응답 무시:** 검색이나 페이지를 빠르게 바꿀 때 이전 요청 결과가 최신 결과를 덮어쓰지 않도록 `useProducts`에서 이전 요청의 응답은 무시합니다.
- **조건 표시 규칙:** JSX 안에서 "A 또는 B"는 삼항 연산자, "보이거나 말거나"는 `&&`로 통일했습니다.

## 사용 API

직접 만든 백엔드 API를 사용합니다 ([백엔드 저장소 `node-장은진` 브랜치](https://github.com/asdd4124/17-sprint-mission-be/tree/node-%EC%9E%A5%EC%9D%80%EC%A7%84)).

- `GET /products`: `page`, `pageSize`, `orderBy`(`recent`), `keyword`
  - 검색은 상품명과 상품 설명에 검색어가 들어간 상품을 모두 찾습니다.
- `POST /products`: `name`, `description`, `price`, `tags`

## 이번 범위에 포함하지 않은 것

- 상품 상세 페이지 내용 (요구사항대로 빈 페이지)
- 상품 이미지 업로드, 좋아요 누르기
- 로그인, 자유게시판, Privacy·FAQ 페이지 (링크만 연결)
- 랜딩 페이지 반응형 (미션 1에서 PC 디자인만 구현)
