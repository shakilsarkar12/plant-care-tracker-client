import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/plants") 
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        🌿 All Plants
      </h2>

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
