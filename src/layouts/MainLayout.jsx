import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api/axios";
import WarnningMessage from "../components/WarnningMessage";
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
      <Navbar />
      <div
        className="min-h-screen bg-fixed bg-cover bg-center"
        // style={{ backgroundImage: "url('/your-background-image.jpg')" }}
      >
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
