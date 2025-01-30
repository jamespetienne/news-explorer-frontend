import React from "react";
import "./SavedArticles.css";
import NewsCardSection from "../NewsCardSection/NewsCardSection.jsx";

function SavedArticles({ userName, savedArticles }) {
  if (!savedArticles || savedArticles.length === 0) {
    return (
      <div className="saved-articles">
        <header className="saved-articles__header">
          <h1 className="saved-articles__title">Saved Articles</h1>
          <p className="saved-articles__subtitle">
            {userName}, you have no saved articles.
          </p>
        </header>
      </div>
    );
  }

  const keywords = Array.from(
    new Set(savedArticles.map((article) => article.keyword))
  );

  const keywordSummary =
    keywords.length > 2
      ? `${keywords.slice(0, 2).join(", ")}, and ${keywords.length - 2} others`
      : keywords.join(", ");

  return (
    <div className="saved-articles">
      <header className="saved-articles__header">
        <h1 className="saved-articles__title">Saved Articles</h1>
        <p className="saved-articles__subtitle">
          {userName}, you have {savedArticles.length} saved articles.
        </p>
        <p className="saved-articles__keywords">
          By keywords:{" "}
          <span className="saved-articles__keywords-highlight">
            {keywordSummary}
          </span>
        </p>
      </header>
      <NewsCardSection
        articles={savedArticles}
        isLoggedIn={true}
        onBookmarkToggle={() => {}}
      />
    </div>
  );
}

export default SavedArticles;



