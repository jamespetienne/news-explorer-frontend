import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";
import { auth } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { API_KEY } from "../../utils/constants";
import getNewsData from "../../utils/newsApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import Preloader from "../Preloader/Preloader";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import MenuModal from "../MenuModal/MenuModal";
import { api } from "../../utils/MainApi";

function App() {
  // State variables
  const [activeModal, setActiveModal] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [newsArticles, setNewsArticles] = useState(null);
  const [savedNewsArticles, setSavedNewsArticles] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [isSearching, setIsSearching] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [newsApiError, setNewsApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [apiError, setApiError] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const match = useMatch("/");
  const token = localStorage.getItem("jwt");

  // Restore previous session search results
  useEffect(() => {
    if (localStorage.getItem("articles")) {
      setNewsArticles(JSON.parse(localStorage.getItem("articles")));
      setKeyword(localStorage.getItem("keyword"));
    }
  }, []);

  // Verify user authentication
  useEffect(() => {
    if (token) {
      setIsCheckingToken(true);
      api
        .getUser(token)
        .then((data) => {
          setCurrentUser(data.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("error", err);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem("jwt");
          }
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
      getUserArticles(token);
    } else {
      setIsCheckingToken(false);
    }
  }, [token]);

  // Open and close modals
  const handleSignInClick = () => {
    setActiveModal("login");
    setIsActive(true);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const closeModal = () => {
    setApiError(null);
    setIsActive(false);
    setTimeout(() => {
      setActiveModal(null);
    }, 250);
  };

  // Handle user login
  // const handleUserLogin = (inputValues) => {
  //   setIsLoading(true);
  //   auth
  //     .login(inputValues)
  //     .then((data) => {
  //       if (data.token) {
  //         localStorage.setItem("jwt", data.token);
  //         getUserArticles(data.token);
  //         closeModal();
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.includes("401") || err.includes("400")) {
  //         setApiError("Incorrect email or password");
  //       }
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleUserLogin = (inputValues) => {
    setIsLoading(true);
    auth
      .login(inputValues)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          getUserArticles(data.token);
          return api.getUser(data.token);  // Fetch user info after login
        }
      })
      .then((userData) => {
        if (userData) setCurrentUser(userData.data);
        closeModal();
      })
      .catch((err) => {
        if (err.includes("401") || err.includes("400")) {
          setApiError("Incorrect email or password");
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  // Handle user registration
  const handleUserRegistration = (inputValues) => {
    setIsLoading(true);
    auth
      .register(inputValues)
      .then(() => {
        setActiveModal("confirm");
      })
      .catch((err) => {
        if (err.includes("409")) {
          setApiError("Email already in use");
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fetch user's saved articles
  const getUserArticles = (token) => {
    api
      .getArticles(token)
      .then((data) => {
        setSavedNewsArticles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle deleting an article
  const handleDeleteArticle = () => {
    setIsLoading(true);
    api
      .deleteArticle(selectedArticleId, token)
      .then(() => {
        const updatedSavedArticles = savedNewsArticles.filter(
          (article) => article._id !== selectedArticleId
        );
        setSavedNewsArticles([...updatedSavedArticles]);
        setSelectedArticleId(null);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteButtonClick = (articleId) => {
    setIsActive(true);
    setActiveModal("delete");
    setSelectedArticleId(articleId);
  };

  const handleSeeMoreClick = () => {
    setNumberOfCards(numberOfCards + 3);
  };

  const handleHomeClick = () => {
    setNewsApiError(null);
    closeModal();
    setNewsArticles(null);
    setIsSearching(false);
    localStorage.removeItem("articles");
    localStorage.removeItem("keyword");
  };

  const handleLogoutClick = () => {
    setNewsArticles(null);
    setIsSearching(false);
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const searchBtnClick = (data) => {
    const keyword = data.charAt(0).toUpperCase() + data.slice(1);
    setNumberOfCards(3);
    setKeyword(keyword);
    setNewsArticles(null);
    setNothingFound(false);
    setIsSearching(true);
    getNewsData({ apiKey: API_KEY, keyword })
      .then((data) => {
        if (data.articles.length === 0) {
          setNothingFound(true);
        } else {
          const articles = data.articles.map((article) => ({
            ...article,
            _id: Math.random(),
          }));
          setNewsArticles(articles);
          setIsSearching(false);
          localStorage.setItem("articles", JSON.stringify(articles));
          localStorage.setItem("keyword", keyword);
        }
      })
      .catch((err) => {
        console.log(err);
        setNewsApiError(err);
        setIsSearching(false);
      });
  };

  const handleMobileMenuClick = () => {
    setTimeout(() => {
      setIsActive(true);
    }, 10);
    setActiveModal("menu");
  };

  // Save an article
  // const handleSaveArticle = (card) => {
  //   api
  //     .saveArticle(card, token)
  //     .then((data) => {
  //       setSavedNewsArticles([...savedNewsArticles, data.data]);
  //       setSelectedArticleId(data.data._id);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSaveArticle = (card) => {
    api
      .saveArticle(card)
      .then((data) => {
        if (!data._id) {
          throw new Error("Article ID is missing from response");
        }
        setSavedNewsArticles([...savedNewsArticles, data]);
      })
      .catch((err) => console.error("Error saving article:", err));
  };
  
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div
          className={
            match
              ? "page__content page__content_path_main"
              : "page__content page__content_path_saved-news"
          }
        >
          <Header
            isLoggedIn={isLoggedIn}
            handleSignInClick={handleSignInClick}
            handleLogoutClick={handleLogoutClick}
            handleHomeClick={handleHomeClick}
            handleMobileMenuClick={handleMobileMenuClick}
          />
  
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  setActiveModal={setActiveModal}
                  searchBtnClick={searchBtnClick}
                  isSearching={isSearching}
                  newsApiError={newsApiError}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  setActiveModal={setActiveModal}
                  isCheckingToken={isCheckingToken}
                  setIsActive={setIsActive}
                >
                  <SavedNews
                    handleDeleteButtonClick={handleDeleteButtonClick}
                    isLoggedIn={isLoggedIn}
                    newsArticles={savedNewsArticles}
                    handleSignInClick={handleSignInClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
  
        {isSearching && (
          <Preloader isSearching={isSearching} nothingFound={nothingFound} />
        )}
  
        {newsArticles?.length > 0 && match && (
          <NewsCardList
            handleSaveArticle={handleSaveArticle}
            keyword={keyword}
            numberOfCards={numberOfCards}
            newsArticles={newsArticles}
            isLoggedIn={isLoggedIn}
            handleSignInClick={handleSignInClick}
            handleSeeMoreClick={handleSeeMoreClick}
            handleDeleteArticle={handleDeleteArticle}
          />
        )}
  
        {match && <About />}
  
        <Footer handleHomeClick={handleHomeClick} />
  
        {/* Modals */}
        {activeModal === "login" && (
          <LoginModal
            isActive={isActive}
            apiError={apiError}
            isLoading={isLoading}
            handleUserLogin={handleUserLogin}
            closeModal={closeModal}
            handleRegisterClick={handleRegisterClick}
          />
        )}
  
        {activeModal === "register" && (
          <RegisterModal
            apiError={apiError}
            isActive={isActive}
            closeModal={closeModal}
            handleLoginClick={handleSignInClick}
            handleUserRegistration={handleUserRegistration}
            isLoading={isLoading}
          />
        )}
  
        {activeModal === "menu" && (
          <MenuModal
            closeModal={closeModal}
            handleSignInClick={handleSignInClick}
            isActive={isActive}
            isLoggedIn={isLoggedIn}
            handleLogoutClick={handleLogoutClick}
            handleHomeClick={handleHomeClick}
          />
        )}
  
        {activeModal === "delete" && (
          <ConfirmationModal
            closeModal={closeModal}
            isActive={isActive}
            buttonText={isLoading ? "Deleting..." : "Delete"}
            title={"Are you sure you want to remove this card?"}
            name={"delete"}
            handleButton={handleDeleteArticle}
          />
        )}
  
        {activeModal === "confirm" && (
          <ConfirmationModal
            closeModal={closeModal}
            isActive={isActive}
            buttonText={"Sign in"}
            title={"Registration successfully completed!"}
            name={"confirm"}
            handleButton={handleSignInClick}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );  
}

export default App;