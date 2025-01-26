// import React from "react";
// import "./NewsCardSection.css";
// import NewsCard from "../NewsCard/NewsCard.jsx";

// function NewsCardSection({ articles, isLoggedIn, onSignInClick, onBookmarkToggle }) {
//   return (
//     <section className="news-card-section">
//       <h2 className="news-card-section__title">Search Results</h2>
//       <div className="news-card-section__grid">
//         {articles.map((article, index) => (
//           <NewsCard
//             key={index}
//             article={article}
//             isLoggedIn={isLoggedIn}
//             onSignInClick={onSignInClick}
//             onBookmarkToggle={onBookmarkToggle}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default NewsCardSection;

import React, { useState } from "react";
import "./NewsCardSection.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardSection({ articles, isLoggedIn, onSignInClick, onBookmarkToggle }) {
  const [visibleArticles, setVisibleArticles] = useState(3);

  const handleShowMore = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  return (
    <section className="news-card-section">
      <h2 className="news-card-section__title">Search Results</h2>
      {articles.length === 0 ? (
        <p className="news-card-section__message">Nothing Found</p>
      ) : (
        <>
          <div className="news-card-section__grid">
            {articles.slice(0, visibleArticles).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isLoggedIn={isLoggedIn}
                onSignInClick={onSignInClick}
                onBookmarkToggle={onBookmarkToggle}
              />
            ))}
          </div>
          {articles.length > visibleArticles && (
            <button
              className="news-card-section__button"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default NewsCardSection;
4







