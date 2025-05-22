import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Loader from "../../Components/Loader/Loader";

const AllPlants = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/myplants/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPlants(data);
      });
  }, [user, setLoading]);

  if (loading) {
      return (
        <Loader/>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        My Plants
      </h2>

      <div className="overflow-x-auto rounded-md shadow-[0_0_5px_#22702d]">
        <table className="table table-zebra w-full min-w-4xl">
          <thead className="bg-green-700 text-white text-base">
            <tr>
              <th>#</th>
              <th>Plant Name</th>
              <th>Category</th>
              <th>Watering Frequency</th>
              <th className="w-1/4">Actions</th>
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
                <td className="text-lg font-semibold flex justify-end gap-4 w-fit">
                  <Link
                    to={`/plantdetails/${plant._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${plant._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    Upadte
                  </Link>
                  <Link
                    to={`/plantdetails/${plant._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    Delete
                  </Link>
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
