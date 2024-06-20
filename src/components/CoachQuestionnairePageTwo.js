import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveCoachData } from './api';
import './CoachQuestionnairePageTwo.css';

function CoachQuestionnairePageTwo() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const navigate = useNavigate();

  const [expertise, setExpertise] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [comfortableCoaching, setComfortableCoaching] = useState('');
  const [certifications, setCertifications] = useState('');
  const [goodDealing, setGoodDealing] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save the questionnaire data to the coach data object
    const questionnaireData = {
      expertise,
      ageGroup,
      comfortableCoaching,
      certifications,
      goodDealing,
    };
    const updatedCoachData = { ...coachData, ...questionnaireData };

    try {
      await saveCoachData(updatedCoachData);
      // Navigate to the coach profile page
      navigate('/coach-profile', { state: { coachData: updatedCoachData } });
    } catch (error) {
      console.error('Error saving coach data:', error);
      // Handle the error, show an error message, or take appropriate action
    }
  };

  return (
    <div className="coach-questionnaire-page-two">
      <div className="questionnaire-container">
        <h2>Coach Questionnaire - Page 2</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="expertise">What is your area of expertise?</label>
            <input
              type="text"
              id="expertise"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ageGroup">What age group athletes are you most comfortable?</label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="14-18">14-18</option>
              <option value="18-22">18-22</option>
              <option value="22-26">22-26</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comfortableCoaching">List all the certifications you have</label>
            <input
              type="text"
              id="comfortableCoaching"
              value={comfortableCoaching}
              onChange={(e) => setComfortableCoaching(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="certifications">List all the certifications you have</label>
            <input
              type="text"
              id="certifications"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="goodDealing">How good are you dealing with students?</label>
            <select
              id="goodDealing"
              value={goodDealing}
              onChange={(e) => setGoodDealing(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1-10">1-10</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CoachQuestionnairePageTwo;