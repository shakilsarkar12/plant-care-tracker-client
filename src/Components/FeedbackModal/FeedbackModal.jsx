import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const FeedbackModal = ({ closeModal,feedBacks ,setFeedBacks }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = user?.displayName;
    const email = user?.email;
    const message = e.target.feedback.value;
    const date = new Date();
    const feedback = { userName, email, message, date };
    fetch("https://plant-care-tracker-server-black.vercel.app/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((data) => {
        const updateFeedbacks = [...feedBacks, data];
        setFeedBacks(updateFeedbacks);
        Swal.fire({
          title: "Thank You!",
          text: "Thanks For Your Feedback!",
          icon: "success",
          confirmButtonColor: "#22702d",
        });
        closeModal();
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-gray-500/30 backdrop-blur-sm"
      ></div>
      <div className="relative rounded-xl p-6 w-11/12 max-w-md z-10 bg-base-300">
        <h3 className="text-xl font-bold mb-4 text-green-700">
          🌿 Share Your Thoughts
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border text-green-600 border-green-400 rounded-lg focus:outline-none"
            rows="5"
            name="feedback"
            placeholder="Write your feedback..."
            required
          ></textarea>
          <div className="flex justify-end mt-4 gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border bg-red-400 border-none rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
