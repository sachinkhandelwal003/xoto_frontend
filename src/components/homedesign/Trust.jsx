'use client';

import React from 'react';

export default function TrustPresenceSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white via-cyan-50 to-white">
      {/* Wave Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          viewBox="0 0 1440 560"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Trust & Presence
        </h2>

        {/* ---------- LOGO ROW – BIG CIRCLE + MEDIUM TEXT ---------- */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10 mb-20">
          {/* URE CITIES */}
          <div className="flex flex-col items-center text-center">
            {/* <span className="text-base font-bold text-red-600">URE</span>
            <span className="text-sm text-gray-600">CITIES</span> */}
          </div>

          {/* DAMAC */}
          <div className="bg-white rounded-full p-4 shadow-lg w-50 h-50 flex items-center justify-center border border-gray-100">
            <span className="text-4xl font-bold text-gray-800 leading-tight">DAMAC</span>
          </div>

          {/* SOBHA REALTY */}
          <div className="bg-white rounded-full p-3 shadow-lg w-50 h-50 flex flex-col items-center justify-center border border-gray-100 gap-0.5">
            <span className="text-4xl font-bold text-gray-800 leading-tight">SOBHA</span>
            <span className="text-xl font-medium text-gray-600 leading-none">REALTY</span>
          </div>

          {/* DANUBE PROPERTIES */}
          <div className="bg-white rounded-full p-3 shadow-lg w-50 h-50 flex flex-col items-center justify-center border border-gray-100 gap-0.5">
            <span className="text-4xl font-bold text-red-600 leading-tight">DANUBE</span>
            <span className="text-xl font-medium text-gray-600 leading-none">PROP.</span>
          </div>

          {/* DAMAC */}
          {/* <div className="bg-white rounded-full p-4 shadow-lg w-50 h-50 flex items-center justify-center border border-gray-100">
            <span className="text-4xl font-bold text-gray-800 leading-tight">DAMAC</span>
          </div> */}

          {/* SOBHA REALTY */}
          {/* <div className="bg-white rounded-full p-3 shadow-lg w-50 h-50 flex flex-col items-center justify-center border border-gray-100 gap-0.5">
            <span className="text-4xl font-bold text-gray-800 leading-tight">SOBHA</span>
            <span className="text-xl font-medium text-gray-600 leading-none">REALTY</span>
          </div> */}

          {/* DANUBE PROPERTIES */}
          {/* <div className="bg-white rounded-full p-3 shadow-lg w-50 h-50 flex flex-col items-center justify-center border border-gray-100 gap-0.5">
            <span className="text-4xl font-bold text-red-600 leading-tight">DANUBE</span>
            <span className="text-xs font-medium text-gray-600 leading-none">PROP.</span>
          </div> */}

          {/* DAMAC */}
          <div className="bg-white rounded-full p-4 shadow-lg w-50 h-50 flex items-center justify-center border border-gray-100">
            <span className="text-4xl font-bold text-gray-800 leading-tight">DAMAC</span>
          </div>
        </div>

        {/* ---------- SERVICE CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 – Landscaping */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="12" y="28" width="16" height="24" rx="2" fill="#10b981"/>
                <rect x="28" y="20" width="16" height="32" rx="2" fill="#06b6d4"/>
                <circle cx="44" cy="36" r="8" fill="#10b981"/>
                <circle cx="20" cy="44" r="6" fill="#06b6d4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Landscaping</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
            </p>
          </div>

          {/* Card 2 – Resale */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold text-base px-4 py-2 rounded-lg shadow-md">
                SALE
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Resale</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
            </p>
          </div>

          {/* Card 3 – Rental */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 32h24m-12-12v24" stroke="#10b981" strokeWidth="4" strokeLinecap="round"/>
                <path d="M16 20h32a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z" fill="#06b6d4"/>
                <circle cx="44" cy="44" r="12" fill="#10b981"/>
                <path d="M40 44h8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Rental</h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}