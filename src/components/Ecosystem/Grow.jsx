import React from "react";
import GrowImage from "../../assets/img/Grow.png"; // replace with your image path
import wave1 from "../../assets/img/wave/wave1.png";

const CtaSection = () => {
  return (
    <section className="relative w-full flex justify-center items-center py-12 px-6 h-[450px]">
        <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
                <img
                  src={wave1}
                  alt=""
                  className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
                />
              </div>
      <div className="max-w-6xl absolute top-[-40px] bg-gradient-to-r from-[#03A4F4] to-[#6C0BEF] rounded-2xl text-white flex flex-col md:flex-row justify-between items-center p-10 md:p-14 shadow-lg  overflow-hidden">
        
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

     
    </section>
  );
};

export default CtaSection;
