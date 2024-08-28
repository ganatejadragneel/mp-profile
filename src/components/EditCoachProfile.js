import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditCoachProfile.module.css';
import { API_URL } from '../config';

function EditCoachProfile() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const [fullName, setFullName] = useState(coachData.fullName);
  const [coaching, setCoaching] = useState(coachData.coaching);
  const [expertise, setExpertise] = useState(coachData.expertise);
  const [ageGroup, setAgeGroup] = useState(coachData.ageGroup);
  const [certifications, setCertifications] = useState(coachData.certifications);
  const [goodDealing, setGoodDealing] = useState(coachData.goodDealing);
  const [personalBio, setPersonalBio] = useState(coachData.personalBio);
  const [previousCoaching, setPreviousCoaching] = useState(coachData.previousCoaching);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        fullName,
        coaching,
        expertise,
        ageGroup,
        certifications,
        goodDealing,
        personalBio,
        previousCoaching,
      };
      await axios.put(`${API_URL}/coaches/${coachData._id}`, updatedData);
      navigate('/coach-profile', { state: { coachData: { ...coachData, ...updatedData } } });
    } catch (error) {
      console.error('Error updating coach profile:', error);
    }
  };
  
  const handleCancel = () => {
    navigate('/coach-profile', { state: { coachData } });
  };
  
  return (
    <div className={styles.editProfilePage}>
    <h1 className={styles.pageTitle}>Edit Coach Profile</h1>
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
    <label htmlFor="coaching" className={styles.label}>Coaching:</label>
    <input
    type="text"
    id="coaching"
    value={coaching}
    onChange={(e) => setCoaching(e.target.value)}
    className={styles.input}
    />
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="expertise" className={styles.label}>Expertise:</label>
    <input
    type="text"
    id="expertise"
    value={expertise}
    onChange={(e) => setExpertise(e.target.value)}
    className={styles.input}
    />
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="ageGroup" className={styles.label}>Age Group:</label>
    <select
    id="ageGroup"
    value={ageGroup}
    onChange={(e) => setAgeGroup(e.target.value)}
    className={styles.input}
    >
    <option value="">Select</option>
    <option value="14-18">14-18</option>
    <option value="18-22">18-22</option>
    <option value="22-26">22-26</option>
    </select>
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="certifications" className={styles.label}>Certifications:</label>
    <input
    type="text"
    id="certifications"
    value={certifications}
    onChange={(e) => setCertifications(e.target.value)}
    className={styles.input}
    />
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="goodDealing" className={styles.label}>Dealing with Students:</label>
    <select
    id="goodDealing"
    value={goodDealing}
    onChange={(e) => setGoodDealing(e.target.value)}
    className={styles.input}
    >
    <option value="">Select</option>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
      <option key={num} value={num.toString()}>{num}</option>
    ))}
    </select>
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="personalBio" className={styles.label}>Personal Bio:</label>
    <textarea
    id="personalBio"
    value={personalBio}
    onChange={(e) => setPersonalBio(e.target.value)}
    className={styles.textarea}
    ></textarea>
    </div>
    <div className={styles.formGroup}>
    <label htmlFor="previousCoaching" className={styles.label}>Previous Coaching:</label>
    <select
    id="previousCoaching"
    value={previousCoaching}
    onChange={(e) => setPreviousCoaching(e.target.value)}
    className={styles.input}
    >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    </select>
    </div>
    <div className={styles.buttonGroup}>
    <button type="submit" className={styles.saveButton}>Save</button>
    <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
    </div>
    </form>
    </div>
  );
}
export default EditCoachProfile;