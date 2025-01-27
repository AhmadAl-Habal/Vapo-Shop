import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api/axios";
const MainLayout = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");

        if (response.status === 200) {
          const settingsData = response.data.data[0];

          sessionStorage.setItem("dollar_value", settingsData.dollar_price);
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
