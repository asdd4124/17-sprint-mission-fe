// main.js
// 서비스 함수들을 Given-When-Then 시나리오로 실행해 확인하는 파일

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

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
    needsId: true, // 만든 글 번호(memo.articleId)가 있어야 하는 카드
    run: () => getArticle(memo.articleId),
  },
  {
    given: '방금 만든 글 제목에 들어 있는 "장은진"이 검색어로 주어졌을 때',
    when: 'getArticleList(1, 3, "장은진")을 실행하면',
    then: '제목에 "장은진"이 들어간 게시글 목록이 반환된다',
    needsId: true,
    run: () => getArticleList(1, 3, "장은진"),
  },
  {
    given: "바꿀 제목이 주어졌을 때",
    when: "patchArticle()을 실행하면",
    then: "제목이 바뀐 게시글이 반환된다",
    needsId: true,
    run: () => patchArticle(memo.articleId, { title: "수정된 제목" }),
  },
  {
    given: "방금 만든 게시글 ID가 주어졌을 때",
    when: "deleteArticle()을 실행하면",
    then: "삭제된 게시글의 id가 반환된다",
    needsId: true,
    run: () => deleteArticle(memo.articleId),
  },
  {
    given: "이미 삭제된 게시글 ID가 주어졌을 때",
    when: "getArticle()을 실행하면",
    then: "404 에러가 콘솔에 출력된다",
    needsId: true,
    run: () => getArticle(memo.articleId),
  },
];

// 상품 시나리오 목록
const productScenarios = [
  {
    given: "1페이지, 3개씩 보기가 주어졌을 때",
    when: "getProductList(1, 3)을 실행하면",
    then: "상품 목록(list)과 전체 개수(totalCount)가 반환된다",
    run: () => getProductList(1, 3),
  },
  {
    given: "이름, 설명, 가격, 태그, 이미지가 주어졌을 때",
    when: "createProduct()를 실행하면",
    then: "새 상품이 만들어지고 id가 생긴다",
    run: async () => {
      const product = await createProduct({
        name: "[장은진] 미션3 테스트 상품",
        description: "axios로 만든 상품입니다.",
        price: 10000,
        tags: ["테스트"],
        images: ["https://example.com/test.png"],
      });
      memo.productId = product?.id; // 만든 상품의 id를 메모장에 적어 둠
      return product;
    },
  },
  {
    given: "방금 만든 상품 ID가 주어졌을 때",
    when: "getProduct()를 실행하면",
    then: "해당 상품 정보가 반환된다",
    needsProductId: true, // 만든 상품 번호(memo.productId)가 있어야 하는 카드
    run: () => getProduct(memo.productId),
  },
  {
    given: '방금 만든 상품 이름에 들어 있는 "장은진"이 검색어로 주어졌을 때',
    when: 'getProductList(1, 3, "장은진")을 실행하면',
    then: '"장은진"이 들어간 상품 목록이 반환된다',
    needsProductId: true,
    run: () => getProductList(1, 3, "장은진"),
  },
  {
    given: "바꿀 가격이 주어졌을 때",
    when: "patchProduct()를 실행하면",
    then: "가격이 바뀐 상품이 반환된다",
    needsProductId: true,
    run: () => patchProduct(memo.productId, { price: 15000 }),
  },
  {
    given: "방금 만든 상품 ID가 주어졌을 때",
    when: "deleteProduct()를 실행하면",
    then: "삭제된 상품의 id가 반환된다",
    needsProductId: true,
    run: () => deleteProduct(memo.productId),
  },
  {
    given: "이미 삭제된 상품 ID가 주어졌을 때",
    when: "getProduct()를 실행하면",
    then: "404 에러가 콘솔에 출력된다",
    needsProductId: true,
    run: () => getProduct(memo.productId),
  },
];

// 시나리오 하나를 실행하고 결과를 보여 주는 함수
async function runScenario(scenario) {
  console.log("\n------------------------------");
  console.log("Given:", scenario.given);
  console.log("When:", scenario.when);
  console.log("Then:", scenario.then);

  // 글 만들기가 실패해서 번호가 없으면, 번호가 필요한 카드는 건너뛰기
  if (scenario.needsId && !memo.articleId) {
    console.log(">> 건너뜀: 게시글 생성에 실패해서 id가 없어요.");
    return;
  }

  // 상품 만들기가 실패해서 번호가 없으면, 번호가 필요한 카드는 건너뛰기
  if (scenario.needsProductId && !memo.productId) {
    console.log(">> 건너뜀: 상품 생성에 실패해서 id가 없어요.");
    return;
  }

  const result = await scenario.run();
  console.log(">> 실제 결과:", result);
}

// 시나리오를 위에서부터 하나씩 차례대로 실행
console.log("===== 게시글(Article) 시나리오 =====");
for (const scenario of articleScenarios) {
  await runScenario(scenario);
}

console.log("\n===== 상품(Product) 시나리오 =====");
for (const scenario of productScenarios) {
  await runScenario(scenario);
}
