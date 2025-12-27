"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";

import waveint5 from "../../assets/img/wave/waveint5.png";
import company1 from "../../assets/img/home/companylogo1.png";
import company2 from "../../assets/img/home/companylogo2.png";
import company3 from "../../assets/img/home/companylogo3.png";

export default function TrustPresenceSection() {
  const { t } = useTranslation("buy4"); // 👈 namespace

  const logos = [
    { icon: company1 },
    { icon: company2 },
    { icon: company3 },
    { icon: company1 },
    { icon: company2 },
    { icon: company3 },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden bg-[var(--color-body)]">
      
      {/* Background Wave */}
      <div className="absolute bottom-90 left-0 w-full z-0 pointer-events-none select-none">
        <img src={waveint5} alt="" className="w-full object-cover" />
      </div>

      {/* Title */}
      <h2
        className="text-center text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 relative z-20 heading-dark-1"
        style={{ color: "var(--color-black)" }}
      >
        {t("title")}
      </h2>

      {/* Swiper */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] mb-16 md:mb-20">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={7}
          spaceBetween={40}
          loop
          speed={3000}
          autoplay={{ disableOnInteraction: false, reverseDirection: true }}
          centeredSlides
          className="!overflow-visible"
        >
          {logos.concat(logos).map((logo, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex justify-center transition-all duration-500 ease-out"
            >
              <div
                className="
                  relative group bg-[var(--color-body)] cursor-pointer
                  w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48
                  rounded-full border border-green-300
                  flex items-center justify-center
                  shadow-xl
                  transition-all duration-300 ease-out
                  hover:scale-125
                "
              >
                <img
                  src={logo.icon}
                  alt="Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
