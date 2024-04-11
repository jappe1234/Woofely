import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { update } from 'firebase/database';


function SearchBar({ onSearch, onBoardingNearChange }) {
    const [searchFilters, setSearchFilters] = useState({
        serviceType: '',
        boardingNear: '',
        startDate: '',
        endDate: '',
        ratePerNight: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleBoardingNearChange = (e) => {
        const newBoardingNear = e.target.value;
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            boardingNear: newBoardingNear
        }));
    };

    const handleBoardingNearBlur = async (e) => {
      const value = e.target.value;
      const validPostcodeRegex = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;
      if (value.length > 0 && !validPostcodeRegex.test(value)) {
          alert('Please enter a valid UK postcode.');
      } else {
          const auth = getAuth(); // Get the authentication instance
          const user = auth.currentUser; // Get the currently signed-in user
  
          if (user) {
              const db = getDatabase(); // Get the database instance
              const userRef = ref(db, `users/${user.uid}`); // Reference to the current user's data
              try {
                  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=AIzaSyAHbRI3Sjkhiw5tbsTv4riZBuomdUa3ylM`);
                  const data = await response.json();
                  const { lat, lng } = data.results[0].geometry.location;
  
                  // Update the user's data in the database with location details
                  await update(userRef, {
                      location: value,
                      latitude: lat,
                      longitude: lng
                  });
  
                  // Pass the latitude and longitude to the parent component
                  onBoardingNearChange({ latitude: lat, longitude: lng });
              } catch (error) {
                  console.error('Error fetching latitude and longitude:', error);
              }
          } else {
              console.error('No user signed in.'); // Handle the case when no user is signed in
          }
      }
  };
  
  

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchFilters);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <label>
                Service type
                <select name="serviceType" value={searchFilters.serviceType} onChange={handleChange}>
                    <option value="boarding">Boarding</option>
                    <option value="houseSitting">House Sitting</option>
                    <option value="dropInVisitors">Drop-In Visitors</option>
                    <option value="doggyDayCare">Doggy Day Care</option>
                    <option value="dogWalking">Dog Walking</option>
                </select>
            </label>

            <label>
                Your location
                <input
                    type="text"
                    name="boardingNear"
                    value={searchFilters.boardingNear}
                    onChange={handleBoardingNearChange}
                    onBlur={handleBoardingNearBlur}
                    placeholder="Enter postcode"
                />
            </label>

            <label>
                Drop off
                <input
                    type="date"
                    name="startDate"
                    value={searchFilters.startDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Pick up
                <input
                    type="date"
                    name="endDate"
                    value={searchFilters.endDate}
                    onChange={handleChange}
                />
            </label>

            <label>
                Rate per night
                <input
                    type="range"
                    name="ratePerNight"
                    min="1"
                    max="181"
                    value={searchFilters.ratePerNight}
                    onChange={handleChange}
                />
                <span>£{searchFilters.ratePerNight}</span>
            </label>

            <button type="submit" style={{ marginTop: '10px' }}>Search</button>
        </form>
    );
}

export default SearchBar;