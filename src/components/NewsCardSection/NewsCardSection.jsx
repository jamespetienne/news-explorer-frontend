import React from "react";
import "./NewsCardSection.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardSection({ articles, isLoggedIn, onSignInClick, onBookmarkToggle }) {
  return (
    <section className="news-card-section">
      <h2 className="news-card-section__title">Search Results</h2>
      <div className="news-card-section__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            isLoggedIn={isLoggedIn}
            onSignInClick={onSignInClick}
            onBookmarkToggle={onBookmarkToggle}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardSection;







