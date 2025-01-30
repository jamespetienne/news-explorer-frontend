import React from "react";
import "./NothingFound.css";
import notFound from "../../assets/not-found_v1.svg";

function NothingFound() {
  return (
    <div className="nothingfound">
      <img src={notFound} alt="Not Found" className="nothingfound__image" />
      <h1 className="nothingfound__title">Nothing Found</h1>
      <p className="nothingfound__caption">Sorry, but nothing matched <br/> your search terms.</p>
    </div>
  );
}

export default NothingFound;
