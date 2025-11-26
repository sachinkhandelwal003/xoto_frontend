// src/components/MortgageCalculator.jsx
'use client';

import React, { useState } from 'react';
import addImage from '../../assets/img/add.png';

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState('borrow');

  const tabs = [
    { id: 'borrow', label: 'How Much Can I Borrow?' },
    { id: 'payment', label: 'Monthly Payment Estimate' },
    { id: 'afford', label: 'Affordability Check' },
  ];

  // Same form for all tabs
  const renderForm = () => {
    const inputClass =
      'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition';

    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Value<sup className="text-red-500">*</sup>
          </label>
          <input type="text" placeholder="₹ 50,00,000" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment<sup className="text-red-500">*</sup>
          </label>
          <input type="text" placeholder="₹ 10,00,000" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (Years)<sup className="text-red-500">*</sup>
          </label>
          <input type="text" placeholder="30" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)<sup className="text-red-500">*</sup>
          </label>
          <input type="text" placeholder="8.5" className={inputClass} />
        </div>
      </>
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Plan Your Mortgage with Confidence
        </h2>

        {/* TABS: Container with blue-green gradient */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex rounded-full p-1 shadow-lg"
            style={{
              background: 'linear-gradient(167.12deg, #03A4F4 8.77%, #64EF0A 90.2%)',
            }}
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-5 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap
                  ${idx !== 0 ? 'ml-1' : ''}
                `}
                style={{
                  // Active tab: Purple gradient + white text
                  ...(activeTab === tab.id && {
                    background: 'linear-gradient(90deg, #5C039B 0%, #5C039B 100%)',
                  }),
                  // Inactive: Transparent (inherits container gradient)
                  ...(activeTab !== tab.id && {
                    background: 'transparent',
                  }),
                }}
              >
                {/* Thin inner white border for inactive tabs */}
                {activeTab !== tab.id && (
                  <span
                    className="absolute inset-0 rounded-full border border-white/40 pointer-events-none"
                  />
                )}

                <span
                  className={`relative z-10 font-medium ${
                    activeTab === tab.id ? 'text-white' : 'text-white'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <form className="space-y-5">{renderForm()}</form>

            {/* Submit Button */}
            <button
              type="button"
              className="mt-6 w-full text-white font-semibold text-lg py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #5C039B 0%, #5C039B 100%)',
                boxShadow: '0 4px 15px rgba(92, 3, 155, 0.4)',
              }}
            >
              Get Pre-Approved
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Estimates are indicative. Final terms subject to credit approval.
            </p>
          </div>

          {/* Building Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -bottom-10 -left-20 -right-20 -z-10">
                <svg viewBox="0 0 1000 300" className="w-full h-64 text-green-100" preserveAspectRatio="none">
                  <path d="M0,100 Q250,50 500,100 T1000,100 L1000,300 L0,300 Z" fill="currentColor" opacity="0.6" />
                  <path d="M0,150 Q250,100 500,150 T1000,150 L1000,300 L0,300 Z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-3xl shadow-2xl">
                <img
                  src={addImage}
                  alt="Property"
                  className="w-full max-w-md rounded-2xl shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}