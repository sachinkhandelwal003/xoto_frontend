import React, { useState, useEffect } from "react";
import wave1 from "../../assets/img/wave/waveint2.png";
import hardScape from "../../assets/img/landscap/hardscape.png";
import other from "../../assets/img/landscap/other.png";
import softScape from "../../assets/img/landscap/softscape.png";
import swimming from "../../assets/img/landscap/swimming.png";

const Servicelandspacing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);

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
      icon: <img src={softScape} alt="Softscape" />,
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
      icon: <img src={swimming} alt="Swimming Pools" />,
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
      icon: <img src={other} alt="Other Solutions" />,
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

  /* Responsive cards per slide */
  useEffect(() => {
    const updateCards = () => {
      setCardsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalSlides = Math.ceil(services.length / cardsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden px-3 py-10 md:px-10 md:py-16">
      {/* Wave Background */}
      <div className="absolute bottom-[-50px] left-0 w-full z-0 overflow-hidden ">
        <img
          src={wave1}
          alt="Wave"
          className="w-full scale-[1.6] md:scale-100 pointer-events-none"
        />
      </div>

      <div className="relative z-10 container mx-auto mt-4">
        <h2 className="text-center text-2xl md:text-4xl lg:text-6xl heading-dark-1 text-black">
          Our Services Portfolio
        </h2>

        {/* Slider */}
        <div className="relative overflow-hidden pt-6 md:pt-12 mt-5">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex gap-4 md:gap-8"
                style={{ flex: `0 0 ${100 / totalSlides}%` }}
              >
                {services
                  .slice(
                    slideIndex * cardsPerSlide,
                    (slideIndex + 1) * cardsPerSlide
                  )
                  .map((service, idx) => (
                    <div
                      key={idx}
                      className="relative flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg min-h-[320px] md:min-h-[400px]"
                    >
                      <div className="absolute -top-8 left-5 w-20 h-20 md:w-24 md:h-24 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-xl">
                        {service.icon}
                      </div>

                      <div className="mt-16 md:mt-20">
                        <h3 className="text-xl md:text-3xl font-bold text-black mb-4 md:mb-6">
                          {service.title}
                        </h3>
                        <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-lg">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex">
                              <span
                                className="mr-2 md:mr-3 font-bold text-white flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(to right, #03A4F4 0%, #64EF0A 100%)",
                                }}
                              >
                                ✓
                              </span>
                              {item}
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
          <div className="flex justify-center items-center mt-8 md:mt-12 gap-6">
            {/* Prev */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center shadow-md hover:bg-purple-200 transition-transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
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

            {/* Next */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md hover:bg-purple-700 transition-transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
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
