import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../assets/img/wave/wave1.png";

const projects = [
  {
    title: "Modern Modular Kitchen",
    location: "California, Seaside",
    img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200",
  },
  {
    title: "Minimalist Penthouse",
    location: "Dubai Marina, UAE",
    img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200",
  },
  {
    title: "Tuscan Villa Living",
    location: "Beverly Hills, USA",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  },
];

export default function DreamSpacesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="relative overflow-hidden pb-24">

      {/* Background Wave */}
      <div className="absolute -bottom-20 left-0 w-full z-0 pointer-events-none select-none">
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <h1 className="text-5xl font-extrabold leading-tight text-black">
            Explore our curated <br />
            <span className="text-black">dream spaces</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our portfolio showcases our passion for crafting extraordinary spaces
            that redefine sustainable living. As a trusted prop-tech in UAE, we
            transform visions into timeless elegance.
          </p>
        </div>

        {/* FULL WIDTH SLIDER */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">

          {/* LEFT SIDE CARD - HALF VISIBLE */}
          <div className="hidden md:block w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 -ml-40">
            <img
              src={projects[(currentIndex - 1 + projects.length) % projects.length].img}
              alt=""
              className="h-64 w-full object-cover"
            />
          </div>

          {/* MAIN CARD */}
          <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10">
            <img
              src={projects[currentIndex].img}
              alt={projects[currentIndex].title}
              className="w-full h-[350px] md:h-[450px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
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

          {/* RIGHT SIDE CARD - HALF VISIBLE */}
          <div className="hidden md:block w-[350px] rounded-2xl overflow-hidden shadow-xl opacity-70 scale-95 -mr-40">
            <img
              src={projects[(currentIndex + 1) % projects.length].img}
              alt=""
              className="h-64 w-full object-cover"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-[#5C039B] text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
