import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://abomariambackend.vercel.app/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});
// dev env https://abomariamvapestorebackend.onrender.com
// p]rod env https://abomariamb
// 8ackend.vercel.app/
export default axiosInstance;5
