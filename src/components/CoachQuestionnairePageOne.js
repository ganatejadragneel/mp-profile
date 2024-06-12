import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CoachQuestionnairePageOne.css';
import { useNavigate } from 'react-router-dom';

function CoachQuestionnairePageOne() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = useState('');
  const [coaching, setCoaching] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the questionnaire data to the coach data object
    const questionnaireData = {
      profilePhoto,
      coaching,
    };
    const updatedCoachData = { ...coachData, ...questionnaireData };
    // Navigate to the second questionnaire page
    navigate('/coach-questionnaire-2', { state: { coachData: updatedCoachData } });
  };

  return (
    <div className="coach-questionnaire-page-one">
      <div className="questionnaire-container">
        <h2>Coach Questionnaire - Page 1</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profilePhoto">Upload Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              onChange={(e) => setProfilePhoto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="coaching">Since how long have you been coaching?</label>
            <input
              type="text"
              id="coaching"
              value={coaching}
              onChange={(e) => setCoaching(e.target.value)}
              required
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default CoachQuestionnairePageOne;