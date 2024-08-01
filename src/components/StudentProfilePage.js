import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './StudentProfilePage.module.css';
import { API_URL } from './api';
import defaultImg from '../assets/haik.jpeg';

function StudentProfilePage() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const [profileImage, setProfileImage] = useState(defaultImg);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (athleteData.profileImage) {
      setProfileImage(athleteData.profileImage);
    }
  }, [athleteData.profileImage]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (fileToUpload) {
      try {
        const formData = new FormData();
        formData.append('profileImage', fileToUpload);
  
        const response = await axios.put(`${API_URL}/athletes/${athleteData._id}`, formData, {
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

  const handleFindCoach = () => {
    navigate('/booking', { state: { athleteData } });
  };

  const handleEditProfile = () => {
    navigate('/edit-athlete-profile', { state: { athleteData } });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.pageTitle}>Athlete Profile</h1>
      <div className={styles.profileImageContainer}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
      </div>
      <h2 className={styles.athleteName}>Hi {athleteData.fullName.split(' ')[0]}!</h2>
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
          <span className={styles.infoValue}>{athleteData.fullName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{athleteData.email}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Sports:</span>
          <span className={styles.infoValue}>{athleteData.sports}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Age:</span>
          <span className={styles.infoValue}>{athleteData.age}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Gender:</span>
          <span className={styles.infoValue}>{athleteData.gender}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Playing Time:</span>
          <span className={styles.infoValue}>{athleteData.playingTime}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Performance Anxiety:</span>
          <span className={styles.infoValue}>{athleteData.performanceAnxiety}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Injuries:</span>
          <span className={styles.infoValue}>{athleteData.injuries}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Able to Balance:</span>
          <span className={styles.infoValue}>{athleteData.ableToBalance}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Coaching Aspect:</span>
          <span className={styles.infoValue}>{athleteData.coachingAspect}</span>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleFindCoach} className={styles.actionButton}>Find your Coach</button>
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

export default StudentProfilePage;