import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './StudentQuestionnairePageOne.module.css';
import logo from '../assets/logo.png';

function StudentQuestionnairePageOne() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();

  const [sports, setSports] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [playingTime, setPlayingTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionnaireData = {
      sports,
      age,
      gender,
      playingTime,
    };
    const updatedAthleteData = { ...athleteData, ...questionnaireData };
    navigate('/student-questionnaire-2', { state: { athleteData: updatedAthleteData } });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.formTitle}>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.formLabel}>What's your age?</label>
            <input
              type="text"
              id="age"
              className={styles.formInput}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender" className={styles.formLabel}>Gender</label>
            <select
              id="gender"
              className={styles.formInput}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sports" className={styles.formLabel}>What sports?</label>
            <input
              type="text"
              id="sports"
              className={styles.formInput}
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="playingTime" className={styles.formLabel}>How long have you been playing for?</label>
            <input
              type="text"
              id="playingTime"
              className={styles.formInput}
              value={playingTime}
              onChange={(e) => setPlayingTime(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.nextButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentQuestionnairePageOne;