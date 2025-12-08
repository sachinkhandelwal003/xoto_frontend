"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wave1 from "../../assets/img/wave/wave1.png";
import round from "../../assets/img/round23.mp4"; // ✅ VIDEO IMPORT
import rating from "../../assets/icons/Homeicons/rating.png";
import partner from "../../assets/icons/Homeicons/partners.png";
import vector from "../../assets/icons/Homeicons/Vector.png";
import dollar from "../../assets/icons/Homeicons/dollar.png";
import finance from "../../assets/icons/Homeicons/finance.png";
import target from "../../assets/icons/Homeicons/target.png";

const BuiltForEveryone = () => {
  const cards = [
    {
      icon: rating,
      title: "Customers",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: vector,
      title: "Business Associates",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: partner,
      title: "Execution Partner",
      desc: "Unlock new growth opportunities through seamless integrations and partner solutions.",
    },
    {
      icon: dollar,
      title: "Strategic Alliances",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: target,
      title: "Developers",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: finance,
      title: "Financial Institutions",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(2);
  const [activeBtn, setActiveBtn] = useState("right");

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setCardsToShow(mobile ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Next / Prev
  const nextSlide = () => {
    const maxIndex = cards.length - cardsToShow;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const maxIndex = cards.length - cardsToShow;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Auto-slide
  useEffect(() => {
    const autoSlide = setInterval(() => {
      const maxIndex = cards.length - cardsToShow;
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [cardsToShow]);

  return (
    <section className="relative bg-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Wave */}
      <div className="absolute bottom-[-20px] sm:bottom-[-50px] md:bottom-[-80px] lg:bottom-[-130px] xl:bottom-[-160px] left-0 w-full z-0">
        <img
          src={wave1}
          alt=""
          className="w-[180%] sm:w-[165%] md:w-[150%] lg:w-full -ml-[20%] sm:-ml-[12%] md:-ml-[8%] lg:ml-0 scale-[1.6] sm:scale-[1.4] md:scale-[1.2] lg:scale-100 pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          className="text-center mb-12 lg:mb-16 heading-light"
          style={{ color: "var(--color-black)" }}
        >
          Built For Everyone
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* LEFT VIDEO (replaced image) */}
          <div className="w-full lg:w-1/2 flex justify-start items-start mb-10 lg:mb-25">
            <div className="relative w-60 h-60 sm:w-100 sm:h-100 lg:w-110 lg:h-110 mx-auto">
              <video
                src={round}
                autoPlay
                loop
                muted
                playsInline
                className="w-full  object-contain"
              />
            </div>
          </div>

          {/* Slider */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-sm lg:max-w-2xl overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(-${
                    isMobile
                      ? currentIndex * 100
                      : currentIndex * (100 / cardsToShow)
                  }%)`,
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 bg-white rounded-xl p-6 transition-all duration-300 ${
                      index >= currentIndex &&
                      index < currentIndex + cardsToShow
                        ? "shadow-xl scale-100 opacity-100"
                        : "opacity-70 scale-95"
                    }`}
                    style={{
                      width: isMobile
                        ? "100%"
                        : `calc(${100 / cardsToShow}% - 16px)`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl card-heading">{card.title}</h3>

                      <div className="bg-[var(--color-primary)] p-2 rounded-full">
                        <img src={card.icon} alt="" className="w-6 h-6" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  prevSlide();
                  setActiveBtn("left");
                }}
                className={`p-3 rounded-sm border transition ${
                  activeBtn === "left"
                    ? "bg-[var(--color-primary)] text-white border-transparent"
                    : "bg-white border-gray-300 hover:bg-[var(--color-primary)] hover:text-white"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  nextSlide();
                  setActiveBtn("right");
                }}
                className={`p-3 rounded-sm transition ${
                  activeBtn === "right"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border-gray-300 hover:bg-[var(--color-primary)] hover:text-white"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForEveryone;
