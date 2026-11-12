import useProducts from "../hooks/useProducts";
import usePageSize from "../hooks/usePageSize";
import ProductCard from "./ProductCard";
import "./BestProducts.css";

function BestProducts() {
  const pageSize = usePageSize({ pc: 4, tablet: 2, mobile: 1 });
  const { products, isLoading, error } = useProducts({
    page: 1,
    pageSize,
    orderBy: "favorite",
  });

  return (
    <section className="best-products">
      <h2 className="section-title">베스트 상품</h2>

      {isLoading && <p className="status-text">불러오는 중...</p>}
      {error && <p className="status-text">베스트 상품을 불러오지 못했어요.</p>}

      <ul className="best-products-list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestProducts;
