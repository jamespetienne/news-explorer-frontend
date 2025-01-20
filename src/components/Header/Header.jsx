import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn, userName, onSignInClick }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNews ? "header_saved-news" : ""}`}>
      <div className="header__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          userName={userName}
          onSignInClick={onSignInClick}
        />
      </div>
    </header>
  );
}

export default Header;




