import React, { useEffect, useState } from "react";
import { LuUser, LuMail, LuLeaf } from "react-icons/lu";
import { FaCalendarAlt, FaEdit, FaLock } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import Loader from "../../Components/Loader/Loader";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user, handleAutoLogout, resetPassword } = useAuth();
  const [myPlants, setMyPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prosesing, setProsesing] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.title = "My Profile - Plant Care Tracker";

    if (user?.email) {
      fetch(
        `https://plant-care-tracker-server-black.vercel.app/myplants/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyPlants(data.reverse());
          setLoading(false);
        })
        .catch((err) => console.error("Failed to load plants", err));
    }
  }, [user?.email]);

  if (loading) {
    return <Loader />;
  }

  const joinedDateStr = user?.metadata?.creationTime || user?.creationTime;
  const joinedDate = new Date(joinedDateStr);

  const formattedDate = joinedDate?.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleUpdateProfile = async (updatedData) => {
    try {
      setProsesing(true);

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: updatedData.displayName,
          photoURL: updatedData.photoURL,
        });
      }

      const res = await fetch(`https://plant-care-tracker-server-black.vercel.app/users/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        toast.success("Profile updated successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.info("No changes made.");
      }
    } catch (err) {
      console.error(" Failed to update profile", err);
      toast.error("Something went wrong.");
    } finally {
      setProsesing(false);
    }
  };

    const handlePasswordReset =  () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be Reset your Password!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#22702d",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Reset",
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await resetPassword(user.email);
                    toast.success("Password reset email sent! Check your inbox.");
                  } catch (error) {
                    console.error("Password reset error:", error);
                    toast.error("Failed to send password reset email.");
                  }
            Swal.fire({
              title: "Sent !",
              text: "Password reset email has been sent. check your email",
              icon: "success",
            });
            handleAutoLogout()
          }
        });
    }
    
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-[#22702d] mb-8">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="bg-base-100 shadow-md border border-[#22702d] rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden border-4 border-green-300">
          <img
            src={
              user?.photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 px-2 space-y-2 text-green-800 text-xs md:text-base">
          <div className="flex items-center gap-2">
            <LuUser size={20} />
            <span className="font-semibold">Name:</span>
            <span>{user?.displayName || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuMail size={20} />
            <span className="font-semibold">Email:</span>
            <span>{user?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuLeaf size={20} />
            <span className="font-semibold">Total My Plants:</span>
            <span>{myPlants.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={18} />
            <span className="font-semibold">Member Since:</span>
            <span>{formattedDate}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-xs sm:btn-sm bg-green-600 hover:bg-green-700 text-white"
            >
              <FaEdit /> Edit Profile
            </button>
            <button
              onClick={handlePasswordReset}
              className="btn btn-xs sm:btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <FaLock /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Recent Plants */}
      {myPlants.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-[#22702d] mb-4">
            Recently Added Plants
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myPlants.slice(0, 3).map((plant) => (
              <div
                key={plant._id}
                className="border border-[#22702d] rounded-md shadow-sm p-3"
              >
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h4 className="text-lg font-bold text-green-700">
                  {plant.plantName}
                </h4>
                <p className="text-sm text-gray-600">{plant.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <EditProfileModal
        user={user}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        prosesing={prosesing}
        onSave={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
