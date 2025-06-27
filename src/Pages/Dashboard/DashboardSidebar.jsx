import React from "react";
import { Link, NavLink } from "react-router";
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiUser,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { TbPlant2 } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext"; 
import navLogo from "../../assets/logo.png";

const DashboardSidebar = ({ closeDrawer }) => {
  const { handleLogout } = useContext(AuthContext);

  const handleLinkClick = () => {
    if (closeDrawer) closeDrawer();
  };

    
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-[#22702d] text-white py-2.5 px-4 flex items-center gap-1 font-semibold"
      : "py-2.5 px-4 flex items-center gap-1 text-[#22702d] hover:bg-base-100 font-semibold";
  return (
    <aside className="w-full lg:w-64 py-5 bg-base-300 h-screen flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Drawer Close Button */}
        <div className="flex  justify-between items-start mb-4">
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              className="w-20 h-16 -mt-2"
              src={navLogo}
              alt="Plant Care Tracker"
            />
          </Link>
          <label
            htmlFor="my-drawer-2"
            onClick={closeDrawer}
            className=" text-green-700 mr-4 lg:hidden"
          >
            <FiX size={24} />
          </label>
        </div>

        <nav className="flex flex-col text-base">
          <NavLink
            to="/dashboard"
            onClick={handleLinkClick}
            className={navLinkStyle}
          >
            <FiHome className="inline-block mr-2" /> Overview
          </NavLink>

          <NavLink
            to="/addplants"
            onClick={handleLinkClick}
            className={navLinkStyle}
          >
            <FiPlusSquare className="inline-block mr-2" /> Add Plant
          </NavLink>

          <NavLink
            to="/allplants"
            onClick={handleLinkClick}
            className={navLinkStyle}
          >
            <FiList className="inline-block mr-2" /> All Plants
          </NavLink>

          <NavLink
            to="/myplants"
            onClick={handleLinkClick}
            className={navLinkStyle}
          >
            <TbPlant2 className="inline-block mr-2" /> My Plants
          </NavLink>

          <NavLink
            to="/profile"
            onClick={handleLinkClick}
            className={navLinkStyle}
          >
            <FiUser className="inline-block mr-2" /> Profile
          </NavLink>
        </nav>
      </div>

      <div className="border-t px-4 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-white bg-[#22702d] hover:bg-[#1a5a25] py-2 px-4 rounded-md"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
