import React, { useState } from "react";

import realImage from "../../assets/img/real.png";

// Box background images
import lefttop from "../../assets/img/home/group/lefttop.png";
import leftbottom from "../../assets/img/home/group/leftbottom.png";
import righttop from "../../assets/img/home/group/righttop.png";
import rightbottom from "../../assets/img/home/group/rightbottom.png";

// ================= DYNAMIC CONTENT =================
const tabContent = {
  "Business Associates": {
    heading: "Business Associates",
    qa: [
      {
        question: "Who?",
        answer: "Real estate agents, brokers, and network partners.",
      },
      {
        question: "What's in it for them?",
        answer: [
          "Simplified client management",
          "AI-driven insights",
          "Faster deal closures",
        ],
      },
      {
        question: "Why XOTO?",
        answer:
          "Maximize conversions and revenue by leveraging a full property ecosystem.",
      },
    ],
  },

  "Execution Partner": {
    heading: "Execution Partner",
    qa: [
      {
        question: "Who?",
        answer:
          "Contractors, landscapers, interior designers, and project managers.",
      },
      {
        question: "What's in it for them?",
        answer: [
          "Real-time task allocation",
          "Transparent progress tracking",
          "Seamless project coordination",
        ],
      },
      {
        question: "Why XOTO?",
        answer:
          "Efficiently manage projects and connect with pre-qualified clients.",
      },
    ],
  },

  "Strategic Alliances": {
    heading: "Strategic Alliances",
    qa: [
      {
        question: "Who?",
        answer: "Businesses looking to collaborate and expand market reach.",
      },
      {
        question: "What's in it for them?",
        answer: [
          "Integrated growth-focused ecosystem",
          "Access to new markets and partnerships",
        ],
      },
      {
        question: "Why XOTO?",
        answer:
          "Accelerate market presence and revenue through a single platform.",
      },
    ],
  },

  Developers: {
    heading: "Developers",
    qa: [
      {
        question: "Who?",
        answer: "Property developers seeking buyers and market insights.",
      },
      {
        question: "What's in it for them?",
        answer: [
          "Access to pre-qualified buyers",
          "Data-driven to accelerate sales",
        ],
      },
      {
        question: "Why XOTO?",
        answer:
          "Close deals faster and optimize sales strategy using AI-powered data.",
      },
    ],
  },

  "Financial Institution": {
    heading: "Financial Institution",
    qa: [
      {
        question: "Who?",
        answer: "Banks, mortgage providers, and lending institutions.",
      },
      {
        question: "What's in it for them?",
        answer: [
          "Boost mortgage conversions",
          "Integrated property + financing  ecosystem",
        ],
      },
      {
        question: "Why XOTO?",
        answer:
          "Offer a seamless customer experience while increasing financing revenue.",
      },
    ],
  },
};

const tabs = Object.keys(tabContent);

// ================= ANSWER RENDERER =================
const RenderAnswer = ({ answer }) => {
  if (Array.isArray(answer)) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {answer.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{answer}</p>;
};

// ================= MAIN COMPONENT =================
const StakeholderSection = () => {
  const [activeTab, setActiveTab] = useState("Business Associates");
  const content = tabContent[activeTab];

  return (
    <section className="w-full bg-white relative z-20 py-16 md:py-24 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl md:text-6xl font-semibold text-black">
          Built for Every Stakeholder
        </h2>
        <p className="mt-4 text-[#547593] text-lg">
          Our platform serves diverse stakeholders in the home ecosystem, each
          with tailored solutions and benefits
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 px-4">
        <div
          className="flex gap-2 px-3 py-2 rounded-2xl shadow-lg max-w-6xl  overflow-x-auto"
          style={{
            background: "linear-gradient(167deg, #03A4F4 10%, #64EF0A 90%)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-lg whitespace-nowrap border transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-[#6F2DBD] text-white border-transparent shadow-md"
                    : "bg-transparent text-white border border-white/50 hover:bg-white/20"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Boxes */}
      <div className="relative max-w-6xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Box 1 */}
          <div
            className="h-[230px] md:h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 text-white"
            style={{ backgroundImage: `url(${lefttop})` }}
          >
            <h1 className="text-2xl md:text-4xl font-semibold mt-6">
              {content.heading}
            </h1>
          </div>

          {/* Box 2 */}
          <div
            className="h-[230px] md:h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 text-white text-right flex flex-col justify-center items-end"
            style={{ backgroundImage: `url(${righttop})` }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              {content.qa[0].question}
            </h3>
            <div className="mt-3 text-lg w-[300px]">
              <RenderAnswer answer={content.qa[0].answer} />
            </div>
          </div>

          {/* Box 3 */}
          <div
            className="h-[230px] md:h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 text-white"
            style={{ backgroundImage: `url(${leftbottom})` }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              {content.qa[1].question}
            </h3>
            <div className="mt-3 text-lg w-[300px]">
              <RenderAnswer answer={content.qa[1].answer} />
            </div>
          </div>

          {/* Box 4 */}
          <div
            className="h-[230px] md:h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 text-white text-right flex flex-col justify-center items-end"
            style={{ backgroundImage: `url(${rightbottom})` }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              {content.qa[2].question}
            </h3>
            <div className="mt-3 text-lg w-[300px]">
              <RenderAnswer answer={content.qa[2].answer} />
            </div>
          </div>
        </div>

        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-40 h-40 md:w-72 md:h-72 rounded-full bg-[#6F2DBD] border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src={realImage}
              alt="Center"
              className="w-[80%] object-contain"
            />
          </div>
        </div>
      </div>

      <button className="mx-auto block mt-10 bg-[#5C039B] text-white px-6 py-3 rounded-md">
        Sign Up
      </button>
    </section>
  );
};

export default StakeholderSection;
