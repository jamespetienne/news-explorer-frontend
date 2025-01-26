import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import CompletedModal from "../Completed/CompletedModal.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchNewsArticles, saveArticle, checkToken, signUp, signIn } from "../../utils/api";
import Preloader from "../Preloader/Preloader.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => console.error("Token check failed", err));
    }
  }, []);

  const handleRegisterModal = () => setActiveModal("register");
  const handleLoginModal = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

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

  const onRegister = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        onSignIn({ email, password });
      })
      .catch((err) => console.error("Registration failed", err));
  };

  const onSignIn = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          closeActiveModal();
          checkToken(res.token).then((userResponse) => {
            setCurrentUser(userResponse);
            setIsLoggedIn(true);
          });
        } else {
          throw new Error("Token not received");
        }
      })
      .catch((err) => console.error("Login failed", err));
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          userName={currentUser.name || "User"}
          onSignInClick={handleLoginModal}
          onLogoutClick={onSignOut}
        />
        {isLoading && <Preloader />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  isLoggedIn={isLoggedIn}
                  onSignInClick={handleLoginModal}
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
                <SavedArticles
                  userName={currentUser.name || "User"}
                  savedArticles={savedArticles}
                />
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
          onSignIn={onSignIn}
        />
        <RegisterModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "register"}
          handleLoginModal={handleLoginModal}
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
  );
}

export default App;
