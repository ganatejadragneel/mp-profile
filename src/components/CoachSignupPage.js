import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './CoachSignupPage.css';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';

function CoachSignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCoachSignup = (e) => {
    e.preventDefault();
    const coachData = { fullName, email, password };
    navigate('/coach-questionnaire-1', { state: { coachData } });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="coach-signup-container">
      <div className="signup-form-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2 className="form-title">Coach Sign Up</h2>
        <form onSubmit={handleCoachSignup}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label"><strong>Full Name</strong></label>
            <input
              type="text"
              id="fullName"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label"><strong>E-mail</strong></label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="signup-button">Sign Up</button>
            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </form>
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text"><strong>Or</strong></span>
          <div className="divider-line"></div>
        </div>
        <div className="social-login-buttons">
          <button className="social-button google">
            <FaGoogle className="social-icon" />
          </button>
          <button className="social-button facebook">
            <FaFacebook className="social-icon" />
          </button>
          <button className="social-button apple">
            <FaApple className="social-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoachSignupPage;