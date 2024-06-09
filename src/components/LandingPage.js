import React, { useState } from 'react';
import './LandingPage.css';
import AthleteSignupPopup from './AthleteSignupPopup';
import StudentLoginPopup from './StudentLoginPopup';

function LandingPage() {
  const [activeForm, setActiveForm] = useState('login');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  const handleSignupClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShowSignupPopup(true);
  };

  const handleSignupClose = () => {
    setShowSignupPopup(false);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginPopup(true);
  };

  const handleLoginClose = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="landing-page">
      <div className="image-section">
        <img src="/landing.jpg" alt="Landing Page" className="cover-image" />
      </div>
      <div className="auth-section">
        <h1 className="section-title">Are you an Athlete or Coach?</h1>
        <div className="forms">
          <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => switchForm('login')}
            >
              Athlete
              <span className="underline"></span>
            </button>
            <form className="form form-login">
              <button className="auth-button signup-button" onClick={handleSignupClick}>
                Sign Up
              </button>
              <button className="auth-button login-button" onClick={handleLoginClick}>
                Login
              </button>
            </form>
          </div>

          <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={() => switchForm('signup')}
            >
              Coach
              <span className="underline"></span>
            </button>
            <form className="form form-signup">
              <button className="auth-button signup-button">Sign Up</button>
              <button className="auth-button login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
      {showSignupPopup && <AthleteSignupPopup onClose={handleSignupClose} />}
      {showLoginPopup && <StudentLoginPopup onClose={handleLoginClose} />}
    </div>
  );
}

export default LandingPage;
