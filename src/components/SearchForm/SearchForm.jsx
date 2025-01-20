import React, { useState } from "react";
import "./SearchForm.css";
import { fetchNewsArticles } from "../../utils/api";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setError("Please enter a keyword");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setError("Please enter a keyword");
      return;
    }
    setError("");

    try {
      const articles = await fetchNewsArticles(query);
      onSearch(articles.articles); // Pass results to parent component
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter topic"
        value={query}
        onChange={handleInputChange}
        className="search-form__input"
        aria-label="Search input"
      />
      {error && <span className="search-form__error" role="alert">{error}</span>}
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;

