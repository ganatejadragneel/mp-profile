import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';

function EditAthleteProfile() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const [fullName, setFullName] = useState(athleteData.fullName);
  const [sports, setSports] = useState(athleteData.sports);
  const [age, setAge] = useState(athleteData.age);
  const [gender, setGender] = useState(athleteData.gender);
  const [playingTime, setPlayingTime] = useState(athleteData.playingTime);
  const [performanceAnxiety, setPerformanceAnxiety] = useState(athleteData.performanceAnxiety);
  const [injuries, setInjuries] = useState(athleteData.injuries);
  const [ableToBalance, setAbleToBalance] = useState(athleteData.ableToBalance);
  const [coachingAspect, setCoachingAspect] = useState(athleteData.coachingAspect);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        fullName,
        sports,
        age,
        gender,
        playingTime,
        performanceAnxiety,
        injuries,
        ableToBalance,
        coachingAspect,
      };
      await axios.put(`${API_URL}/athletes/${athleteData._id}`, updatedData);
      navigate('/data-summary', { state: { athleteData: { ...athleteData, ...updatedData } } });
    } catch (error) {
      console.error('Error updating athlete profile:', error);
    }
  };

  return (
    <div className="edit-athlete-profile">
      <h2>Edit Athlete Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sports">Sports:</label>
          <input
            type="text"
            id="sports"
            value={sports}
            onChange={(e) => setSports(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="playingTime">Playing Time:</label>
          <input
            type="text"
            id="playingTime"
            value={playingTime}
            onChange={(e) => setPlayingTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="performanceAnxiety">Performance Anxiety:</label>
          <select
            id="performanceAnxiety"
            value={performanceAnxiety}
            onChange={(e) => setPerformanceAnxiety(e.target.value)}
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
          <label htmlFor="injuries">Injuries:</label>
          <select
            id="injuries"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ableToBalance">Able to Balance:</label>
          <select
            id="ableToBalance"
            value={ableToBalance}
            onChange={(e) => setAbleToBalance(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="coachingAspect">Coaching Aspect:</label>
          <input
            type="text"
            id="coachingAspect"
            value={coachingAspect}
            onChange={(e) => setCoachingAspect(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditAthleteProfile;