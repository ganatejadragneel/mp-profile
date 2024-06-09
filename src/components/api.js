import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const saveAthleteData = (athleteData) => {
  return axios.post(`${API_URL}/athletes`, athleteData);
};

export const loginStudent = (loginData) => {
  return axios.post(`${API_URL}/athletes/login`, loginData);
};