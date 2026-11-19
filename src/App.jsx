import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import MarketPage from "./pages/MarketPage";

// 주소별 페이지 연결
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
      </Route>
    </Routes>
  );
}

export default App;
