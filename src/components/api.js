import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const saveAthleteData = (athleteData) => {
  return axios.post(`${API_URL}/athletes`, athleteData);
};