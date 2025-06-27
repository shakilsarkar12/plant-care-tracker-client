import React from "react";
import { Link, Outlet } from "react-router";
import DashboardSidebar from "../../Pages/Dashboard/DashboardSidebar";
import { FiMenu, FiX } from "react-icons/fi";
import Footer from "../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full">
        {/* Page content here */}
        <div className="bg-[#22702d] px-4 py-2 w-full flex items-center justify-between lg:hidden">
          <Link to="/" className="text-2xl font-bold text-white">
            Dashboard
          </Link>
          <label htmlFor="my-drawer-2" className="text-white">
            <FiMenu size={24} />
          </label>
        </div>
        <div className="p-4 md:p-6 lg:px-12">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-screen w-64 p-0">
          <DashboardSidebar />
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
