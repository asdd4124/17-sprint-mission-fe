import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import "./AllProducts.css";

const PAGE_SIZE = 10;

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          page,
          pageSize: PAGE_SIZE,
          orderBy,
          keyword,
        });
        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch {
        setError("상품을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [page, orderBy, keyword]);

  const handleOrderChange = (nextOrderBy) => {
    setOrderBy(nextOrderBy);
    setPage(1);
  };

  const handleSearch = (nextKeyword) => {
    setKeyword(nextKeyword);
    setPage(1);
  };

  return (
    <section className="all-products">
      <div className="all-products-header">
        <h2 className="section-title">전체 상품</h2>
        <div className="all-products-controls">
          <SearchForm onSearch={handleSearch} />
          <SortDropdown value={orderBy} onChange={handleOrderChange} />
        </div>
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

      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default AllProducts;
