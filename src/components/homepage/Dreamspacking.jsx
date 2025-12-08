import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../assets/img/wave/waveint2.png";

const projects = [
  {
    title: "Modern Modular Kitchen",
    location: "California, Seaside",
    img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200",
  },
  {
    title: "Minimalist Penthouse",
    location: "Dubai Marina, UAE",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
  },
  {
    title: "Tuscan Villa Living",
    location: "Beverly Hills, USA",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  },
];

export default function DreamSpacesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");
  const autoSlideRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState("right");

  const next = () => {
    setSlideDirection("next");
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setSlideDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(autoSlideRef.current);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

  return (
    <div className="relative overflow-hidden pb-24 bg-[var(--color-body)]">
      {/* Background Wave */}
      {/* Background Wave */}
      <div
        className="absolute left-0 w-full z-0 pointer-events-none select-none
                -bottom-4 sm:-bottom-30 md:-bottom-10 lg:-bottom-20"
      >
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>

      <div className=" mx-auto pt-12 md:pt-16 relative z-10 px-4 ">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-10 mb-12 lg:mb-16 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-dark-1 text-black px-20">
            Explore our curated <br />
            <span className="text-black">dream spaces</span>
          </h1>

          <p className="text-base sm:text-lg paragarph-light-1 text-[#547593] overflow-hidden h-auto lg:h-[6rem] mt-4 lg:mt-0 px-10">
            Our portfolio showcases our passion for crafting extraordinary
            spaces that redefine sustainable living. As a trustead prop-tech in
            UAE, we bring each client’s unique vision to life, transforming
            spaces into timeless expressions of elegance.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative flex items-center justify-center gap-4 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            {/* Left Card */}
            <div
              className={`hidden md:block absolute left-0 w-64 sm:w-72 md:w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 transition-all duration-500 ease-in-out z-20 ${slideDirection === "next" ? "translate-x-0" : "translate-x-[-100%]"}`}
            >
              <img
                src={projects[getAdjacentIndex(-1)].img}
                alt={projects[getAdjacentIndex(-1)].title}
                className="h-40 sm:h-56 md:h-64 w-full object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-black">
                  {projects[getAdjacentIndex(-1)].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {projects[getAdjacentIndex(-1)].location}
                </p>
              </div>
            </div>

            {/* Main Card */}
            <div
              className={`absolute w-full max-w-3xl sm:max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out z-30 ${slideDirection === "next" ? "translate-x-0 opacity-100 scale-100" : "translate-x-0 opacity-100 scale-100"}`}
              key={currentIndex}
            >
              <img
                src={projects[currentIndex].img}
                alt={projects[currentIndex].title}
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-gray-300 flex items-center gap-2 mt-1 sm:mt-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {projects[currentIndex].location}
                </p>
              </div>
            </div>

            {/* Right Card */}
            <div
              className={`hidden md:block absolute right-0 w-64 sm:w-72 md:w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 transition-all duration-500 ease-in-out z-20 ${slideDirection === "next" ? "translate-x-0" : "translate-x-[100%]"}`}
            >
              <img
                src={projects[getAdjacentIndex(1)].img}
                alt={projects[getAdjacentIndex(1)].title}
                className="h-40 sm:h-56 md:h-64 w-full object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-black">
                  {projects[getAdjacentIndex(1)].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {projects[getAdjacentIndex(1)].location}
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentIndex ? "next" : "prev");
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#5C039B] w-8" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>

          {/* Controls */}
          {/* Navigation — SAME STYLE AS YOUR OTHER SECTION */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {/* LEFT */}
            <button
              onClick={() => {
                prev();
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

            {/* RIGHT */}
            <button
              onClick={() => {
                next();
                setActiveBtn("right");
              }}
              className={`p-3 rounded-sm border transition ${
                activeBtn === "right"
                  ? "bg-[var(--color-primary)] text-white border-transparent"
                  : "bg-white border-gray-300 hover:bg-[var(--color-primary)] hover:text-white"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
