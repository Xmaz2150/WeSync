import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/wesync';
const API_P_BASE_URL = 'http://localhost:5000/social';

export const login = (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const register = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const getProfile = (token) => {
  return axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};

export const getUserProfile = (token, userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};