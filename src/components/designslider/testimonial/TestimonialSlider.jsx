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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8 sm:mb-10 md:mb-12 lg:mb-16 drop-shadow-xl tracking-tight">
          Our Tech Ecosystem
        </h2>

      

<div className="w-full">
  <Swiper
    modules={[Pagination, Navigation]}
    pagination={{
      clickable: true,
      bulletActiveClass: "swiper-pagination-bullet-active !bg-white !opacity-100",
      bulletClass: "swiper-pagination-bullet !bg-white/50 !w-2 !h-2 md:!w-3 md:!h-3",
    }}
    navigation={{ prevEl: ".custom-swiper-button-prev", nextEl: ".custom-swiper-button-next" }}
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
              group relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10
              mx-auto w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-3xl lg:max-w-5xl
              rounded-2xl sm:rounded-3xl
              px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16 lg:py-16
              transition-all duration-500 ease-out
              shadow-xl backdrop-blur-xl border border-white/10
              ${isActive
                ? "scale-100 sm:scale-105 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-white ring-4 ring-purple-500/30"
                : "scale-90 sm:scale-95 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-gray-200 opacity-75"}
            `}
          >
            <div className="flex-shrink-0 p-2">
              <div className="relative">
                <img
                  src={logoNew}
                  alt={`${item.title} Logo`}
                  className={`w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain drop-shadow-2xl transition-transform duration-500 ${isActive ? "scale-110" : "scale-100"}`}
                />
                {isActive && <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse"></div>}
              </div>
            </div>

            <div className="flex flex-col text-center sm:text-left flex-1 space-y-2 sm:space-y-3 md:space-y-4">
              <h3 className="font-extrabold tracking-tight text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {item.title}
              </h3>
              <p className="leading-relaxed opacity-90 max-w-xl mx-auto sm:mx-0 text-xs xs:text-sm sm:text-base md:text-lg lg:text-lg text-gray-100">
                {item.description}
              </p>
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>

  <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
    <button className="custom-swiper-button-prev w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 border border-white/30">
      <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button className="custom-swiper-button-next w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 border border-white/30">
      <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <div className="swiper-pagination !static !bottom-0 !mt-4"></div>
</div>


      </div>
    </section>
  );
}