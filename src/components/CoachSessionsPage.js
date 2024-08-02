import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchCoachSessions();
    fetchAvailability();
  }, [coachData._id]);

  const fetchCoachSessions = async () => {
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
  };

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches/${coachData._id}/availability`);
      setAvailability(response.data.availableTimings || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

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

  const handleJoinSession = (channelId) => {
    window.open(`http://localhost:4321/channel/${channelId}`, '_blank');
  };

  const handleDateClick = (date) => {
    const selectedDate = new Date(date);
    const dateString = selectedDate.toISOString().split('T')[0];
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
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Error saving availability. Please try again.');
    }
  };

  const isDateAvailable = (date) => {
    const dateString = formatDateString(date);
    return availability.some(a => a.date === dateString);
  };

  const isTimeSlotBooked = (date, time) => {
    const dateString = formatDateString(date);
    return bookedSlots.some(slot => slot.date === dateString && slot.time === time);
  };

  const renderSessions = () => (
    <div className={styles.sessionsTableContainer}>
      <table className={styles.sessionsTable}>
        <thead>
          <tr>
            <th>Athlete Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Channel ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const status = calculateStatus(session.bookingDate);
            return (
              <tr key={session._id}>
                <td>{session.athleteName}</td>
                <td>{session.bookingDate}</td>
                <td>{session.startTime}</td>
                <td>{session.channelId}</td>
                <td>
                  {status === 'Join' ? (
                    <button
                      className={styles.joinButton}
                      onClick={() => handleJoinSession(session.channelId)}
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

  const renderSchedule = () => (
    <div className={styles.scheduleContainer}>
      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        className={styles.calendar}
        tileClassName={({ date }) => 
          isDateAvailable(date) ? styles.availableDate : null
        }
      />
      {selectedDate && (
        <div className={styles.timeSlotSelector}>
          <h3>Select available time slots for {formatDateString(selectedDate)}</h3>
          <div className={styles.timeSlots}>
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSlotToggle(time)}
                className={`
                  ${styles.timeSlot}
                  ${selectedTimes.includes(time) ? styles.selected : ''}
                  ${isTimeSlotBooked(selectedDate, time) ? styles.booked : ''}
                `}
                disabled={isTimeSlotBooked(selectedDate, time)}
              >
                {time}
              </button>
            ))}
          </div>
          <button className={styles.saveButton} onClick={handleSaveAvailability}>
            Save Availability
          </button>
        </div>
      )}
    </div>
  );

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