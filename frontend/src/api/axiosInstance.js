// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  // Additional configurations can be added here
});

export default axiosInstance;