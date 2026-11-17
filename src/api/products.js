import axios from "axios";
import { ORDER_BY } from "../constants/product";

// 기본 주소(.env의 VITE_API_URL)를 미리 정해 둔 axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// 상품 목록 조회 (GET /products)
// orderBy: ORDER_BY.RECENT(최신순) 또는 ORDER_BY.FAVORITE(좋아요순)
export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = ORDER_BY.RECENT,
  keyword = "",
} = {}) {
  const response = await instance.get("/products", {
    params: { page, pageSize, orderBy, keyword },
  });
  return response.data; // { list, totalCount }
}
