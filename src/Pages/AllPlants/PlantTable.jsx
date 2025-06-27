import React from 'react';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';

const PlantTable = ({plants}) => {
    return (
      <div className="w-full overflow-x-auto rounded-md shadow-[0_0_5px_#22702d]">
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
    );
};

export default PlantTable;