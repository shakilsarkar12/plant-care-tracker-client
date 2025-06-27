import React from "react";
import { FaCheckCircle, FaShieldAlt, FaClock, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaCheckCircle size={28} className="text-green-600" />,
    title: "Accurate Care Plans",
    desc: "Our smart system ensures the best care schedule tailored to each plant.",
  },
  {
    icon: <FaShieldAlt size={28} className="text-green-600" />,
    title: "Trusted by Gardeners",
    desc: "Thousands of plant lovers use our service daily with full satisfaction.",
  },
  {
    icon: <FaClock size={28} className="text-green-600" />,
    title: "Timely Notifications",
    desc: "Never miss a watering day or health update — we’ve got you covered!",
  },
  {
    icon: <FaHeart size={28} className="text-green-600" />,
    title: "Built with Passion",
    desc: "Created by plant lovers for plant lovers. Your green friend is in good hands!",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="my-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 text-center mb-10">
          Why Choose Plant Care Tracker?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 shadow-[0_0_6px_#22702d] hover:shadow-[0_0_10px_#22702d] transition duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400 font-medium text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
