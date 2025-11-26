import React from "react";
import waveint6 from "../../assets/img/wave/waveint6.png";
import waveint from "../../assets/img/wave/waveint4.png";
import image from "../../assets/img/bggg.png";

export default function HeroSection() {
  return (
    <section className="relative w-full  bg-white flex items-center justify-start px-0 py-16 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-18 items-center">

        {/* UPPER WAVE */}
        <div className="absolute top-[0px] left-0 w-full z-0 pointer-events-none select-none">
          <img src={waveint6} alt="" className="w-full object-cover" />
        </div>

        {/* BOTTOM WAVE */}
        <div className="absolute -bottom-30 left-0 w-full z-0 pointer-events-none select-none">
          <img src={waveint} alt="" className="w-full object-cover" />
        </div>

        {/* LEFT CONTENT */}
        <div className="space-y-10 relative z-20 text-center pl-0">

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Where Dreams <br /> Meet Doorsteps
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Find, Sell & Finance Your Dream Home <br />
            Smarter, Faster, Easier
          </p>

          {/* IMAGE STARTS AT LEFT EDGE */}
          <div>
            <img
              src={image}
              alt="House"
              className="w-[520px] object-contain mt-6"
            />
          </div>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="bg-white shadow-2xl rounded-2xl p-5 w-full max-w-lg relative z-20 border justify-self-end-safe">
          <h2 className="text-2xl font-bold text-gray-900">Discover, Decide, Deal</h2>
          <p className="text-gray-500 mb-8">All in One Place.</p>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name*"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email address*"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="number"
                placeholder="Number*"
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select className="border border-gray-300 rounded-lg p-3 text-gray-500">
                <option>I am Looking to*</option>
                <option>Buy</option>
                <option>Sell</option>
                <option>Rent</option>
              </select>

              <select className="border border-gray-300 rounded-lg p-3 text-gray-500 ">
                <option>Preferred City*</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Budget*"
              className="border border-gray-300 rounded-lg p-3 w-full"
            />

            <button
              type="submit"
              className="w-full bg-[#5C039B] text-white font-semibold py-3 rounded-lg  transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
