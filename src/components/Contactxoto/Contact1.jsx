import React from "react";
import Picture from "../../assets/img/contactheroo.png"; // Update your image path

const ContactHero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[710px] flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${Picture})` }}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-Extrabold mb-4 h-20">
          Contact XOTO
        </h1>
        <p className="text-xl w-3xl  leading-relaxed font-semibold">
          Get in touch with our luxury real estate experts. We’re here to help
          you with all your property needs in the UAE.
        </p>
      </div>

      {/* Bottom clipped shapes */}
      <div className="absolute bottom-0 left-0 h-10 bg-[#f5f5f5] z-[5] clip-left-shape w-[180px] md:w-[260px]"></div>
      <div className="absolute bottom-0 right-0 h-10 bg-[#f5f5f5] z-[5] clip-right-shape w-[180px] md:w-[260px]"></div>

      {/* Custom clip paths */}
      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default ContactHero;
