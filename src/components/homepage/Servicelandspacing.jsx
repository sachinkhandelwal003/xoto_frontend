import React, { useState } from 'react';
import wave1 from "../../assets/img/wave/wave1.png";

const Servicelandspacing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      title: "Hardscape",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      items: [
        "Paving (interlock, tiles, stone)",
        "Pergolas & gazebos",
        "Decking (wood, WPC, Composite)",
        "Boundary walls & retaining walls",
        "Outdoor kitchens & BBQ stations",
        "Water features (fountains, waterfalls)"
      ],
      color: "purple"
    },
    {
      title: "Softscape",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      items: [
        "Paving (interlock, tiles, stone)",
        "Soil preparation & leveling",
        "Plantation (trees, shrubs, groundcover)",
        "Granite/iron installation (natural & artificial) Flower beds & vertical gardens",
        "Mulching & soil amendments",
        "Seasonal planting & color themes"
      ],
      color: "purple"
    },
    {
      title: "Swimming Pools",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      items: [
        "Regular lawn care and mowing",
        "Pruning and trimming services",
        "Fertilization and soil care",
        "Weed and pest control",
        "Seasonal cleanup",
        "Irrigation system maintenance"
      ],
      color: "purple"
    },
     {
      title: "Other Solutions",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      items: [
        "Regular lawn care and mowing",
        "Pruning and trimming services",
        "Fertilization and soil care",
        "Weed and pest control",
        "Seasonal cleanup",
        "Irrigation system maintenance"
      ],
      color: "purple"
    }
  ];

  // Number of cards to show at once
  const cardsPerSlideDesktop = 2;
  const cardsPerSlideMobile = 1;

  const totalSlides = Math.ceil(services.length / cardsPerSlideDesktop);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const ChevronLeft = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRight = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <section className="min-h-screen bg-[var(--color-body)] relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave1}
          alt=""
          className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Our Services Portfolio
        </h2>

        <div className="max-w-7xl mx-auto">
          {/* Slider */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
                    {services
                      .slice(slideIndex * cardsPerSlideDesktop, (slideIndex + 1) * cardsPerSlideDesktop)
                      .map((service, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-3xl  p-8  transition-all duration-300 transform hover:-translate-y-2"
                        >
                          <div className="flex items-center mb-6">
                            <div className={`w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                              {service.icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-purple-900">
                              {service.title}
                            </h3>
                          </div>
                          <ul className="space-y-4 text-gray-700">
                            {service.items.map((item, i) => (
                              <li key={i} className="flex items-start text-base md:text-lg">
                                <span className="text-green-500 mr-3 mt-1 font-bold">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition transform hover:scale-110 shadow-md"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'bg-[var(--color-primary)] w-12 h-3'
                      : 'bg-[var(--color-primary)] w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:bg-purple-700 transition transform hover:scale-110 shadow-md"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default Servicelandspacing;