import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { RxTable } from "react-icons/rx";
import "react-tooltip/dist/react-tooltip.css";
import { FaLeaf } from "react-icons/fa";
import PlantCard from "./PlantCard";
import PlantTable from "./PlantTable";

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [isCard, setIsCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    document.title = "All Plants - Plant Care Tracker";
  }, []);

  useEffect(() => {
    let url = "https://plant-care-tracker-server-black.vercel.app/plants";
    const query = [];

    if (sortBy) query.push(`sortBy=${sortBy}`);
    if (filterCategory) query.push(`category=${filterCategory}`);

    if (query.length > 0) {
      url += "?" + query.join("&");
    }

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }, [sortBy, filterCategory]);

  if (loading) return <Loader />;

  return (
    <div className="lg:mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> All Plants
      </h2>

      <div className="w-full bg-base-200 py-3 px-6 flex items-center justify-between rounded-lg mb-4">
        <div></div>
        <button onClick={() => setIsCard(!isCard)} className="font-medium flex gap-2 items-center">
          Change Layout:  {isCard ? <RxTable size={22} /> : <TfiLayoutGrid4Alt size={20} />}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        {/* Sidebar Filter Panel */}
        <div className="lg:h-screen lg:sticky top-20 w-full lg:w-1/5 bg-100 bg-base-200 rounded-lg p-4 space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-base-400">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border px-3 py-2 font-medium rounded-md text-sm text-base-400"
            >
              <option value="">-- Select --</option>
              <option value="nextWatering">Next Watering Date</option>
              <option value="careLevel">Care Level</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-base-400">
              Filter By Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm text-base-400"
            >
              <option value="">-- All Categories --</option>
              <option value="Succulent">Succulent</option>
              <option value="Fern">Fern</option>
              <option value="Flowering">Flowering</option>
            </select>
          </div>
        </div>

        {isCard ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.length === 0 ? (
              <p className="text-center py-6 text-gray-500 col-span-full">
                No plants found.
              </p>
            ) : (
              plants.map((plant, index) => (
                <PlantCard key={plant._id || index} plant={plant} />
              ))
            )}
          </div>
        ) : (
          <PlantTable plants={plants} />
        )}
      </div>
    </div>
  );
};

export default AllPlants;
