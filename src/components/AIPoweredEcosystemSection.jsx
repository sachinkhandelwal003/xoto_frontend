'use client';

import React, { useState } from 'react';
import Pool from "./../assets/img/home/Pool.png";
import wavemap from "./../assets/img/home/wavemap1.png";

export default function HomeJourneySection() {
  // small-screen toggle: 'both' | 'text' | 'image'
  const [mobileView, setMobileView] = useState('both');

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image (full-bleed, dimmed) */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={Pool}
          alt="Luxury modern villa at night"
          className="w-full h-full object-cover "
        />
        {/* gradient overlay for contrast */}
        {/* <div className="absolute " /> */}
      </div>



      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* LEFT: Text Content */}
          {/* On small screens we hide/show based on mobileView */}
          <div
            className={`text-white max-w-2xl transition-all duration-300
              ${mobileView === 'image' ? 'hidden' : 'block'}
            `}
          >
            <h1 className="heading-dark-1"
               style={{ color: "var(--color-black)" }}>
              Your AI-Powered <br/> Home Journey
            </h1>

            <p className="paragraph-dark text-black mt-6 max-w-lg">
           From landscaping to purchase and financing — XOTO personalizes every step to help you discover, design, and maintain your dream home on one seamless platform.
             </p>

            
          </div>

          {/* RIGHT: Wavemap Image */}
        
            <div className="relative w-full max-w-xl lg:max-w-3xl p-4 rounded-2xl">
              {/* Decorative border + shadow */}
              <div className="rounded-xl overflow-hidden flex justify-center ">
                <img
                  src={wavemap}
                  alt="Journey Map"
                  className="w-100 object-cover block"
                />
              </div>

            </div>
      

        </div>
      </div>
    </section>
  );
}
