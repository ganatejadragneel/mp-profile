import axios from 'axios';

export const API_URL = 'http://localhost:5001/api';

export const saveAthleteData = (athleteData) => {
  return axios.post(`${API_URL}/athletes`, athleteData);
};

export const loginStudent = (loginData) => {
  return axios.post(`${API_URL}/athletes/login`, loginData);
};

export const saveCoachData = (coachData) => {
  return axios.post(`${API_URL}/coaches`, coachData);
};

export const loginCoach = (loginData) => {
  return axios.post(`${API_URL}/coaches/login`, loginData);
};