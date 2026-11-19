import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import MarketPage from "./pages/MarketPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegistrationPage from "./pages/RegistrationPage";

// 주소별 페이지 연결
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/items/:productId" element={<ProductDetailPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
