import React, { useState } from 'react';
import './LoginForm.css';
import brandLogo from './images/logo.png'; // Import your brand logo image
import eyeOpenIcon from './icons/eye_open.png';
import eyeClosedIcon from './icons/eye_closed.png';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            navigate('/Home'); // Redirect the user to the Home page after successful login
        } catch (error) {
            // Set the error state to display the error message
            setError('Invalid email or password. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='login-background'>
            <div className='brand-bar'>
                <img src={brandLogo} alt="Brand Logo" className="brand-logo" />
            </div>
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Email'
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <img
                            src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                            alt="Toggle Password Visibility"
                            className="login-eye-icon"
                            onMouseDown={togglePasswordVisibility}
                            onMouseUp={togglePasswordVisibility}
                        />
                    </div>

                    {error && <p className='error-message'>{error}</p>}
                    <div className="login-button-container">
                        <button type='submit'>Login</button>
                    </div>

                    <div className='register-link'>
                        <p>Don't have an account? <Link to='/RegisterForm'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
