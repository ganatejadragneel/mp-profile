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
  const [availability, setAvailability] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  useEffect(() => {
    fetchUpcomingSessions();
    fetchAvailability();
  }, [coachData._id]);

  const fetchUpcomingSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/sessions`);
      setUpcomingSessions(response.data);
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/availability`);
      setAvailability(response.data.availableTimings);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    const existingAvailability = availability.find(a => a.date === dateString);
    setSelectedTimes(existingAvailability ? existingAvailability.times : []);
  };

  const handleTimeSlotToggle = (time) => {
    setSelectedTimes(prevTimes => 
      prevTimes.includes(time)
        ? prevTimes.filter(t => t !== time)
        : [...prevTimes, time]
    );
  };

  const handleSaveAvailability = async () => {
    if (!selectedDate || selectedTimes.length === 0) {
      alert('Please select a date and at least one time slot.');
      return;
    }

    const updatedAvailability = availability.filter(a => a.date !== selectedDate);
    updatedAvailability.push({ date: selectedDate, times: selectedTimes });

    try {
      await axios.put(`${API_URL}/coaches/${coachData._id}/availability`, {
        availableTimings: updatedAvailability,
      });
      setAvailability(updatedAvailability);
      setSelectedDate(null);
      setSelectedTimes([]);
      alert('Availability saved successfully');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Error saving availability. Please try again.');
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const isAvailable = availability.some(a => a.date === dateString);
      const hasSession = upcomingSessions.some(session => session.bookingDate === dateString);
      
      if (isAvailable && !hasSession) return 'available-date';
      if (hasSession) return 'booked-date';
    }
  };

  const handleMyProfile = () => {
    navigate('/coach-profile', { state: { coachData } });
  };

  return (
    <div className="coach-sessions-page">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-button" onClick={handleLogout}>Log out</button>
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
          <button className="sidebar-button" onClick={handleMyProfile}>
            My Profile
          </button>
        </div>
        <div className="main-content">
        {selectedView === 'sessions' ? (
          <>
            <div className="channel-input">
              <input
                type="text"
                placeholder="Enter channel ID"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
              <button onClick={() => window.open(`http://localhost:4321/channel/${channelId}`, '_blank')}>
                Join Call
              </button>
            </div>
            <h2>Upcoming Sessions</h2>
            <div className="session-list">
              <div className="session-row header">
                <span className="athlete-name">Athlete Name</span>
                <span className="session-date">Date</span>
                <span className="session-time">Time</span>
                <span className="channel-id">Channel ID</span>
              </div>
              {upcomingSessions.map((session) => (
                <div key={session._id} className="session-row">
                  <span className="athlete-name">{session.athleteName}</span>
                  <span className="session-date">{session.bookingDate}</span>
                  <span className="session-time">{session.startTime}</span>
                  <span className="channel-id">{session.channelId}</span>
                </div>
              ))}
            </div>
          </>
          ) : (
            <>
              <h2>Set Your Availability</h2>
              <div className="schedule-container">
                <Calendar
                  onChange={handleDateClick}
                  value={selectedDate}
                  tileClassName={tileClassName}
                  className="calendar"
                />
                {selectedDate && (
                  <div className="time-slot-selector">
                    <h3>Select available time slots for {selectedDate}</h3>
                    <div className="time-slots">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => handleTimeSlotToggle(time)}
                          className={`time-slot ${selectedTimes.includes(time) ? 'selected' : ''}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <button className="save-button" onClick={handleSaveAvailability}>
                      Save Availability
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoachSessionsPage;