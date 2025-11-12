import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logoNew from "../../../assets/img/logoNew.png";
import aaImage from "../../../assets/img/aa.jpg";

const ecosystemData = [
  {
    title: "Xoto Connect",
    description:
      "The XOTO Home empowers customers to plan and perfect your landscaping journey, from concept to creation, all in one intuitive platform.",
  },
  {
    title: "Xoto Pro",
    description:
      "Designed for professionals, Xoto Pro connects landscapers and contractors with customers through a powerful digital ecosystem.",
  },
  {
    title: "Xoto Hub",
    description:
      "A central hub that synchronizes tools, schedules, and services to simplify management across teams and projects.",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="relative w-full bg-[var(--color-body)] py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={aaImage} alt="city" className="w-full h-full object-cover" />
      </div>

      {/* Content Layer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-extrabold text-white mb-16 drop-shadow-lg">
          Our Tech Ecosystem
        </h2>

        {/* Swiper Section */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            centeredSlides={true}
            loop={true}
            slidesPerView={1.3} // Slightly more than one to show peek of next/previous cards
            spaceBetween={60}
            className="!pb-10"
          >
            {ecosystemData.map((item, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-10 mx-auto max-w-5xl rounded-[3rem] px-16 py-16 transition-all duration-500 shadow-2xl backdrop-blur-sm ${
                      isActive
                        ? "scale-105 bg-gradient-to-br from-purple-700 via-black to-purple-800 text-white"
                        : "scale-95 bg-gradient-to-br from-purple-900 via-black to-purple-900 opacity-70 text-gray-200"
                    }`}
                  >
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={logoNew}
                        alt="Logo"
                        className="h-36 w-36 object-contain drop-shadow-2xl"
                      />
                    </div>

                    {/* Right: Text */}
                    <div className="flex flex-col text-left">
                      <h3 className="text-4xl font-extrabold mb-6 text-white">
                        {item.title}
                      </h3>
                      <p className="text-lg leading-relaxed opacity-90 max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
