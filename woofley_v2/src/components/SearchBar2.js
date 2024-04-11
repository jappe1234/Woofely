import React, { useState } from 'react';

function SearchBar2({ onSearch }) {
  const [searchFilters, setSearchFilters] = useState({
    postcode: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchFilters.postcode);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label>
        <input
          type="text"
          name="postcode"
          value={searchFilters.postcode}
          onChange={handleChange}
          placeholder="Postcode"
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar2;
