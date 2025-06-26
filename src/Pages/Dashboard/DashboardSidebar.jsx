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
        <div className="lg:hidden flex justify-end mb-4">
          <button onClick={closeDrawer} className="text-green-700">
            <FiX size={24} />
          </button>
        </div>

        <Link to='/'>
          <h2 className="text-2xl font-bold text-[#22702d] mb-6 text-center">
            Dashboard
          </h2>
        </Link>
        <nav className="flex flex-col">
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

      <div className="mt-6 border-t pt-4">
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
