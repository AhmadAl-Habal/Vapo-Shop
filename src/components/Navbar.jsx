import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  let linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  return (
    <nav className="bg-red-600 border-b border-red-500 p-2 flex md:justify-center items-center space-x-5">
      <img className="h-10 w-auto rounded-full" src={logo} alt="React Jobs" />
      <h1 className="font-bold text-lg">🔥VAPO 🔥ABO MARIAM 🔥</h1>
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
