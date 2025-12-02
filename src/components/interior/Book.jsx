"use client";

import React from "react";
import helloImage from "../../assets/img/hello.jpg"; // update your image path

export default function ConsultationSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-900">

      {/* Background Image */}
      <img
        src={helloImage}
        alt="Luxury living room"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(92, 3, 155, 0.85) 20%, rgba(3, 164, 244, 0.85) 95%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Flex layout: small screens → column, large screens → row */}
        <div className="flex flex-col lg:flex-row items-start justify-start gap-12 lg:gap-20">

          {/* LEFT SIDE TEXT */}
          <div className="w-full lg:w-auto text-center lg:text-left order-0 lg:order-0 mb-6 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
              Book Consultation
            </h2>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-md mx-auto lg:mx-0">
              One simple form to connect with XOTO experts for tailored interior design advice and project planning.
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full max-w-xl">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
              <form className="space-y-6">

                {/* NAME ROW */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[45%]">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <sup className="text-purple-600">*</sup>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1 min-w-[45%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <sup className="text-purple-600">*</sup>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* EMAIL + PHONE ROW */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[45%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <sup className="text-purple-600">*</sup>
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-1 min-w-[45%]">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number <sup className="text-purple-600">*</sup>
                    </label>
                    <input
                      type="tel"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message <sup className="text-purple-600">*</sup>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter your message..."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#5C039B] py-4 text-base sm:text-lg 
                  font-semibold text-white transition-all hover:bg-purple-700"
                >
                  Book Free Consultation
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
