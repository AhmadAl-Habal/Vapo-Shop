import axios from 'axios';
// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.PROD_DATABASE_URL
//     : process.env.DEV_DATABASE_URL;

    const baseURL = import.meta.env.VITE_DATABASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
// dev env https://abomariamvapestorebackend.onrender.com
// prod env https://abomariambackend.vercel.app/
export default axiosInstance;