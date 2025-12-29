import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

import home from "../../../assets/img/logo/logohome.png";
import connect from "../../../assets/img/logo/logoconnect.png";
import blitz from "../../../assets/img/logo/logoblitz.png";
import grid from "../../../assets/img/logo/logogrid.png";
import vault from "../../../assets/img/logo/logovault.png";
import aaImage from "../../../assets/img/aa.jpg";

const EcosystemSlider = () => {
  const { t } = useTranslation("home4"); // ⭐ translation namespace

  // ⭐ Each item must have LOGO + KEY
  const ecosystemData = [
    { logo: home, key: "home" },
    { logo: connect, key: "connect" },
    { logo: blitz, key: "blitz" },
    { logo: grid, key: "grid" },
    { logo: vault, key: "vault" },
  ];

  return (
    <section className="relative w-full bg-[var(--color-body)] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={aaImage} alt="City" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-white mb-10 drop-shadow-xl heading-light">
          {t("title")}
        </h2>

        {/* Swiper */}
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
          centeredSlides
          loop
          grabCursor
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1.05, spaceBetween: 2 },
            640: { slidesPerView: 1.12, spaceBetween: 3 },
            768: { slidesPerView: 1.22, spaceBetween: 4 },
            1024: { slidesPerView: 1.32, spaceBetween: 5 },
            1280: { slidesPerView: 1.38, spaceBetween: 6 },
            1536: { slidesPerView: 1.45, spaceBetween: 6 },
          }}
          className="!pb-16"
        >
          {ecosystemData.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`
                    group relative flex flex-col sm:flex-row items-center 
                    sm:items-center justify-center sm:justify-start text-center 
                    sm:text-left rounded-3xl min-h-[240px] sm:min-h-[260px] 
                    md:min-h-[280px] lg:min-h-[220px] w-full mx-auto 
                    max-w-[300px] xs:max-w-[380px] sm:max-w-[520px]
                    md:max-w-[700px] lg:max-w-[860px] xl:max-w-[900px]
                    px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10
                    transition-all duration-500 ease-out shadow-xl border border-white/10
                    ${
                      isActive
                        ? "scale-100 sm:scale-105 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-white"
                        : "scale-90 sm:scale-95 bg-gradient-to-br from-[#500286] via-black to-[#500286] text-gray-300 opacity-75"
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
                        lg:w-[205px] lg:h-[122px]
                        ${isActive ? "scale-110" : "scale-100"}
                      `}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col flex-1 mt-4 sm:mt-0 px-2 sm:px-4">
                    <p className="leading-relaxed font-bold text-[14px] sm:text-[15px] md:text-[16px]">
                      {/* ⭐ dynamic translation → home4.json → descriptions.key */}
                      {t(`descriptions.${item.key}`)}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination !static !bottom-0 !mt-4" />
      </div>
    </section>
  );
};

export default EcosystemSlider;
