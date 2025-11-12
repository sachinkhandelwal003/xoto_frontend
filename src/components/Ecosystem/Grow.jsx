import React from "react";
import GrowImage from "../../assets/img/Grow.png"; // replace with your image path

const CtaSection = () => {
  return (
    <section className="relative w-full flex justify-center items-center py-12 px-6">
      <div className="max-w-6xl w-full bg-gradient-to-r from-[#03A4F4] to-[#6C0BEF] rounded-2xl text-white flex flex-col md:flex-row justify-between items-center p-10 md:p-14 shadow-lg relative overflow-hidden">
        
        {/* Left Content */}
        <div className="md:w-2/3 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Grow. Earn. XOTO is your one-stop property ecosystem.
          </h2>
          <button className="bg-purple-700 hover:bg-purple-800 transition px-6 py-3 rounded-md font-semibold text-white shadow-md">
            Talk to our team today
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center relative">
          <img
            src={GrowImage}
            alt="Property ecosystem illustration"
            className="w-[300px] md:w-[360px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Decorative wave background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#e0f2fe"
            fillOpacity="1"
            d="M0,64L48,96C96,128,192,192,288,213.3C384,235,480,213,576,197.3C672,181,768,171,864,192C960,213,1056,267,1152,272C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CtaSection;
