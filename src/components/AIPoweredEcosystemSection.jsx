'use client';

import React from 'react';
import trusztImage from "./../assets/img/truszt.png";

export default function HomeJourneySection() {
  // Define the 6 journey badges with precise positions
  const journeyBadges = [
    { id: 1, label: "Design",      top: "15%",  left: "20%",  color: "from-purple-500 to-purple-700" },
    { id: 2, label: "Buy",        top: "10%",  right: "18%", color: "from-cyan-500 to-teal-600" },
    { id: 3, label: "Upgrade",    bottom: "20%", right: "15%", color: "from-emerald-500 to-green-600" },
    { id: 4, label: "Maintain",   bottom: "18%", left: "18%", color: "from-indigo-500 to-blue-600" },
    { id: 5, label: "Finance",    top: "42%",  left: "8%",   color: "from-amber-500 to-orange-600" },
    { id: 6, label: "Resell",     top: "45%",  right: "8%",  color: "from-rose-500 to-pink-600" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={trusztImage}
          alt="Luxury modern villa at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Text Content */}
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Your AI-Powered <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Home Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              From landscaping to purchase and financing — XOTO personalizes every step to help you discover, design, and maintain your dream home on one seamless platform.
            </p>

        
          </div>

          {/* RIGHT: Central Home + Floating Badges */}
          <div className="relative flex justify-center items-center h-[600px]">
            
            {/* Glowing Outer Ring */}
            <div className="absolute w-96 h-96 rounded-full border-4 border-white/10 shadow-2xl shadow-purple-500/20"></div>

            {/* Animated Gradient Orbit Ring */}
            <div className="absolute w-[440px] h-[440px] rounded-full animate-spin-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-2xl"></div>
            </div>

            {/* Central Home Icon */}
            <div className="relative z-30 w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/60 border-8 border-white/30">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V4c0-1.1-.9-2-2-2H6C4.9 2 4 2.9 4 4v7H3c-.6 0-1 .4-1 1s.4 1 1 1z"/>
              </svg>
            </div>

            {/* Floating Journey Badges - Absolutely Positioned */}
            {journeyBadges.map((badge) => (
              <div
                key={badge.id}
                className="absolute flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-white/20 whitespace-nowrap transition-all duration-500 hover:scale-110 hover:bg-white/20 hover:border-white/40 group cursor-pointer"
                style={{
                  top: badge.top || "auto",
                  left: badge.left || "auto",
                  right: badge.right || "auto",
                  bottom: badge.bottom || "auto",
                }}
              >
                {/* Colored Icon Circle */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${badge.color}`}>
                  <span className="text-white text-lg font-bold">{badge.id}</span>
                </div>
                <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                  {badge.label}
                </span>

                {/* Hover Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}

            {/* Optional: Curved Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 600 600">
              <path
                d="M 300 100 Q 450 180, 480 300 Q 450 420, 300 500 Q 150 420, 120 300 Q 150 180, 300 100"
                stroke="url(#journeyGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 10"
              />
              <defs>
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Custom Slow Spin Animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>
    </section>
  );
}