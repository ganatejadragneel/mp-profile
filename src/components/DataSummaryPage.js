import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './DataSummaryPage.css';
import { API_URL } from './api'; // Import the API_URL constant

function DataSummaryPage() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const [profileImage, setProfileImage] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${API_URL}/athletes/${athleteData.profileImage}/image`, {
          responseType: 'blob',
        });
        setProfileImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    if (athleteData.profileImage) {
      fetchProfileImage();
    } else {
      setProfileImage(`${process.env.PUBLIC_URL}/assets/haik.jpeg`);
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
        formData.append('email', athleteData.email);
        // Add any other necessary fields from athleteData

        const response = await axios.post(`${API_URL}/athletes`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Profile image uploaded successfully:', response.data);
        // Update the athleteData state with the new profileImage ID
        athleteData.profileImage = response.data.profileImage;
        setFileToUpload(null);
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  return (
    <div className="data-summary-page">
      <div className="profile-container">
        <h2>Athlete Profile</h2>
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
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
          <button>Edit Profile</button>
          <button>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default DataSummaryPage;