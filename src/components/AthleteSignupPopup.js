import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AthleteSignupPopup.css';
import athleteIcon from '../assets/logo.png';

function AthleteSignupPopup({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAthleteSignup = (e) => {
    e.preventDefault();
    const athleteData = { fullName, email, password };
    navigate('/student-questionnaire-1', { state: { athleteData } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <img src={athleteIcon} alt="Athlete Icon" className="modal-icon" />
          <h2>Athlete Sign Up</h2>
        </div>
        <form onSubmit={handleAthleteSignup}>
          <div className="input-block">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AthleteSignupPopup;
