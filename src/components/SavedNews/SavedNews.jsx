import React, { useState } from "react";
import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import inactiveTrash from "../../assets/inactive-trash.svg";
import activeTrash from "../../assets/active-trash.svg";
import image04 from "../../assets/image_04.svg";
import image05 from "../../assets/image_05.svg";
import image07 from "../../assets/image_07.svg";
import image08 from "../../assets/image_08.svg";

const sampleArticles = [
  {
    id: 1,
    keyword: "Nature",
    title: "The Beauty of the Forest",
    text: "A breathtaking view of the lush green forest.",
    date: "November 10, 2024",
    source: "National Geographic",
    image: image04,
  },
  {
    id: 2,
    keyword: "Space",
    title: "New Discovery in Outer Space",
    text: "Scientists have found a new planet similar to Earth.",
    date: "December 22, 2024",
    source: "NASA News",
    image: image05,
  },
  {
    id: 3,
    keyword: "Wildlife",
    title: "Endangered Species Making a Comeback",
    text: "Conservation efforts have helped save rare species.",
    date: "January 5, 2025",
    source: "BBC Wildlife",
    image: image07,
  },
  {
    id: 4,
    keyword: "Technology",
    title: "AI is Revolutionizing Industries",
    text: "How artificial intelligence is changing the world.",
    date: "February 14, 2025",
    source: "TechCrunch",
    image: image08,
  },
];

function SavedNews(newsArticles) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section className="saved-news">
      
      <SavedNewsHeader newsArticles={sampleArticles} />
      <h2 className="saved-news__title">Saved Articles</h2>
      <ul className="saved-news__list">
        {sampleArticles.map((article) => (
          <li key={article.id} className="saved-news__card">
            <img
              src={article.image}
              alt={article.title}
              className="saved-news__image"
            />
            <div className="saved-news__content">
              <p className="saved-news__date">{article.date}</p>
              <h3 className="saved-news__title-text">{article.title}</h3>
              <p className="saved-news__text">{article.text}</p>
              <p className="saved-news__source">{article.source}</p>
            </div>
            <span className="saved-news__keyword">{article.keyword}</span>

            {/* Trash Button with Hover Effect */}
            <div
              className="saved-news__absolute-content"
              onMouseEnter={() => handleMouseEnter(article.id)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`saved-news__warning ${
                  hoveredCard === article.id ? "saved-news__warning_active" : ""
                }`}
                type="button"
              >
                Remove from saved
              </button>
              <button
                className="saved-news__delete-button"
                type="button"
                style={{
                  backgroundImage: `url(${
                    hoveredCard === article.id ? activeTrash : inactiveTrash
                  })`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
