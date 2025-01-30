// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Header from "../Header/Header.jsx";
// import Main from "../Main/Main.jsx";
// import About from "../About/About.jsx";
// import Footer from "../Footer/Footer.jsx";
// import LoginModal from "../LoginModal/LoginModal.jsx";
// import RegisterModal from "../RegisterModal/RegisterModal.jsx";
// import CompletedModal from "../Completed/CompletedModal.jsx";
// import SavedArticles from "../SavedArticles/SavedArticles.jsx";
// import Preloader from "../Preloader/Preloader.jsx";
// import { Routes, Route, Navigate } from "react-router-dom";
// import {
//   fetchNewsArticles,
//   saveArticle,
//   checkToken,
//   signUp,
//   signIn,
// } from "../../utils/api";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [activeModal, setActiveModal] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [savedArticles, setSavedArticles] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // // useEffect(() => {
//   // //   const token = localStorage.getItem("jwt");
//   // //   if (token) {
//   // //     checkToken(token)
//   // //       .then((res) => {
//   // //         setCurrentUser(res);
//   // //         setIsLoggedIn(true);
//   // //       })
//   // //       .catch((err) => console.error("Token check failed", err));
//   // //   }
//   // // }, []);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("jwt");
//   //   if (token) {
//   //     checkToken(token)
//   //       .then((user) => {
//   //         setCurrentUser(user);
//   //         setIsLoggedIn(true);
//   //       })
//   //       .catch(() => {
//   //         setError("Session expired. Please log in again."); // ✅ Handle error properly
//   //         localStorage.removeItem("jwt");
//   //       });
//   //   }
//   // }, []);

//   // const handleRegisterModal = () => setActiveModal("register");
//   // const handleLoginModal = () => setActiveModal("login");
//   // const closeActiveModal = () => setActiveModal("");

//   // const handleBookmarkToggle = async (article) => {
//   //   if (!isLoggedIn) {
//   //     setActiveModal("login");
//   //     return;
//   //   }
//   //   const isAlreadySaved = savedArticles.some((a) => a.title === article.title);
//   //   if (!isAlreadySaved) {
//   //     const saved = await saveArticle(article);
//   //     setSavedArticles([...savedArticles, saved]);
//   //   } else {
//   //     setSavedArticles(savedArticles.filter((a) => a.title !== article.title));
//   //   }
//   // };

//   // const handleSearchSubmit = async (query) => {
//   //   setIsLoading(true);
//   //   setError(null);
//   //   setArticles([]);
//   //   try {
//   //     const response = await fetchNewsArticles(query);
//   //     if (response.articles.length === 0) {
//   //       setError("no-results");
//   //     } else {
//   //       setArticles(response.articles);
//   //       setError(null);
//   //     }
//   //   } catch (err) {
//   //     setError("no-results");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const onRegister = ({ name, avatar, email, password }) => {
//   //   signUp(name, avatar, email, password)
//   //     .then(() => {
//   //       closeActiveModal();
//   //       onSignIn({ email, password });
//   //     })
//   //     .catch((err) => console.error("Registration failed", err));
//   // };

//   // // const onSignIn = ({ email, password }) => {
//   // //   signIn(email, password)
//   // //     .then((res) => {
//   // //       if (res.token) {
//   // //         localStorage.setItem("jwt", res.token);
//   // //         closeActiveModal();
//   // //         checkToken(res.token).then((userResponse) => {
//   // //           setCurrentUser(userResponse);
//   // //           setIsLoggedIn(true);
//   // //         });
//   // //       } else {
//   // //         throw new Error("Token not received");
//   // //       }
//   // //     })
//   // //     .catch((err) => console.error("Login failed", err));
//   // // };

//   // // const onSignOut = () => {
//   // //   localStorage.removeItem("jwt");
//   // //   setCurrentUser({});
//   // //   setIsLoggedIn(false);
//   // // };

