import BestProducts from "../components/BestProducts";
import AllProducts from "../components/AllProducts";

// 중고마켓 페이지 (/items)
function MarketPage() {
  return (
    <main className="market">
      <BestProducts />
      <AllProducts />
    </main>
  );
}

export default MarketPage;
