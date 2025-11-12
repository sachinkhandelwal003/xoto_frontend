'use client';

import React from 'react';
// import trusttImage from "../assets/img/buy.jpg"
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
          {/* Left: Text */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your AI-Powered <br />
              <span className="text-white">Home Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              From landscaping to purchase and financing — XOTO personalizes every step to help you discover, design, and maintain your dream home on one seamless platform.
            </p>
          </div>

          {/* Right: Journey Path */}
          <div className="relative flex justify-center">
            {/* Curved SVG Path */}
            <svg
              className="absolute w-full h-full top-0 left-0 -z-10"
              viewBox="0 0 600 600"
              fill="none"
            >
              <path
                d="M100,150 Q200,100 300,150 Q400,200 450,300 Q400,400 300,450 Q200,500 100,450"
                stroke="url(#path-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-70"
              />
              <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Journey Steps */}
            <div className="space-y-16">
              {/* Step 1: Design */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md">
                  Design
                </button>
              </div>

              {/* Step 2: Buy */}
              <div className="flex items-center gap-4 ml-20">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18l-2 12H5L3 3zm4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  </svg>
                </div>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md">
                  Buy
                </button>
              </div>

              {/* Step 3: Upgrade */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2v8m-5 5l5-5 5 5m-10 7h20" />
                  </svg>
                </div>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md">
                  Upgrade
                </button>
              </div>

              {/* Step 4: Maintain */}
              <div className="flex items-center gap-4 ml-32">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md">
                  Maintain
                </button>
              </div>

              {/* Step 5: Resell */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v4H3V3zm4 6h14v12H7V9zm2 2v8h10v-8H9z" />
                  </svg>
                </div>
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all shadow-md">
                  Resell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}