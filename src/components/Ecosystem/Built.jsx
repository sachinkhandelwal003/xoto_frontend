import React, { useState } from "react";

import realImage from "../../assets/img/real.png";

// Box background images
import lefttop from "../../assets/img/home/group/lefttop.png";
import leftbottom from "../../assets/img/home/group/leftbottom.png";
import righttop from "../../assets/img/home/group/righttop.png";
import rightbottom from "../../assets/img/home/group/rightbottom.png";

// Dynamic Content
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
        answer:
          "Simplified client management, AI-driven insights, faster deal closures.",
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
        answer: "Contractors, architects, interior designers, service partners.",
      },
      {
        question: "What's in it for them?",
        answer:
          "Streamlined workflows, project coordination, faster payments.",
      },
      {
        question: "Why XOTO?",
        answer: "Verified leads and integrated collaboration tools.",
      },
    ],
  },

  "Strategic Alliances": {
    heading: "Strategic Alliances",
    qa: [
      {
        question: "Who?",
        answer: "Banks, insurance firms, legal advisors, tech partners.",
      },
      {
        question: "What's in it for them?",
        answer:
          "Shared audience, co-marketing, seamless platform integrations.",
      },
      {
        question: "Why XOTO?",
        answer: "Expand reach inside a trusted property tech ecosystem.",
      },
    ],
  },

  Developers: {
    heading: "Developers",
    qa: [
      {
        question: "Who?",
        answer: "Builders, developers launching new real estate projects.",
      },
      {
        question: "What's in it for them?",
        answer:
          "Buyer database, virtual tours, instant booking engine.",
      },
      {
        question: "Why XOTO?",
        answer:
          "Faster project sell-outs using data-driven tools.",
      },
    ],
  },

  "Financial Institution": {
    heading: "Financial Institution",
    qa: [
      {
        question: "Who?",
        answer: "Banks, NBFCs and loan providers.",
      },
      {
        question: "What's in it for them?",
        answer: "Pre-qualified leads, digital loan applications.",
      },
      {
        question: "Why XOTO?",
        answer: "Boost loan conversions with automated workflows.",
      },
    ],
  },
};

const tabs = Object.keys(tabContent);

const StakeholderSection = () => {
  const [activeTab, setActiveTab] = useState("Business Associates");
  const content = tabContent[activeTab];

  return (
    <section className="w-full bg-white relative z-20  py-16 md:py-24 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
          Built for{" "}
          <span className="bg-gradient-to-r from-[#03A4F4] via-[#6F2DBD] to-[#64EF0A] bg-clip-text text-transparent">
            Every Stakeholder
          </span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Our platform serves diverse stakeholders with customized benefits.
        </p>
      </div>

      {/* Tabs */}
  <div className="flex justify-center mb-8 ">
  <div
    className="flex flex-wrap gap-2 px-3 py-2 rounded-2xl shadow-lg max-w-6xl w-full justify-center"
    style={{
      background: "linear-gradient(167deg, #03A4F4 10%, #64EF0A 90%)",
    }}
  >
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`
          px-6 py-2 rounded-xl text-xl text-sm border transition-all duration-300
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



      {/* 4 BOXES + CENTER CIRCLE */}
      <div className="relative max-w-6xl mx-auto  py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">

          {/* BOX 1 — Only Heading */}
<div
  className="h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 
             text-white flex items-start"
  style={{ backgroundImage: `url(${lefttop})` }}
>
  <h1 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg mt-10">
    {content.heading}
  </h1>
</div>




          {/* BOX 2 — QA #1 */}
    <div
  className="h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-8 text-white flex flex-col justify-center items-end text-right"
  style={{ backgroundImage: `url(${righttop})` }}
>
  <h3 className="text-3xl font-bold drop-shadow-md">
    {content.qa[0].question}
  </h3>

  <p className="mt-3 text-lg w-[300px] font-medium leading-relaxed drop-shadow">
    {content.qa[0].answer}
  </p>
</div>


          {/* BOX 3 — QA #2 */}
          <div
            className="h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-6 text-white items-start"
            style={{ backgroundImage: `url(${leftbottom})` }}
          >
            <h3 className="text-3xl font-bold drop-shadow-md">{content.qa[1].question}</h3>
            <p className="mt-3 text-lg w-[300px] font-medium leading-relaxed drop-shadow">{content.qa[1].answer}</p>
          </div>

          {/* BOX 4 — QA #3 */}
          <div
  className="h-[260px] rounded-3xl bg-cover bg-center shadow-lg p-8 text-white flex flex-col justify-center items-end text-right"
            style={{ backgroundImage: `url(${rightbottom})` }}
          >
            <h3 className="text-3xl font-bold drop-shadow-md">{content.qa[2].question}</h3>
            <p className="mt-3 text-lg w-[300px] font-medium leading-relaxed drop-shadow">{content.qa[2].answer}</p>
          </div>
        </div>

        {/* CENTER CIRCLE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-52 h-52 md:w-72 md:h-72 rounded-full bg-[var(--color-primary)] shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center">
            <img src={realImage} className="w-[80%] object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StakeholderSection;
