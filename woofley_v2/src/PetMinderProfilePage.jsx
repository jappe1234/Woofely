import React, { useState, useEffect } from 'react';
import './PetMinderProfilePage.css';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';
import GeoFire from 'geofire'; // Import GeoFire library

const PetMinderProfilePage = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [postcode, setPostcode] = useState('');

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
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&key=AIzaSyAHbRI3Sjkhiw5tbsTv4riZBuomdUa3ylM`);
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

    return (
        <div className="profile-page">
            <div className="white-wrapper">
                {/* Your profile page content here */}
            </div>
        </div>
    );
};

export default PetMinderProfilePage;
