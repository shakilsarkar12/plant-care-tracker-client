import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";

const faqs = [
  {
    question: "How can I add a new plant?",
    answer:
      "Go to the 'Add Plant' page and fill out the form. Once submitted, the plant will be added to your collection.",
  },
  {
    question: "How does the custom care plan work?",
    answer:
      "Our system generates a personalized care guide based on your plant type and care level preferences.",
  },
  {
    question: "Can I track multiple plants?",
    answer:
      "Yes! You can add and manage multiple plants, each with its own care schedule and health status.",
  },
  {
    question: "Is this app mobile-friendly?",
    answer:
      "Absolutely! The Plant Care Tracker is fully responsive and works seamlessly on mobile devices.",
  },
];
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
        <MdQuestionMark className="text-green-700" />
        Question & Answer (FAQ)
      </h2>
      <div className="max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-green-600 rounded-lg"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-5 py-4 flex justify-between items-center text-left text-lg font-medium text-green-800"
            >
              {faq.question}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-400">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
