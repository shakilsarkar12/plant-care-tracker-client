import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Link, useLocation } from "react-router";
import {
  FiUser,
  FiPlusCircle,
  FiMessageSquare,
  FiLayers,
  FiAlertCircle,
  FiDroplet,
  FiClock,
} from "react-icons/fi";
import Loader from "../../Components/Loader/Loader";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SummaryCard from "./SummaryCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [plantCount, setPlantCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [plants, setPlants] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingPlants, setUpcomingPlants] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("https://plant-care-tracker-server-black.vercel.app/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setPlantCount(data.plants);
        setFeedbackCount(data.feedbacks);
      });
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://plant-care-tracker-server-black.vercel.app/myplants/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        generateAlerts(data);
        setLoading(false);
      });
  }, [user]);

  const generateAlerts = (plants) => {
    const today = new Date();
    let newAlerts = [];

    plants.forEach((plant) => {
      const nextWaterDate = new Date(plant.nextWatering);
      const lastWaterDate = new Date(plant.lastWatered);
      const daysToNextWater = (nextWaterDate - today) / (1000 * 60 * 60 * 24);

      if (plant.healthStatus !== "healthey") {
        newAlerts.push(`⚠️ ${plant.plantName} looks unhealthy.`);
      }
      if (daysToNextWater < 0) {
        newAlerts.push(`💧 Missed watering ${plant.plantName}.`);
      } else if (daysToNextWater <= 2) {
        newAlerts.push(
          `💧 Water ${plant.plantName} in ${Math.ceil(daysToNextWater)} day(s).`
        );
      }
    });

    setAlerts(newAlerts);
  };

  const healthyCount = plants.filter(
    (p) => p.healthStatus === "healthey"
  ).length;
  const unhealthyCount = plants.length - healthyCount;

  useEffect(() => {
    fetch(`https://plant-care-tracker-server-black.vercel.app/upcoming-plants/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUpcomingPlants(data))
      .catch((err) => console.error("Failed to load upcoming plants", err));
  }, [user]);

  const recentlyAdded = [...plants]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, 5);

  const pieData = [
    { name: "Healthy", value: healthyCount },
    { name: "Unhealthy", value: unhealthyCount },
  ];
  const COLORS = ["#16a34a", "#dc2626"];

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-extrabold text-green-800 mb-14 text-center drop-shadow-md">
        🌿 Dashboard Overview
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {/* User Info */}
        <SummaryCard
          icon={<FiUser size={36} />}
          title="Logged-in User"
          subtitle={user?.displayName}
          note={user?.email}
        />
        <SummaryCard
          icon={<FiLayers size={36} />}
          title="Total Plants"
          subtitle={plantCount}
        />
        <SummaryCard
          icon={<FiMessageSquare size={36} />}
          title="Feedbacks"
          subtitle={feedbackCount}
        />
      </div>

      {/* Plant Health Pie Chart */}
      <section className="bg-base-100 rounded-xl border border-[#22702d] p-6 mb-14">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          🌱 Plant Health Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Alerts */}
      <section className="bg-base-100 rounded-xl border border-[#22702d] p-6 mb-14">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-600" size={26} /> Notifications
        </h3>
        {alerts.length === 0 ? (
          <p className="text-gray-600">No alerts</p>
        ) : (
          <ul className="list-disc pl-5 text-red-700 font-medium space-y-2">
            {alerts.slice(0, 5).map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Upcoming Watering Reminders */}
      <section className="bg-base-100 rounded-xl border border-[#22702d] p-6 mb-14">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <FiDroplet className="text-green-600" size={26} />
          Upcoming Watering Reminders
        </h3>

        {upcomingPlants.length === 0 ? (
          <p className="text-gray-600">
            No plants need watering within next 3 days.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {upcomingPlants.map((plant) => (
              <Link
                state={{ fromPage: location.pathname }}
                to={`/plantdetails/${plant._id}`}
              >
                <div
                  key={plant._id}
                  className="  rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <img
                    src={plant.image}
                    alt={plant.plantName}
                    className="w-full h-36 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-lg font-bold text-green-700 mb-1">
                    {plant.plantName}
                  </h4>
                  <p className="text-sm text-gray-700 mb-1">
                    Category:{" "}
                    <span className="font-medium">{plant.category}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Watering:{" "}
                    <span className="font-medium">
                      {plant.wateringFrequency}
                    </span>
                  </p>
                  <p className="text-sm text-green-800 font-semibold mt-2 flex items-center gap-2">
                    <FiDroplet className="text-green-500" />
                    Water by:{" "}
                    {new Date(plant.nextWatering).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recently Added */}
      <section className="bg-base-100 rounded-xl border border-[#22702d] p-6 mb-14">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <FiClock className="text-green-600" size={26} /> Recently Added Plants
        </h3>
        {recentlyAdded.length === 0 ? (
          <p className="text-gray-600">No recent plants added.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentlyAdded.map((plant) => (
              <Link
                state={{ fromPage: location.pathname }}
                to={`/plantdetails/${plant._id}`}
              >
                <div
                  key={plant._id}
                  className="rounded-xl   shadow hover:shadow-lg p-3"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h4 className="text-lg font-bold text-green-800 mt-2">
                    {plant.name}
                  </h4>
                  <p className="text-sm text-gray-500">{plant.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Link
          to="/addplants"
          className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 text-white font-semibold text-lg rounded-md px-4 py-2 shadow-lg"
        >
          <FiPlusCircle size={24} /> Add New Plant
        </Link>

        <Link
          to="/allplants"
          className="flex items-center justify-center gap-3 border-2 border-green-700 hover:bg-green-700 hover:text-white text-green-700 font-semibold text-lg rounded-md px-4 py-2 shadow-md"
        >
          🌿 View All Plants
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
