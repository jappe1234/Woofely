import React, { useState, useEffect } from 'react';
import './PetMinderProfilePage.css';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import GeoFire from 'geofire'; // Import GeoFire library
import './LoginForm';
import { Link } from 'react-router-dom';


const PetMinderProfilePage = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [postcode, setPostcode] = useState('');
    const [availability, setAvailability] = useState('');
    const [petsPerDay, setPetsPerDay] = useState(1);
    const [location, setLocation] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        // Fetch latitude and longitude based on the postcode from the database
        fetchLatitudeLongitude();
    }, []);

    const fetchLatitudeLongitude = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                const snapshot = await userRef.get();
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setPostcode(userData.postcode);
                    fetchLocationFromPostcode(userData.postcode);
                } else {
                    console.log('No data available for the current user');
                }
            } else {
                console.log('User is not logged in');
            }
        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    };

    const fetchLocationFromPostcode = async (postcode) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=YOUR_API_KEY`);
            const data = await response.json();
            const { lat, lng } = data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            // Update Firebase with PetMinder's location data
            updateFirebaseWithLocationData(lat, lng);
        } catch (error) {
            console.error('Error fetching latitude and longitude:', error);
        }
    };

    const updateFirebaseWithLocationData = (latitude, longitude) => {
        const db = getDatabase();
        const geoFire = new GeoFire(ref(db, 'petminder_locations'));
        geoFire.set('petminder1', [latitude, longitude]).then(() => {
            console.log('Location data updated in Firebase');
        }).catch((error) => {
            console.error('Error updating location data:', error);
        });
    };

    const handlePhotoUpload = (e) => {
        // Handle photo upload logic here
        const file = e.target.files[0];
        if (file) {
            // Process the uploaded photo
            setProfilePhoto(file);
        }
    };

    const handleSave = () => {
        // Handle save button click logic here
    };

    return (
        <div className="profile-page">
            <div className="white-wrapper">
                <div className="profile-section">
                    <h2>Rates</h2>
                    <div className="input-container">
                        <label>
                            Rates (GBP/night)
                            <input type="number" />
                        </label>
                    </div>
                </div>
                <div className="profile-section">
                    <h2>Availability</h2>
                    <div className="input-container">
                        <label>
                            Are you home full-time during the week?
                            <input type="checkbox" />
                        </label>
                    </div>
                    <div className="input-container">
                        <label>
                            When in the month will you typically be available for this service?
                            <input
                                type="date"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="profile-section">
                    <h2>Pet preferences</h2>
                    <div className="input-container">
                        <label>
                            How many pets per day can you host in your home?
                            <select
                                value={petsPerDay}
                                onChange={(e) => setPetsPerDay(e.target.value)}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3+</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="profile-section">
                    <h2>Location</h2>
                    <div className="input-container">
                        <label>
                            Location
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                    </div>
                    {/* Map View Component */}
                    <div className="map-container">
                    </div>
                </div>
                <div className="profile-section">
                    <h2>Profile Photo</h2>
                    <div className="input-container">
                        <label>
                            This is the first photo pet owners will see. We recommend using a well-lit, clear photo of your face.
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </label>
                        <div className="save-button-container">
                            <button onClick={handleSave}>Create Pet Service Post</button>
                        </div>

                        <div className='Logout'>
                            <p>Log Out<Link to="/LoginForm" className="back-button">Click here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default PetMinderProfilePage;
