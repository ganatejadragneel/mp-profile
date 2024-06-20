import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentProfilePage.css';
import { API_URL } from './api';
import defaultImg from '../assets/haik.jpeg';

function StudentProfilePage() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const [profileImage, setProfileImage] = useState(defaultImg);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    if (athleteData.profileImage) {
      setProfileImage(athleteData.profileImage);
    }
  }, [athleteData.profileImage]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleFindCoach = () => {
    console.log(athleteData);
    navigate('/booking', { state: { athleteData } });
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
  
        console.log('Profile image uploaded successfully:', response.data);
        // Update the athleteData state with the new profileImage URL
        setProfileImage(response.data.profileImage);
        setFileToUpload(null);
  
        // Show the success popup
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
      } catch (error) {
        console.error('Error uploading profile image:', error);
        // Handle the error, show an error message, or take appropriate action
      }
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-athlete-profile', { state: { athleteData } });
  };

  return (
    <div className="data-summary-page">
      <div className="profile-container">
        <h2>Athlete Profile</h2>
        <div className="profile-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img src={defaultImg} alt="Default" />
          )}
        </div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadImage}>Upload Image</button>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {athleteData.fullName}</p>
          <p><strong>Email:</strong> {athleteData.email}</p>
          <p><strong>Sports:</strong> {athleteData.sports}</p>
          <p><strong>Age:</strong> {athleteData.age}</p>
          <p><strong>Gender:</strong> {athleteData.gender}</p>
          <p><strong>Playing Time:</strong> {athleteData.playingTime}</p>
          <p><strong>Performance Anxiety:</strong> {athleteData.performanceAnxiety}</p>
          <p><strong>Injuries:</strong> {athleteData.injuries}</p>
          <p><strong>Able to Balance:</strong> {athleteData.ableToBalance}</p>
          <p><strong>Coaching Aspect:</strong> {athleteData.coachingAspect}</p>
        </div>
        <div className="profile-actions">
          <button onClick={handleFindCoach}>Find your Coach</button>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Image uploaded successfully</p>
        </div>
      )}
    </div>
  );
}

export default StudentProfilePage;