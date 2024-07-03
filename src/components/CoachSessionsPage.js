import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CoachSessionsPage.css';
import { API_URL } from './api';
import logo from '../assets/logo.png';
import VideoCall from './VideoCall';

function CoachSessionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const coachData = location.state?.coachData || {};
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [selectedView, setSelectedView] = useState('sessions');
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchUpcomingSessions();
  }, []);

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

  const handleStartCall = (session) => {
    setSelectedSession(session);
  };

  const handleCallStarted = async () => {
    try {
      await axios.put(`${API_URL}/sessions/${selectedSession._id}/start-call`);
      // Optionally, you can update the local state to reflect the change
      setUpcomingSessions(prevSessions =>
        prevSessions.map(s =>
          s._id === selectedSession._id ? { ...s, callStarted: true } : s
        )
      );
    } catch (error) {
      console.error('Error updating session status:', error);
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
                      className="start-call-button"
                      onClick={() => handleStartCall(session)}
                      disabled={session.callStarted}
                    >
                      {session.callStarted ? 'Call in Progress' : 'Start Call'}
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
      {selectedSession && (
        <VideoCall
          sessionId={selectedSession._id}
          isCoach={true}
          onCallStarted={handleCallStarted}
        />
      )}
    </div>
  );
}

export default CoachSessionsPage;