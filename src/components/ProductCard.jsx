import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { name, price, images, favoriteCount } = product;
  const [isImageError, setIsImageError] = useState(false);

  const imageUrl = images[0];
  const hasImage = imageUrl && !isImageError;

  return (
    <article className="product-card">
      {hasImage ? (
        <img
          className="product-card-img"
          src={imageUrl}
          alt={name}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <div
          className="product-card-img product-card-img-empty"
          role="img"
          aria-label="상품 이미지 없음"
        >
          <img
            className="product-card-img-empty-icon"
            src="/images/icons/logo-panda-face.svg"
            alt=""
          />
          <span className="product-card-img-empty-text">판다마켓</span>
        </div>
      )}
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
