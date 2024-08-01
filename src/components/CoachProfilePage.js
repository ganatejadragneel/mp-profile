import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CoachProfilePage.module.css';
import { API_URL } from './api';
import defaultImg from '../assets/haik.jpeg';

function CoachProfilePage() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const [profileImage, setProfileImage] = useState(defaultImg);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (coachData.profileImage) {
      setProfileImage(coachData.profileImage);
    }
  }, [coachData.profileImage]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (fileToUpload) {
      try {
        const formData = new FormData();
        formData.append('profileImage', fileToUpload);
  
        const response = await axios.put(`${API_URL}/coaches/${coachData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setProfileImage(response.data.profileImage);
        setFileToUpload(null);
  
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  const handleMySessions = () => {
    navigate('/coach-sessions', { state: { coachData } });
  };

  const handleEditProfile = () => {
    navigate('/edit-coach-profile', { state: { coachData } });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.pageTitle}>Coach Profile</h1>
      <div className={styles.profileImageContainer}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
      </div>
      <h2 className={styles.coachName}>Hi {coachData.fullName.split(' ')[0]}!</h2>
      <div className={styles.imageUploadContainer}>
        <div className={styles.fileInputGroup}>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.chooseFileButton}>Choose File</label>
          <span className={styles.fileName}>{fileToUpload ? fileToUpload.name : 'No file chosen'}</span>
        </div>
        <button onClick={handleUploadImage} className={styles.uploadButton}>Upload Image</button>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Full name:</span>
          <span className={styles.infoValue}>{coachData.fullName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{coachData.email}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Coaching:</span>
          <span className={styles.infoValue}>{coachData.coaching}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Expertise:</span>
          <span className={styles.infoValue}>{coachData.expertise}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Age Group:</span>
          <span className={styles.infoValue}>{coachData.ageGroup}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Certifications:</span>
          <span className={styles.infoValue}>{coachData.certifications}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Dealing with Students:</span>
          <span className={styles.infoValue}>{coachData.goodDealing}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Personal Bio:</span>
          <span className={styles.infoValue}>{coachData.personalBio}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Previous Coaching:</span>
          <span className={styles.infoValue}>{coachData.previousCoaching}</span>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleMySessions} className={styles.actionButton}>My Sessions</button>
        <button onClick={handleEditProfile} className={styles.actionButton}>Edit Profile</button>
        <button onClick={handleLogout} className={styles.actionButton}>Log Out</button>
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <p>Image uploaded successfully</p>
        </div>
      )}
    </div>
  );
}

export default CoachProfilePage;