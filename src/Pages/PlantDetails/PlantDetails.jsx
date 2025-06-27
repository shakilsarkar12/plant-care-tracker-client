import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import {
  FaLeaf,
  FaTachometerAlt,
  FaTint,
  FaCalendarAlt,
  FaHeartbeat,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import { MdTimer } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const PlantDetails = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Plant Details - Plant Care Tracker";
  }, []);

  const fromPage = location.state?.fromPage;
  const backButtonName = location.state?.buttonName;

  useEffect(() => {
    fetch(`https://plant-care-tracker-server-black.vercel.app/plant/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data);
        setLoading(false);
      })
      .catch((err) => {
        setPlant(null);
        toast.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!plant) {
    setLoading(false)
    return (
      <div className="text-center p-10">
        <h2 className="text-xl sm:text-2xl md:text-xl font-semibold text-red-600">
          Plant not found.
        </h2>
        <Link
          to="/plants"
          className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded"
        >
          Back to All Plants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto lg:mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" />
        Plants Details
      </h2>
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        {plant.plantName}
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 relative group rounded-lg overflow-hidden shadow-md border border-gray-200">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-gray-700/45  opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              {plant.plantName}
            </h1>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <div className="flex items-start gap-3">
            <FaLeaf className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Category:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.category}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaTachometerAlt className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Care Level:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.careLevel}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaTint className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">
                Watering Frequency:
              </p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.wateringFrequency}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Last Watered:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {format(new Date(plant.lastWatered), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Next Watering:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {format(new Date(plant.nextWatering), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaHeartbeat className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Health Status:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.healthStatus}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaUser className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Added By:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.userName} ({plant.email})
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdTimer className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700">Added Time:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {format(
                  new Date(plant.createdAt),
                  "MMMM dd, yyyy 'at' hh:mm a"
                )}
              </p>
            </div>
          </div>

          <div className="sm:col-span-2 mt-4 flex items-start gap-3">
            <FaInfoCircle className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-green-700 mb-1">Description:</p>
              <p className="capitalize text-gray-400 font-semibold">
                {plant.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-4 col-span-2">
            <div className="w-[calc(50%+8px)] sm:w-[calc(50%-8px)]">
              <Link
                data-tooltip-id="back-tooltip"
                data-tooltip-content={`Click to ${backButtonName? backButtonName : "Back Homo"}`}
                to={fromPage? fromPage : "/"}
                className="btn w-full bg-green-600 hover:bg-green-700 px-0 text-white py-2 rounded-lg transition"
              >
                {backButtonName? backButtonName : "Back"}
              </Link>
              <Tooltip
                id="back-tooltip"
                place="bottom"
                delayShow={400}
                style={{
                  fontSize: "12px",
                  padding: "6px",
                  borderRadius: "6px",
                }}
              />
            </div>
            {plant?.email === user?.email && (
              <div className="w-[calc(50%-16px)] sm:w-[calc(50%-8px)]">
                <Link
                  state={location.pathname }
                  
                  data-tooltip-id="update-tooltip"
                  data-tooltip-content="Click to Update Plant"
                  to={`/update/${plant._id}`}
                  className="btn w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded-lg shadow transition"
                >
                  Upadte
                </Link>
                <Tooltip
                  id="update-tooltip"
                  place="bottom"
                  delayShow={400}
                  style={{
                    fontSize: "12px",
                    padding: "6px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
