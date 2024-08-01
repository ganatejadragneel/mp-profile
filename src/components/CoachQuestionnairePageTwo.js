import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveCoachData } from './api';
import styles from './CoachQuestionnairePageTwo.module.css';
import logo from '../assets/logo.png';

function CoachQuestionnairePageTwo() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const navigate = useNavigate();

  const [expertise, setExpertise] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [certifications, setCertifications] = useState('');
  const [goodDealing, setGoodDealing] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionnaireData = {
      expertise,
      ageGroup,
      certifications,
      goodDealing,
    };
    const updatedCoachData = { ...coachData, ...questionnaireData };

    try {
      await saveCoachData(updatedCoachData);
      navigate('/coach-profile', { state: { coachData: updatedCoachData } });
    } catch (error) {
      console.error('Error saving coach data:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.formTitle}>Coach Questionnaire</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="expertise" className={styles.formLabel}>What is your area of expertise?</label>
            <input
              type="text"
              id="expertise"
              className={styles.formInput}
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ageGroup" className={styles.formLabel}>What age group athletes are you most comfortable with?</label>
            <select
              id="ageGroup"
              className={styles.formInput}
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="14-18">14-18</option>
              <option value="18-22">18-22</option>
              <option value="22-26">22-26</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="certifications" className={styles.formLabel}>List all the certifications you have</label>
            <input
              type="text"
              id="certifications"
              className={styles.formInput}
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="goodDealing" className={styles.formLabel}>How good are you at dealing with students?</label>
            <select
              id="goodDealing"
              className={styles.formInput}
              value={goodDealing}
              onChange={(e) => setGoodDealing(e.target.value)}
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num.toString()}>{num}</option>
              ))}
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoachQuestionnairePageTwo;