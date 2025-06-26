import React, { useState } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../../Pages/Dashboard/DashboardSidebar";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
      <div className="min-h-screen lg:flex">
        {/* Drawer Toggle Button for Small Devices */}
        <div className="bg-[#22702d] text-white p-4 lg:hidden flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <FiMenu size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardSidebar closeDrawer={() => setIsDrawerOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 mt-4 lg:mt-0">
          <Outlet />
        </main>
      </div>
    );
};

export default DashboardLayout;
