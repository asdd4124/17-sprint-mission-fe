import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

// 모든 페이지 공통 틀 (헤더 + 페이지 내용 + 푸터)
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
