import React, { useContext} from "react";
import navLogo from "../../assets/logo.png";
import "../../../src/App.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { RiMenuAddFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { LuLogOut } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

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
        to="/contact"
      >
        Contact
      </NavLink>
      <NavLink
        className="text-lg font font-semibold hover:text-[#22702d] "
        to="/about"
      >
        About Us
      </NavLink>
      {user && (
        <NavLink
          className="text-lg font font-semibold hover:text-[#22702d] "
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );
  return (
    <div className="w-full  bg-[#77eeb5] indent-1 shadow-green-300 ">
      <div className="navbar px-4 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-0 2xl:w-10/12 mx-auto">
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
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              className="w-20 h-16 -mt-2"
              src={navLogo}
              alt="Plant Care Tracker"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6  text-gray-800">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeToggleBtn />
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
