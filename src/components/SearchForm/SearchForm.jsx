import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./SearchForm.css";

function SearchForm({ searchBtnClick, isSearching, newsApiError }) {
  const { handleChange, values, setValues } = useForm({ topic: " " }); 
  const [isError, setIsError] = useState(false);

  const handleSearchInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); 
    if (values.topic === "") {
      console.log("topic is blank");
    }
    if (values.topic !== "") {
      searchBtnClick(values.topic);
    }
  };

  useEffect(() => {
    if (!isSearching) {
        setValues({ topic: '' });
    }
  }, [setValues, isSearching]); 

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        name="topic"
        value={values.topic} 
        autoComplete="off"
        maxLength="40"
        onChange={handleSearchInputChange}
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;