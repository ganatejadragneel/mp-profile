import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoachSignupPopup.css';
import coachIcon from '../assets/logo.png';

function CoachSignupPopup({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCoachSignup = (e) => {
    e.preventDefault();
    const coachData = { fullName, email, password };
    navigate('/coach-questionnaire-1', { state: { coachData } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <img src={coachIcon} alt="Coach Icon" className="modal-icon" />
          <h2>Coach Sign Up</h2>
        </div>
        <form onSubmit={handleCoachSignup}>
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

export default CoachSignupPopup;