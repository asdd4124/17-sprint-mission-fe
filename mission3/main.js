// main.js
// 서비스 함수들을 Given-When-Then 시나리오로 실행해 확인하는 파일

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

// 시나리오끼리 주고받을 값을 적어 두는 메모장
const memo = {};

// 게시글 시나리오 목록 (배열 안에 시나리오 객체가 하나씩)
const articleScenarios = [
  {
    given: "1페이지, 3개씩 보기가 주어졌을 때",
    when: "getArticleList(1, 3)을 실행하면",
    then: "게시글 목록(list)과 전체 개수(totalCount)가 반환된다",
    run: () => getArticleList(1, 3),
  },
  {
    given: "제목, 내용, 이미지가 주어졌을 때",
    when: "createArticle()을 실행하면",
    then: "새 게시글이 만들어지고 id가 생긴다",
    run: async () => {
      const article = await createArticle({
        title: "[장은진] 미션3 테스트 글",
        content: "axios로 만든 게시글입니다.",
        image: "https://example.com/test.png",
      });
      memo.articleId = article?.id; // 만든 글의 id를 메모장에 적어 둠
      return article;
    },
  },
  {
    given: "방금 만든 게시글 ID가 주어졌을 때",
    when: "getArticle()을 실행하면",
    then: "해당 게시글 정보가 반환된다",
    run: () => getArticle(memo.articleId),
  },
  {
    given: "바꿀 제목이 주어졌을 때",
    when: "patchArticle()을 실행하면",
    then: "제목이 바뀐 게시글이 반환된다",
    run: () => patchArticle(memo.articleId, { title: "수정된 제목" }),
  },
  {
    given: "방금 만든 게시글 ID가 주어졌을 때",
    when: "deleteArticle()을 실행하면",
    then: "삭제된 게시글의 id가 반환된다",
    run: () => deleteArticle(memo.articleId),
  },
  {
    given: "이미 삭제된 게시글 ID가 주어졌을 때",
    when: "getArticle()을 실행하면",
    then: "404 에러가 콘솔에 출력된다",
    run: () => getArticle(memo.articleId),
  },
];

// 시나리오 하나를 실행하고 결과를 보여 주는 함수
async function runScenario(scenario) {
  console.log("\n------------------------------");
  console.log("Given:", scenario.given);
  console.log("When:", scenario.when);
  console.log("Then:", scenario.then);
  const result = await scenario.run();
  console.log(">> 실제 결과:", result);
}

// 시나리오를 위에서부터 하나씩 차례대로 실행
console.log("===== 게시글(Article) 시나리오 =====");
for (const scenario of articleScenarios) {
  await runScenario(scenario);
}
