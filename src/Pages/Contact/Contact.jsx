import React, { useContext, useEffect, useState } from "react";
import { LuUser, LuMail, LuMessageCircle } from "react-icons/lu";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [prossesing, setProssesing] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.displayName || "",
      email: user?.email || "",
    }));
  }, [user]);

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setProssesing(true);
    e.preventDefault();
    fetch("https://plant-care-tracker-server-black.vercel.app/contact-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
            setFormData((prev) => ({
                ...prev,
                message: ""
            }));
            toast.success("Message sent successfully!");
            setProssesing(false)
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-[#22702d] mb-8">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-green-800">
            Your Name
          </label>
          <div className="relative">
            <LuUser className="absolute top-3 left-3 z-10 text-green-700" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData?.name}
              onChange={handleChange}
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-green-800">
            Your Email
          </label>
          <div className="relative">
            <LuMail className="absolute top-3 left-3 z-10 text-green-700" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData?.email}
              onChange={handleChange}
              className="input w-full border border-[#22702d] bg-transparent focus:outline-none pl-10"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm font-medium text-green-800">
            Your Message
          </label>
          <div className="relative">
            <LuMessageCircle className="absolute top-3 left-3 z-10 text-green-700" />
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              required
              value={formData?.message}
              onChange={handleChange}
              className="textarea w-full border border-[#22702d] bg-transparent focus:outline-none pl-10 pt-3"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-[#22702d] hover:bg-[#1a5a25] text-white font-semibold w-full"
        >
          {prossesing ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;
