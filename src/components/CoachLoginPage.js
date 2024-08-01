import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCoach } from './api';
import logo from '../assets/logo.png';
import styles from './CoachLoginPage.module.css';

function CoachLoginPage() {
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
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect email or password');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={styles["athlete-login-container"]}>
      <div className={styles["login-form-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="Logo" className={styles["logo"]} />
        </div>
        <h2 className={styles["form-title"]}>Coach Login</h2>
        <form onSubmit={handleCoachLogin}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["form-label"]}>Email</label>
            <input
              type="email"
              id="email"
              className={styles["form-input"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles["form-label"]}>Password</label>
            <input
              type="password"
              id="password"
              className={styles["form-input"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
          <div className={styles["button-group"]}>
            <button type="submit" className={styles["login-button"]}>Login</button>
            <button type="button" onClick={handleCancel} className={styles["cancel-button"]}>Cancel</button>
          </div>
        </form>
        <a href="#" className={styles["forgot-password"]}>Forgot Password?</a>
        <div className={styles["divider"]}>
          <div className={styles["divider-line"]}></div>
          <span className={styles["divider-text"]}>or</span>
          <div className={styles["divider-line"]}></div>
        </div>
        <div className={styles["social-login-buttons"]}>
          <button className={styles["social-button"]}>
            <svg className={styles["social-icon"]} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Log in with Facebook
          </button>
          <button className={styles["social-button"]}>
            <svg className={styles["social-icon"]} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoachLoginPage;