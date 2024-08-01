import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import CoachSignupPopup from './CoachSignupPopup';

function LandingPage() {
  const [activeForm, setActiveForm] = useState('athlete');
  const [showCoachSignupPopup, setShowCoachSignupPopup] = useState(false);
  const navigate = useNavigate();

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (activeForm === 'athlete') {
      navigate('/athlete-signup');
    } else {
      navigate('/coach-signup');
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (activeForm === 'athlete') {
      navigate('/athlete-login');
    } else {
      navigate('/coach-login');
    }
  };

  const handlePopupClose = () => {
    setShowCoachSignupPopup(false);
  };

  return (
    <div className="landing-page">
      <div className="image-section">
        <img src="/landing.jpg" alt="Landing Page" className="cover-image" />
      </div>
      <div className="auth-section">
        <img 
          src="/icon.png" 
          alt="Mindful Performance Logo" 
          className="logo mindful-performance-logo"
        />
        <h1 className="section-title">Welcome to Mindful Performance</h1>
        <h2 className="section-subtitle">Are you an Athlete or Coach?</h2>
        <div className="role-selector">
          <button
            className={`role-button ${activeForm === 'athlete' ? 'active' : ''}`}
            onClick={() => switchForm('athlete')}
          >
            Athlete
          </button>
          <button
            className={`role-button ${activeForm === 'coach' ? 'active' : ''}`}
            onClick={() => switchForm('coach')}
          >
            Coach
          </button>
        </div>
        <div className="auth-buttons-container">
          <button className="auth-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="auth-button" onClick={handleSignupClick}>
            Signup
          </button>
        </div>
      </div>
      {showCoachSignupPopup && <CoachSignupPopup onClose={handlePopupClose} />}
    </div>
  );
}

export default LandingPage;