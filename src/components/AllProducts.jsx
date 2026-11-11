import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "./ProductCard";
import "./AllProducts.css";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          page: 1,
          pageSize: 10,
          orderBy: "recent",
        });
        setProducts(data.list);
      } catch {
        setError("상품을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="all-products">
      <div className="all-products-header">
        <h2 className="section-title">전체 상품</h2>
      </div>

      {isLoading && <p className="status-text">불러오는 중...</p>}
      {error && <p className="status-text">{error}</p>}

      <ul className="all-products-list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AllProducts;
