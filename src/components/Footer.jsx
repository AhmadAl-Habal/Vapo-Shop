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
  let linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  return (
    <footer className="bg-red-600 border-b border-red-500 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {" "}
        <img
          className="h-10 w-auto rounded-full cursor-pointer"
          src={logo}
          alt="React Jobs"
        />
        <p className="font-bold text-xs">🔥VAPO ABO MARIAM </p>
      </div>
      <p>
        {token ? (
          <p className=" text-xs">
            <span className="text-yellow-400 mr-5"> Admin mode! </span>
            <button
              className="font-bold text-black border border-2 border-black p-1 rounded-full"
              onClick={logout}
            >
              Logout
            </button>
          </p>
        ) : (
          <p className="font-bold text-xs text-black border border-2 border-black p-1 rounded-full">
            <Link to={"/login"}>Login</Link>
          </p>
        )}
      </p>
    </footer>
  );
};

export default Footer;