//   // const onSignIn = (token, user) => {
//   //   signIn(email, password) .then((res) => {
//   //   setCurrentUser(user);
//   //   setIsLoggedIn(true);
//   //   setActiveModal("");
//   // });
//   // }
//   // const onSignOut = () => {
//   //   signOut().then(() => {
//   //     setCurrentUser({});
//   //     setIsLoggedIn(false);
//   //   });
//   // };

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (token) {
//       checkToken(token)
//         .then((user) => {
//           setCurrentUser(user);
//           setIsLoggedIn(true);
//         })
//         .catch(() => {
//           setError("Session expired. Please log in again.");
//           localStorage.removeItem("jwt");
//         });
//     }
//   }, []);

//   const handleRegisterModal = () => setActiveModal("register");
//   const handleLoginModal = () => setActiveModal("login");
//   const closeActiveModal = () => setActiveModal("");

//   const handleBookmarkToggle = async (article) => {
//     if (!isLoggedIn) {
//       setActiveModal("login");
//       return;
//     }
//     const isAlreadySaved = savedArticles.some((a) => a.title === article.title);
//     if (!isAlreadySaved) {
//       const saved = await saveArticle(article);
//       setSavedArticles([...savedArticles, saved]);
//     } else {
//       setSavedArticles(savedArticles.filter((a) => a.title !== article.title));
//     }
//   };

//   const handleSearchSubmit = async (query) => {
//     setIsLoading(true);
//     setError(null);
//     setArticles([]);
//     try {
//       const response = await fetchNewsArticles(query);
//       if (response.articles.length === 0) {
//         setError("no-results");
//       } else {
//         setArticles(response.articles);
//         setError(null);
//       }
//     } catch (err) {
//       setError("no-results");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onRegister = async ({ name, email, password }) => {
//     try {
//       const response = await signUp(name, email, password);
//       if (response.success) {
//         onSignIn({ email, password });
//         closeActiveModal();
//       } else {
//         setError(response.message || "Registration failed.");
//       }
//     } catch (err) {
//       setError("Registration failed. Try again.");
//     }
//   };

//   const onSignIn = async ({ email, password }) => {
//     try {
//       const response = await signIn(email, password);
//       if (response.token) {
//         localStorage.setItem("jwt", response.token);
//         checkToken(response.token).then((user) => {
//           setCurrentUser(user);
//           setIsLoggedIn(true);
//           closeActiveModal();
//         });
//       } else {
//         setError("Invalid login credentials.");
//       }
//     } catch (err) {
//       setError("Login failed. Please try again.");
//     }
//   };

//   const onSignOut = () => {
//     signOut();
//     localStorage.removeItem("jwt");
//     setCurrentUser({});
//     setIsLoggedIn(false);
//   };

//   return (
//     <div className="page">
//       <div className="page__content">
//         <Header
//           isLoggedIn={isLoggedIn}
//           userName={currentUser.name || "User"}
//           onSignInClick={handleLoginModal}
//           onLogoutClick={onSignOut}
//         />
//         {isLoading && <Preloader />}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Main
//                   isLoggedIn={isLoggedIn}
//                   onSignInClick={handleLoginModal}
//                   onBookmarkToggle={handleBookmarkToggle}
//                   savedArticles={savedArticles}
//                   onSearch={handleSearchSubmit}
//                   articles={articles}
//                   isLoading={isLoading}
//                   error={error}
//                   setError={setError}
//                 />
//                 <About />
//               </>
//             }
//           />
//           <Route
//             path="/saved-news"
//             element={
//               isLoggedIn ? (
//                 <SavedArticles
//                   userName={currentUser.name || "User"}
//                   savedArticles={savedArticles}
//                 />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//         </Routes>
//         <LoginModal
//           closeActiveModal={closeActiveModal}
//           isOpen={activeModal === "login"}
//           handleRegisterModal={handleRegisterModal}
//           onSignIn={onSignIn}
//         />
//         <RegisterModal
//           closeActiveModal={closeActiveModal}
//           isOpen={activeModal === "register"}
//           handleLoginModal={handleLoginModal}
//           onRegister={(userData) => {
//             setCurrentUser(userData);
//             setIsLoggedIn(true);
//             setActiveModal("");
//           }}
//         />
//         <CompletedModal
//           closeActiveModal={closeActiveModal}
//           isOpen={activeModal === "completed"}
//         />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;


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
import Preloader from "../Preloader/Preloader.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchNewsArticles, checkToken } from "../../utils/api";
import { signUp, signIn, signOut } from "../../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleRegisterModal = () => setActiveModal("register");
  const handleLoginModal = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const handleSearchSubmit = async (query) => {
    setIsLoading(true);
    setError("");
    setArticles([]);
    try {
      const response = await fetchNewsArticles(query);
      if (response.length === 0) {
        setError("no-results");
      } else {
        setArticles(response);
        setError("");
      }
    } catch (err) {
      setError("no-results");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async ({ name, email, password }) => {
    try {
      const response = await signUp(name, email, password);
      if (response.success) {
        onSignIn({ email, password });
        closeActiveModal();
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  const onSignIn = async ({ email, password }) => {
    try {
      const response = await signIn(email, password);
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        const user = await checkToken();
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal(); 
      } else {
        setError("Invalid login credentials.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      localStorage.removeItem("jwt");
    }
  };
  

  const onSignOut = () => {
    signOut();
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
                  onSearch={handleSearchSubmit}
                  articles={articles}
                  isLoading={isLoading}
                  error={error}
                  setError={setError}
                />
                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <SavedArticles userName={currentUser.name || "User"} />
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
          onRegister={onRegister}
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

