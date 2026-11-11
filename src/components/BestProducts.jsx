import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "./ProductCard";
import "./BestProducts.css";

function BestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBestProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          page: 1,
          pageSize: 4,
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
  }, []);

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
