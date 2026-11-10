import "./ProductCard.css";

function ProductCard({ product }) {
  const { name, price, images, favoriteCount } = product;

  return (
    <article className="product-card">
      <img className="product-card-img" src={images[0]} alt={name} />
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
