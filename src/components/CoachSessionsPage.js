import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { API_URL } from './api';
import logo from '../assets/logo.png';
import styles from './CoachSessionsPage.module.css';
import { Calendar as CalendarIcon, User, BookOpen } from 'lucide-react';

function CoachSessionsPage() {
  const location = useLocation();
  const coachData = location.state?.coachData || {};
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [activeButton, setActiveButton] = useState('mySessions');
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  
  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];
  
  const fetchCoachSessions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/sessions`);
      setSessions(response.data);
      // Extract booked slots from sessions
      const booked = response.data.map(session => ({
        date: session.bookingDate,
        time: session.startTime
      }));
      setBookedSlots(booked);
    } catch (error) {
      console.error('Error fetching coach sessions:', error);
    }
  }, [coachData._id]);
  
  const fetchAvailability = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/availability`);
      setAvailability(response.data.availableTimings || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  }, [coachData._id]);
  
  useEffect(() => {
    fetchCoachSessions();
    fetchAvailability();
  }, [fetchCoachSessions, fetchAvailability]);
  
  const handleLogout = () => {
    navigate('/');
  };
  
  const handleMyProfile = () => {
    navigate('/coach-profile', { state: { coachData } });
  };
  
  const calculateStatus = (sessionDate) => {
    const today = new Date();
    const sessionDay = new Date(sessionDate);
    const diffTime = sessionDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Join';
    } else if (diffDays > 0) {
      return `${diffDays} Days Left`;
    } else {
      return 'Past';
    }
  };
  
  const handleJoinSession = (zoomJoinUrl) => {
    window.open(zoomJoinUrl, '_blank');
  };
  
  const handleDateClick = (date) => {
    const selectedDate = new Date(date);
    const dateString = formatDateString(selectedDate);
    setSelectedDate(selectedDate);
    const existingAvailability = availability.find(a => a.date === dateString);
    setSelectedTimes(existingAvailability ? existingAvailability.times : []);
  };
  
  const formatDateString = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date ? new Date(date).toISOString().split('T')[0] : '';
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
    
    const dateString = formatDateString(selectedDate);
    const updatedAvailability = availability.filter(a => a.date !== dateString);
    updatedAvailability.push({ date: dateString, times: selectedTimes });
    
    try {
      await axios.put(`${API_URL}/coaches/${coachData._id}/availability`, {
        availableTimings: updatedAvailability,
      });
      
      setAvailability(updatedAvailability);
      alert('Availability saved successfully');
      fetchAvailability(); // Refresh availability data after saving
    } catch (error) {
      console.error('Error saving availability:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('Error saving availability. Please try again.');
    }
  };
  
  const isDateAvailable = (date) => {
    const dateString = formatDateString(date);
    const availableDay = availability.find(a => a.date === dateString);
    return availableDay && availableDay.times.length > 0;
  };
  
  const isTimeSlotBooked = (date, time) => {
    const dateString = formatDateString(date);
    return bookedSlots.some(slot => slot.date === dateString && slot.time === time);
  };
  
  const renderSchedule = () => (
    <div className={styles.scheduleContainer}>
      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        className={`${styles.calendar} react-calendar`}
        tileClassName={({ date, view }) => 
          view === 'month' && isDateAvailable(date) ? styles.availableDate : null
        }
        navigationLabel={({ date, view, label }) => (
          <span style={{ fontSize: '24px', color: '#5B3D54', fontFamily: 'Roboto, sans-serif' }}>
            {label}
          </span>
        )}
      />
      {selectedDate && (
        <div className={styles.timeSlotSelector}>
          <h3 style={{ color: '#5B3D54' }}>Select available time slots for {formatDateString(selectedDate)}</h3>
          <div className={styles.timeSlots}>
            {timeSlots.map(time => {
              const isBooked = isTimeSlotBooked(selectedDate, time);
              const isAvailable = selectedTimes.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => !isBooked && handleTimeSlotToggle(time)}
                  className={`
                    ${styles.timeSlot}
                    ${isAvailable ? styles.selected : ''}
                    ${isBooked ? styles.booked : ''}
                  `}
                  disabled={isBooked}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}
                >
                  {time}
                </button>
              );
            })}
          </div>
          <button className={styles.saveButton} onClick={handleSaveAvailability}>
            Save Availability
          </button>
        </div>
      )}
    </div>
  );
  
  const renderSessions = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const upcomingSessions = sessions
      .filter(session => session.bookingDate >= currentDate)
      .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
  
    return (
      <div className={styles.sessionsTableContainer}>
        <table className={styles.sessionsTable}>
          <thead>
            <tr>
              <th>Athlete Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Zoom Meeting ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingSessions.map((session) => {
              const status = calculateStatus(session.bookingDate);
              return (
                <tr key={session._id}>
                  <td>{session.athleteName}</td>
                  <td>{session.bookingDate}</td>
                  <td>{session.startTime}</td>
                  <td>{session.zoomMeetingId}</td>
                  <td>
                    {status === 'Join' ? (
                      <button
                        className={styles.joinButton}
                        onClick={() => handleJoinSession(session.zoomJoinUrl)}
                      >
                        Join
                      </button>
                    ) : (
                      status
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className={styles.coachSessionsPage}>
      <div className={styles.logoColumn}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.sidebar}>
        <button
          className={`${styles.sidebarButton} ${activeButton === 'schedule' ? styles.active : ''}`}
          onClick={() => setActiveButton('schedule')}
        >
          <div className={styles.iconCircle}>
            <CalendarIcon size={16} />
          </div>
          Schedule
        </button>
        <button
          className={`${styles.sidebarButton} ${activeButton === 'mySessions' ? styles.active : ''}`}
          onClick={() => setActiveButton('mySessions')}
        >
          <div className={styles.iconCircle}>
            <BookOpen size={16} />
          </div>
          My Sessions
        </button>
        <button
          className={`${styles.sidebarButton} ${activeButton === 'myProfile' ? styles.active : ''}`}
          onClick={handleMyProfile}
        >
          <div className={styles.iconCircle}>
            <User size={16} />
          </div>
          My Profile
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.titleContainer}>
          <h2 className={styles.pageTitle}>
            {activeButton === 'schedule' ? 'Set Your Availability' : 'Upcoming Sessions'}
          </h2>
        </div>
        {activeButton === 'schedule' ? renderSchedule() : renderSessions()}
      </div>
    </div>
  );
}

export default CoachSessionsPage;