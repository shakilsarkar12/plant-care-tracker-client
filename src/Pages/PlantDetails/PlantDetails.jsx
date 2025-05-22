import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
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

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/plant/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlant(data);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold text-red-600">Plant not found.</h2>
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
    <div className="max-w-7xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
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

          <div className="absolute inset-0 bg-gray-300/10  opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-green-400 mb-6">
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

          <Link
            to="/allplants"
            className="btn mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
          >
            Back to All Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
