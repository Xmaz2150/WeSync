import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/wesync';


export const login = (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};