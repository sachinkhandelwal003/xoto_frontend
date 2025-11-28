import React from "react";
// import Image from "./path-to-your-image.jpg"; // <-- update this path
import Image from '../../assets/img/Image2.jpg'

export default function QuickEnquiry() {
  return (
    <section
      className="relative bg-cover bg-center py-16 md:py-24 text-white"
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-500/70"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
        
        {/* Left Content */}
        <div className="md:w-1/2 pb-50">
          <h2 className="text-5xl font-semibold mb-4">Quick Enquiry</h2>
          <p className="text-xl text-gray-200">
      Need answers fast? Drop your details <br /> below and we’ll get back to you shortly.
          </p>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-10 text-gray-800">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="text-sm font-medium">First Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Last Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email address*</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Number*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message*</label>
              <textarea
                rows="3"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md p-2 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#5C039B] text-white py-3 rounded-md font-semibold 
                transition"
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
