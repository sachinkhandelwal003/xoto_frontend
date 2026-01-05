"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";
import partner1 from '../../assets/xoto_partners/xoto_logo1.png';
import partner2 from '../../assets/xoto_partners/xoto_logo2.png';
import partner3 from '../../assets/xoto_partners/xoto_logo3.png';
import partner4 from '../../assets/xoto_partners/xoto_logo4.png';
import partner5 from '../../assets/xoto_partners/xoto_logo5.png';
import partner6 from '../../assets/xoto_partners/xoto_logo6.png';
import partner7 from '../../assets/xoto_partners/xoto_logo7.png';
import partner8 from '../../assets/xoto_partners/xoto_logo8.png';
import partner9 from '../../assets/xoto_partners/xoto_logo9.png';
import partner10 from '../../assets/xoto_partners/xoto_logo10.png';
import partner11 from '../../assets/xoto_partners/xoto_logo11.png';
import waveint5 from "../../assets/img/wave/waveint5.png";

export default function TrustPresenceSection() {
  const { t } = useTranslation("buy4");

  // Define the logos array
  const logos = [
    { icon: partner1 },
    { icon: partner2 },
    { icon: partner3 },
    { icon: partner4 },
    { icon: partner5 },
    { icon: partner6 },
    { icon: partner7 },
    { icon: partner8 },
    { icon: partner9 },
    { icon: partner10 },
    { icon: partner11 },
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
          autoplay={{ 
            delay: 0,
            disableOnInteraction: false, 
            reverseDirection: true 
          }}
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
                  relative group bg-white cursor-pointer
                  w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44
                  rounded-full border-2 border-green-300
                  flex items-center justify-center
                  shadow-xl shadow-green-100/50
                  transition-all duration-300 ease-out
                  hover:scale-125 hover:shadow-2xl hover:shadow-green-200/50
                  overflow-hidden
                "
              >
                {/* Logo Container - Perfect circle with padding */}
                <div className="
                  w-[70%] h-[70%]
                  flex items-center justify-center
                  overflow-hidden
                  rounded-full
                  p-3
                ">
                  <img
                    src={logo.icon}
                    alt={`Partner Logo ${index % logos.length + 1}`}
                    className="
                      w-full h-full
                      object-contain
                      transition-all duration-300
                      group-hover:scale-110
                    "
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}