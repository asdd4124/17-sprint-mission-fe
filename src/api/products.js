import axios from "axios";

// 기본 주소(.env의 VITE_API_URL)를 미리 정해 둔 axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// 상품 목록 조회 (GET /products)
// orderBy: "recent"(최신순) 또는 "favorite"(좋아요순)
export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const response = await instance.get("/products", {
    params: { page, pageSize, orderBy, keyword },
  });
  return response.data; // { list, totalCount }
}
