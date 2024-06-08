import React, { useState } from 'react';

function AthleteQuestionnaire({ onSubmit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    whatSports: '',
    gender: '',
    age: '',
    coachingAspect: '',
    performanceAnxiety: '',
    academicsAthletics: '',
    stressManagement: '',
    mindsetBuilding: '',
    lifeBalance: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setCurrentPage(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="athlete-questionnaire">
      {currentPage === 1 && (
        <form>
          <h2>Question Page 1</h2>
          <div className="form-group">
            <label htmlFor="whatSports">What sports?</label>
            <input
              type="text"
              id="whatSports"
              name="whatSports"
              value={formData.whatSports}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </form>
      )}
      {currentPage === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Question Page 2</h2>
          <div className="form-group">
            <label htmlFor="coachingAspect">In what aspect you want the coaching?</label>
            <select
              id="coachingAspect"
              name="coachingAspect"
              value={formData.coachingAspect}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="dropdown">Dropdown</option>
              {/* Add more options */}
            </select>
          </div>
          <div className="form-group">
            <label>Are you able to balance academics and athletics?</label>
            <label>
              <input
                type="radio"
                name="academicsAthletics"
                value="yes"
                checked={formData.academicsAthletics === 'yes'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="academicsAthletics"
                value="no"
                checked={formData.academicsAthletics === 'no'}
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>
          {/* Add more form fields */}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AthleteQuestionnaire;