import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  const [token, setToken] = useState("");
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      const storedToken = localStorage.getItem("token");
      const storedSettings = sessionStorage.getItem("settings");

      if (storedSettings) {
        const settingsObject = JSON.parse(storedSettings);
        setSettings(settingsObject);
      }

      setToken(storedToken || "");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!settings) {
    return <p>Loading settings...</p>;
  }
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {" "}
      <footer className="bg-red-800 p-1 flex justify-between items-center">
        <div className="w-full flex justify-between items-center space-x-2">
          <div className="flex justify-between items-center space-x-2">
            <img
              className="h-[30px] w-[30px]  w-auto rounded-full cursor-pointer mr-1"
              src={logo}
            />
            <ul className="flex gap-1 xs:gap-4 flex-wrap">
              {settings.social_media?.facebook && (
                <li>
                  <a
                    href={settings.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
                  >
                    <FaFacebook />
                    <span className="hidden md:block">Facebook</span>
                  </a>
                </li>
              )}

              {settings.social_media?.instagram && (
                <li>
                  <a
                    href={settings.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-pink-500 transition-colors"
                  >
                    <FaInstagram />
                    <span className="hidden md:block">Instagram</span>
                  </a>
                </li>
              )}

              {settings.social_media?.telegram && (
                <li>
                  <a
                    href={settings.social_media.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                  >
                    <FaTelegram />
                    <span className="hidden md:block">Telegram</span>
                  </a>
                </li>
              )}

              {settings.social_media?.whatsapp_channel && (
                <li>
                  <a
                    href={settings.social_media.whatsapp_channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                  >
                    <FaWhatsapp />
                    <span className="hidden md:block">WhatsApp</span>
                  </a>
                </li>
              )}

              {settings.social_media?.youtube && (
                <li>
                  <a
                    href={settings.social_media.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
                  >
                    <FaYoutube />
                    <span className="hidden md:block">YouTube</span>
                  </a>
                </li>
              )}
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
    </div>
  );
};

export default Footer;
