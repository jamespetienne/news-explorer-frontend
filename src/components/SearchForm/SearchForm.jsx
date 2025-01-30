// import React, { useState } from "react";
// import "./SearchForm.css";
// import { fetchNewsArticles } from "../../utils/api";

// function SearchForm({ onSearch }) {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     if (e.target.value.trim() === "") {
//       setError("Please enter a keyword");
//     } else {
//       setError("");
//     }
//   };

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     if (e.target.value.trim()) {
//       setError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (query.trim() === "") {
//       setError("Please enter a keyword");
//       return;
//     }
//     setError("");
//     onSearch(query);

//     try {
//       const articles = await fetchNewsArticles(query);
//       onSearch(articles.articles); // Pass results to parent component
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form className="search-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter topic"
//         value={query}
//         onChange={handleInputChange}
//         className="search-form__input"
//         aria-label="Search input"
//       />
//       {error && (
//         <span className="search-form__error" role="alert">
//           {error}
//         </span>
//       )}
//       <button type="submit" className="search-form__button">
//         Search
//       </button>
//     </form>
//   );
// }

// export default SearchForm;



// import React, { useState } from "react";
// import "./SearchForm.css";

// function SearchForm({ onSearch }) {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     if (error && e.target.value.trim()) {
//       setError(""); // Clear error when user starts typing
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       setError("Please enter a keyword");
//       return;
//     }
//     onSearch(query.trim()); // Pass the trimmed query to the parent
//     setQuery(""); // Clear the input field after submission
//   };

//   return (
//     <form className="search-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         className="search-form__input"
//         placeholder="Enter topic..."
//         value={query}
//         onChange={handleInputChange}
//       />
//       <button type="submit" className="search-form__button">
//         Search
//       </button>
//       {error && <span className="search-form__error">{error}</span>}
//     </form>
//   );
// }

// export default SearchForm;


import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }
    onSearch(query);
  };

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={query}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>
      {error && <span className="search-form__error">{error}</span>}
    </section>
  );
}

export default SearchForm;
