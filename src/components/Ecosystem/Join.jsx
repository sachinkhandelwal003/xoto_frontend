import React from "react";
// import partnerImage from "../../assets/img/partner.png"; // replace with your actual image path
import joinImage from "../../assets/img/join.png";
import wave1 from "../../assets/img/wave/wave1.png";

const PartnerEcosystemSection = () => {
  return (
<section className="w-full relative bg-[var(--color-body)] py-16 md:py-20 px-6 md:px-12 z-10">

 <div className="absolute top-[-20px] lg:top-[-150px] left-0 w-full z-0 overflow-hidden">
       <img
  src={wave1}
  alt=""
  className="
    w-full min-w-[140%] -ml-[20%] scale-[1.8] 
    lg:scale-100 lg:min-w-full lg:ml-0 
    pointer-events-none select-none
    transform rotate-180
  "
/>

      </div>
<div className="relative z-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] bg-clip-text text-transparent">
              XOTO Partner Ecosystem
            </span>{" "}
            Today
          </h2>
          <img
            src={joinImage}
            alt="People collaborating"
            className="w-full max-w-md mt-4 md:mt-8"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md mx-auto border border-gray-100">
          <form className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address*
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company*
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stakeholder*
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select</option>
                  <option>Business Associate</option>
                  <option>Execution Partner</option>
                  <option>Developer</option>
                  <option>Investor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  placeholder="Enter number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message*
              </label>
              <textarea
                rows="3"
                placeholder="Enter your message"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md shadow-md transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;