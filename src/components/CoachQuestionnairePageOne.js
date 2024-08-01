import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CoachQuestionnairePageOne.module.css';
import logo from '../assets/logo.png';

function CoachQuestionnairePageOne() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coaching, setCoaching] = useState('');
  const [personalBio, setPersonalBio] = useState('');
  const [previousCoaching, setPreviousCoaching] = useState('');

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionnaireData = {
      profilePhoto,
      coaching,
      personalBio,
      previousCoaching,
    };
    const updatedCoachData = { ...coachData, ...questionnaireData };
    navigate('/coach-questionnaire-2', { state: { coachData: updatedCoachData } });
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
            <label htmlFor="profilePhoto" className={styles.formLabel}>Upload Profile Photo</label>
            <div className={styles.fileInputContainer}>
              <div className={styles.browseButtonContainer}>
                <input
                  type="file"
                  id="profilePhoto"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  required
                />
                <label htmlFor="profilePhoto" className={styles.browseButton}>Browse</label>
              </div>
              <span className={styles.fileName}>{profilePhoto ? profilePhoto.name : 'No file chosen'}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="coaching" className={styles.formLabel}>Since how long have you been coaching?</label>
            <input
              type="text"
              id="coaching"
              className={styles.formInput}
              value={coaching}
              onChange={(e) => setCoaching(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="personalBio" className={styles.formLabel}>Personal Bio</label>
            <input
              type="text"
              id="personalBio"
              className={styles.formInput}
              value={personalBio}
              onChange={(e) => setPersonalBio(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="previousCoaching" className={styles.formLabel}>Have you done any sports coaching before?</label>
            <select
              id="previousCoaching"
              className={styles.formInput}
              value={previousCoaching}
              onChange={(e) => setPreviousCoaching(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.nextButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoachQuestionnairePageOne;