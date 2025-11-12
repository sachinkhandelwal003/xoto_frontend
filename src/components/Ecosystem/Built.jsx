import React, { useState } from "react";
import realImage from "../../assets/img/real.png"; // replace with your image

const tabs = [
  "Business Associates",
  "Execution Partner",
  "Strategic Alliances",
  "Developers",
  "Financial Institution",
];

const StakeholderSection = () => {
  const [activeTab, setActiveTab] = useState("Business Associates");

  return (
    <section className="w-full bg-white py-20">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Built for{" "}
          <span className="bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] bg-clip-text text-transparent">
            Every Stakeholder
          </span>
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Our platform serves diverse stakeholders in the home ecosystem, each with
          tailored solutions and benefits.
        </p>
      </div>

      {/* Tabs container with gradient background only wrapping tabs */}
      <div className="flex justify-center mb-16 px-4">
        <div
          className="inline-flex flex-wrap justify-center gap-3 px-6 py-4 rounded-xl shadow-md"
          style={{
            background: "linear-gradient(167.12deg, #03A4F4 8.77%, #64EF0A 90.2%)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-purple-700 text-white shadow-md"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 pb-10">
        {/* Left Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">{activeTab}</h3>

          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-1">Who</h4>
            <p className="text-gray-600 leading-relaxed">
              Real estate agents, brokers, and network partners.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-1">
              What’s in it for them
            </h4>
            <ul className="text-gray-600 list-disc list-inside space-y-1">
              <li>Simplified client management</li>
              <li>AI-driven lead insights</li>
              <li>Accelerated deal closures</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-1">
              Why XOTO
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Maximize conversions and revenue by leveraging a full property ecosystem.
            </p>
          </div>

          <button className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-md font-medium hover:bg-purple-800 transition">
            Sign Up
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={realImage}
            alt="Stakeholders working together"
            className="w-[400px] md:w-[480px] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StakeholderSection;
