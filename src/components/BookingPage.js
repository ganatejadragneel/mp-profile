import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [channelId, setChannelId] = useState('');
  const [activeButton, setActiveButton] = useState('myCoaches');

  useEffect(() => {
    fetchCoaches();
    fetchAthleteBookings();
  });

  const fetchCoaches = async () => {
    try {
        const response = await axios.get(`${API_URL}/coaches`);
        setCoaches(response.data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  const handleJoinCall = () => {
    if (channelId) {
      window.open(`http://localhost:4321/channel/${channelId}`, '_blank');
      //window.location.href = `http://localhost:4321/channel/${channelId}`;
    } else {
      alert('Please enter a valid channel ID');
    }
  };

  const handleMyProfile = () => {
    setActiveButton('myProfile');
    navigate('/data-summary', { state: { athleteData } });
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
    setActiveButton('myCoaches');
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
    setActiveButton('myBookings');
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
          <button className="my-bookings-button" onClick={handleMyBookingsClick}>
            My Bookings
          </button>
          <button className="my-profile-button" onClick={handleMyProfile}>
            My Profile
          </button>
        </div>
        <div className="main-content">
        {showBookings ? (
          <>
            <div className="channel-input">
              <input
                type="text"
                placeholder="Enter channel ID"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
              <button onClick={handleJoinCall}>Join Call</button>
            </div>
            <div className="booking-list">
              <div className="booking-header">
                <div className="header-item">Coach Name</div>
                <div className="header-item">Date</div>
                <div className="header-item">Time</div>
                <div className="header-item">Channel ID</div>
              </div>
              {bookings.map((booking) => (
                  <div key={booking._id} className="booking-row">
                  <div className="booking-item" data-label="Coach Name">{booking.coachName}</div>
                  <div className="booking-item" data-label="Date">{booking.bookingDate}</div>
                  <div className="booking-item" data-label="Time">{booking.startTime} - {booking.endTime}</div>
                  <div className="booking-item" data-label="Channel ID">{booking.channelId}</div>
                </div>
              ))}
            </div>
          </>
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
    </div>
  );
}

export default BookingPage;
