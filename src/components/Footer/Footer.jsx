import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <ul className="footer__links">
        <li>
          <a href="/" className="footer__link">
            Home
          </a>
        </li>
        <li>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </li>
        <li>
          <a
            href="https://facebook.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
