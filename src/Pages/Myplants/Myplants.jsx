import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";
import { FaLeaf } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const location = useLocation();

  useEffect(() => {
    document.title = "My Plant - Plant Care Tracker";
  }, []);

  useEffect(() => {
    fetch(
      `https://plant-care-tracker-server-black.vercel.app/myplants/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPlants(data);
      });
  }, [user]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to deletet this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#22702d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://plant-care-tracker-server-black.vercel.app/plantdelate/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const reminingPlants = plants.filter(
                (plant) => plant._id !== _id
              );
              setPlants(reminingPlants);
              Swal.fire({
                title: "Deleted!",
                text: "Your plant has been deleted.",
                icon: "success",
                confirmButtonColor: "#22702d",
              });
            }
          });
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto lg:mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> My Plants
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
                    data-tooltip-id="view-tooltip"
                    data-tooltip-content="Click to View Details"
                    state={{
                      fromPage: "/myplants",
                      buttonName: "Back to My Plants",
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
                  <Link
                    state={location.pathname}
                    data-tooltip-id="update-tooltip"
                    data-tooltip-content="Click to Update Plant"
                    to={`/update/${plant._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
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
                  <button
                    onClick={() => handleDelete(plant._id)}
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Click to Delete Plant"
                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    Delete
                  </button>
                  <Tooltip
                    id="delete-tooltip"
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

export default MyPlants;
