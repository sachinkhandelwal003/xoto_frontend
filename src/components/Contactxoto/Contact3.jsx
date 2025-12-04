import React from "react";
import Image from "../../assets/img/Image2.jpg";

export default function QuickEnquiry() {
  return (
    <section
      className="
        relative bg-cover bg-center 
        py-14 sm:py-16 md:py-20 lg:py-24 
        text-white
      "
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-500/70"></div>

      {/* Content Wrapper */}
      <div
        className="relative z-10 max-w-6xl mx-auto 
        flex flex-col md:flex-row md:items-center 
        justify-between gap-10 px-5 sm:px-6 lg:px-8"
      >

        {/* LEFT SIDE TEXT */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-snug">
            Quick Enquiry
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            Need answers fast? Drop your details below <br className="hidden sm:block" />
            and we’ll get back to you shortly.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10 text-gray-800">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="text-sm font-medium">First Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium">Last Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email address*</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Number */}
            <div>
              <label className="text-sm font-medium">Number*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message*</label>
              <textarea
                rows="3"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md p-2 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#5C039B] text-white py-3 rounded-md font-semibold 
                hover:bg-opacity-90 transition"
              >
                Submit Enquiry
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
