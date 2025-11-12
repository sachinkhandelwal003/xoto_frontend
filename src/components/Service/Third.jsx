// src/components/MortgageSteps.jsx
'use client';

import React from 'react';
import logo from '../../assets/img/logoNew.png';

// Your step images (inside circles)
import step1 from '../../assets/img/banner.png';
import step2 from '../../assets/img/add.png';
import step3 from '../../assets/img/3design.png';
import step4 from '../../assets/img/BANNER2.png';

export default function Third() {
  const steps = [
    {
      title: 'Consultation & Pre-Check',
      desc: 'We assess your finances and suggest options.',
      color: 'from-cyan-400 to-blue-500',
      icon: step1,
    },
    {
      title: 'Offer Comparison',
      desc: 'Multiple lenders evaluated for best fit.',
      color: 'from-green-400 to-emerald-500',
      icon: step2,
    },
    {
      title: 'Select & Apply',
      desc: 'Choose your offer, we handle documentation.',
      color: 'from-purple-500 to-indigo-600',
      icon: step3,
    },
    {
      title: 'Approval & Disbursement',
      desc: 'Funds released with our support.',
      color: 'from-pink-500 to-rose-500',
      icon: step4,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Logo + Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-600 shadow-xl mb-6 p-3">
            <img
              src={logo}
              alt="Xoto Vault"
              className="w-full h-full rounded-full object-contain"
            />
          </div>
          <p className="text-2xl font-semibold text-gray-700">
            Your Mortgage, Simplified in 4 Steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 via-green-300 to-purple-300 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle */}
                <div
                  className={`
                    relative w-24 h-24 rounded-full flex items-center justify-center
                    shadow-lg transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:shadow-2xl
                    bg-gradient-to-br ${step.color} p-2
                  `}
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <span className="absolute inset-0 rounded-full border-4 border-white/60"></span>
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-16 h-16 rounded-full object-cover z-10"
                  />
                </div>

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-1 h-20 bg-gradient-to-b from-cyan-300 to-green-300 mx-auto mt-6"></div>
                )}

                {/* Title & Description */}
                <div className="mt-8 max-w-xs">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Background */}
        <div className="mt-20 -mb-40 overflow-hidden">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-80 text-cyan-50"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,170.7C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              opacity="0.6"
            />
            <path
              fill="currentColor"
              d="M0,220L48,210C96,200,192,180,288,176C384,171,480,181,576,197.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              opacity="0.4"
            />
          </svg>
        </div>

      </div>
    </section>
  );
}