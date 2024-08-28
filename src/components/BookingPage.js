import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';
import logo from '../assets/logo.png';
import CoachSchedulingModal from './CoachSchedulingModal';
import styles from './BookingPage.module.css';
import { Star, Calendar, User, Heart } from 'lucide-react';

function BookingPage() {
  const location = useLocation();
  const athleteData = location.state?.athleteData || {};
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [showPrecisionMatch, setShowPrecisionMatch] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [activeButton, setActiveButton] = useState('myCoaches');

  const fetchCoaches = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches`);
      setCoaches(response.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  }, []);

  const fetchAthleteBookings = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/athletes/${athleteData._id}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching athlete bookings:', error);
    }
  }, [athleteData._id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCoaches();
    fetchAthleteBookings();
  }, [fetchCoaches, fetchAthleteBookings]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleMyCoachesClick = () => {
    setShowPrecisionMatch(false);
    setSelectedCoach(null);
    setShowBookings(false);
    setActiveButton('myCoaches');
  };

  const handleMyBookingsClick = () => {
    setShowPrecisionMatch(false);
    setSelectedCoach(null);
    setShowBookings(true);
    setActiveButton('myBookings');
  };

  const handleMyProfile = () => {
    setActiveButton('myProfile');
    navigate('/data-summary', { state: { athleteData } });
  };

  const handleScheduleClick = (coach) => {
    setSelectedCoach(coach);
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handlePrecisionMatchClick = () => {
    const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
    setSelectedCoach(randomCoach);
    setShowPrecisionMatch(true);
  };

  const calculateStatus = (bookingDate) => {
    const today = new Date();
    const bookingDay = new Date(bookingDate);
    const diffTime = bookingDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Join';
    } else if (diffDays > 0) {
      return `${diffDays} Days Left`;
    } else {
      return 'Past';
    }
  };

  const handleJoinMeeting = (zoomJoinUrl) => {
    window.open(zoomJoinUrl, '_blank');
  };

  const renderCoaches = () => (
    <div className={styles.coachList}>
      {(showPrecisionMatch ? [selectedCoach] : coaches).map((coach) => (
        <div key={coach._id} className={styles.coachCard}>
          <div className={styles.coachCardHeader}>
            <div className={styles.coachAvatarContainer}>
              <img src={coach.profileImage} alt={coach.fullName} className={styles.coachAvatar} />
            </div>
            <div className={styles.coachInfo}>
              <h3 className={styles.coachName}>{coach.fullName}</h3>
              <p className={styles.coachDetails}>
                <span className={styles.coachLabel}>Coaching:</span> {coach.coaching} years
              </p>
              <p className={styles.coachDetails}>
                <span className={styles.coachLabel}>Age Group:</span> {coach.ageGroup}
              </p>
            </div>
            <button className={styles.heartButton}>
              <Heart size={24} />
            </button>
          </div>
          <div className={styles.coachActions}>
            <button className={styles.learnMoreButton}>Learn More</button>
            <button className={styles.scheduleButton} onClick={() => handleScheduleClick(coach)}>
              Schedule
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookings = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const upcomingBookings = bookings
      .filter(booking => booking.bookingDate >= currentDate)
      .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
  
    return (
      <div className={styles.bookingsTableContainer}>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Coach Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Zoom Meeting ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingBookings.map((booking) => {
              const status = calculateStatus(booking.bookingDate);
              return (
                <tr key={booking._id}>
                  <td>{booking.coachName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{`${booking.startTime} - ${booking.endTime}`}</td>
                  <td>{booking.zoomMeetingId}</td>
                  <td>
                    {status === 'Join' ? (
                      <button
                        className={styles.joinButton}
                        onClick={() => handleJoinMeeting(booking.zoomJoinUrl)}
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
    <div className={styles.bookingPage}>
      <div className={styles.logoColumn}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.sidebar}>
        <button
          className={`${styles.sidebarButton} ${activeButton === 'myCoaches' ? styles.active : ''}`}
          onClick={handleMyCoachesClick}
        >
          <div className={styles.iconCircle}>
            <Star size={16} />
          </div>
          My Coaches
        </button>
        <button
          className={`${styles.sidebarButton} ${activeButton === 'myBookings' ? styles.active : ''}`}
          onClick={handleMyBookingsClick}
        >
          <div className={styles.iconCircle}>
            <Calendar size={16} />
          </div>
          My Bookings
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
          <h2 className={styles.pageTitle}>{showBookings ? 'My Bookings' : 'My Coaches'}</h2>
        </div>
        {!showBookings && (
          <div className={styles.precisionMatchContainer}>
            <button className={styles.precisionMatchButton} onClick={handlePrecisionMatchClick}>
              Precision Match
            </button>
          </div>
        )}
        {showBookings ? renderBookings() : renderCoaches()}
      </div>
      {showScheduleModal && (
        <CoachSchedulingModal
          coach={selectedCoach}
          onClose={handleCloseScheduleModal}
          athleteData={athleteData}
        />
      )}
    </div>
  );
}

export default BookingPage;