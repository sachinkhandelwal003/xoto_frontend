import React, { useState } from "react";
import wave1 from "../../assets/img/wave/waveint2.png";
import hardScape from "../../assets/img/landscap/hardscape.png";
import other from "../../assets/img/landscap/other.png";
import softScape from "../../assets/img/landscap/softscape.png";
import swimming from "../../assets/img/landscap/swimming.png";

const Servicelandspacing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      title: "Hardscape",
      icon: <img src={hardScape} alt="Hardscape" />,
      items: [
        "Paving (interlock, tiles, stone)",
        "Pergolas & gazebos",
        "Decking (wood, WPC, Composite)",
        "Boundary walls & retaining walls",
        "Outdoor kitchens & BBQ stations",
        "Water features (fountains, waterfalls)",
      ],
    },
    {
      title: "Softscape",
      icon: <img src={softScape} alt="Softscape" />, // Fixed: using softScape image
      items: [
        "Soil preparation & leveling",
        "Plantation (trees, shrubs, groundcover)",
        "Granite/iron installation (natural & artificial)",
        "Flower beds & vertical gardens",
        "Mulching & soil amendments",
        "Seasonal planting & color themes",
      ],
    },
    {
      title: "Swimming Pools",
      icon: <img src={swimming} alt="Swimming Pools" />, // Fixed: using swimming image
      items: [
        "Custom pool design & construction",
        "Pool decking & surrounding areas",
        "Pool maintenance systems",
        "Water filtration & treatment",
        "Pool lighting & features",
        "Safety covers & fencing",
      ],
    },
    {
      title: "Other Solutions",
      icon: <img src={other} alt="Other Solutions" />, // Fixed: using other image
      items: [
        "Regular lawn care and mowing",
        "Pruning and trimming services",
        "Fertilization and soil care",
        "Weed and pest control",
        "Seasonal cleanup",
        "Irrigation system maintenance",
      ],
    },
  ];

  const cardsPerSlide = 2; // 2 cards per view
  const totalSlides = Math.ceil(services.length / cardsPerSlide);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden p-8">
      {/* Wave Background */}
      <div className="absolute bottom-[-70px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave1}
          alt="Wave background"
          className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Our Services Portfolio
        </h2>

        {/* Slider Container */}
        <div className="relative overflow-hidden  pt-12">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {/* Create slides with 2 cards each */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex gap-8"
                style={{
                  flex: `0 0 ${100 / totalSlides}%`,
                }}
              >
                {services
                  .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                  .map((service, idx) => (
                    <div
                      key={idx}
                      className="relative flex-1 bg-white rounded-3xl p-8 shadow-lg min-h-[400px]"
                    >
                      {/* Icon */}
                      <div className="absolute -top-10 left-6 w-24 h-24 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-xl z-30">
                        {service.icon}
                      </div>

                      <div className="mt-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                          {service.title}
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex items-start text-base md:text-lg">
                              <span
                                className="mr-3 mt-1 font-bold text-white flex items-center justify-center w-6 h-6 rounded-full"
                                style={{
                                  background: "linear-gradient(to right, #03A4F4 0%, #64EF0A 100%)",
                                }}
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition transform hover:scale-110 shadow-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-purple-700 transition transform hover:scale-110 shadow-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicelandspacing;