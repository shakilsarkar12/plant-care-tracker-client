import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
      <div>
        <div className="">
          <Navbar />
        </div>
        <div className="min-h-[calc(90vh-64px)] mt-4 md:mt-6 lg:mt-8 w-full 2xl:w-10/12 2xl:mx-auto px-4 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-0">
          <Outlet />
        </div>
      </div>
    );
};

export default Root;