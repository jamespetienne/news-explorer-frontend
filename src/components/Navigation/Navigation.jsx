import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import logoutIcon from "../../assets/logout.svg";
import blackLogoutIcon from "../../assets/black-logout.svg";

function Navigation({ isLoggedIn, userName, onSignInClick, onLogoutClick }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  return (
    <nav className="navigation">
      <div
        className={`navigation__logo ${
          isSavedNews ? "navigation__logo_saved-news" : ""
        }`}
      >
        NewsExplorer
      </div>
      <ul className="navigation__links">
        <li>
          <Link
            to="/"
            className={`navigation__link ${
              isSavedNews ? "navigation__link_home_saved-news" : "navigation__link_active"
            }`}
          >
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/saved-news"
                className={`navigation__link ${
                  isSavedNews ? "navigation__link_saved-news_active" : ""
                }`}
              >
                Saved articles
              </Link>
            </li>
            <li>
              <button
                className={`navigation__button navigation__button_user ${
                  isSavedNews ? "navigation__button_user_saved-news" : ""
                }`}
                onClick={onLogoutClick}
              >
                {userName}
                <img
                  src={isSavedNews ? blackLogoutIcon : logoutIcon}
                  alt="Logout"
                  className="navigation__icon"
                />
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              className="navigation__button navigation__button_signin"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

