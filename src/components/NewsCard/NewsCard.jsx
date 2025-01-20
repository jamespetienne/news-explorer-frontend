import React, { useState } from "react";
import "./NewsCard.css";
import inactiveBookmark from "../../assets/inactive-bookmark.svg";
import activeBookmark from "../../assets/active-bookmark.svg";
import hoverBookmark from "../../assets/hover-bookmark.svg";

function NewsCard({ article, isLoggedIn, onSignInClick, onBookmarkToggle }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSigninPrompt, setShowSigninPrompt] = useState(false);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      setShowSigninPrompt(true);
      return;
    }
    setIsBookmarked(!isBookmarked);
    if (onBookmarkToggle) {
      onBookmarkToggle(article);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowSigninPrompt(false);
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="news-card">
      <img
        className="news-card__image"
        src={article.imageUrl}
        alt={article.title || "Article image"}
      />
      <button
        className="news-card__bookmark"
        onClick={handleBookmarkClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
      >
        <img
          src={
            isBookmarked
              ? activeBookmark
              : isHovered
              ? hoverBookmark
              : inactiveBookmark
          }
          alt="Bookmark Icon"
        />
      </button>
      {showSigninPrompt && (
        <div className="news-card__signin-prompt" role="alert">
          Sign in to save articles
        </div>
      )}
      <div className="news-card__content">
        <p className="news-card__date">{article.publishedAt}</p>
        <h2 className="news-card__headline">{article.title}</h2>
        <p className="news-card__snippet">{article.snippet}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
