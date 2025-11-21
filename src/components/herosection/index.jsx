import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import homeimage from "../../assets/img/homeXOTO.jpg";
import calender from "../../assets/icons/Homeicons/Calendar.png";
import clock from "../../assets/icons/Homeicons/Clock.png";
import gurantee from "../../assets/icons/Homeicons/Guarantee.png";
import map from "../../assets/icons/Homeicons/Map-pin.png";

import { 
  ShoppingBag, 
  Trees, 
  Sparkles, 
  Home, 
  Palette, 
  Flower2 
} from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      id: 1,
      title: "Interior E-commerce",
      description: "Shop premium furniture, décor, and design accessories — all in one place.",
      icon: <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />,
      link: "/ecommerce/b2c",
      buttonText: "Start Shopping",
    },
    {
      id: 2,
      title: "Landscaping Solutions",
      description: "Plan and execute beautiful outdoor spaces with expert design and AI-guided tools.",
      icon: <Trees className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />,
      link: "/landscaping",
      buttonText: "Explore Landscaping",
    },
    {
      id: 3,
      title: "AI Interior",
      description: "Redesign any room instantly using advanced AI visualization tools.",
      icon: <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />,
      link: "/aiInterior",
      buttonText: "Try AI Design",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    } else {
      setCurrentIndex((prev) => (prev + 2) % features.length);
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    } else {
      setCurrentIndex((prev) => (prev - 2 + features.length) % features.length);
    }
  };

  // Auto-play every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // Get visible cards based on screen size
  const getVisibleCards = () => {
    if (isMobile) {
      // Show only one card on mobile
      return [features[currentIndex]];
    } else {
      // Show two cards on desktop
      const cards = [];
      for (let i = 0; i < 2; i++) {
        const index = (currentIndex + i) % features.length;
        cards.push(features[index]);
      }
      return cards;
    }
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-white py-8 lg:py-0"
      style={{
        backgroundImage: `url(${homeimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Enhanced Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      {/* Bottom Decorative Shapes - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10 px-4 sm:px-6 lg:px-20 w-full max-w-7xl mx-auto mt-16 lg:mt-0">
        
        {/* LEFT SECTION - Improved Responsive */}
        <div className="max-w-2xl space-y-4 lg:space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-6xl font-semibold leading-tight sm:leading-tight lg:leading-tight">
            Redefining Living <br />
            <span className="text-whiteS">From Landscapes to Homes</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-xl opacity-90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover AI-powered designs and curated properties that elevate every corner of your world.
          </p>

          {/* Buttons - Improved spacing */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
            <Link
              to=""
              className="bg-[var(--color-primary)] text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-md hover:bg-[var(--color-hoverbtn)] transition-all duration-300 shadow-lg text-center text-sm sm:text-base"
            >
              Design My Space
            </Link>

            <Link
              to=""
              className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-md hover:bg-white hover:text-[var(--color-text-dark)] transition-all duration-300 text-center text-sm sm:text-base"
            >
              Explore Homes
            </Link>
          </div>

          {/* Features Grid - Improved Responsive with consistent 2-column layout */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm mt-4 lg:mt-6">
            {[
              { icon: gurantee, label: "One Stop Solution" },
              { icon: clock, label: "Faster Turn Around" },
              { icon: map, label: "Professional Teams" },
              { icon: calender, label: "PAN UAE Presence" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2"
              >
                {/* Icon circle */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <img src={item.icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Text */}
               <span className="font-semibold text-base sm:text-lg leading-tight break-words">
  {item.label}
</span>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Improved Slider with consistent card dimensions */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-none">
          <div className="flex justify-center items-center">
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-4 xl:gap-6 justify-center items-stretch w-full">
              {getVisibleCards().map((feature, idx) => (
                <div
                  key={feature.id}
                  className={`w-full max-w-xs sm:max-w-sm lg:max-w-full xl:w-72 p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20 transition-all duration-500 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] ${
                    !isMobile && idx === 0 ? "lg:translate-y-4 xl:translate-y-0" : ""
                  } ${isMobile ? 'mx-auto' : ''}`}
                  style={{
                    animation: `slideIn 0.6s ease-out ${idx * 0.2}s both`,
                  }}
                >
                  <div className="flex-1">
                    <div className="flex justify-center lg:justify-start mb-3 sm:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-xl font-semibold mb-2 text-center lg:text-left">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-90 text-center lg:text-left leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <Link
                    to={feature.link}
                    className="mt-4 sm:mt-5 inline-block bg-white text-[var(--color-text-dark)] font-semibold px-5 py-3 rounded-md hover:bg-[var(--color-hoverbtn)] hover:text-white transition text-center text-sm sm:text-base w-full"
                  >
                    {feature.buttonText}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Improved for mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2 sm:p-3 rounded-full hover:bg-white/40 transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2 sm:p-3 rounded-full hover:bg-white/40 transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator - Improved for mobile/desktop */}
          <div className="flex justify-center gap-2 mt-6">
            {isMobile 
              ? features.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === i ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))
              : [0, 1].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      Math.floor(currentIndex / 2) === i ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))
            }
          </div>
        </div>
      </div>

      {/* Smooth slide-in animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Ensure full image coverage */
        @media (max-width: 640px) {
          section {
            background-attachment: scroll;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;