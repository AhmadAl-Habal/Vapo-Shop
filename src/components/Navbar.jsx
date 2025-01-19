import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <>
      {/* Navbar */}
      <nav className="bg-red-600 border-b border-red-500 p-1 flex justify-between items-center">
        {/* Logo */}
        {/* Hamburger Menu */}
        <div className="flex">
          {" "}
          <button
            className="text-3xl focus:outline-none  mr-5"
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
              <Link to={"/about-us"}>🔥VAPO ABO MARIAM</Link>
            </p>
          </div>
        </div>

        {/* User Links */}
        <div className="flex">
          {token ? (
            <p className=" text-xs">
              <span className="text-yellow-400 mr-5">
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

      {/* Sidebar */}
      <div
        dir="rtl"
        className={`fixed z-10 top-0 left-0 h-screen w-9/12 max-w-sm bg-red-800 text-white transform transition-transform opacity-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-xl absolute top-4 left-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        <div className="mt-10 space-y-4 px-4">
          <Link
            to="/"
            className="block text-lg font-medium hover:text-gray-300"
            onClick={toggleSidebar}
          >
            الصفحة الرئيسية
          </Link>
          <Link
            to="/about-us"
            className="block text-lg font-medium hover:text-gray-300"
            onClick={toggleSidebar}
          >
            عن Vapo
          </Link>
          <Link
            to="/faq"
            className="block text-lg font-medium hover:text-gray-300"
            onClick={toggleSidebar}
          >
            الأسئلة الشائعة
          </Link>
         
         {token &&    <Link
            to="/settings"
            className="block text-lg font-medium hover:text-gray-300"
            onClick={toggleSidebar}
          >
            Settings
          </Link>}
       
        </div>
      </div>
    </>
  );
};

export default Navbar;
