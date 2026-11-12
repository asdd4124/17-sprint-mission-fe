import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import useWindowWidth from "../hooks/useWindowWidth";
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import "./AllProducts.css";

function getAllPageSize(width) {
  if (width >= 1200) return 10;
  if (width >= 744) return 6;
  return 4;
}

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const width = useWindowWidth();
  const pageSize = getAllPageSize(width);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPage(1);
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  const isEmpty = !isLoading && !error && products.length === 0;

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          page,
          pageSize,
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
  }, [page, pageSize, orderBy, keyword]);

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
        <SearchForm onSearch={handleSearch} />
        <a href="/registration" className="all-products-register">
          상품 등록하기
        </a>
        <SortDropdown value={orderBy} onChange={handleOrderChange} />
      </div>

      {isLoading && <p className="status-text">불러오는 중...</p>}
      {error && <p className="status-text">{error}</p>}
      {isEmpty && (
        <p className="status-text">
          {keyword
            ? `"${keyword}"에 대한 검색 결과가 없어요.`
            : "등록된 상품이 없어요."}
        </p>
      )}

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
