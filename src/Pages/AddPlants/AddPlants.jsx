import React, { useContext} from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import {
  LuImage,
  LuLeaf,
  LuTag,
  LuAlignLeft,
  LuZap,
  LuDroplet,
  LuCalendar,
  LuCalendarClock,
  LuHeartPulse,
} from "react-icons/lu";
import Swal from "sweetalert2";
import { FaLeaf } from "react-icons/fa";

const AddPlants = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPlant = {
      image: form.image.value,
      plantName: form.plantName.value,
      category: form.category.value,
      careLevel: form.careLevel.value,
      wateringFrequency: form.wateringFrequency.value,
      lastWatered: form.lastWatered.value,
      nextWatering: form.nextWatering.value,
      healthStatus: form.healthStatus.value,
      userName: user?.displayName,
      description: form.description.value,
      createdAt: new Date().toISOString(),
      email: user?.email,
    };

    fetch("https://plant-care-tracker-server-black.vercel.app/plants", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Plant added successfully!",
            icon: "success",
            confirmButtonColor: "#22702d",
          });
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-[0_0_10px_#22702d] rounded-md mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> Add New Plants
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Image URL
            </label>
            <div className="relative">
              <LuImage className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Plant Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Plant Name
            </label>
            <div className="relative">
              <LuLeaf className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="plantName"
                placeholder="Plant Name"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Category
            </label>
            <div className="relative">
              <LuTag className="absolute top-3 left-3 z-10 text-green-700" />
              <select
                defaultValue="Select Category"
                name="category"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              >
                <option disabled={true}>Select Category</option>
                <option className="text-black" value="Succulent">
                  Succulent
                </option>
                <option className="text-black" value="Fern">
                  Fern
                </option>
                <option className="text-black" value="Flowering">
                  Flowering
                </option>
              </select>
            </div>
          </div>

          {/* Care Level */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Care Level
            </label>
            <div className="relative">
              <LuZap className="absolute top-3 left-3 z-10 text-green-700" />
              <select
                defaultValue="Select Care Level"
                name="careLevel"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              >
                <option disabled={true}>Select Care Level</option>
                <option className="text-black" value="easy">
                  Easy
                </option>
                <option className="text-black" value="moderate">
                  Moderate
                </option>
                <option className="text-black" value="difficult">
                  Difficult
                </option>
              </select>
            </div>
          </div>

          {/* Watering Frequency */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Watering Frequency
            </label>
            <div className="relative">
              <LuDroplet className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="wateringFrequency"
                placeholder="e.g. Every 3 days"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Last Watered Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Last Watered Date
            </label>
            <div className="relative">
              <LuCalendar className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="date"
                name="lastWatered"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Next Watering Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Next Watering Date
            </label>
            <div className="relative">
              <LuCalendarClock className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="date"
                name="nextWatering"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Health Status */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Health Status
            </label>
            <div className="relative">
              <LuHeartPulse className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="healthStatus"
                placeholder="Health Status"
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-green-800">
              Description
            </label>
            <div className="relative">
              <LuAlignLeft className="absolute top-3 left-3 z-10 text-green-700" />
              <textarea
                name="description"
                placeholder="Description"
                required
                className="textarea w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10 pt-3"
                rows="4"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="btn w-full bg-[#22702d] text-white hover:bg-green-800 px-8 py-2"
          >
            Add Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlants;
