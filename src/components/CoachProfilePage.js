import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoachProfilePage.css';
import { API_URL } from './api';

function CoachProfilePage() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${API_URL}/coaches/${coachData.profileImage}/image`, {
          responseType: 'blob',
        });
        setProfileImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    if (coachData.profileImage) {
      fetchProfileImage();
    }
  }, [coachData.profileImage]);

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
        {profileImage && (
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
          </div>
        )}
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
    </div>
  );
}

export default CoachProfilePage;