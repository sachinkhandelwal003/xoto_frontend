'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import wave1 from "../../assets/img/wave/wave1.png";
import wave2 from "../../assets/img/wave/wave2.png";
import building from "../../assets/icons/Homeicons/building.png";
import rental from "../../assets/icons/Homeicons/rental.png";
import sale from "../../assets/icons/Homeicons/sale.png";
import company1 from "../../assets/img/home/companylogo1.png";
import company2 from "../../assets/img/home/companylogo2.png";
import company3 from "../../assets/img/home/companylogo3.png";

export default function TrustPresenceSection() {

  const logos = [
    { icon: company1 },
    { icon: company2 },
    { icon: company3 },
    { icon: company1 },
    { icon: company2 },
    { icon: company3 },
    { icon: company1 },
    { icon: company2 },
    { icon: company3 },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden bg-[var(--color-body)]">

      {/* Background Waves */}
 {/* Background Top Wave */}
<div
  className="
  
    absolute 
    top-[-120px]             /* mobile default */
    sm:top-[-180px]          /* small */
    md:top-[-260px]          /* medium */
    lg:top-[-420px]          /* large */
    xl:top-[-550px]          /* extra-large */
    left-0 w-full z-0 
  "
>
  <img
    src={wave2}
    alt=""
    className="
      w-[180%]               /* mobile wider */
      sm:w-[160%] 
      md:w-[150%]
      lg:w-full              /* normal at large screens */
      mx-auto
      scale-[1.6]            /* mobile scale */
      sm:scale-[1.4]
      md:scale-[1.2]
      lg:scale-100
      pointer-events-none 
      select-none
    "
  />
</div>


{/* Background Bottom Wave */}
<div
  className="
    absolute 
    bottom-[-40px]           /* mobile */
    sm:bottom-[-70px]
    md:bottom-[-100px]
    lg:bottom-[-130px]
    xl:bottom-[-160px]
    left-0 w-full z-0 overflow-hidden
  "
>
  <img
    src={wave1}
    alt=""
    className="
      w-[180%]
      sm:w-[165%]
      md:w-[150%]
      lg:w-full
      mx-auto
      scale-[1.6]
      sm:scale-[1.4]
      md:scale-[1.2]
      lg:scale-100
      pointer-events-none 
      select-none
    "
  />
</div>

      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl   mb-12 md:mb-16 relative z-20 heading-dark-1"
       style={{ color: "var(--color-black)" }}>
        Trust & Presence
      </h2>

      {/* Swiper */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] mb-16 md:mb-20">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={7}
          spaceBetween={40}
          loop={true}
          speed={3000}
          autoplay={{
            // delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          centeredSlides={true}
          className="!overflow-visible"
          onProgress={(swiper) => {
            swiper.slides.forEach((slide) => {
              const slideProgress = slide.progress;
              const scale = 1 - Math.min(Math.abs(slideProgress * 0.55), 0.8);
              const opacity = 1 - Math.min(Math.abs(slideProgress * 0.35), 0.6);

              slide.style.transform = `scale(${scale})`;
              slide.style.opacity = opacity;
            });
          }}
          onSetTranslate={(swiper) => {
            swiper.slides.forEach((slide) => {
              const slideProgress = slide.progress;
              const scale = 1 - Math.min(Math.abs(slideProgress * 0.25), 0.4);
              const opacity = 1 - Math.min(Math.abs(slideProgress * 0.35), 0.6);

              slide.style.transform = `scale(${scale})`;
              slide.style.opacity = opacity;
            });
          }}
        >

          {logos.concat(logos).map((logo, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex justify-center transition-all duration-500 ease-out"
            >
              {/* HOVER-SCALE CIRCLE */}
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

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-purple-200/30 blur-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

            </SwiperSlide>
          ))}

        </Swiper>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 mt-20 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto px-4 pt-20 sm:px-6 relative z-10">

        {/* Card 1 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-purple-400 hover:shadow-2xl hover:shadow-purple-500 transition-all duration-300 hover:-translate-y-3 border border-white/50">
          <div className="w-16 h-16 mx-auto mb-6">
            <img src={building} alt="" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">Landscaping</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-purple-400 hover:shadow-2xl hover:shadow-purple-500 transition-all duration-300 hover:-translate-y-3 border border-white/50">
          <div className="w-16 h-16 mx-auto mb-6">
            <img src={sale} alt="" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">Resale</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Reimagine your home with effortless, AI-powered solutions.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-purple-400 hover:shadow-2xl hover:shadow-purple-500 transition-all duration-300 hover:-translate-y-3 border border-white/50">
          <div className="w-16 h-16 mx-auto mb-6">
            <img src={rental} alt="" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">Rental</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Reimagine your space with effortless, AI-powered upgrade solutions.
          </p>
        </div>

      </div>
    </section>
  );
}
