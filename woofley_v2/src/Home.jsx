import React, { useState, useEffect } from 'react';
import './Home.css';
import brandLogo from './images/logo_white.png';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import { distance } from 'geolib'; // Import the geolib library for distance calculation

const Home = () => {
    const [services, setServices] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({});
    const [petMinders, setPetMinders] = useState([]);

    const handleSearchCriteriaChange = (criteria) => {
        setSearchCriteria(criteria);
    };

    const searchPetMinders = () => {
        // Hard coded search results for pet minders
        const hardcodedPetMinders = [
            {
                county: 'Stoke Poges',
                email: "harjaapsinghl5@gmail.com",
                endDate: "2024-04-30",
                houseNumber: 'Farm View',
                numPets: 1,
                phoneNumber: '07542331191',
                postcode: "SL3 6NB",
                rates: "25",
                selectedService: "house-sitting",
                startDate: "2024-04-11",
                street: 'Wexham Street',
                town: 'Slough',
                userType: "petMinder",
                username: "Harjaap"
            },
            // Add more hardcoded pet minders here
            // { ... }
        ];

        // Set the hardcoded pet minders as the search results
        setPetMinders(hardcodedPetMinders);
    };

    useEffect(() => {
        if (searchCriteria.latitude && searchCriteria.longitude) {
            // Call the search function when search criteria are updated
            searchPetMinders();
        }
    }, [searchCriteria]);

    return (
        <div>
            <div className='home-top-bar'>
            <div className='left'>
                    <img src={brandLogo} alt="Brand Logo" className="brand-logo" />
                    <div className='home-link'>
                        <a href='#'><i className='fas fa-search'></i> Search Sitters </a>
                    </div>
                    <div className='home-link'>
                        <Link to="/ServiceSelectionPage"><i className='fas fa-heart'></i> Become a Sitter</Link>
                    </div>
                    <div className='home-link'>
                        <a href='#'><i className='fas fa-paw'></i> Our Services</a>
                    </div>
                </div>
            </div>
            <div className='home-main'>
                <div className='home-background-wrapper'>
                <div className='home-background'>
                        <h1>Neighbourhood Nurturing for Beloved Pets™</h1>
                        <p>Trustworthy Sitters and Pawsome Walkers at Your Service.</p>
                    </div>
                    <SearchBar onSearch={handleSearchCriteriaChange} />
                    <MapView services={services} petMinders={petMinders} />
                    <div className="home-pet-minders">
                        <h2>Pet Minders</h2>
                        {petMinders.map((petMinder, index) => (
                            <div key={index} className="pet-minder-card">
                                <h3>{petMinder.username}</h3>
                                <p>Service Type: {petMinder.selectedService}</p>
                                <p>Start Date: {petMinder.startDate}</p>
                                <p>End Date: {petMinder.endDate}</p>
                                <p>Rate Per Night: £{petMinder.rates}</p>
                            </div>
                        ))}
                    </div>
                    <div className="home-not-pet-owner">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
