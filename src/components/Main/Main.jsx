// import React, { useState } from "react";
// import "./Main.css";
// import SearchForm from "../SearchForm/SearchForm.jsx";
// import NewsCardSection from "../NewsCardSection/NewsCardSection.jsx";
// import Preloader from "../Preloader/Preloader.jsx";
// import NothingFound from "../NothingFound/NothingFound.jsx";

// function Main({
//   isLoggedIn,
//   onSignInClick,
//   onBookmarkToggle,
//   fetchNewsArticles,
//   onSearch,
//   error,
//   setError,
// }) {
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState("");

//   const handleSearch = async (query) => {
//     setIsLoading(true);
//     setError("");
//     setArticles([]);
//     try {
//       const fetchedArticles = await fetchNewsArticles(query);
//       if (fetchedArticles.length === 0) {
//         setError("no-results");
//       } else {
//         setArticles(fetchedArticles);
//         setError("");
//       }
//     } catch (err) {
//       setError("no-results");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="main">
//       <section className="hero">
//         <h1 className="hero__title">What's going on in the world?</h1>
//         <p className="hero__subtitle">
//           Find the latest news on any topic and save them in your personal
//           account.
//         </p>
//         <SearchForm onSearch={handleSearch} />
//       </section>
//       {isLoading && <Preloader />}
//       {error === "no-results" && <NothingFound />}
//       {!isLoading && !error && articles.length > 0 && (
//         <NewsCardSection
//           articles={articles}
//           isLoggedIn={isLoggedIn}
//           onSignInClick={onSignInClick}
//           onBookmarkToggle={onBookmarkToggle}
//         />
//       )}
//     </main>
//   );
// }

// export default Main;

import React, { useState } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCardSection from "../NewsCardSection/NewsCardSection.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

function Main({
  isLoggedIn,
  onSignInClick,
  onBookmarkToggle,
  onSearch,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setSearchQuery(query); 
    setIsLoading(true);
    setError("");
    setArticles([]);

    try {
      const fetchedArticles = await onSearch(query);
      console.log("Articles received:", fetchedArticles);

      if (fetchedArticles.length === 0) {
        setError("no-results");
      } else {
        setArticles(fetchedArticles);
        setError("");
      }
    } catch (err) {
      setError("no-results");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="hero">
        <h1 className="hero__title">What's going on in the world?</h1>
        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>

      {isLoading && <Preloader />}
      {!isLoading && searchQuery && error === "no-results" && <NothingFound />}
      {!isLoading && searchQuery && articles.length > 0 && (
        
        <NewsCardSection
          articles={articles}
          isLoggedIn={isLoggedIn}
          onSignInClick={onSignInClick}
          onBookmarkToggle={onBookmarkToggle}
        />
      )}
    </main>
  );
}

export default Main;
