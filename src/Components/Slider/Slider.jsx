import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from "../Slide/Slide";
const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide className="-z-50">
        <Slide
          bgImage="https://i.ibb.co/vxzYh2rw/slider1.png"
          header="Care for Your Plants, Your Way"
          desc="Don’t wait — simplify plant care with our personalized care system."
          btnName="View My Plants"
          link="/myplants"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          bgImage="https://i.ibb.co/LDswB99j/slider2.png"
          header="Get Real-Time Updates on Your Plant’s Health"
          desc="Stay one step ahead with sensor-based data and smart analysis."
          btnName="Check Health Status"
          link="/allplants"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          bgImage="https://i.ibb.co/PvTW0bN8/slider3.png"
          header=" Never Forget to Water Again"
          desc="Set personalized care schedules and reminders for every plant."
          btnName="Set Up Care Plan"
          link="/addplants"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          bgImage="https://i.ibb.co/dsSjxdQG/slider4.png"
          header=" Connect with Plant Lovers Like You"
          desc="Share tips, discuss care routines, and support each other in your plant journey."
          btnName="Join the Community"
          link="/register"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
