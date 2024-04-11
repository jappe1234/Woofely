import React, { useState } from 'react';
import './RegisterForm.css'; // Import RegisterForm-specific styles
import brandLogo from './images/logo.png'; // Import your brand logo image
import eyeOpenIcon from './icons/eye_open.png';
import eyeClosedIcon from './icons/eye_closed.png';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [userType, setUserType] = useState(''); // State to store user type selection
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const db = getDatabase();
            let userRef;
            if (userType === 'petOwner') {
                userRef = ref(db, `users/${user.uid}`); // Store pet owner info under "users/petOwners/" reference
            } else if (userType === 'petMinder') {
                userRef = ref(db, `users/${user.uid}`); // Store pet minder info under "users/petMinders/" reference
            }
            await set(userRef, {
                email,
                phoneNumber,
                username,
                userType // Save user type selected during registration
            });
            console.log('Registration successful');
            if (userType === 'petOwner') {
                navigate('/Home'); // Redirect pet owners to Home page
            } else if (userType === 'petMinder') {
                navigate('/ServiceSelectionPage'); // Redirect pet minders to ServiceSelectionPage
            }
        } catch (error) {
            setError(error.message);
        }
    };
    
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='register-background'>
            <div className='brand-bar'>
                <img src={brandLogo} alt="Brand Logo" className="brand-logo" />
            </div>
            <div className='register-wrapper'>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div className='register-input-box'>
                        <input type='email' placeholder='Enter Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='register-input-box'>
                        <input type='tel' placeholder='Enter Phone Number' autoComplete='off' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>

                    <div className='register-input-box'>
                        <input type='text' placeholder='Create Username' autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className='register-input-box'>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Create Password' 
                            autoComplete='off' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <img 
                            src={showPassword ? eyeClosedIcon : eyeOpenIcon} 
                            alt="Toggle Password Visibility" 
                            className="register-eye-icon" 
                            onMouseDown={togglePasswordVisibility} 
                            onMouseUp={togglePasswordVisibility} 
                        />
                    </div>

                    <div className="register-input-box">
                        <label>Select User Type:</label>
                        <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                            <option value="">Select...</option>
                            <option value="petOwner">Pet Owner</option>
                            <option value="petMinder">Pet Minder</option>
                        </select>
                    </div>

                    {error && <p className='error-message'>{error}</p>}
                    <div className="register-button-container">
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className='register-back-button'>
                    <p>Have an existing account? <Link to="/LoginForm" className="back-button">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
