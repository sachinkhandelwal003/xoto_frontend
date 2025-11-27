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
  const [slideDirection, setSlideDirection] = useState('next');
  const autoSlideRef = useRef(null);

  const next = () => {
    setSlideDirection('next');
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setSlideDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(autoSlideRef.current);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Calculate indices for side cards
  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

  return (
    <div className="relative overflow-hidden pb-24">

      {/* Background Wave */}
      <div className="absolute -bottom-20 left-0 w-full z-0 pointer-events-none select-none">
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <h1 className="text-5xl font-semibold text-black">
            Explore our curated <br />
            <span className="text-black">dream spaces</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our portfolio showcases our passion for crafting extraordinary spaces
            that redefine sustainable living. As a trusted prop-tech in UAE, we
            transform visions into timeless elegance.
          </p>
        </div>

        {/* SLIDER CONTAINER */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* SLIDER TRACK */}
          <div className="relative flex items-center justify-center gap-4 h-[500px]">
            
            {/* LEFT SIDE CARD */}
            <div className={`hidden md:block absolute left-0 w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 transition-all duration-500 ease-in-out z-20 ${
              slideDirection === 'next' ? 'translate-x-0' : 'translate-x-[-100%]'
            }`}>
              {/* Purple Ring */}
              <div className="absolute -inset-2 rounded-2xl border-2 border-purple-500/30 pointer-events-none z-10"></div>
              <img
                src={projects[getAdjacentIndex(-1)].img}
                alt={projects[getAdjacentIndex(-1)].title}
                className="h-64 w-full object-cover relative z-0"
              />
              <div className="p-4 bg-white relative z-0">
                <h4 className="font-semibold text-black">{projects[getAdjacentIndex(-1)].title}</h4>
                <p className="text-sm text-gray-600">{projects[getAdjacentIndex(-1)].location}</p>
              </div>
            </div>

            {/* MAIN CARD - ANIMATED */}
            <div 
              className={`absolute w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out z-30 ${
                slideDirection === 'next' 
                  ? 'translate-x-0 opacity-100 scale-100' 
                  : 'translate-x-0 opacity-100 scale-100'
              }`}
              key={currentIndex}
            >
              {/* Purple Ring - Main Card */}
              <div className="absolute -inset-3 rounded-3xl border-4 border-purple-500/50 pointer-events-none z-40 animate-pulse"></div>
              <div className="absolute -inset-4 rounded-3xl border-2 border-purple-300/30 pointer-events-none z-40"></div>
              
              <img
                src={projects[currentIndex].img}
                alt={projects[currentIndex].title}
                className="w-full h-[350px] md:h-[450px] object-cover relative z-0"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 z-10">
                <h3 className="text-4xl font-bold text-white">
                  {projects[currentIndex].title}
                </h3>

                <p className="text-gray-300 flex items-center gap-2 mt-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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

            {/* RIGHT SIDE CARD */}
            <div className={`hidden md:block absolute right-0 w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 transition-all duration-500 ease-in-out z-20 ${
              slideDirection === 'next' ? 'translate-x-0' : 'translate-x-[100%]'
            }`}>
              {/* Purple Ring */}
              <div className="absolute -inset-2 rounded-2xl border-2 border-purple-500/30 pointer-events-none z-10"></div>
              <img
                src={projects[getAdjacentIndex(1)].img}
                alt={projects[getAdjacentIndex(1)].title}
                className="h-64 w-full object-cover relative z-0"
              />
              <div className="p-4 bg-white relative z-0">
                <h4 className="font-semibold text-black">{projects[getAdjacentIndex(1)].title}</h4>
                <p className="text-sm text-gray-600">{projects[getAdjacentIndex(1)].location}</p>
              </div>
            </div>

          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
                  index === currentIndex 
                    ? 'bg-[#5C039B] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {/* Purple Ring around active indicator */}
                {index === currentIndex && (
                  <div className="absolute -inset-2 rounded-full border-2 border-purple-500/50 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 relative group"
            >
              {/* Purple Ring on hover */}
              <div className="absolute -inset-1 rounded-full border-2 border-purple-500/0 group-hover:border-purple-500/30 transition-all duration-300"></div>
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#5C039B] text-white flex items-center justify-center transition-all duration-300 hover:bg-[#4A027A] hover:scale-110 relative group"
            >
              {/* Purple Ring on hover */}
              <div className="absolute -inset-1 rounded-full border-2 border-purple-300/0 group-hover:border-purple-300/50 transition-all duration-300"></div>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}