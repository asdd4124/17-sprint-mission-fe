import { Link } from "react-router";
import "./LandingPage.css";

// 기능 소개 섹션 3개 (isReversed: 글 왼쪽 · 그림 오른쪽)
const FEATURES = [
  {
    label: "Hot item",
    title: (
      <>
        인기 상품을
        <br />
        확인해 보세요
      </>
    ),
    description: (
      <>
        가장 HOT한 중고거래 물품을
        <br />
        판다 마켓에서 확인해 보세요
      </>
    ),
    image: "/images/landing/img-home-01.png",
    alt: "하트를 받은 초록색 티셔츠와 판다 캐릭터",
    isReversed: false,
  },
  {
    label: "Search",
    title: (
      <>
        구매를 원하는
        <br />
        상품을 검색하세요
      </>
    ),
    description: (
      <>
        구매하고 싶은 물품은 검색해서
        <br />
        쉽게 찾아보세요
      </>
    ),
    image: "/images/landing/img-home-02.png",
    alt: "상품 카드 사이에서 돋보기로 상품을 찾는 모습",
    isReversed: true,
  },
  {
    label: "Register",
    title: (
      <>
        판매를 원하는
        <br />
        상품을 등록하세요
      </>
    ),
    description: (
      <>
        어떤 물건이든 판매하고 싶은 상품을
        <br />
        쉽게 등록하세요
      </>
    ),
    image: "/images/landing/img-home-03.png",
    alt: "필통, 노트, 안경 상품 카드와 파일 폴더",
    isReversed: false,
  },
];

// 랜딩 페이지 (/)
function LandingPage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link to="/items" className="btn-large">
              구경하러 가기
            </Link>
          </div>
          <img
            src="/images/landing/img-home-top.png"
            alt=""
            className="hero-image"
            width="746"
            height="340"
          />
        </div>
      </section>

      {FEATURES.map((feature) => (
        <section
          key={feature.label}
          className={feature.isReversed ? "feature feature-reverse" : "feature"}
        >
          <div className="feature-card">
            <img
              src={feature.image}
              alt={feature.alt}
              className="feature-image"
              width="588"
              height="444"
              loading="lazy"
            />
            <div className="feature-text">
              <p className="feature-label">{feature.label}</p>
              <div className="feature-body">
                <h2 className="feature-title">{feature.title}</h2>
                <p className="feature-desc">{feature.description}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="banner">
        <div className="banner-inner">
          <h2 className="banner-title">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
          <img
            src="/images/landing/img-home-bottom.png"
            alt=""
            className="banner-image"
            width="746"
            height="397"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
