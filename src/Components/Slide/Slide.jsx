import React from "react";
import { Link } from "react-router";

const Slide = ({ bgImage, header, desc, btnName, link }) => {
  return (
    <div
      className="h-[35vh] sm:h-[45vh] md:h-[h-80vh] xl:h-[70vh] bg-cover bg-center flex items-center rounded-md text-shadow text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="p-3 sm:p-4 md:p-8 md:ml-6  xl:ml-20">
        <h1 className="text-xl md:text-2xl lg:text-6xl font-bold mb-3">{header}</h1>
        <p className=" text-base font-semibold sm:text-lg md:text-xl">{desc}</p>
        <Link
          to={link}
          className="btn bg-[#77EEB5] hover:bg-[#22777d] px-6 border-none shadow-none font-bold text-gray-800 hover:text-white text-base mt-3 md:mt-6"
        >
          {btnName}
        </Link>
      </div>
    </div>
  );
};

export default Slide;
