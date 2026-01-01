import React from "react";
import Picture from "../../assets/img/contactheroo.png";

const ContactHero = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[450px] sm:min-h-[550px] md:min-h-[650px] lg:min-h-[600px] flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${Picture})` }}
    >
      {/* Overlay for better text visibility */}
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl px-4 md:px-6">
        <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl  font-bold mb-4">
          Contact XOTO
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold">
          Get in touch with our luxury real estate experts. We’re here to help 
          you with all your property needs in the UAE.
        </p>
      </div>

      {/* Bottom clipped shapes */}
        <div className="absolute bottom-0 left-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-left-shape" />
      <div className="absolute bottom-0 right-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-right-shape" />

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
