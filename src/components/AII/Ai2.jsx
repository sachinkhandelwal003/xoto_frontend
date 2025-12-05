import React from "react";
import SectionImage from "../../assets/img/Image.png";

const Ai2 = () => {
  return (
    <div
      className="
        w-full 
        bg-white 
        py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24
        px-3 sm:px-4 md:px-6 lg:px-8 
        flex justify-center
      "
    >
      <div
        className="
          w-full 
          max-w-[1400px]   /* perfect for large screens */
          mx-auto
        "
      >
        <div className="w-full">
          <img
            src={SectionImage}
            alt="Interior"
            className="
              w-full 
              h-auto 
              object-cover
              rounded-[14px]
              sm:rounded-[18px]
              md:rounded-[22px]
              lg:rounded-[26px]
              xl:rounded-[32px]
              shadow-[0_4px_20px_rgba(0,0,0,0.1)]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Ai2;
