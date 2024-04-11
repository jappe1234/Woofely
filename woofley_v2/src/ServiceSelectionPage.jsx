import React, { useState } from 'react';
import './ServiceSelectionPage.css';
import brandLogo from './images/logo_white.png'; // Import your brand logo image
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';

const ServiceSelectionPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleServiceSelection = (serviceName) => {
        if (selectedService === serviceName) {
            setSelectedService(null);
        } else {
            setSelectedService(serviceName);
        }
    };

    const handleSaveContinue = async () => {
        if (!selectedService) {
            setError(true);
        } else {
            setError(false);
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                await update(userRef, {
                    selectedService // Save selected service to the user's data in the database
                });
                console.log('Service selection saved');
                navigate('/PetMinderProfilePage'); // Redirect to PetMinderProfilePage after successful service selection
            } catch (error) {
                console.error('Error saving service selection:', error);
            }
        }
    };

    return (
        <div>
            <div className='service-selection-top-bar'>
                {/* Top bar content */}
                <img src={brandLogo} alt="Brand Logo" className="brand-logo" />
                <div className='home-link'>
                    <a href='#'><i className='fas fa-search'></i> Search Sitters</a>
                </div>
                <div className='home-link'>
                    <a href='#'><i className='fas fa-heart'></i> Become a Sitter</a>
                </div>
                <div className='home-link'>
                    <a href='#'><i className='fas fa-paw'></i> Our Services</a>
                </div>
                <div className='home-link'>
                    <a href='#'><i className='fas fa-user'></i> My Profile</a>
                </div>
                <div className='home-link'>
                    <a href='#'><i className='fas fa-cog'></i> Settings</a>
                </div>
            </div>

            <div className='page-wrapper'>
                <h1 className='service-selection-heading'>Service Selection</h1>
                <p className='service-selection-description'>
                    Select one service you’re interested in. As this is simply a prototype web app, functionality for providing multiple services has not yet been added.
                </p>

                <div className='service-options-wrapper'>
                    {/* Boarding option */}
                    <div className={`service-option ${selectedService === 'boarding' ? 'selected' : ''}`} onClick={() => handleServiceSelection('boarding')}>
                        <div className='service-details'>
                            <span className='service-name'>Boarding</span>
                            <span className='service-description'>Overnight pet care in your home</span>
                            <span className='service-price'>Avg. £28/night</span>
                        </div>
                        <input type='checkbox' checked={selectedService === 'boarding'} className='service-checkbox' />
                    </div>

                    {/* House Sitting option */}
                    <div className={`service-option ${selectedService === 'house-sitting' ? 'selected' : ''}`} onClick={() => handleServiceSelection('house-sitting')}>
                        <div className='service-details'>
                            <span className='service-name'>House Sitting</span>
                            <span className='service-description'>Overnight pet care in the owner's home</span>
                            <span className='service-price'>Avg. £25.00/night</span>
                        </div>
                        <input type='checkbox' checked={selectedService === 'house-sitting'} className='service-checkbox' />
                    </div>

                    {/* Drop-In Visits option */}
                    <div className={`service-option ${selectedService === 'drop-in-visits' ? 'selected' : ''}`} onClick={() => handleServiceSelection('drop-in-visits')}>
                        <div className='service-details'>
                            <span className='service-name'>Drop-In Visits</span>
                            <span className='service-description'>Toilet breaks and play dates</span>
                            <span className='service-price'>Avg. £25.00/visit</span>
                        </div>
                        <input type='checkbox' checked={selectedService === 'drop-in-visits'} className='service-checkbox' />
                    </div>

                    {/* Doggy Day Care option */}
                    <div className={`service-option ${selectedService === 'doggy-day-care' ? 'selected' : ''}`} onClick={() => handleServiceSelection('doggy-day-care')}>
                        <div className='service-details'>
                            <span className='service-name'>Doggy Day Care</span>
                            <span className='service-description'>Daytime pet care in your home</span>
                            <span className='service-price'>Avg. £25.00/day</span>
                        </div>
                        <input type='checkbox' checked={selectedService === 'doggy-day-care'} className='service-checkbox' />
                    </div>

                    {/* Dog Walking option */}
                    <div className={`service-option ${selectedService === 'dog-walking' ? 'selected' : ''}`} onClick={() => handleServiceSelection('dog-walking')}>
                        <div className='service-details'>
                            <span className='service-name'>Dog Walking</span>
                            <span className='service-description'>Dog walks that fit your schedule</span>
                            <span className='service-price'>Avg. £20.00/walk</span>
                        </div>
                        <input type='checkbox' checked={selectedService === 'dog-walking'} className='service-checkbox' />
                    </div>
                </div>

                {error && <p className='error-message'>Please select a service.</p>}

                <button className='save-continue-button' onClick={handleSaveContinue}>Save & Continue</button>
            </div>
        </div>
    );
};

export default ServiceSelectionPage;
