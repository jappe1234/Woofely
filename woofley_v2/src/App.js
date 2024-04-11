import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Home from "./Home";
import Profile from "./Profile";
import ServiceSelectionPage from "./ServiceSelectionPage"; 
import PetMinderProfilePage from './PetMinderProfilePage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALkQ2aynbJ4nWiQKZla4877YPYSWmcwEc",
  authDomain: "woofely-2899b.firebaseapp.com",
  projectId: "woofely-2899b",
  storageBucket: "woofely-2899b.appspot.com",
  messagingSenderId: "978288438730",
  appId: "1:978288438730:web:188d00d50b0eb5df4b3333",
  measurementId: "G-JF3FJL58FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ServiceSelectionPage" element={<ServiceSelectionPage />} /> 
          <Route path="/PetMinderProfilePage" element={<PetMinderProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
