import React, { useState } from 'react';
import './LandingPage.css';
import AthleteSignupPopup from './AthleteSignupPopup';
import StudentLoginPopup from './StudentLoginPopup';
import CoachSignupPopup from './CoachSignupPopup';
import CoachLoginPopup from './CoachLoginPopup';

function LandingPage() {
  const [activeForm, setActiveForm] = useState('login');
  const [showAthleteSignupPopup, setShowAthleteSignupPopup] = useState(false);
  const [showStudentLoginPopup, setShowStudentLoginPopup] = useState(false);
  const [showCoachSignupPopup, setShowCoachSignupPopup] = useState(false);
  const [showCoachLoginPopup, setShowCoachLoginPopup] = useState(false);

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  const handleAthleteSignupClick = (e) => {
    e.preventDefault();
    setShowAthleteSignupPopup(true);
  };

  const handleAthleteSignupClose = () => {
    setShowAthleteSignupPopup(false);
  };

  const handleStudentLoginClick = (e) => {
    e.preventDefault();
    setShowStudentLoginPopup(true);
  };

  const handleStudentLoginClose = () => {
    setShowStudentLoginPopup(false);
  };

  const handleCoachSignupClick = (e) => {
    e.preventDefault();
    setShowCoachSignupPopup(true);
  };

  const handleCoachSignupClose = () => {
    setShowCoachSignupPopup(false);
  };

  const handleCoachLoginClick = (e) => {
    e.preventDefault();
    setShowCoachLoginPopup(true);
  };

  const handleCoachLoginClose = () => {
    setShowCoachLoginPopup(false);
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
              <button className="auth-button signup-button" onClick={handleAthleteSignupClick}>
                Sign Up
              </button>
              <button className="auth-button login-button" onClick={handleStudentLoginClick}>
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
              <button className="auth-button signup-button" onClick={handleCoachSignupClick}>
                Sign Up
              </button>
              <button className="auth-button login-button" onClick={handleCoachLoginClick}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {showAthleteSignupPopup && <AthleteSignupPopup onClose={handleAthleteSignupClose} />}
      {showStudentLoginPopup && <StudentLoginPopup onClose={handleStudentLoginClose} />}
      {showCoachSignupPopup && <CoachSignupPopup onClose={handleCoachSignupClose} />}
      {showCoachLoginPopup && <CoachLoginPopup onClose={handleCoachLoginClose} />}
    </div>
  );
}

export default LandingPage;