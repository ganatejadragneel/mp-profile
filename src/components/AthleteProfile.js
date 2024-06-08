import React from 'react';

function AthleteProfile({ athleteData }) {
  return (
    <div className="athlete-profile">
      <h2>Athlete Profile</h2>
      <p>Full Name: {athleteData.fullName}</p>
      <p>Email: {athleteData.email}</p>
      <p>What Sports: {athleteData.whatSports}</p>
      <p>Gender: {athleteData.gender}</p>
      <p>Age: {athleteData.age}</p>
      <p>Coaching Aspect: {athleteData.coachingAspect}</p>
      <p>Performance Anxiety: {athleteData.performanceAnxiety}</p>
      <p>Academics and Athletics: {athleteData.academicsAthletics}</p>
      <p>Stress Management: {athleteData.stressManagement}</p>
      <p>Mindset Building: {athleteData.mindsetBuilding}</p>
      <p>Life Balance: {athleteData.lifeBalance}</p>
    </div>
  );
}

export default AthleteProfile;