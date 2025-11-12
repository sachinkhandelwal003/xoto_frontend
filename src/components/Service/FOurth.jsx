'use client';

import React from 'react';

export default function OurPartners() {
  const partners = [
    { name: 'UBE RTIES', color: 'text-red-600' },
    { name: 'DAMAC', color: 'text-black' },
    { name: 'SOBHA REALTY', color: 'text-black' },
    { name: 'DANUBE PROPERTIES', color: 'text-red-600' },
    { name: 'DAMAC', color: 'text-black' },
    { name: 'SOBHA REALTY', color: 'text-black' },
    { name: 'DANUBE PROPERTIES', color: 'text-red-600' },
    // { name: 'DAMAC', color: 'text-black' },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 py-16">
        {/* Wavy Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full -z-10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#waveGradient)"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="50%" stopColor="#f9e2f6" />
              <stop offset="100%" stopColor="#e9d5ff" />
            </linearGradient>
          </defs>
        </svg>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Our Partners
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <p
                  className={`text-sm md:text-base font-semibold tracking-wider uppercase ${partner.color} text-center leading-tight px-2`}
                >
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}