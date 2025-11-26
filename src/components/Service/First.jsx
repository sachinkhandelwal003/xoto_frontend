// src/components/HomeLoanHero.jsx
'use client';

import React from 'react';

export default function HomeLoanHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Smarter Home Loans, Simplified
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          Compare lenders, get pre-approved, and secure your dream home faster — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Get Pre-Approved Button with Gradient */}
          <button
            className="text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[220px]"
            style={{
              background: 'linear-gradient(90deg, #5C039B 0%, #5C039B 100%)',
              boxShadow: '0 4px 15px rgba(92, 3, 155, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #4A0380 0%, #4A0380 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #5C039B 0%, #5C039B 100%)';
            }}
          >
            Get Pre-Approved
          </button>

          {/* Calculate Mortgage Button */}
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 min-w-[220px]">
            Calculate Your Mortgage
          </button>
        </div>
      </div>

     
    </section>
  );
}