import React from "react";
import Picture from "../../assets/img/image.jpg";
import AvatarImage from "../../assets/img/img.png";

const Ai1 = () => {
  return (
    <div className="text-gray-900">
      <section
        className="
    relative 
    bg-cover bg-center 
    min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]
    flex items-center justify-center 
    text-white
  "
        style={{ backgroundImage: `url(${Picture})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>``
        <div
          className="
    relative z-10 h-full 
    flex flex-col 
    max-w-7xl mx-auto 
    px-4 sm:px-6 lg:px-8 
    pt-10 sm:pt-20 lg:pt-22
  "
        >
          {/* Date + Comments */}
          <div className="text-white text-sm sm:text-base font-normal tracking-wider mb-3 sm:mb-4">
            <span>28 Aug 2024</span>
            <span className="mx-3 sm:mx-4 text-white/60">|</span>
            <span className="text-white/90">13 Comments</span>
          </div>

          {/* Title + Author */}
          <div
            className="
            flex flex-col 
            lg:flex-row lg:items-center lg:justify-between 
            gap-8 lg:gap-8
            
          "
          >
            {/* Title */}
            <h1
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
              className="
              text-white font-bold 
              text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 
              leading-tight 
              tracking-tight 
              // max-w-3xl
               max-w-full
            "
            >
              Exploring Luxury RealEstate Markets...
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 text-white">
              {/* Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <img
                    src={AvatarImage}
                    alt="Silicaman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Text */}
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide">
                  Silicaman
                </p>
                <p className="text-xs sm:text-sm lg:text-base font-light text-white/70 tracking-wider">
                  Author
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ai1;
