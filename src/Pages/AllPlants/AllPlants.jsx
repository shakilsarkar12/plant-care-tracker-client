import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaLeaf } from "react-icons/fa";

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    document.title = "All Plants - Plant Care Tracker";
  }, []);

  useEffect(() => {
    let url = "https://plant-care-tracker-server-black.vercel.app/plants";
    if (sortBy) {
      url += `?sortBy=${sortBy}`;
    }
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }, [sortBy]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto lg:mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> All Plants
      </h2>

      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-1 md:px-3 py-1 md:py-2  rounded-sm md:rounded-md text-sm text-green-700 font-medium"
        >
          <option value="">Sort By</option>
          <option value="nextWatering">Next Watering Date</option>
          <option value="careLevel">Care Level</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-md shadow-[0_0_5px_#22702d]">
        <table className="table table-zebra w-full min-w-3xl">
          <thead className="bg-green-700 text-white text-base">
            <tr>
              <th>#</th>
              <th>Plant Name</th>
              <th>Category</th>
              <th>Watering Frequency</th>
              <th className="w-fit lg:w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant._id || index} className="transition-all">
                <td className="font-semibold">{index + 1}</td>
                <td className="text-lg font-semibold">{plant.plantName}</td>
                <td className="text-lg font-semibold">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm capitalize">
                    {plant.category}
                  </span>
                </td>
                <td className="text-lg font-semibold">
                  {plant.wateringFrequency}
                </td>
                <td className="text-lg font-semibold">
                  <Link
                    data-tooltip-id="view-tooltip"
                    data-tooltip-content="Click to View Details"
                    state={{
                      fromPage: "/allplants",
                      buttonName: "Back to All Plants",
                    }}
                    to={`/plantdetails/${plant._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    View
                  </Link>
                  <Tooltip
                    id="view-tooltip"
                    place="bottom"
                    delayShow={400}
                    style={{
                      fontSize: "12px",
                      padding: "6px",
                      borderRadius: "6px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {plants.length === 0 && (
          <p className="text-center py-6 text-gray-500">No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default AllPlants;
