import React, { useState } from "react";
import avatarSrc from "../../assets/img/girlimage.png";
import waveint4 from "../../assets/img/wave/waveint4.png";

export default function WhatAreYouLookingFor() {
  const [activeTab, setActiveTab] = useState("rent");

  const tabContent = {
    rent: {
      title: "Rent Home",
      text: "Curated rentals with flexible terms, verified listings, and smart match recommendations.",
    },
    buy: {
      title: "Buy Home",
      text: "Explore premium homes with detailed insights, AI-guided recommendations, and verified sellers.",
    },
    sell: {
      title: "Sell Home",
      text: "List your property effortlessly with expert support, valuation insights, and broad buyer reach.",
    },
  };

  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden pt-15">
      {/* BOTTOM WAVE BACKGROUND IMAGE */}
      <div
        className="
          absolute -bottom-10 sm:-bottom-20 lg:-bottom-48 
          left-0 w-full z-0 pointer-events-none select-none
        "
      >
        <img
          src={waveint4}
          alt="Decorative wave"
          className="w-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* HEADING */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-bold text-[#020202] text-3xl sm:text-4xl lg:text-5xl leading-tight">
            What are you looking for
          </h2>

          <p className="mt-4 text-[16px] sm:text-[18px] lg:text-[20px] text-[#547593]">
            Let Xobia guide you through your perfect property journey with
            personalized recommendations.
          </p>

          {/* TABS BUTTONS */}
          <div className="mt-8 flex justify-center">
            <div className="rounded-xl p-1 bg-gradient-to-b from-[#03A4F4] to-[#64EF0A] max-w-[380px] sm:max-w-none mx-auto">
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 px-2 py-1">
                {/* RENT BUTTON */}
                <button
                  onClick={() => setActiveTab("rent")}
                  className={`
                    whitespace-nowrap rounded-lg px-6 sm:px-10 py-3 sm:py-4 
                    text-sm sm:text-base font-semibold shadow-md transition-all 
                    ${
                      activeTab === "rent"
                        ? "bg-[#5C039B] text-white"
                        : "bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white"
                    }
                  `}
                >
                  Rent Home
                </button>

                {/* BUY BUTTON */}
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`
                    whitespace-nowrap rounded-lg px-6 sm:px-10 py-3 sm:py-4 
                    text-sm sm:text-base font-semibold shadow-md transition-all 
                    ${
                      activeTab === "buy"
                        ? "bg-[#5C039B] text-white"
                        : "bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white"
                    }
                  `}
                >
                  Buy Home
                </button>

                {/* SELL BUTTON */}
                <button
                  onClick={() => setActiveTab("sell")}
                  className={`
                    whitespace-nowrap rounded-lg px-6 sm:px-10 py-3 sm:py-4 
                    text-sm sm:text-base font-semibold shadow-md transition-all 
                    ${
                      activeTab === "sell"
                        ? "bg-[#5C039B] text-white"
                        : "bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white"
                    }
                  `}
                >
                  Sell Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT + RIGHT IMAGE */}
        <div className="max-w-5xl mx-auto mt-10 lg:mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-13 items-center">
          {/* LEFT CONTENT BASED ON TAB */}
          <div className="max-w-[320px] lg:max-w-2xl flex flex-col mt-10 md:mt-8 lg:mt-0 lg:justify-center lg:ml-[150px]">
            <h1
              className="font-semibold text-[#000000] 
              text-[25px] sm:text-[24px] lg:text-[29px] leading-[32px] text-left"
            >
              {tabContent[activeTab].title}
            </h1>
            <p className="font-bold text-[#547593] mt-4 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[18px] text-left">
              {tabContent[activeTab].text}
            </p>
          </div>

          {/* RIGHT AVATAR */}
          <div className="w-full flex mx-4 sm:mx-8 lg:mx-0 justify-center lg:justify-end mt-6 lg:mt-0">
            <img
              src={avatarSrc}
              alt="Xobia assistant"
              className="max-w-[180px] sm:max-w-[220px] md:max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
