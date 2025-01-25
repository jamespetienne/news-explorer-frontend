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
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchNewsArticles, saveArticle } from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSignInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleBookmarkToggle = async (article) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    const isAlreadySaved = savedArticles.some((a) => a.title === article.title);
    if (!isAlreadySaved) {
      const saved = await saveArticle(article);
      setSavedArticles([...savedArticles, saved]);
    } else {
      setSavedArticles(savedArticles.filter((a) => a.title !== article.title));
    }
  };

  const handleSearchSubmit = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchNewsArticles(query);
      setArticles(response.articles);
    } catch (err) {
      setError("Sorry, something went wrong during the request. Please try again later.");
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
                  />
                  {isLoading && <Preloader />}
                  {error && <p className="error-message">{error}</p>}
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
