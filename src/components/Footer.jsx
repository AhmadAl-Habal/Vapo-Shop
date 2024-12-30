import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Footer = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <footer className="bg-red-600 border-b border-red-500 p-1 flex justify-between items-center">
      <div className="w-full flex justify-between items-center space-x-2">
        <div className="flex justify-between items-center space-x-2">
          {" "}
          <img
            className="h-[30px] w-[30px]  w-auto rounded-full cursor-pointer"
            src={logo}
            alt="React Jobs"
          />{" "}
          <p className="font-bold text-xs">
            VAPO ABO MARIAM <br /> 099999999{" "}
          </p>
        </div>
        <div className="flex justify-between items-center ml-auto">
          {" "}
          <p className="font-bold text-xs">
            2024 All rights reserved © <br />
            Made with ❤ in Syria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
