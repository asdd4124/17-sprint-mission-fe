import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import useWindowWidth from "../hooks/useWindowWidth";
import ProductCard from "./ProductCard";
import "./BestProducts.css";

function getBestPageSize(width) {
  if (width >= 1200) return 4;
  if (width >= 744) return 2;
  return 1;
}

function BestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const width = useWindowWidth();
  const pageSize = getBestPageSize(width);

  useEffect(() => {
    const loadBestProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          page: 1,
          pageSize,
          orderBy: "favorite",
        });
        setProducts(data.list);
      } catch {
        setError("베스트 상품을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBestProducts();
  }, [pageSize]);

  return (
    <section className="best-products">
      <h2 className="section-title">베스트 상품</h2>

      {isLoading && <p className="status-text">불러오는 중...</p>}
      {error && <p className="status-text">{error}</p>}

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
