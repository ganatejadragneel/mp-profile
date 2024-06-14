import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';

function EditCoachProfile() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const [fullName, setFullName] = useState(coachData.fullName);
  const [coaching, setCoaching] = useState(coachData.coaching);
  const [expertise, setExpertise] = useState(coachData.expertise);
  const [ageGroup, setAgeGroup] = useState(coachData.ageGroup);
  const [certifications, setCertifications] = useState(coachData.certifications);
  const [goodDealing, setGoodDealing] = useState(coachData.goodDealing);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        fullName,
        coaching,
        expertise,
        ageGroup,
        certifications,
        goodDealing,
      };
      await axios.put(`${API_URL}/coaches/${coachData._id}`, updatedData);
      navigate('/coach-profile', { state: { coachData: { ...coachData, ...updatedData } } });
    } catch (error) {
      console.error('Error updating coach profile:', error);
    }
  };

  return (
    <div className="edit-coach-profile">
      <h2>Edit Coach Profile</h2>
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
          <label htmlFor="coaching">Coaching Experience:</label>
          <input
            type="text"
            id="coaching"
            value={coaching}
            onChange={(e) => setCoaching(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expertise">Area of Expertise:</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ageGroup">Comfortable Age Group:</label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="">Select</option>
            <option value="14-18">14-18</option>
            <option value="18-22">18-22</option>
            <option value="22-26">22-26</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="certifications">Certifications:</label>
          <input
            type="text"
            id="certifications"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="goodDealing">Dealing with Students:</label>
          <select
            id="goodDealing"
            value={goodDealing}
            onChange={(e) => setGoodDealing(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1-10">1-10</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditCoachProfile;