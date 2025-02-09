import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github.png"; // Ensure this path is correct
import linkedinIcon from "../../assets/linkedin.png"; // Ensure this path is correct

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      
      <div className="footer__content">
        <ul className="footer__nav-links">
          <li>
            <a href="/" className="footer__nav-link">
              Home
            </a>
          </li>
          <li>
            <a
              href="https://tripleten.com"
              className="footer__nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>

        <div className="footer__icons">
          <a
            href="https://github.com/jamespetienne"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" className="footer__icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/james-etienne-b35982244/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;