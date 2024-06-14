import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { API_URL } from './api';
import { format, addMinutes } from 'date-fns';

function CoachSchedulingModal({ coach, onClose, athleteData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setSelectedStartTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique Google Meet link
      const googleMeetLink = `https://meet.google.com/your-unique-link`;
  
      // Get the booking timestamp
      const bookingTimestamp = new Date().toISOString();
  
      // Calculate the end time as 30 minutes after the start time
      const endTime = format(addMinutes(new Date(`2000-01-01T${selectedStartTime}`), 30), 'HH:mm');
  
      // Update the athlete's data
      const updatedAthleteData = {
        ...athleteData,
        bookings: [
          ...(athleteData?.bookings || []), // Add null check here
          {
            coachId: coach._id,
            coachName: coach.fullName,
            coachEmail: coach.email,
            googleMeetLink,
            bookingTimestamp,
            bookingDate: format(selectedDate, 'yyyy-MM-dd'),
            startTime: selectedStartTime,
            endTime,
          },
        ],
      };
      console.log(coach)
      console.log(athleteData)
  
      await axios.put(`${API_URL}/athletes/${athleteData._id}`, updatedAthleteData);
  
      // Update the coach's data
      const updatedCoachData = {
        ...coach,
        bookings: [
          ...(coach?.bookings || []), // Add null check here
          {
            athleteId: athleteData._id,
            googleMeetLink,
            bookingTimestamp,
            bookingDate: format(selectedDate, 'yyyy-MM-dd'),
            startTime: selectedStartTime,
            endTime,
          },
        ],
      };
  
      await axios.put(`${API_URL}/coaches/${coach._id}`, updatedCoachData);
  
      // Close the modal after successful scheduling
      onClose();
    } catch (error) {
      console.error('Error scheduling coach:', error);
      // Handle the error, show an error message, or take appropriate action
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Schedule Coach</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Coach Name:</label>
            <span>{coach.fullName}</span>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <select value={selectedStartTime} onChange={handleStartTimeChange}>
              <option value="">Select Start Time</option>
              {generateTimeOptions('10:00', '17:00', 30)}
            </select>
          </div>
          <button type="submit" disabled={!selectedDate || !selectedStartTime}>
            Schedule
          </button>
        </form>
      </div>
    </div>
  );
}

// Helper function to generate time options
function generateTimeOptions(start, end, interval) {
  const options = [];
  let currentTime = new Date(`2000-01-01T${start}`);
  const endTime = new Date(`2000-01-01T${end}`);

  while (currentTime <= endTime) {
    const timeString = format(currentTime, 'HH:mm');
    options.push(
      <option key={timeString} value={timeString}>
        {timeString}
      </option>
    );
    currentTime = addMinutes(currentTime, interval);
  }

  return options;
}

export default CoachSchedulingModal;