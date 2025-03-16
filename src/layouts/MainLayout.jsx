import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api/axios";
import WarnningMessage from "../components/WarnningMessage";
import hero from "../assets/motion11.jpg";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");

        if (response.status === 200) {
          const settingsData = response.data.data[0];

          sessionStorage.setItem("dollar_value", settingsData.dollar_price);
          sessionStorage.setItem("settings", JSON.stringify(settingsData));
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {location.pathname === "/" && <WarnningMessage />}

      <div className="relative min-h-[100vh]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10"></div>

        <Navbar />

        {/* Main Content Area */}
        <div className="flex-grow relative z-20">
          <Outlet /> {/* This is where your pages will be rendered */}
        </div>

        <Footer />
      </div>

      <ToastContainer />
    </>
  );
};

export default MainLayout;
