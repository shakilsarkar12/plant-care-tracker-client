import React from "react";
import { Link } from "react-router";
import { FaLeaf } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const NewPlants = ({plants}) => {
  return (
    <div className="py-12 mt-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> New Plants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="rounded-2xl shadow-[0_0_6px_#22702d] overflow-hidden hover:shadow-[0_0_10px_#22702d] transition duration-300"
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="h-48 lg:h-60 w-full object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold mb-1">{plant.name}</h3>
              <p className="text-green-600 font-medium mb-2">
                Category: {plant.category}
              </p>
              <Link
                data-tooltip-id="view-tooltip"
                data-tooltip-content="Click to View Details"
                state={{
                  fromPage: "/",
                  buttonName: "Back to New Plants",
                }}
                to={`/plantdetails/${plant._id}`}
                className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md shadow transition"
              >
                View Details
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPlants;
