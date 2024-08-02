import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { API_URL } from './api';
import { format, addMinutes, parseISO, addDays } from 'date-fns';
import { generateChannelId } from '../utils';
import styles from './CoachSchedulingModal.module.css';

function CoachSchedulingModal({ coach, onClose, athleteData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [coachAvailability, setCoachAvailability] = useState([]);

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  useEffect(() => {
    fetchCoachAvailability();
  }, [coach._id]);

  const fetchCoachAvailability = async () => {
    try {

      const response = await axios.get(`${API_URL}/coaches/${coach._id}/availability`);

      setCoachAvailability(response.data.availableTimings);
    } catch (error) {
      console.error('Error fetching coach availability:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedStartTime('');
  };

  const handleStartTimeChange = (e) => {
    setSelectedStartTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const channelId = generateChannelId();
      const bookingTimestamp = new Date().toISOString();
      const endTime = format(addMinutes(new Date(`2000-01-01T${selectedStartTime}`), 30), 'HH:mm');

      const updatedAthleteData = {
        ...athleteData,
        bookings: [
          ...(athleteData.bookings || []),
          {
            coachId: coach._id,
            coachName: coach.fullName,
            coachEmail: coach.email,
            channelId,
            bookingTimestamp,
            bookingDate: format(selectedDate, 'yyyy-MM-dd'),
            startTime: selectedStartTime,
            endTime,
          },
        ],
      };

      await axios.put(`${API_URL}/athletes/${athleteData._id}`, updatedAthleteData);

      const updatedCoachData = {
        ...coach,
        bookings: [
          ...(coach.bookings || []),
          {
            athleteId: athleteData._id,
            athleteName: athleteData.fullName,
            channelId,
            bookingTimestamp,
            bookingDate: format(selectedDate, 'yyyy-MM-dd'),
            startTime: selectedStartTime,
            endTime,
          },
        ],
      };

      await axios.put(`${API_URL}/coaches/${coach._id}`, updatedCoachData);

      onClose();
    } catch (error) {
      console.error('Error scheduling coach:', error);
    }
  };

  // Convert date strings to Date objects, adding one day to correct the offset
  const availableDates = coachAvailability.map(a => parseISO(a.date));

  const availableTimes = selectedDate
  ? (coachAvailability.find(a => format(parseISO(a.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))?.times || [])
  : [];

  const filteredTimeSlots = timeSlots.filter(time => availableTimes.includes(time))

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Schedule Coach</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Coach Name:</label>
            <span className={styles.formValue}>{coach.fullName}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              includeDates={availableDates}
              highlightDates={availableDates}
              placeholderText="Select a date"
              className={styles.datePicker}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Start Time:</label>
            <select value={selectedStartTime} onChange={handleStartTimeChange} className={styles.timeSelect}>
              <option value="">Select Start Time</option>
              {filteredTimeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={!selectedDate || !selectedStartTime} className={styles.scheduleButton}>
              Schedule
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CoachSchedulingModal;