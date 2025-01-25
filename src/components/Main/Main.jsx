// import React, { useState } from "react";
// import "./Main.css";
// import SearchForm from "../SearchForm/SearchForm";
// import NewsCardSection from "../NewsCardSection/NewsCardSection";
// import image04 from "../../assets/image_04.svg";
// import image07 from "../../assets/image_07.svg";
// import image08 from "../../assets/image_08.svg";

// function Main({ isLoggedIn, onSignInClick }) {
//   const [articles, setArticles] = useState([
//     {
//       imageUrl: image04,
//       publishedAt: "November 4, 2020",
//       title: "Everyone Needs a Special 'Sit Spot' in Nature",
//       snippet:
//         "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...",
//       source: "TREEHUGGER",
//       keyword: "Nature",
//     },
//     {
//       imageUrl: image07,
//       publishedAt: "January 15, 2021",
//       title: "How to Start a Small Garden",
//       snippet:
//         "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
//       source: "GARDEN TIPS",
//       keyword: "Gardening",
//     },
//     {
//       imageUrl: image08,
//       publishedAt: "July 22, 2023",
//       title: "Understanding Solar Energy Basics",
//       snippet:
//         "“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
//       source: "GREEN ENERGY",
//       keyword: "Energy",
//     },
//   ]);

//   const handleSearch = (query) => {
//     console.log(`Searching for articles related to: ${query}`);
//   };

//   return (
//     <div className="main">
//       <section className="hero">
//         <h1 className="hero__title">What's going on in the world?</h1>
//         <p className="hero__subtitle">
//           Find the latest news on any topic and save them in your personal
//           account.
//         </p>
//         <SearchForm onSearch={handleSearch} />
//       </section>
//       <NewsCardSection
//         articles={articles}
//         isLoggedIn={isLoggedIn}
//         onSignInClick={onSignInClick}
//       />
//     </div>
//   );
// }

// export default Main;

import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCardSection from "../NewsCardSection/NewsCardSection.jsx";

function Main({ isLoggedIn, onSignInClick, onBookmarkToggle, articles, onSearch }) {
  return (
    <main className="main">
      <SearchForm onSearch={onSearch} />
      <NewsCardSection
        articles={articles}
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onBookmarkToggle={onBookmarkToggle}
      />
    </main>
  );
}

export default Main;
