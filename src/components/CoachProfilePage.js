import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoachProfilePage.css';
import { API_URL } from './api';
import defaultImage from '../assets/haik.jpeg';

function CoachProfilePage() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

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

        console.log('Profile image uploaded successfully:', response.data);
        // Update the coachData state with the new profileImage URL
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
    navigate('/edit-coach-profile', { state: { coachData } });
  };

  const handleMySessions = () => {
    navigate('/coach-sessions', { state: { coachData } });
  };

  return (
    <div className="coach-profile-page">
      <div className="profile-container">
        <h2>Coach Profile</h2>
        <div className="profile-image">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img src={defaultImage} alt="Default" />
          )}
        </div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadImage}>Upload Image</button>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {coachData.fullName}</p>
          <p><strong>Email:</strong> {coachData.email}</p>
          <p><strong>Coaching Experience:</strong> {coachData.coaching}</p>
          <p><strong>Area of Expertise:</strong> {coachData.expertise}</p>
          <p><strong>Comfortable Age Group:</strong> {coachData.ageGroup}</p>
          <p><strong>Certifications:</strong> {coachData.certifications}</p>
          <p><strong>Dealing with Students:</strong> {coachData.goodDealing}</p>
        </div>
        <div className="profile-actions">
          <button onClick={handleMySessions}>My Sessions</button>
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

export default CoachProfilePage;