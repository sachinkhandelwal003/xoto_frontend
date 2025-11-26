'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import waveint5 from "../../assets/img/wave/waveint5.png";

export default function TrustPresenceSection() {
  const logos = [
    { name: 'DAMAC', color: 'text-gray-800' },
    { name: 'SOBHA', sub: 'REALTY', color: 'text-gray-800', subColor: 'text-gray-600' },
    { name: 'DANUBE', sub: 'PROP.', color: 'text-red-600', subColor: 'text-gray-600' },
    { name: 'EMAAR', color: 'text-emerald-700' },
    { name: 'ALDAR', color: 'text-gray-800' },
    { name: 'NAKHEEL', color: 'text-gray-700' },
    { name: 'AZIZI', color: 'text-blue-700' },
    { name: 'MERAAS', color: 'text-indigo-700' },
    { name: 'DEYAAR', color: 'text-cyan-700' },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-cyan-50 to-white">
      {/* Background Wave */}
     
         {/* BOTTOM WAVE BACKGROUND IMAGE */}
                          <div className="absolute bottom-90 left-0 w-full z-0 pointer-events-none select-none">
                            <img
                              src={waveint5}
                              alt=""
                              className="w-full object-cover"
                            />
                          </div>

      {/* Title */}
      <h2 className=" relative z-20 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-12 md:mb-16">
        Trust & Presence
      </h2>

      {/* ✅ Full-width Swiper */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] mb-16 md:mb-20">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={40}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true, // move right to left
          }}
          className="!overflow-visible"
        >
          {logos.concat(logos).map((logo, index) => (
            <SwiperSlide
              key={index}
              className="!w-auto flex justify-center"
            >
              <div
                className={`relative group
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                  rounded-full bg-white shadow-xl
                  flex flex-col items-center justify-center
                  border border-gray-100
                  transition-all duration-300
                  hover:scale-110 hover:shadow-2xl
                `}
              >
                <div className="text-center">
                  <span
                    className={`block font-bold leading-tight ${logo.color}
                      text-xl sm:text-2xl md:text-3xl lg:text-4xl
                    `}
                  >
                    {logo.name}
                  </span>
                  {logo.sub && (
                    <span
                      className={`block font-medium leading-none ${logo.subColor}
                        text-sm sm:text-base md:text-lg
                      `}
                    >
                      {logo.sub}
                    </span>
                  )}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
    </section>
  );
}
