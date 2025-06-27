// Update in EditProfileModal.jsx
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const EditProfileModal = ({ user, isOpen, onClose, onSave, prosesing }) => {
  const [name, setName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(user?.photoURL || "");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = user?.photoURL;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbbApiKey
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          imageURL = data.data.url;
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    const updatedData = {
      displayName: name,
      bio,
      phoneNumber: phone,
      photoURL: imageURL,
    };

    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-base-300 text-base-content rounded-xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold mb-8 border-b border-neutral pb-4">
          Public Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Name, Email, Phone, Bio */}
            {[
              ["Name", name, setName],
              ["Phone", phone, setPhone],
            ].map(([label, value, setter], idx) => (
              <div key={idx}>
                <label className="block text-sm mb-1">{label}</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>
            ))}

            {/* Bio */}
            <div>
              <label className="block text-sm mb-1">Bio</label>
              <textarea
                rows="3"
                className="textarea textarea-bordered w-full bg-base-200"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={previewURL}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-neutral object-cover"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="mt-4 px-4 py-1 text-sm border border-gray-500 rounded-md hover:bg-neutral hover:text-white transition"
            >
              Edit
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </form>

        <div className="mt-8 flex justify-end gap-4 border-t border-neutral pt-4">
          <button
            onClick={onClose}
            type="button"
            className="btn bg-gray-600 hover:bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={prosesing}
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-700"
          >
            {prosesing ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
