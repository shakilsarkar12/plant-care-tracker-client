import React from "react";
import { Link } from "react-router";

const Slide = ({ bgImage, header, desc, btnName, link }) => {
  return (
    <div
      className="h-[35vh] sm:h-[45vh] md:h-[h-70vh] bg-cover bg-center flex items-center rounded-md text-shadow text-white relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gray-900/40 "></div>
      <div className="p-3 sm:p-4 md:p-8 md:ml-6  xl:ml-20 z-10">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold mb-3">
          {header}
        </h1>
        <p className=" text-base font-semibold sm:text-lg md:text-xl">{desc}</p>
        <Link
          to={link}
          className="btn btn-sm md:btn-md bg-[#77EEB5] hover:bg-[#22777d] py-2 md:py-0 md:px-6 border-none shadow-none font-bold text-gray-800 hover:text-white text-base mt-3 md:mt-6"
        >
          {btnName}
        </Link>
      </div>
    </div>
  );
};

export default Slide;
