# 스프린트 미션 3 - 판다마켓 API CRUD

판다마켓 API(Article, Product)를 이용해 생성·조회·수정·삭제(CRUD) 함수를 구현했습니다.

## 실행 방법

1. `mission3` 폴더로 이동: `cd mission3`
2. 패키지 설치: `npm install`
3. 실행: `node main.js`

## 파일 구조

| 파일                | 역할                                                   |
| ------------------- | ------------------------------------------------------ |
| `ArticleService.js` | 게시글 API 함수 5개 (`.then()` / `.catch()` 방식)      |
| `ProductService.js` | 상품 API 함수 5개 (`async/await` / `try/catch` 방식)   |
| `main.js`           | 함수를 import해서 Given-When-Then 시나리오로 실행·확인 |

## 구현한 함수

| Article                                    | Product                                                     | 메소드 |
| ------------------------------------------ | ----------------------------------------------------------- | ------ |
| `getArticleList(page, pageSize, keyword)`  | `getProductList(page, pageSize, keyword)`                   | GET    |
| `getArticle(articleId)`                    | `getProduct(productId)`                                     | GET    |
| `createArticle({ title, content, image })` | `createProduct({ name, description, price, tags, images })` | POST   |
| `patchArticle(articleId, updates)`         | `patchProduct(productId, updates)`                          | PATCH  |
| `deleteArticle(articleId)`                 | `deleteProduct(productId)`                                  | DELETE |

## 왜 이렇게 구현했나

- **axios 선택**: 응답 JSON을 자동으로 변환해 주고, 상태 코드가 2XX가 아니면 자동으로 에러로 처리해 줘서 catch 한 곳에서 에러를 다룰 수 있습니다.
- **axios 인스턴스 사용**: 기본 주소(baseURL)를 한 번만 정해 두고 함수마다 `/articles`처럼 짧게 쓰려고 `axios.create()`로 인스턴스를 만들었습니다.
- **timeout 10초 설정**: 응답이 오지 않을 때 무한정 기다리지 않도록 대기 시간을 정했습니다. 서버가 잠들어 있다가 첫 요청에 깨어날 때 느릴 수 있어서 넉넉하게 10초로 정했습니다.
- **printError 함수로 에러 처리 통일**: 서버가 에러 응답을 보낸 경우(404 등)와 응답 자체를 못 받은 경우(인터넷 끊김, 타임아웃)를 나눠서 콘솔에 출력합니다. 함수마다 같은 코드를 반복하지 않으려고 하나로 묶었습니다.
- **두 가지 비동기 방식 비교**: Article은 `.then()`, Product는 `async/await`로 같은 일을 다른 문법으로 구현했습니다. `async/await` 쪽이 위에서 아래로 순서대로 읽혀서 더 이해하기 쉬웠습니다.

## 테스트 시나리오 (Given-When-Then)

BDD(행동 주도 개발)의 Given-When-Then 방식으로, 시나리오를 객체로 만들고 배열에 담아 차례대로 실행했습니다. 테스트 라이브러리 없이 `console.log()`로 예상 결과(Then)와 실제 결과를 비교합니다.

| 순서 | Given                           | When        | Then                            |
| ---- | ------------------------------- | ----------- | ------------------------------- |
| 1    | 1페이지, 3개씩 보기             | 목록 조회   | 목록과 전체 개수가 반환된다     |
| 2    | 새 글(상품) 정보                | 생성        | 새 글이 만들어지고 id가 생긴다  |
| 3    | 방금 만든 id                    | 상세 조회   | 해당 정보가 반환된다            |
| 4    | 방금 만든 글 제목(상품 이름)의 일부 | 키워드 검색 | 검색어가 들어간 목록이 반환된다 |
| 5    | 바꿀 내용                       | 수정        | 바뀐 정보가 반환된다            |
| 6    | 방금 만든 id                    | 삭제        | 삭제된 id가 반환된다            |
| 7    | 이미 삭제된 id                  | 상세 조회   | 404 에러가 콘솔에 출력된다      |

- **함께 쓰는 서버를 배려했습니다**: 수정·삭제는 내가 만든 글(상품)에만 하고, 마지막에 지워서 서버에 테스트 데이터가 남지 않게 했습니다.
- **생성 실패 대비**: 생성에 실패해 id가 없으면, id가 필요한 다음 시나리오는 요청을 보내지 않고 건너뜁니다.
