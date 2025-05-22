import React from "react";
import { FaTint, FaSun, FaBug, FaLeaf, FaSeedling } from "react-icons/fa";

const tips = [
  {
    icon: <FaTint size={40} />,
    title: "Watering Tips",
    description:
      "Water your plant when the topsoil feels dry. Overwatering can be harmful.",
  },
  {
    icon: <FaSun size={40} />,
    title: "Sunlight Needs",
    description:
      "Most plants need 4-6 hours of sunlight. Know your plant's light preference.",
  },
  {
    icon: <FaBug size={40} />,
    title: "Pest Control",
    description:
      "Keep leaves clean and check for bugs regularly to prevent infestations.",
  },
  {
    icon: <FaSeedling size={40} />,
    title: "Fertilizing",
    description:
      "Use organic fertilizer once a month during the growing season.",
  },
];

const PlantCareTips = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaLeaf className="text-green-700" /> Plant Care Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="shadow-[0_0_6px_#22702d] p-6 text-center hover:shadow-[0_0_10px_#22702d] rounded-xl transition"
          >
            <div className="text-green-600 mb-3 flex justify-center">
              {tip.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
            <p className="font-medium text-gray-400">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantCareTips;
