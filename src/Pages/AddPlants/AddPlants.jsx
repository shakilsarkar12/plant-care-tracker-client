import React, { useContext, useEffect, useState } from "react";
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
  LuUser,
} from "react-icons/lu";
import Swal from "sweetalert2";
import { FaLeaf } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";
import { FiMail } from "react-icons/fi";

const AddPlants = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const imgbbApiKey = "2238bcd815c36dd9c39b79d62fb43968"; // এখানে আপনার ImgBB API Key বসান

  useEffect(() => {
    document.title = "Add Your Plant - Plant Care Tracker";
    setTimeout(() => setLoading(false), 200);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!imageFile) {
      return Swal.fire("Oops!", "Please select an image file.", "warning");
    }

    // Upload image to ImgBB
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.url;

      const newPlant = {
        image: imageUrl,
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

      const res = await fetch(
        "https://plant-care-tracker-server-black.vercel.app/plants",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newPlant),
        }
      );

      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success!", "Plant added successfully!", "success");
        form.reset();
        setImageFile(null);
      }
    } catch (error) {
      console.error("Image upload or plant submit error:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-[0_0_10px_#22702d] rounded-md mt-8 lg:mt-12 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> Add New Plants
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              User Name
            </label>
            <div className="relative">
              <LuUser className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="name"
                value={user?.displayName}
                readOnly
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
              />
            </div>
          </div>

          {/* User Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              User Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
              />
            </div>
          </div>

          {/* Image File Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              Plant Image
            </label>
            <div className="relative">
              <LuImage className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10 pt-2"
              />
            </div>
          </div>

          {/* Rest of the form remains unchanged */}
          {/* Plant Name, Category, Care Level, etc... */}
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
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
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
                name="category"
                defaultValue=""
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
              >
                <option value="" disabled>
                  Select Category
                </option>
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
                name="careLevel"
                defaultValue=""
                required
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
              >
                <option value="" disabled>
                  Select Care Level
                </option>
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
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
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
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
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
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
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
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
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
                className="textarea w-full border border-[#22702d] bg-transparent focus:outline-none pl-10 pt-3"
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
