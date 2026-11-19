import { Link, NavLink, useLocation } from "react-router";
import "./Header.css";

function Header() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="logo">
            <img
              src="/images/icons/logo-panda-face.svg"
              alt=""
              className="logo-icon"
              width="40"
              height="41"
            />
            <span className="logo-text">판다마켓</span>
          </Link>
          {/* 랜딩 페이지에서는 메뉴 숨기기 (Figma 랜딩 헤더) */}
          {/* 현재 주소와 같은 메뉴에 active 클래스 자동 추가 (파란색) */}
          {!isLanding && (
            <nav className="header-nav">
              <NavLink to="/community">자유게시판</NavLink>
              <NavLink to="/items">중고마켓</NavLink>
            </nav>
          )}
        </div>
        <Link to="/login" className="btn-primary btn-login">
          로그인
        </Link>
      </div>
    </header>
  );
}

export default Header;
