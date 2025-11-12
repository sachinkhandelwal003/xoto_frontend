import React from "react";
import jjjImage from "../../assets/img/jjj.png";

const WhyPartnerSection = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Why Partner With <span className="text-black">XOTO?</span>
        </h2>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-16">
        <img
          src={jjjImage}
          alt="XOTO platform illustration"
          className="w-[400px] md:w-[480px] drop-shadow-2xl"
        />
      </div>

      {/* Progress Line */}
      <div className="flex justify-center mb-10">
        <div className="relative w-[85%] h-[4px] bg-gray-200 rounded-full">
          {/* Active Progress */}
          <div className="absolute left-0 top-0 h-[4px] w-[15%] bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Features in One Line */}
      <div className="relative z-10 flex justify-center items-start max-w-6xl mx-auto px-6 mb-20 space-x-10 flex-wrap md:flex-nowrap">
        {/* Feature 1 */}
        <div className="w-full sm:w-[45%] md:w-[22%] text-left">
          <p className="text-xs text-gray-400 mb-1">Feature 1</p>
          <h3 className="text-lg font-semibold text-purple-700 leading-snug">
            All-in-One Platform
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Connect with customers seamlessly.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="w-full sm:w-[45%] md:w-[22%] text-left">
          <p className="text-xs text-gray-400 mb-1">Feature 2</p>
          <h3 className="text-lg font-semibold text-gray-800 leading-snug">
            AI-Powered Tools
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Streamline workflows, track progress, and uncover revenue opportunities.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="w-full sm:w-[45%] md:w-[22%] text-left">
          <p className="text-xs text-gray-400 mb-1">Feature 3</p>
          <h3 className="text-lg font-semibold text-gray-800 leading-snug">
            Grow Your Business
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Expand your reach, accelerate deals, and maximize earnings.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="w-full sm:w-[45%] md:w-[22%] text-left">
          <p className="text-xs text-gray-400 mb-1">Feature 4</p>
          <h3 className="text-lg font-semibold text-gray-800 leading-snug">
            Transparency & Control
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Full visibility into projects, leads, and client interactions.
          </p>
        </div>
      </div>

      {/* Bottom Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            fill="#e0f2fe"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,144C672,181,768,235,864,240C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default WhyPartnerSection;
