import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import homeimage from "../../assets/img/homeXOTO.jpg";
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
    icon: <ShoppingBag className="w-12 h-12 text-purple-400" />,
    link: "/ecommerce/b2c",
    buttonText: "Start Shopping",
  },
  {
    id: 2,
    title: "Landscaping Solutions",
    description: "Plan and execute beautiful outdoor spaces with expert design and AI-guided tools.",
    icon: <Trees className="w-12 h-12 text-green-400" />,
    link: "/landscaping",
    buttonText: "Explore Landscaping",
  },
  {
    id: 3,
    title: "AI Interior",
    description: "Redesign any room instantly using advanced AI visualization tools.",
    icon: <Sparkles className="w-12 h-12 text-yellow-400" />,
    link: "/aiInterior",
    buttonText: "Try AI Design",
  },
];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 2 + features.length) % features.length);
  };

  // Auto-play every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get the two cards to display (looping)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % features.length;
      cards.push(features[index]);
    }
    return cards;
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-white py-8 lg:py-0"
      style={{
        backgroundImage: `url(${homeimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom Decorative Shapes */}
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
        
        {/* LEFT SECTION - Unchanged */}
        <div className="max-w-2xl space-y-4 lg:space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight lg:leading-tight">
            Redefining Living <br />
            <span className="text-whiteS">From Landscapes to Homes</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-xl mx-auto lg:mx-0">
            Discover AI-powered designs and curated properties that elevate
            every corner of your world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              to=""
              className="bg-[var(--color-primary)] text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full hover:bg-[var(--color-hoverbtn)] transition-all duration-300 shadow-lg text-center"
            >
              Design My Space
            </Link>

            <Link
              to=""
              className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full hover:bg-white hover:text-[var(--color-text-dark)] transition-all duration-300 text-center"
            >
              Explore Homes
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4 lg:mt-6">
            {[
              { icon: "Globe", label: "One Stop Solution" },
              { icon: "Zap", label: "Faster Turn Around Time" },
              { icon: "Users", label: "Professional Teams" },
              { icon: "Flag", label: "PAN UAE Presence" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2 justify-center sm:justify-start"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Now with Slider (2 cards visible) */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 justify-center items-center">
            {getVisibleCards().map((feature, idx) => (
              <div
                key={feature.id}
                className={`w-full sm:w-80 lg:w-full xl:w-64 p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20 transition-all duration-500 flex flex-col justify-between ${
                  idx === 0 ? "translate-y-4 sm:translate-y-0" : ""
                }`}
                style={{
                  animation: `slideIn 0.6s ease-out ${idx * 0.2}s both`,
                }}
              >
                <div>
                  <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl sm:text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">{feature.description}</p>
                </div>
                <Link
                  to={feature.link}
                  className="mt-4 sm:mt-5 inline-block bg-white text-[var(--color-text-dark)] font-semibold px-4 py-2 sm:px-5 sm:py-2 rounded-md hover:bg-[var(--color-hoverbtn)] hover:text-white transition text-center text-sm sm:text-base"
                >
                  {feature.buttonText}
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/40 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/40 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / 2) === i ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
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
      `}</style>
    </section>
  );
};

export default HeroSection;