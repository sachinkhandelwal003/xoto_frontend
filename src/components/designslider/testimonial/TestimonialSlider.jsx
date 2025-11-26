import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logoNew from "../../../assets/img/logoNew.png";
import aaImage from "../../../assets/img/aa.jpg";
import home from "../../../assets/img/logo/logohome.png";
import connect from "../../../assets/img/logo/logoconnect.png";
import blitz from "../../../assets/img/logo/logoblitz.png";
import grid from "../../../assets/img/logo/logogrid.png";
import vault from "../../../assets/img/logo/logovault.png";

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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={aaImage}
          alt="City landscape"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 sm:mb-10 md:mb-12 lg:mb-16 drop-shadow-xl tracking-tight">
          Our Tech Ecosystem
        </h2>

        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active !bg-white !opacity-100",
              bulletClass: "swiper-pagination-bullet !bg-white/50 !w-2 !h-2 md:!w-3 md:!h-3",
            }}
            navigation={{ 
              prevEl: ".custom-swiper-button-prev", 
              nextEl: ".custom-swiper-button-next" 
            }}
            autoplay={{
              delay: 1000, // 1 second auto-slide
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1.1, spaceBetween: 24 },
              768: { slidesPerView: 1.2, spaceBetween: 30 },
              1024: { slidesPerView: 1.3, spaceBetween: 40 },
              1280: { slidesPerView: 1.3, spaceBetween: 60 },
            }}
            className="!pb-10 sm:!pb-12 md:!pb-14 lg:!pb-16"
          >
            {ecosystemData.map((item, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`
                      group relative flex flex-col sm:flex-row items-center justify-center sm:items-start
                      gap-4 sm:gap-6 md:gap-6 lg:gap-8
                      mx-auto w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl
                      rounded-3xl
                      px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10
                      transition-all duration-500 ease-out
                      shadow-xl border border-white/10
                      ${isActive
                        ? "scale-100 sm:scale-105 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-white"
                        : "scale-90 sm:scale-95 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-gray-200 opacity-75"}
                    `}
                  >

                    {/* LEFT: Logo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={item.logo}
                          alt="Logo"
                          className={`w-28 h-20 sm:w-32 sm:h-24 md:w-36 md:h-28 lg:w-40 lg:h-32 transition-all duration-300 ${
                            isActive ? "scale-110" : "scale-100"
                          }`}
                        />
                      </div>
                    </div>

                    {/* RIGHT: Description ONLY */}
                    <div className="flex flex-col text-center justify-center sm:text-left flex-1 space-y-2 sm:space-y-3 md:space-y-3">
                      <p className="leading-relaxed opacity-90 font-bold max-w-md mx-auto sm:mx-0 text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg text-gray-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination !static !bottom-0 !mt-4"></div>
        </div>
      </div>
    </section>  
  );
}