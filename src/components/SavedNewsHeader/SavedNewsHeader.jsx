// import React, { useContext } from "react";
// import "./SavedNewsHeader.css";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// function SavedNewsHeader({ newsArticles = [] }) {
//   const currentUser = useContext(CurrentUserContext);
  
//   const keywords = newsArticles.length
//     ? newsArticles.map((article) => article.keyword || "Unknown").filter(Boolean)
//     : [];

//   const getKeywordString = (data) => {
//     if (keywords.length === 0) {
//       return `${keywords[0]}`; 
//     }
//     if (keywords.length > 1) {
//       const count = {};

//       for (const keyword of data) {
//         if (count[keyword]) {
//           count[keyword]++;
//         } else {
//           count[keyword] = 1;
//         }

//         const counted = [];
//         for (const item in count) {
//           counted.push([item, count[item]]);
//         }

//         counted.sort((a, b) => {
//           return b[1] - a[1];
//         });

//         if (counted.length === 1) {
//           return `${counted[0][0]}`;
//         } else if (counted.length === 2) {
//           return `${counted[0][0]} and ${counted[1][0]}`;
//         } else {
//           return `${counted[0][0]}, ${counted[1][0]}, and ${
//             counted.length - 2
//           } more`;
//         }
//       }
//     }
//     return null;
//   };

//   const keywordString = getKeywordString(keywords);

//   return (
//     <div className="saved-news-header">
//       <h1 className="saved-news-header__title">Saved articles</h1>
//       <p className="saved-news-header__paragraph">{`${currentUser.name}, you have ${newsArticles.length} saved ${newsArticles.length === 1 ? "article" : "articles"}`}</p>
//       <p className="saved-news-header__keywords">
//         By keywords:{" "}
//         <span className="saved-news-header__keywords_bold">
//           {keywordString ? keywordString : ""}
//         </span>
//       </p>
//     </div>
//   );
// }

// export default SavedNewsHeader;

import React, { useContext } from "react";
import "./SavedNewsHeader.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ newsArticles = [] }) { // Ensure articles exist
  const currentUser = useContext(CurrentUserContext);

  // Validate keyword extraction
 const keywords = newsArticles
    .map((article) => article?.keyword || "Unknown") // Default value "Unknown" for missing keywords
    .filter(Boolean);

  const getKeywordString = (data) => {
    if (keywords.length === 0) return "No keywords available";

    const count = {};
    for (const keyword of data) {
      count[keyword] = (count[keyword] || 0) + 1;
    }

    const sortedKeywords = Object.entries(count).sort((a, b) => b[1] - a[1]);

    if (sortedKeywords.length === 1) return sortedKeywords[0][0];
    if (sortedKeywords.length === 2) return `${sortedKeywords[0][0]} and ${sortedKeywords[1][0]}`;
    return `${sortedKeywords[0][0]}, ${sortedKeywords[1][0]}, and ${sortedKeywords.length - 2} more`;
  };

  const keywordString = getKeywordString(keywords);

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved articles</h1>
      <p className="saved-news-header__paragraph">
        {`${currentUser.name}, you have ${newsArticles.length} saved ${
          newsArticles.length === 1 ? "article" : "articles"
        }`}
      </p>
      <p className="saved-news-header__keywords">
        By keywords:{" "}
        <span className="saved-news-header__keywords_bold">
          {keywordString}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
