'use client';

import React from 'react';
import Pool from "./../assets/img/home/Pool.png";
import wavemap from "./../assets/img/home/wavemap.png";

export default function HomeJourneySection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={Pool}
          alt="Luxury modern villa at night"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for better text readability */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT: Text Content */}
          <div className="text-black max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl  mb-6 lg:mb-8">
              Your AI-Powered <br />Home Journey
            </h1>
            <p className="text-lg md:text-xl text-black leading-relaxed mb-8 lg:mb-10">
              From landscaping to purchase and financing — XOTO personalizes every step to help you discover, design, and maintain your dream home on one seamless platform.
            </p>
          </div>

          {/* RIGHT: Wavemap Image */}
   <div className="flex justify-center lg:justify-end items-center">
  <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl p-30">
    <img
      src={wavemap}
      alt="Journey Map"
      className="w-full "
    />
  </div>
</div>



        </div>
      </div>
    </section>
  );
}