import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import home from "../../../assets/img/logo/logohome.png";
import connect from "../../../assets/img/logo/logoconnect.png";
import blitz from "../../../assets/img/logo/logoblitz.png";
import grid from "../../../assets/img/logo/logogrid.png";
import vault from "../../../assets/img/logo/logovault.png";
import aaImage from "../../../assets/img/aa.jpg";

const ecosystemData = [
  {
    logo: home,
    description:
      "The XOTO Home empowers customers to plan and perfect your landscaping journey, from concept to creation, all in one intuitive platform.",
  },
  {
    logo: connect,
    description:
      "Designed for professionals, Xoto Pro connects landscapers and contractors with customers through a powerful digital ecosystem.",
  },
  {
    logo: blitz,
    description:
      "A central hub that synchronizes tools, schedules, and services to simplify management across teams and projects.",
  },
  {
    logo: grid,
    description:
      "A central hub that synchronizes tools, schedules, and services to simplify management across teams and projects.",
  },
  {
    logo: vault,
    description:
      "A central hub that synchronizes tools, schedules, and services to simplify management across teams and projects.",
  },
];

export default function EcosystemSlider() {
  return (
    <section className="relative w-full bg-[var(--color-body)] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={aaImage}
          alt="City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-white mb-8 sm:mb-10 md:mb-12 lg:mb-16 drop-shadow-xl heading-light">
          Our Tech Ecosystem
        </h2>

        {/* Swiper */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{
              clickable: true,
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !opacity-100",
              bulletClass:
                "swiper-pagination-bullet !bg-white/50 !w-2 !h-2 md:!w-3 md:!h-3",
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 1.05, spaceBetween: 22 },
              640: { slidesPerView: 1.12, spaceBetween: 26 },
              768: { slidesPerView: 1.22, spaceBetween: 32 },
              1024: { slidesPerView: 1.32, spaceBetween: 40 },
              1280: { slidesPerView: 1.38, spaceBetween: 60 },
              1536: { slidesPerView: 1.45, spaceBetween: 80 },
            }}
            className="!pb-10 sm:!pb-12 md:!pb-14 lg:!pb-16"
          >
            {ecosystemData.map((item, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`
              group relative flex flex-col sm:flex-row
              items-center sm:items-center
              justify-center sm:justify-start
              text-center sm:text-left
              rounded-3xl
              min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[260px]

              w-full mx-auto 
              max-w-[300px] xs:max-w-[380px] sm:max-w-[520px]
              md:max-w-[700px] lg:max-w-[860px] xl:max-w-[900px]

              px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10
              transition-all duration-500 ease-out
              shadow-xl border border-white/10

              ${
                isActive
                  ? "scale-100 sm:scale-105 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-white"
                  : "scale-90 sm:scale-95 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-gray-200 opacity-75"
              }
            `}
                  >
                    {/* Logo */}
                    <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
                      <img
                        src={item.logo}
                        alt="Logo"
                        className={`
                    object-contain transition-all duration-300
                    w-[150px] h-[90px]
                    sm:w-[170px] sm:h-[100px]
                    md:w-[185px] md:h-[110px]
                    lg:w-[205px] lg:h-[122px]   /* YOUR REQUIRED SIZE */
                    ${isActive ? "scale-110" : "scale-100"}
                  `}
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col flex-1 mt-4 sm:mt-0 px-2 sm:px-4">
                      <p
                        className="
                    leading-relaxed 
                    font-semibold 
                    text-gray-100 
                    text-[14px] sm:text-[15px] md:text-[16px]
                  "
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination !static !bottom-0 !mt-4" />
        </div>
      </div>
    </section>
  );
}
