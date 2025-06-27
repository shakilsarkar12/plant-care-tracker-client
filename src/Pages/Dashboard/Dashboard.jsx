import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router";
import {
  FiUser,
  FiPlusCircle,
  FiMessageSquare,
  FiLayers,
  FiAlertCircle,
  FiDroplet,
  FiClock,
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [plantCount, setPlantCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [plants, setPlants] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("https://plant-care-tracker-server-black.vercel.app/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setPlantCount(data.plants);
        setFeedbackCount(data.feedbacks);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://plant-care-tracker-server-black.vercel.app/myplants/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        generateAlerts(data);
      });
  }, [user]);

  const generateAlerts = (plants) => {
    const today = new Date();
    let newAlerts = [];

    plants.forEach((plant) => {
      const nextWaterDate = new Date(plant.nextWateringDate);
      const lastWaterDate = new Date(plant.lastWateredDate);
      const daysSinceWatered = (today - lastWaterDate) / (1000 * 60 * 60 * 24);
      const daysToNextWater = (nextWaterDate - today) / (1000 * 60 * 60 * 24);

      if (plant.healthStatus !== "healthy") {
        newAlerts.push(`⚠️ Your plant "${plant.name}" looks unhealthy.`);
      }
      if (daysToNextWater < 0) {
        newAlerts.push(`💧 You missed watering "${plant.name}".`);
      } else if (daysToNextWater <= 2) {
        newAlerts.push(
          `💧 Water "${plant.name}" within ${Math.ceil(
            daysToNextWater
          )} day(s).`
        );
      }
    });

    setAlerts(newAlerts);
  };

  const healthyCount = plants.filter(
    (p) => p.healthStatus === "healthy"
  ).length;
  const unhealthyCount = plants.length - healthyCount;

  const upcomingPlants = plants.filter((plant) => {
    const nextWater = new Date(plant.nextWateringDate);
    const today = new Date();
    const diffDays = (nextWater - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3;
  });

  const recentlyAdded = [...plants]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4  py-14">
      <h1 className="text-4xl font-extrabold text-green-800 mb-14 text-center drop-shadow-md">
        🌿 Plant Care Tracker Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {/* User Info */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300">
          <FiUser size={36} className="text-green-700" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Logged-in User
            </h2>
            <p className="text-gray-600 text-base">
              {user?.displayName || "No Name"}
            </p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Total Plants */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300">
          <FiLayers size={36} className="text-green-700" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Total Plants
            </h2>
            <p className="text-4xl font-bold text-green-700">{plantCount}</p>
          </div>
        </div>

        {/* Feedbacks */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300">
          <FiMessageSquare size={36} className="text-green-700" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Feedbacks</h2>
            <p className="text-4xl font-bold text-green-700">{feedbackCount}</p>
          </div>
        </div>
      </div>

      {/* Plant Health Summary */}
      <section className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 mb-14 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          🌱 Plant Health Summary
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-lg text-gray-700">
            Healthy Plants:{" "}
            <span className="font-bold text-green-600">{healthyCount}</span>
          </p>
          <p className="text-lg text-gray-700">
            Unhealthy Plants:{" "}
            <span className="font-bold text-red-600">{unhealthyCount}</span>
          </p>
          <div className="w-full sm:w-1/3 bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="bg-green-600 h-6 transition-all duration-500"
              style={{
                width:
                  plants.length === 0
                    ? "0%"
                    : `${(healthyCount / plants.length) * 100}%`,
              }}
              aria-label="Percentage of healthy plants"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Watering Reminders */}
      <section className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 mb-14 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
          <FiDroplet className="text-green-600" size={26} />
          Upcoming Watering Reminders
        </h3>
        {upcomingPlants.length === 0 ? (
          <p className="text-gray-600">No plants need watering soon.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {upcomingPlants.map((plant) => (
              <li
                key={plant._id}
                className="hover:bg-green-50 rounded px-2 py-1 transition"
              >
                <span className="font-semibold">{plant.name}</span> - Water by{" "}
                {new Date(plant.nextWateringDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recently Added Plants */}
      <section className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 mb-14 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <FiClock className="text-green-600" size={26} />
          Recently Added Plants
        </h3>
        {recentlyAdded.length === 0 ? (
          <p className="text-gray-600">No recent plants added.</p>
        ) : (
          <ul className="space-y-4">
            {recentlyAdded.map((plant) => (
              <li
                key={plant._id}
                className="flex items-center gap-5 hover:bg-green-50 rounded p-3 transition"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-20 h-20 rounded-xl object-cover border border-green-200 shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {plant.name}
                  </p>
                  <p className="text-sm text-green-700 font-medium">
                    {plant.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-3xl shadow-xl border border-green-200 p-6 mb-14 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-600" size={26} />
          Notifications
        </h3>
        {alerts.length === 0 ? (
          <p className="text-gray-600">No new notifications</p>
        ) : (
          <ul className="list-disc list-inside text-red-700 font-semibold space-y-2">
            {alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Link
          to="/addplants"
          className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold text-lg rounded-3xl px-8 py-4 shadow-lg shadow-green-400/30"
        >
          <FiPlusCircle size={24} />
          Add New Plant
        </Link>

        <Link
          to="/allplants"
          className="flex items-center justify-center gap-3 border-2 border-green-700 hover:bg-green-700 hover:text-white transition-colors text-green-700 font-semibold text-lg rounded-3xl px-8 py-4 shadow-md"
        >
          🌿 View All Plants
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
