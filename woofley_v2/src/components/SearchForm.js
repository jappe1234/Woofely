import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    serviceType: '',
    boardingNear: '',
    dates: {
      startDate: '',
      endDate: ''
    },
    petCount: '1',
    petType: '',
    dogSize: '',
    ratePerNight: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setSearchParams(prev => ({
      ...prev,
      dates: { ...prev.dates, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <select name="serviceType" value={searchParams.serviceType} onChange={handleInputChange}>
          <option value="">Select Service Type</option>
          <option value="boarding">Boarding</option>
          <option value="houseSitting">House Sitting</option>
          <option value="dropInVisitors">Drop-In Visitors</option>
          <option value="doggyDayCare">Doggy Day Care</option>
          <option value="dogWalking">Dog Walking</option>
        </select>

        <input
          type="text"
          name="boardingNear"
          value={searchParams.boardingNear}
          onChange={handleInputChange}
          placeholder="Postcode"
        />

        <input
          type="date"
          name="startDate"
          value={searchParams.dates.startDate}
          onChange={(e) => handleDateChange('startDate', e.target.value)}
        />
        <input
          type="date"
          name="endDate"
          value={searchParams.dates.endDate}
          onChange={(e) => handleDateChange('endDate', e.target.value)}
        />

        <select name="petCount" value={searchParams.petCount} onChange={handleInputChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>

        <select name="petType" value={searchParams.petType} onChange={handleInputChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>

        <select name="dogSize" value={searchParams.dogSize} onChange={handleInputChange}>
          <option value="0-7">0-7 kg</option>
          <option value="7-18">7-18 kg</option>
          <option value="18-45">18-45 kg</option>
          <option value="45+">45+ kg</option>
        </select>

        <input
          type="range"
          name="ratePerNight"
          min="1"
          max="181"
          value={searchParams.ratePerNight}
          onChange={handleInputChange}
        />
        <span>£{searchParams.ratePerNight}</span>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;

