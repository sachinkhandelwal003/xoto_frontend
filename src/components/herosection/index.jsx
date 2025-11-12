import React from "react";
import { Link } from "react-router-dom";
import homeimage from "../../assets/img/homeXOTO.jpg";

const HeroSection = () => {
  const features = [
    {
      id: 1,
      title: "Interior E-commerce",
      description:
        "Shop premium furniture, décor, and design accessories — all in one place.",
      icon: "🛋️",
      link: "/sawtar/ecommerce/b2c",
      buttonText: "Start Shopping",
    },
    {
      id: 2,
      title: "Landscaping Solutions",
      description:
        "Plan and execute beautiful outdoor spaces with expert design and AI-guided tools.",
      icon: "🌿",
      link: "/sawtar/landscaping",
      buttonText: "Explore Landscaping",
    },
  ];

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
      
      {/* ======= Left and Right White Clip Shapes - Hidden on mobile ======= */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      {/* Custom clip paths */}
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
        
        {/* ---------- LEFT SECTION ---------- */}
        <div className="max-w-2xl space-y-4 lg:space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight lg:leading-tight">
            Redefining Living <br />
            <span className="text-whiteS">From Landscapes to Homes</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-xl mx-auto lg:mx-0">
            Discover AI-powered designs and curated properties that elevate
            every corner of your world.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              to="/design-my-space"
              className="bg-[var(--color-primary)] text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full hover:bg-[var(--color-hoverbtn)] transition-all duration-300 shadow-lg text-center"
            >
              Design My Space
            </Link>

            <Link
              to="/explore-homes"
              className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 rounded-full hover:bg-white hover:text-[var(--color-text-dark)] transition-all duration-300 text-center"
            >
              Explore Homes
            </Link>
          </div>

          {/* Feature Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4 lg:mt-6">
            {[
              { icon: "🌐", label: "One Stop Solution" },
              { icon: "⚡", label: "Faster Turn Around Time" },
              { icon: "👥", label: "Professional Teams" },
              { icon: "🇦🇪", label: "PAN UAE Presence" },
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

        {/* ---------- RIGHT SECTION ---------- */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 justify-center items-center mt-4 lg:mt-0">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="w-full sm:w-80 lg:w-full xl:w-64 p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
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
      </div>
    </section>
  );
};

export default HeroSection;