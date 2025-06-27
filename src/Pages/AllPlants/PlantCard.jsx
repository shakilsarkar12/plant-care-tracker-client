import React from 'react';
import { Link } from 'react-router';

const PlantCard = ({plant}) => {
    return (
      <div
        className="bg-base-200  rounded-lg shadow overflow-hidden transition-transform hover:shadow-lg"
      >
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-bold text-base-400">
            {plant.plantName}
          </h3>

          <p className="text-sm md:text-base font-medium text-base-400">
            Category:{" "}
            <span className="inline-block px-2 py-1 bg-green-200 text-gray-600 rounded text-xs capitalize">
              {plant.category}
            </span>
          </p>

          <p className="text-sm md:text-base font-medium text-base-400">
            Watering Frequency:{" "}
            <span className="text-green-600">{plant.wateringFrequency}</span>
          </p>

          <Link
            to={`/plantdetails/${plant._id}`}
            state={{
              fromPage: "/allplants",
              buttonName: "Back to All Plants",
            }}
            className="inline-block mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
            data-tooltip-id="view-tooltip"
            data-tooltip-content="Click to View Details"
          >
            View Details
          </Link>
        </div>
      </div>
    );
};

export default PlantCard;