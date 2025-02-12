import React, { useState } from "react";
import { Link, useMatch, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header({
  handleSignInClick,
  handleLogoutClick,
  isLoggedIn,
  handleHomeClick,
}) {
  const match = useMatch("/");
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSavedNews = location.pathname === "/saved-news";
  

  return (
    <header className={`header ${isMenuOpen ? "header--menu-open" : ""}`}>
      <Link className="header__link" to="/">
        <p
          className={`header__logo ${
            isMenuOpen
              ? "header__logo_path_main" 
              : isSavedNews
              ? "header__logo_path_saved-news"
              : "header__logo_path_main"
          }`}
          onClick={handleHomeClick}
        >
          NewsExplorer
        </p>
      </Link>

      <Navbar
        handleHomeClick={handleHomeClick}
        isLoggedIn={isLoggedIn}
        handleSignInClick={handleSignInClick}
        handleLogoutClick={handleLogoutClick}
      />
    </header>
  );
}

export default Header;
