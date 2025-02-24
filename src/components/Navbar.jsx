import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  // useEffect(() => {

  // }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-red-600 border-b border-red-500 p-1 flex justify-between items-center">
        <div className="flex">
          <button
            className="text-3xl focus:outline-none mr-3"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="h-[30px] w-[30px] rounded-full cursor-pointer"
              src={logo}
              alt="React Jobs"
            />
            <p className="font-bold text-xs">
              <Link to={"/"}>VAPO ABO MARIAM</Link>
            </p>
          </div>
        </div>

        <div className="flex">
          {token ? (
            <p className="text-xs">
              <span className="text-yellow-400 mr-3">
                <Link to={"/settings"}> Admin mode!</Link>
              </span>
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
        </div>
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        token={token}
      />
    </>
  );
};

export default Navbar;
