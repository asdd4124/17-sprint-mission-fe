import "./Footer.css";

const SNS_LINKS = [
  {
    name: "페이스북",
    href: "https://www.facebook.com/",
    icon: "/images/icons/ic-facebook.svg",
  },
  {
    name: "트위터",
    href: "https://twitter.com/",
    icon: "/images/icons/ic-twitter.svg",
  },
  {
    name: "유튜브",
    href: "https://www.youtube.com/",
    icon: "/images/icons/ic-youtube.svg",
  },
  {
    name: "인스타그램",
    href: "https://www.instagram.com/",
    icon: "/images/icons/ic-instagram.svg",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">©codeit - 2024</p>
        <nav className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </nav>
        <ul className="footer-sns">
          {SNS_LINKS.map((sns) => (
            <li key={sns.name}>
              <a href={sns.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={sns.icon}
                  alt={`판다마켓 ${sns.name}`}
                  width="20"
                  height="20"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
