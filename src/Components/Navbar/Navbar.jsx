import React, { useContext, useEffect, useState } from "react";
import navLogo from "../../assets/logo.png";
import "../../../src/App.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { RiMenuAddFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  if (localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "light");
  }
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const handleToggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const navlinks = (
    <>
      <NavLink
        className="text-lg font font-semibold text-gray-800 hover:text-[#22702d]  "
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="text-lg font font-semibold text-gray-800 hover:text-[#22702d]  "
        to="/allplants"
      >
        All Plants
      </NavLink>
      <NavLink
        className="text-lg font font-semibold text-gray-800 hover:text-[#22702d] "
        to="/addplants"
      >
        Add Plant
      </NavLink>
      <NavLink
        className="text-lg font font-semibold text-gray-800 hover:text-[#22702d] "
        to="/myplants"
      >
        My Plants
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-[#77eeb5] drop-shadow-2xl w-full mt-4 rounded-md indent-1 shadow-green-300 px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RiMenuAddFill />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-4"
          >
            {navlinks}
          </ul>
        </div>
        <div className="flex items-center">
          <img
            className="w-20 h-16 -mt-2"
            src={navLogo}
            alt="Plant Care Tracker"
          />
          <span className="text-2xl font-bold text-[#22702d] -ml-3">
            CareTracker
          </span>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <label className="toggle text-base-content border border-black">
          <input
            type="checkbox"
            value="synthwave"
            onChange={handleToggleTheme}
            checked={theme === "light" ? false : true}
            className="theme-controller"
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
        <button className="btn bg-[#22702d] border-none shadow-none font-semibold text-white ml-4">
          <Link to="/login">Login</Link>
        </button>
        <button className="btn bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white ml-4">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
