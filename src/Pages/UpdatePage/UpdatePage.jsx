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
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";
import _ from "lodash";
import { FiMail } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

const UpdatePage = () => {
  const [loading, setLoading] = useState(true);
  const [prosses, setProsses] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const data = useLoaderData();
  const [plant, setPlant] = useState(data);
  const { user } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const imgbbApiKey = import.meta.env.VITE_imgbbApiKey;

  const fromPage = location.state;

  useEffect(() => {
    document.title = "Update Plants  - Plant Care Tracker";
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 200);

  if (loading) return <Loader />;

  const handleSubmit = async (e) => {
    setProsses(true);
    e.preventDefault();
    const form = e.target;

    let imageUrl = "";

    if (imageFile) {
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
        imageUrl = uploadData.data.url;
      } catch (err) {
        console.log(err);
        return Swal.fire("Error", "Image upload failed", "error");
      }
    } else if (selectedGalleryImage) {
      imageUrl = selectedGalleryImage;
    } else {
      imageUrl = plant.image;
    }

    const updatePlant = {
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
      email: user?.email,
    };

    const originalDataSubset = {
      image: plant.image,
      plantName: plant.plantName,
      category: plant.category,
      careLevel: plant.careLevel,
      wateringFrequency: plant.wateringFrequency,
      lastWatered: plant.lastWatered,
      nextWatering: plant.nextWatering,
      healthStatus: plant.healthStatus,
      userName: plant.userName,
      description: plant.description,
      email: plant.email,
    };

    const isDataSame = _.isEqual(originalDataSubset, updatePlant);

    if (isDataSame) {
      setProsses(false)
      Swal.fire({
        icon: "info",
        title: "No Changes Detected",
        text: "You didn't update any information.",
        confirmButtonColor: "#22702d",
      });
      return;
    }

    fetch(
      `https://plant-care-tracker-server-black.vercel.app/updateplant/${plant._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatePlant),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount > 0) {
          setPlant(data);
          navigate(fromPage || "/myplants");
          setProsses(false);
          Swal.fire({
            title: "Success!",
            text: "Plant Update successful!",
            icon: "success",
            confirmButtonColor: "#22702d",
          });
        }
      });
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-[0_0_10px_#22702d] rounded-md mt-16 mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> Update Your Plant
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* user Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              User Name
            </label>
            <div className="relative">
              <LuUser className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="text"
                name="name"
                readOnly={true}
                value={user?.displayName}
                placeholder="Your Name"
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* user email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-green-800">
              User Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 z-10 text-green-700" />
              <input
                type="email"
                name="email"
                readOnly={true}
                value={user?.email}
                placeholder="Your Email"
                className="input w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="relative">
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

                  className="input w-full border border-[#22702d] bg-transparent focus:outline-none px-10 pt-2"
                />
              </div>
            </div>

            {/* Show preview if image selected */}
            {imageFile && (
              <div className="absolute bottom-0.5 right-0.5">
                <img
                  src={URL.createObjectURL(imageFile) || plant?.image}
                  alt="Selected"
                  className="w-10 h-9 object-cover rounded-md"
                />
              </div>
            )}

            {!imageFile && (
              <div className="absolute bottom-0.5 right-0.5">
                <img
                  src={plant?.image}
                  alt="Selected"
                  className="w-10 h-9 object-cover rounded-md"
                />
              </div>
            )}
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
                defaultValue={plant.plantName}
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
                defaultValue={plant.category}
                name="category"
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
                defaultValue={plant.careLevel}
                name="careLevel"
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
                defaultValue={plant.wateringFrequency}
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
                defaultValue={plant.lastWatered}
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
                defaultValue={plant.nextWatering}
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
                defaultValue={plant.healthStatus}
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
                defaultValue={plant.description}
                className="textarea w-full border border-[#22702d] bg-transparent focus:outline-none focus:shadow-[0_0_5px_#22702d] pl-10 pt-3"
                rows="4"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="w-full text-center mt-8 flex gap-4">
          <Link
            to="/myplants"
            className="btn w-[calc(50%-8px)] bg-red-500 text-white hover:bg-red-600 px-8 py-2"
          >
            
            Cancel
          </Link>
          <button
            type="submit"
            className="btn w-[calc(50%-8px)] bg-[#22702d] text-white hover:bg-green-800 px-8 py-2"
          >
            {prosses ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
