// CoachSessionsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CoachSessionsPage.css';
import { API_URL } from './api';
import logo from '../assets/logo.png';

function CoachSessionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const coachData = location.state?.coachData || {};
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [selectedView, setSelectedView] = useState('sessions');
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    fetchUpcomingSessions();
  });

  const fetchUpcomingSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/sessions`);
      setUpcomingSessions(response.data);
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleJoinSession = (googleMeetLink) => {
    window.open(googleMeetLink, '_blank');
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleDateChange = (date) => {
    setSelectedDates(date);
  };

  const handleSaveAvailability = async () => {
    try {
      await axios.put(`${API_URL}/coaches/${coachData._id}/availability`, {
        availableTimings: selectedDates,
      });
      alert('Availability saved successfully');
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <div className="coach-sessions-page">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="content">
        <div className="sidebar">
          <button
            className={`sidebar-button ${selectedView === 'sessions' ? 'active' : ''}`}
            onClick={() => handleViewChange('sessions')}
          >
            My Sessions
          </button>
          <button
            className={`sidebar-button ${selectedView === 'schedule' ? 'active' : ''}`}
            onClick={() => handleViewChange('schedule')}
          >
            Schedule
          </button>
        </div>
        <div className="main-content">
          {selectedView === 'sessions' ? (
            <>
              <h2>Upcoming Sessions</h2>
              <div className="session-list">
                {upcomingSessions.map((session) => (
                  <div key={session._id} className="session-row">
                    <span className="athlete-name">{session.athleteName}</span>
                    <span className="session-date">{session.bookingDate}</span>
                    <span className="session-time">{session.startTime}</span>
                    <button
                      className="join-button"
                      onClick={() => handleJoinSession(session.googleMeetLink)}
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Select Your Availability</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDates}
                selectRange={true}
                className="calendar"
              />
              <button className="save-button" onClick={handleSaveAvailability}>
                Save Availability
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoachSessionsPage;