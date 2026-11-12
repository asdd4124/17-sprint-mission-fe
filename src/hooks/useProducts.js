import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

function useProducts({ page, pageSize, orderBy, keyword }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({ page, pageSize, orderBy, keyword });
        if (ignore) return;
        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (err) {
        if (ignore) return;
        setError(err);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [page, pageSize, orderBy, keyword]);

  return { products, totalCount, isLoading, error };
}

export default useProducts;
