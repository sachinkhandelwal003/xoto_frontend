'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
      <div className="absolute inset-0 -z-10">
        <svg viewBox="0 0 1440 560" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.1"
            d="M0,100 C300,200 400,50 720,100 C1000,150 1140,50 1440,100 L1440,560 L0,560 Z"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 md:mb-16">
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

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {/* Card 1 – Landscaping */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="12" y="28" width="16" height="24" rx="2" fill="#10b981" />
              <rect x="28" y="20" width="16" height="32" rx="2" fill="#06b6d4" />
              <circle cx="44" cy="36" r="8" fill="#10b981" />
              <circle cx="20" cy="44" r="6" fill="#06b6d4" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Landscaping</h3>
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
             AI-powered landscaping and upgrade solutions.
          </p>
        </div>

        {/* Card 2 – Resale */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md">
              SALE
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Resale</h3>
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
          </p>
        </div>

        {/* Card 3 – Rental */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M20 32h24m-12-12v24" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              <path
                d="M16 20h32a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z"
                fill="#06b6d4"
              />
              <circle cx="44" cy="44" r="12" fill="#10b981" />
              <path d="M40 44h8" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">Rental</h3>
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
