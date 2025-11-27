"use client";

import React from "react";
import helloImage from "../../assets/img/hello.jpg"; // ← update your image path

export default function Consultation() {
  return (
    <section className="relative  w-full overflow-hidden bg-gray-900">
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

      {/* MAIN CONTENT */}
      {/* <div className="relative z-10 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-0"> */}
<div className="relative z-10 mx-auto flex flex-col-reverse lg:flex-row items-start justify-start max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 gap-25">

        {/* LEFT SIDE TEXT */}
        <div className="max-w-xl text-white mt-10 lg:mt-10 text- lg:text-left ">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold whitespace-nowrap gap-20">
            Book Consultation
          </h2>
          <p className="mt-8 text-2xl text-white  mx-auto lg:mx-0 font-normal">
            One simple form to connect with XOTO experts for tailored interior design advice and project planning.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full max-w-xl">
          <div className="rounded-xl bg-white p-6 sm:p-8 shadow-2xl">
            <form className="space-y-6">
              
              {/* NAME ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <sup className="text-purple-600">*</sup>
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border border-purple-500 px-4 py-3 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
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

              {/* EMAIL + PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number <sup className="text-purple-600">*</sup>
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
                className="w-full rounded-xl bg-[#5C039B] py-4 text-base sm:text-lg 
                font-semibold text-white"
              >
                Book Free Consultation
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}