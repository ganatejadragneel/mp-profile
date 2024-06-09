import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StudentQuestionnairePageOne.css';
import { useNavigate } from 'react-router-dom';

function StudentQuestionnairePageOne() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();

  const [sports, setSports] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [playingTime, setPlayingTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the questionnaire data to the athlete data object
    const questionnaireData = {
      sports,
      age,
      gender,
      playingTime,
    };
    const updatedAthleteData = { ...athleteData, ...questionnaireData };
    // Navigate to the second questionnaire page
    navigate('/student-questionnaire-2', { state: { athleteData: updatedAthleteData } });
  };

  return (
    <div className="student-questionnaire-page-one">
      <div className="questionnaire-container">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sports">What sports?</label>
            <input
              type="text"
              id="sports"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">What's your age?</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="playingTime">How long have you been playing?</label>
            <input
              type="text"
              id="playingTime"
              value={playingTime}
              onChange={(e) => setPlayingTime(e.target.value)}
              required
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default StudentQuestionnairePageOne;