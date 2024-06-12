import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAthleteData } from './api';
import './StudentQuestionnairePageTwo.css';

function StudentQuestionnairePageTwo() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();

  const [performanceAnxiety, setPerformanceAnxiety] = useState('');
  const [injuries, setInjuries] = useState('');
  const [ableToBalance, setAbleToBalance] = useState('');
  const [coachingAspect, setCoachingAspect] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Student questionnaire page two submitted');
    // Save the questionnaire data to the athlete data object
    const questionnaireData = {
      performanceAnxiety,
      injuries,
      ableToBalance,
      coachingAspect,
    };
    const updatedAthleteData = { ...athleteData, ...questionnaireData };
    
    try {
      await saveAthleteData(updatedAthleteData);
      // Navigate to the data summary page
      navigate('/data-summary', { state: { athleteData: updatedAthleteData } });
    } catch (error) {
      console.error('Error saving athlete data:', error);
      // Handle the error, show an error message, or take appropriate action
    }
  };

  return (
    <div className="student-questionnaire-page-two">
      <div className="questionnaire-container">
        <h2>Student Questionnaire - Page 2</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="performanceAnxiety">How often you get performance anxiety?</label>
            <select
              id="performanceAnxiety"
              value={performanceAnxiety}
              onChange={(e) => setPerformanceAnxiety(e.target.value)}
              required
            >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="injuries">Did you have injuries before?</label>
            <select
              id="injuries"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ableToBalance">Are you able to balance academics and athletics?</label>
            <select
              id="ableToBalance"
              value={ableToBalance}
              onChange={(e) => setAbleToBalance(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="coachingAspect">In what aspect you want the coaching?</label>
            <input
              type="text"
              id="coachingAspect"
              value={coachingAspect}
              onChange={(e) => setCoachingAspect(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default StudentQuestionnairePageTwo;