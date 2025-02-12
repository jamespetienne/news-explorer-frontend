import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoutWhite from "../../assets/logout.svg";
import logoutBlack from "../../assets/black-logout.svg";
import menuIcon from "../../assets/menu.png";
import blackMenuIcon from "../../assets/black-menu.png"; 
import closeIcon from "../../assets/close.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Navbar({ handleSignInClick, isLoggedIn, handleLogoutClick, userName, }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news"; 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="nav">
      {/* Hide navigation__links when menuIcon is visible */}
      <ul className={`navigation__links ${isMenuOpen ? "hidden" : ""}`}>
        <li>
          <NavLink
            to="/"
            className={`navigation__link ${
              isSavedNews ? "navigation__link_home_saved-news" : "navigation__link_active"
            }`}
          >
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/saved-news"
                className={`navigation__link ${
                  isSavedNews ? "navigation__link_saved-news_active" : ""
                }`}
              >
                Saved Articles
              </NavLink>
            </li>
            <li>
              <button
                className={`navigation__button navigation__button_user ${
                  isSavedNews ? "navigation__button_user_saved-news" : ""
                }`}
                onClick={handleLogoutClick}
              >
                {userName || currentUser.name}
                <img
                  src={isSavedNews ? logoutBlack : logoutWhite}
                  alt="Logout"
                  className="navigation__icon"
                />
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <button
              className="navigation__button navigation__button_signin"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>

      {/* Burger Menu Toggle Buttons */}
      <button
        className={`nav__menu-button ${isMenuOpen ? "hidden" : ""}`}
        onClick={toggleMenu}
        style={{
          backgroundImage: `url(${isSavedNews ? blackMenuIcon : menuIcon})`, // ✅ Show black-menu.png on /saved-news
        }}
        aria-label="Open menu"
      />
      <button
        className={`nav__close-button ${!isMenuOpen ? "hidden" : ""}`}
        onClick={toggleMenu}
        style={{
          backgroundImage: `url(${closeIcon})`,
        }}
        aria-label="Close menu"
      />

      {/* Burger Menu */}
      <div className={`burger-menu ${isMenuOpen ? "burger-menu_opened" : ""}`}>
        <div className="burger-menu__container">
          <div className="burger-menu__nav">
            <NavLink to="/" className="burger-menu__link" onClick={toggleMenu}>
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/saved-news"
                className="burger-menu__link"
                onClick={toggleMenu}
              >
                Saved Articles
              </NavLink>
            )}
            {isLoggedIn ? (
              <button className="burger-menu__button" onClick={handleLogoutClick}>
                Log Out
              </button>
            ) : (
              <button className="burger-menu__button" onClick={handleSignInClick}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;