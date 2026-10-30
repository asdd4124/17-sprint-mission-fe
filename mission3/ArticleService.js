// ArticleService.js
// 게시글(Article) API 함수 모음 — .then() / .catch() 방식

import axios from "axios";

// 기존 주소를 미리 정해 둔 axios (매전 긴 주소를 쓰지 않으려 함)
const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app",
});

// 에러를 콘솔에 보여 주는 함수 (아래 5개 함수가 같이 씀)
function printError(error) {
  if (error.response) {
    // 서버가 2xx가 아닌 응답을 보낸 경우 (예: 404, 400)
    console.error("에러 상태 코드:", error.response.status);
    console.error("에러 내용:", error.response.data);
  } else {
    // 인터넷이 끊기는 등 응답 제체를 못 받은 경우
    console.error("요청 실패:", error.message);
  }
}

// 1. 게시글 목록 조회 (GET /articles)
export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  return instance
    .get("/articles", { params: { page, pageSize, keyword } })
    .then((response) => response.data)
    .catch((error) => printError(error));
}

// 2. 게시글 상세 조회 (GET / articles{articleId})
export function getArticle(articleId) {
  return instance
    .get(`/articles/${articleId}`)
    .then((response) => response.data)
    .catch((error) => printError(error));
}

// 3. 게시글 생성 (post /articles)
export function createArticle({ title, content, image }) {
  return instance
    .post("/articles", { title, content, image })
    .then((response) => response.data)
    .catch((error) => printError(error));
}

// 4. 게시글 수정 (PATCH /articles/{articleId})
export function patchArticle(articleId, updates) {
  return instance
    .patch(`/articles/${articleId}`, updates)
    .then((response) => response.data)
    .catch((error) => printError(error));
}

// 5. 게시글 삭제 (DELETE /artlcles/{articleId})
export function deleteArticle(articleId) {
  return instance
    .delete(`/articles/${articleId}`)
    .then((response) => response.data)
    .catch((error) => printError(error));
}
