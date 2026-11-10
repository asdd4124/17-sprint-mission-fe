import "./Header.css";
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <a href="/" className="logo">
            <img
              src="/images/icons/logo-panda-face.svg"
              alt=""
              className="logo-icon"
              width="40"
              height="41"
            />
            <span className="logo-text">판다마켓</span>
          </a>
          <nav className="header-nav">
            <a href="/community">자유게시판</a>
            <a href="/" className="active">
              중고마켓
            </a>
          </nav>
        </div>
        <a href="/login" className="btn-login">
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;
