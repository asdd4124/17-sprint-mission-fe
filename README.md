# 판다마켓 (Panda Market)

코드잇 풀스택 17기 스프린트 미션 저장소입니다. 중고 거래 서비스 **판다마켓**의 화면을 HTML·CSS로 만듭니다.

- 배포 주소: https://panda-market-ejin.netlify.app
- 디자인: Figma `[스프린터용] 판다마켓`

## 페이지

| 주소                           | 파일                | 내용                 |
| ------------------------------ | ------------------- | -------------------- |
| `/`                            | `index.html`        | 랜딩 페이지 (미션 1) |
| `/login`                       | `login/index.html`  | 로그인 (미션 2)      |
| `/signup`                      | `signup/index.html` | 회원가입 (미션 2)    |
| `/items` · `/faq` · `/privacy` | `*/index.html`      | 빈 페이지            |

폴더 안에 `index.html`을 두면 주소창에 `/login`만 입력해도 그 파일이 열립니다.

## 폴더 구조

```
17-sprint-mission-fe
├── index.html            # 랜딩 (미션 1)
├── login/index.html      # 로그인 (미션 2)
├── signup/index.html     # 회원가입 (미션 2)
├── items/index.html      # 빈 페이지
├── faq/index.html        # 빈 페이지
├── privacy/index.html    # 빈 페이지
├── css/
│   ├── reset.css         # 브라우저 기본 스타일 지우기
│   ├── tokens.css        # 디자인 토큰 (색·글자·모서리·폭)
│   ├── style.css         # 랜딩 페이지
│   └── auth.css          # 로그인·회원가입 공통
├── js/
│   └── password-toggle.js  # 비밀번호 보기 (심화)
├── fonts/                # 로고용 공군체 서브셋
├── images/
│   ├── icons/            # 로고·SNS·눈 아이콘
│   └── landing/          # 랜딩 이미지
├── .gitignore
└── README.md
```

## 스프린트 미션 2 요구사항

### 기본

- [x] 로고 클릭 시 `/`로 이동
- [x] 로그인·회원가입 두 페이지의 로고 위 여백 동일 (60px)
- [x] SNS 아이콘 클릭 시 `https://www.google.com/`, `https://www.kakaocorp.com/page/`로 이동
- [x] input focus in: 테두리 `#3692FF` / focus out: 테두리 없음
- [x] 로그인 페이지 "회원가입" 클릭 시 `/signup`
- [x] 회원가입 페이지 "로그인" 클릭 시 `/login`
- [x] Netlify 배포

### 심화

- [x] 비밀번호·비밀번호 확인 input 오른쪽 눈 아이콘 (누르면 보기/숨기기)
- [x] Figma palette 13색을 모두 CSS 변수로 등록해서 사용 (`css/tokens.css`)
- [x] 구글 애널리틱스로 방문자 수 확인 (모든 페이지 `<head>`에 gtag 태그)

## 만들 때 정한 것

- **크기는 rem** (px ÷ 16). 브라우저 글꼴 크기를 바꾸면 화면 전체가 함께 커지고 작아집니다. 1px 선만 px로 둡니다.
- **로고 위 여백 60px.** Figma는 로그인 231px, 회원가입 60px로 다르지만 요구사항이 "두 페이지 동일"이라 회원가입이 화면 안에 들어오는 60px로 맞췄습니다.
- **버튼 활성화는 JavaScript 없이.** 입력창에 `required`를 넣고 `.auth-form:valid .btn-auth`로, 칸을 모두 알맞게 채우면 버튼이 회색에서 파란색(#3692FF)으로 바뀝니다 (Figma '로그인 - 테두리' 상태).
- **포커스 테두리는 `outline` + `outline-offset: -1px`.** 테두리가 상자 안쪽에 그려져서 입력창 크기(640×56)가 변하지 않습니다.

## 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/) 형식을 따릅니다.

```
feat: 로그인 페이지 마크업 구현
chore: .gitignore 추가
docs: README 작성
```
