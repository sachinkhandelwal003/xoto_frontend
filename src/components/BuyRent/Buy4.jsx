"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";

import waveint5 from "../../assets/img/wave/waveint5.png";
// import company1 from "../../assets/img/home/companylogo1.png";
// import company2 from "../../assets/img/home/companylogo2.png";
// import company3 from "../../assets/img/home/companylogo3.png";

export default function TrustPresenceSection() {
  const { t } = useTranslation("buy4"); // 👈 namespace

  const logos = [
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767441852149-Screenshot%202026-01-03%20172246.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767441895828-Screenshot%202026-01-03%20172336.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767441942079-Screenshot%202026-01-03%20172436.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767441959428-Screenshot%202026-01-03%20172532.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442087630-Screenshot%202026-01-03%20172639.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442118961-Screenshot%202026-01-03%20172703.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442157517-Screenshot%202026-01-03%20172731.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442211857-Screenshot%202026-01-03%20172849.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442254795-Screenshot%202026-01-03%20172951.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442321079-Screenshot%202026-01-03%20173017.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442352175-Screenshot%202026-01-03%20173040.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442445482-Screenshot%202026-01-03%20173113.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442525434-Screenshot%202026-01-03%20173140.png" },
    { icon: "https://xotostaging.s3.me-central-1.amazonaws.com/properties/1767442584681-Screenshot%202026-01-03%20173242.png" },
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
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] mb-16 md:mb-20 ">
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
            className="
              w-full h-full
              object-fit-contain
              rounded-full
              transition-all duration-300
              group-hover:scale-110
            "
/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
