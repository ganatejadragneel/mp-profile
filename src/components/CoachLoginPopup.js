import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCoach } from './api';
import './CoachLoginPopup.css';
import coachIcon from '../assets/logo.png';

function CoachLoginPopup({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCoachLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCoach({ email, password });
      const coachData = response.data;
      navigate('/coach-profile', { state: { coachData } });
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect email or password');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <img src={coachIcon} alt="Coach Icon" className="modal-icon" />
          <h2>Coach Login</h2>
        </div>
        <form onSubmit={handleCoachLogin}>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button type="submit" className="submit-button">Login</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoachLoginPopup;