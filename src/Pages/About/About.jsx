import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="pb-12 bg-white text-gray-800 w-full mt-8 lg:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#22702d] mb-4">
            About Plant Care Tracker
          </h2>
          <p className="text-lg text-gray-600 max-w-5xl mx-auto">
            Plant Care Tracker is a simple yet powerful web application designed
            to help plant lovers manage their indoor or outdoor plants. Whether
            you're a beginner or an expert, this tool helps you organize and
            care for your plants effectively.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#22702d]">
              Why We Created It
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Taking care of plants can be overwhelming — forgetting to water,
              not knowing the sunlight needs, or tracking their growth. We
              wanted to make it easier. This app gives you reminders, expert
              tips, and a place to manage all your plants in one dashboard.
            </p>
            <p className="mt-4 text-gray-700">
              With a clean interface, dark mode, and personalized care tracking,
              you'll never forget to water again!
            </p>
          </div>

          {/* Image (you can replace with your own) */}
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow">
            <img
              src="https://plus.unsplash.com/premium_photo-1685287731569-d8f8894d9a1f?q=80&w=691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Plant care"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#22702d]">
          Key Features:
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Personalized plant management</li>
          <li>Watering reminders</li>
          <li>Light/Dark theme</li>
          <li>User feedback system</li>
          <li>Responsive UI</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#22702d]">
          About the Developer
        </h2>
        <p>
          Developed by Md. Shakil Sarkar, a passionate front-end developer with
          experience in building interactive web applications using React and
          TailwindCSS.
        </p>

        <Link to="/addplants" className="btn btn-success mt-6">
          Start Now
        </Link>
      </div>
    </section>
  );
};

export default About;
