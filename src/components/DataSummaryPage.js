import React from 'react';
import { useLocation } from 'react-router-dom';
import './DataSummaryPage.css';

function DataSummaryPage() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};

  return (
    <div className="data-summary-page">
      <div className="profile-container">
        <h2>Athlete Profile</h2>
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