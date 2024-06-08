import React, { useState } from 'react';
import './LandingPage.css';

import AthleteSignupForm from './AthleteSignupForm';
import AthleteQuestionnaire from './AthleteQuestionnaire';
import AthleteProfile from './AthleteProfile';
import { saveAthleteData } from './api';

function LandingPage() {
  const [activeForm, setActiveForm] = useState('login');

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  const [showAthleteSignupForm, setShowAthleteSignupForm] = useState(false);
  const [showAthleteQuestionnaire, setShowAthleteQuestionnaire] = useState(false);
  const [showAthleteProfile, setShowAthleteProfile] = useState(false);
  const [athleteData, setAthleteData] = useState(null);

  const handleAthleteSignup = (formData) => {
    setAthleteData(formData);
    setShowAthleteSignupForm(false);
    setShowAthleteQuestionnaire(true);
  };

  const handleAthleteQuestionnaire = async (questionnaireData) => {
    try {
      const updatedAthleteData = { ...athleteData, ...questionnaireData };
      await saveAthleteData(updatedAthleteData);
      setAthleteData(updatedAthleteData);
      setShowAthleteQuestionnaire(false);
      setShowAthleteProfile(true);
    } catch (error) {
      console.error('Error saving athlete data:', error);
    }
  };
  

  return (
    <div className="landing-page">
      <div className="image-section">
        <img src="/landing.jpg" alt="Landing Page" className="cover-image" />
      </div>
      <div className="auth-section">
        <h1 className="section-title">Are you a Athelete or Coach?</h1>
        <div className="forms">
          <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => switchForm('login')}
            >
              Athelete
              <span className="underline"></span>
            </button>
            <form className="form form-login">
              <button className="auth-button signup-button">Sign Up</button>
              <button className="auth-button login-button">Login</button>
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
      {showAthleteSignupForm && (
        <AthleteSignupForm onSubmit={handleAthleteSignup} />
      )}
      {showAthleteQuestionnaire && (
        <AthleteQuestionnaire onSubmit={handleAthleteQuestionnaire} />
      )}
      {showAthleteProfile && <AthleteProfile athleteData={athleteData} />}
    </div>
  );
}

export default LandingPage;