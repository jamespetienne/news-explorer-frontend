import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import CompletedModal from "../Completed/CompletedModal.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchNewsArticles } from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSignInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleBookmarkToggle = (article) => {
    setSavedArticles((prevArticles) => {
      if (prevArticles.some((saved) => saved.title === article.title)) {
        return prevArticles.filter((saved) => saved.title !== article.title);
      }
      return [...prevArticles, article];
    });
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = (navigate) => {
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleSearchSubmit = async (query) => {
    setIsLoading(true);
    try {
      const results = await fetchNewsArticles(query);
      setArticles(results.articles);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HashRouter>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    userName={currentUser.name || "User"}
                    onSignInClick={onSignInClick}
                    onLogoutClick={(navigate) => handleLogoutClick(navigate)}
                  />
                  {isLoading && <Preloader />}
                  <Main
                    isLoggedIn={isLoggedIn}
                    onSignInClick={onSignInClick}
                    onBookmarkToggle={handleBookmarkToggle}
                    savedArticles={savedArticles}
                    onSearch={handleSearchSubmit}
                    articles={articles}
                  />
                  <About />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                isLoggedIn ? (
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      userName={currentUser.name || "User"}
                      onSignInClick={onSignInClick}
                      onLogoutClick={(navigate) => handleLogoutClick(navigate)}
                    />
                    <SavedArticles
                      userName={currentUser.name || "User"}
                      savedArticles={savedArticles}
                    />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          <LoginModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login"}
            handleRegisterModal={handleRegisterModal}
            onSignIn={() => setIsLoggedIn(true)}
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegister={(userData) => {
              setCurrentUser(userData);
              setIsLoggedIn(true);
              setActiveModal("");
            }}
            handleLoginModal={handleLoginModal}
          />
          <CompletedModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "completed"}
          />
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;