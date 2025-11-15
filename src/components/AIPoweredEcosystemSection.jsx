'use client';

import React from 'react';
import trusztImage from "./../assets/img/truszt.png"

export default function HomeJourneySection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-blue-900/50 to-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={trusztImage}
          alt="Luxury modern villa at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Circular Journey Graph */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your AI-Powered <br />
              <span className="text-white">Home Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              From landscaping to purchase and financing — XOTO personalizes every step to help you discover, design, and maintain your dream home on one seamless platform.
            </p>
            
            {/* Additional Features */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Smart Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">AI Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">360° Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300">Real-time Updates</span>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Circular Container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8">
              
              {/* Circular SVG Path */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
              >
                {/* Main Circular Path */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  stroke="url(#circular-gradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-60"
                />
                
                {/* Connecting Lines */}
                <path
                  d="M200 50 L200 80 M350 200 L320 200 M200 350 L200 320 M50 200 L80 200"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                
                <defs>
                  <linearGradient id="circular-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Journey Steps in Circular Layout */}
              <div className="relative w-full h-full">
                {/* Step 1: Top - Design */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md text-sm whitespace-nowrap">
                      Design
                    </button>
                  </div>
                </div>

                {/* Step 2: Right - Buy */}
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18l-2 12H5L3 3zm4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      </svg>
                    </div>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md text-sm whitespace-nowrap">
                      Buy
                    </button>
                  </div>
                </div>

                {/* Step 3: Bottom - Upgrade */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2v8m-5 5l5-5 5 5m-10 7h20" />
                      </svg>
                    </div>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md text-sm whitespace-nowrap">
                      Upgrade
                    </button>
                  </div>
                </div>

                {/* Step 4: Left - Maintain */}
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md text-sm whitespace-nowrap">
                      Maintain
                    </button>
                  </div>
                </div>

                {/* Center Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          
        </div>
      </div>
    </section>
  );
}