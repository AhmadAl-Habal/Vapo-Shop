import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://abomariamvapestorebackend.onrender.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// dev env https://abomariamvapestorebackend.onrender.com
// prod env https://abomariambackend.vercel.app/
export default axiosInstance;
