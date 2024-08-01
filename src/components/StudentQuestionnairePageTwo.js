import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAthleteData } from './api';
import styles from './StudentQuestionnairePageTwo.module.css';
import logo from '../assets/logo.png';

function StudentQuestionnairePageTwo() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();

  const [performanceAnxiety, setPerformanceAnxiety] = useState('');
  const [injuries, setInjuries] = useState('');
  const [ableToBalance, setAbleToBalance] = useState('');
  const [coachingAspect, setCoachingAspect] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionnaireData = {
      performanceAnxiety,
      injuries,
      ableToBalance,
      coachingAspect,
    };
    const updatedAthleteData = { ...athleteData, ...questionnaireData };
    
    try {
      await saveAthleteData(updatedAthleteData);
      navigate('/data-summary', { state: { athleteData: updatedAthleteData } });
    } catch (error) {
      console.error('Error saving athlete data:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.formTitle}>Student Questionnaire</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="performanceAnxiety" className={styles.formLabel}>How often you get performance anxiety?</label>
            <select
              id="performanceAnxiety"
              className={styles.formInput}
              value={performanceAnxiety}
              onChange={(e) => setPerformanceAnxiety(e.target.value)}
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="injuries" className={styles.formLabel}>Did you have injuries before?</label>
            <select
              id="injuries"
              className={styles.formInput}
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ableToBalance" className={styles.formLabel}>Are you able to balance academics and athletics?</label>
            <select
              id="ableToBalance"
              className={styles.formInput}
              value={ableToBalance}
              onChange={(e) => setAbleToBalance(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="coachingAspect" className={styles.formLabel}>In what aspects you want coaching?</label>
            <input
              type="text"
              id="coachingAspect"
              className={styles.formInput}
              value={coachingAspect}
              onChange={(e) => setCoachingAspect(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentQuestionnairePageTwo;