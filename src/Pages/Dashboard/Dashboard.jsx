import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router";
import {
  FiUser,
  FiMail,
  FiPlusCircle,
  FiMessageSquare,
  FiLayers,
} from "react-icons/fi";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [plantCount, setPlantCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);

    useEffect(() => {
      fetch("http://localhost:3000/dashboard-stats")
        .then((res) => res.json())
        .then((data) => {
          setPlantCount(data.plants);
          setFeedbackCount(data.feedbacks);
        });
    }, []);
  

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#22702d] mb-10 text-center">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-600">
          <div className="flex items-center gap-4">
            <FiUser size={30} className="text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Logged-in User
              </h2>
              <p className="text-sm text-gray-500">{user?.displayName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-600">
          <div className="flex items-center gap-4">
            <FiLayers size={30} className="text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Plants
              </h2>
              <p className="text-3xl font-bold text-green-700">{plantCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-600">
          <div className="flex items-center gap-4">
            <FiMessageSquare size={30} className="text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Feedbacks</h2>
              <p className="text-3xl font-bold text-green-700">
                {feedbackCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/addplants"
          className="btn bg-[#22702d] hover:bg-[#1a5a25] text-white text-lg"
        >
          <FiPlusCircle className="mr-2" /> Add New Plant
        </Link>
        <Link
          to="/allplants"
          className="btn border-[#22702d] hover:bg-[#22702d] hover:text-white text-[#22702d] text-lg"
        >
          🌿 View All Plants
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
