import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import './BookingPage.css';
import { API_URL } from './api';
import logo from '../assets/logo.png';
import CoachSchedulingModal from './CoachSchedulingModal';
import VideoCall from './VideoCall';

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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    fetchCoaches();
    fetchAthleteBookings();

    const socket = io('http://localhost:5001');
    socket.on('callStarted', ({ sessionId }) => {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === sessionId ? { ...booking, callStarted: true } : booking
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${API_URL}/coaches`);
      setCoaches(response.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  const fetchAthleteBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/athletes/${athleteData._id}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching athlete bookings:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleMyCoachesClick = () => {
    setShowPrecisionMatch(false);
    setSelectedCoach(null);
    setShowBookings(false);
  };

  const handlePrecisionMatchClick = () => {
    const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
    setSelectedCoach(randomCoach);
    setShowPrecisionMatch(true);
  };

  const handleScheduleClick = (coach) => {
    setSelectedCoach(coach);
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleMyBookingsClick = () => {
    setShowPrecisionMatch(false);
    setSelectedCoach(null);
    setShowBookings(true);
  };

  const handleJoinCall = (booking) => {
    if (booking.callStarted) {
      setSelectedBooking(booking);
      setCallStarted(true);
    } else {
      alert("The coach hasn't started the call yet. Please wait for the coach to initiate the call.");
    }
  };

  return (
    <div className="booking-page">
      <div className="taskbar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="content">
        <div className="sidebar">
          <button className="my-coaches-button" onClick={handleMyCoachesClick}>
            My Coaches
          </button>
          <button className="my-bookings-button" onClick={handleMyBookingsClick}>My Bookings</button>
        </div>
        <div className="coach-list">
        {showBookings ? (
            <div className="booking-list">
              <h3>My Bookings</h3>
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-row">
                  <span className="coach-name">{booking.coachName}</span>
                  <span className="booking-date">{booking.bookingDate}</span>
                  <span className="booking-time">
                    {booking.startTime} - {booking.endTime}
                  </span>
                  <button
                    className="join-button"
                    onClick={() => handleJoinCall(booking)}
                    disabled={!booking.callStarted}
                  >
                    {booking.callStarted ? 'Join Call' : 'Waiting for Coach'}
                  </button>
                </div>
              ))}
            </div>
          ) : !showPrecisionMatch ? (
            <>
              <div className="precision-match-container">
                <button className="precision-match-button" onClick={handlePrecisionMatchClick}>
                  Precision match
                </button>
              </div>
              <Grid container spacing={2}>
                {coaches.map((coach) => (
                  <Grid item xs={12} sm={6} key={coach._id}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }} aria-label="coach">
                            {coach.fullName.charAt(0)}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={coach.fullName}
                        subheader={coach.expertise}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={coach.profileImage}
                        alt={coach.fullName}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Coaching: {coach.coaching}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age Group: {coach.ageGroup}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <button className="schedule-button" onClick={() => handleScheduleClick(coach)}>
                          Schedule
                        </button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <div className="precision-match-result">
              <Typography variant="h5" align="center" gutterBottom>
                Your Mindfulness Coach!
              </Typography>
              {selectedCoach && (
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="coach">
                        {selectedCoach.fullName.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={selectedCoach.fullName}
                    subheader={selectedCoach.expertise}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={selectedCoach.profileImage}
                    alt={selectedCoach.fullName}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Coaching: {selectedCoach.coaching}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Age Group: {selectedCoach.ageGroup}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <button className="schedule-button" onClick={() => handleScheduleClick(selectedCoach)}>
                      Schedule
                    </button>
                  </CardActions>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
      {showScheduleModal && (
        <CoachSchedulingModal
          coach={selectedCoach}
          onClose={handleCloseScheduleModal}
          athleteData={athleteData}
        />
      )}
      {selectedBooking && callStarted && (
        <VideoCall
          sessionId={selectedBooking._id}
          isCoach={false}
        />
      )}
    </div>
  );
}

export default BookingPage;