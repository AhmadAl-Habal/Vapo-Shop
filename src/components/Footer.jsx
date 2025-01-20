import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  const [token, setToken] = useState("");
  const [settings, setSettings] = useState({});
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedSettings = sessionStorage.getItem("settings");

    if (storedSettings) {
      const settingsObject = JSON.parse(storedSettings);

      setSettings(settingsObject);
    }
    setToken(storedToken || "");
  }, []);
  if (!settings) {
    return <p>Loading settings...</p>;
  }
  return (
    <footer className="bg-red-600 border-b border-red-500 p-1 flex justify-between items-center">
      <div className="w-full flex justify-between items-center space-x-2">
        <div className="flex justify-between items-center space-x-2">
          {" "}
          <img
            className="h-[30px] w-[30px]  w-auto rounded-full cursor-pointer mr-5"
            src={logo}
            alt="React Jobs"
          />{" "}
          <ul className="flex gap-4">
            <li>
              <a
                href={settings.social_media?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
              >
                <FaFacebook />
                <span className="hidden sm:block">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={settings.social_media?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
                <span className="hidden sm:block">Instagram</span>
              </a>
            </li>
            <li>
              <a
                //  href={settings.social_media?.telegram || "#"}
                href={"https://telegram.org" || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                <FaTelegram />
                <span className="hidden sm:block">Telegram</span>
              </a>
            </li>
            <li>
              <a
                href={settings.social_media?.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
              >
                <FaYoutube />
                <span className="hidden sm:block">YouTube</span>
              </a>
            </li>
          </ul>
          {/* <p className="font-bold text-xs">
            VAPO ABO MARIAM <br />
            <a href="https://wa.link/z0mvhm">099999999</a>{" "}
          </p> */}
        </div>
        <div className="flex justify-between items-center ml-auto">
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
