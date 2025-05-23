import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Feedback = () => {
    const [showModal, setShowModal] = useState(false);
    const [feedBacks, setFeedBacks] = useState([]);
  const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    

    useEffect(() => {
        fetch("https://plant-care-tracker-server-black.vercel.app/feedback")
          .then((res) => res.json())
          .then((data) => {
            setFeedBacks(data);
          });
    }, [feedBacks])
    

  const handleGiveFeedback = () => {
    if (user) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-6">What Users Say</h2>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedBacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <div className="min-h-36 flex-1 p-6 my-2 mx-2 rounded-xl shadow-[0_0_6px_#22702d] flex flex-col justify-between">
              <p className="text-gray-400 font-medium mb-4">
                "{feedback.message}"
              </p>
              <h4 className="font-semibold text-green-600">
                — {feedback.userName}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button to give feedback */}
      <button
        onClick={handleGiveFeedback}
        className="mt-8 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
      >
        Give Your Feedback
      </button>

      {/* Feedback Modal */}
      {showModal && (
              <FeedbackModal
                  feedBacks={feedBacks}
          setFeedBacks={setFeedBacks}
          closeModal={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default Feedback;
