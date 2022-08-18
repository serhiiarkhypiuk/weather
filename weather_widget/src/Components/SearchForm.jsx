import React, { useState } from "react";
import Input from "./Input";

const SearchForm = ({ onSubmit }) => {
  const [cityName, setCityName] = useState("");

  const handleChange = (event) => {
    setCityName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cityName.trim() === "") {
      alert("Please enter your city name");
      return;
    }

    onSubmit(cityName);
    setCityName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={cityName} onChange={handleChange} />
    </form>
  );
};

export default SearchForm;
