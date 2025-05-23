import React, { useContext, useEffect, useState } from "react";
import navLogo from "../../assets/logo.png";
import "../../../src/App.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { RiMenuAddFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { LuLogOut } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
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
        className="text-lg font font-semibold hover:text-[#22702d]  "
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="text-lg font font-semibold hover:text-[#22702d]  "
        to="/allplants"
      >
        All Plants
      </NavLink>
      <NavLink
        className="text-lg font font-semibold hover:text-[#22702d] "
        to="/addplants"
      >
        Add Plant
      </NavLink>
      <NavLink
        className="text-lg font font-semibold hover:text-[#22702d] "
        to="/myplants"
      >
        My Plants
      </NavLink>
    </>
  );
  return (
    <div className="w-full  2xl:w-10/12 mx-auto px-4 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-0">
      <div className="navbar bg-[#77eeb5] mt-4 rounded-md indent-1 shadow-green-300 px-5 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className=" lg:hidden  text-gray-800"
            >
              <RiMenuAddFill size={25} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 space-y-4 shadow-[0_0_5px_#22702d] top-14 -left-5"
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
            <span className="text-2xl font-bold text-[#22702d] -ml-3 hidden sm:block">
              CareTracker
            </span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6  text-gray-800">
            {navlinks}
          </ul>
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
          {user ? (
            <div className="dropdown dropdown-end ml-4">
              <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    referrerPolicy="no-referrer"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>
              <Tooltip
                id="my-tooltip"
                place="bottom-end"
                style={{ zIndex: 9999 }}
                delayShow={500}
              />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-4 shadow space-y-4"
              >
                <h2 className="text-xl font-semibold">
                  Name: {user?.displayName}
                </h2>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm w-full bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white text-base"
                >
                  <LuLogOut />
                  Log Out
                </button>
              </ul>
            </div>
          ) : (
            <div className="flex">
              <Link
                className="btn btn-sm sm:btn-md bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white text-base ml-4"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-sm sm:btn-md bg-[#22702d] hover:bg-[#22777d] border-none shadow-none font-semibold text-white text-base ml-4 hidden sm:flex"
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
