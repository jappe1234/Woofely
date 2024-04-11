import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const initialProfileData = {
        name: '',
        bio: '',
        location: '',
        pet: '',
        service: ''
    };

    const [profileData, setProfileData] = useState(initialProfileData);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    useEffect(() => {
        const savedProfileData = localStorage.getItem('profileData');
        if (savedProfileData) {
            setProfileData(JSON.parse(savedProfileData));
        }
    }, []);

    const saveProfileDataToLocal = (data) => {
        localStorage.setItem('profileData', JSON.stringify(data));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateProfile = () => {
        setIsCreatingProfile(true);
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

    const handleSaveProfile = () => {
        saveProfileDataToLocal(profileData);
        setIsCreatingProfile(false);
        setIsEditingProfile(false);
        console.log('Profile saved:', profileData);
    };


    const handleResetProfile = () => {
        setProfileData(initialProfileData);
        console.log('Profile reset');
    };

    const fetchLocationInfo = async (latitude, longitude) => {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }
            const data = await response.json();
            const postcode = data.address.postcode || '';
            const city = data.address.city || data.address.town || '';
            return { postcode, city };
        } catch (error) {
            console.error('Error fetching location info:', error);
            return { postcode: '', city: '' };
        }
    };

    useEffect(() => {
        const fetchLocation = async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const locationInfo = await fetchLocationInfo(latitude, longitude);
                        setProfileData(prevData => ({
                            ...prevData,
                            location: `${locationInfo.postcode}, ${locationInfo.city}`
                        }));
                    },
                    (error) => {
                        console.error('Error getting user location:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);

    return (
        <div className="container-profile">
            {/* Buttons to create, save, edit and reset profile */}
            <div className="button-container">
                {!isCreatingProfile && !isEditingProfile && (
                    <>
                        <button type="button" onClick={handleCreateProfile}>Create Profile</button>
                    </>
                )}
                {(isCreatingProfile || isEditingProfile) && (
                    <button type="submit" onClick={handleSaveProfile}>Save Profile</button>
                )}
                {profileData.name && profileData.bio && !isCreatingProfile && !isEditingProfile && (
                    <button type="button" onClick={handleEditProfile}>Edit Profile</button>
                )}
                {profileData.name && profileData.bio && (
                    <>
                        <button type="button" onClick={handleResetProfile}>Reset Profile</button>
                    </>
                )}
            
            </div>
            {/* Profile display */}
            {profileData.name && profileData.bio && !isCreatingProfile && !isEditingProfile && (
                <div className="profile-display">
                    <h2>Profile</h2>
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Bio:</strong> {profileData.bio}</p>
                    <p><strong>Location:</strong> {profileData.location}</p>
                    <p><strong>Pet:</strong> {profileData.pet}</p>
                    <p><strong>Service:</strong> {profileData.service}</p>
                </div>
            )}
            {/* Profile form */}
            {(isCreatingProfile || isEditingProfile) && (
                <form onSubmit={handleSaveProfile}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Bio:</label>
                        <textarea name="bio" value={profileData.bio} onChange={handleInputChange} />
                    </div>
                    {/* Location field (read-only) */}
                    <div className="form-group">
                        <label>Location:</label>
                        <input type="text" value={profileData.location} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Pet:</label>
                        <input type="text" name = "pet" value={profileData.pet} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Service Required/Offered:</label>
                        <textarea name="service" value={profileData.service} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Save Profile</button>
                </form>
            )}
            {/* Button to edit profile */}
            {profileData.name && profileData.bio && !isCreatingProfile && !isEditingProfile && (
                <div className="edit-profile-button">
                    <button type="button" onClick={handleEditProfile}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};


export default Profile;








