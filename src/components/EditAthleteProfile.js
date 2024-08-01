import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditAthleteProfile.module.css';
import { API_URL } from './api';

function EditAthleteProfile() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(athleteData.fullName || '');
  const [sports, setSports] = useState(athleteData.sports || '');
  const [age, setAge] = useState(athleteData.age || '');
  const [gender, setGender] = useState(athleteData.gender || '');
  const [playingTime, setPlayingTime] = useState(athleteData.playingTime || '');
  const [performanceAnxiety, setPerformanceAnxiety] = useState(athleteData.performanceAnxiety || '');
  const [injuries, setInjuries] = useState(athleteData.injuries || '');
  const [ableToBalance, setAbleToBalance] = useState(athleteData.ableToBalance || '');
  const [coachingAspect, setCoachingAspect] = useState(athleteData.coachingAspect || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        fullName,
        sports,
        age,
        gender,
        playingTime,
        performanceAnxiety,
        injuries,
        ableToBalance,
        coachingAspect,
      };
      await axios.put(`${API_URL}/athletes/${athleteData._id}`, updatedData);
      navigate('/data-summary', { state: { athleteData: { ...athleteData, ...updatedData } } });
    } catch (error) {
      console.error('Error updating athlete profile:', error);
    }
  };

  const handleCancel = () => {
    navigate('/data-summary', { state: { athleteData } });
  };

  return (
    <div className={styles.editProfilePage}>
      <h1 className={styles.pageTitle}>Edit Athlete Profile</h1>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sports" className={styles.label}>Sports:</label>
          <input
            type="text"
            id="sports"
            value={sports}
            onChange={(e) => setSports(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age" className={styles.label}>Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender" className={styles.label}>Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="playingTime" className={styles.label}>Playing Time:</label>
          <input
            type="text"
            id="playingTime"
            value={playingTime}
            onChange={(e) => setPlayingTime(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="performanceAnxiety" className={styles.label}>Performance Anxiety:</label>
          <select
            id="performanceAnxiety"
            value={performanceAnxiety}
            onChange={(e) => setPerformanceAnxiety(e.target.value)}
            className={styles.input}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="injuries" className={styles.label}>Injuries:</label>
          <select
            id="injuries"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ableToBalance" className={styles.label}>Able to Balance:</label>
          <select
            id="ableToBalance"
            value={ableToBalance}
            onChange={(e) => setAbleToBalance(e.target.value)}
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="coachingAspect" className={styles.label}>Coaching Aspect:</label>
          <input
            type="text"
            id="coachingAspect"
            value={coachingAspect}
            onChange={(e) => setCoachingAspect(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditAthleteProfile;
