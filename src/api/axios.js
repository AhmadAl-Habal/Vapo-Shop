import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://abomariamvapestorebackend.onrender.com',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;