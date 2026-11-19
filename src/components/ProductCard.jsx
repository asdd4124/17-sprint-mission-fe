import "./ProductCard.css";

// 상품 사진 대신 쓰는 기본 이미지 (Figma 디폴트 이미지)
const DEFAULT_IMAGE = "/images/img-default.svg";

function ProductCard({ product }) {
  // 좋아요 기능이 없는 API라 좋아요 수는 0으로 표시
  const { name, price, favoriteCount = 0 } = product;

  return (
    <article className="product-card">
      <img className="product-card-img" src={DEFAULT_IMAGE} alt="" />
      <div className="product-card-info">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">{price.toLocaleString()}원</p>
        <p className="product-card-like">
          <img
            src="/images/icons/ic_heart_16.svg"
            alt="좋아요"
            width="16"
            height="16"
          />
          {favoriteCount}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
