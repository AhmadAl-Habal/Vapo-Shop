import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
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
    <nav className="bg-red-600 border-b border-red-500 p-2 flex justify-between items-center">
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

      {/* <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
        
            <a
              className="flex flex-shrink-0 items-center mr-4"
              to="/index.html"
            >
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
