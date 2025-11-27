import React from "react";
import greenHouse from "../../assets/img/house-with-lot-windows-bed-with-sofa-it_1103290-30179 1.png";
import waveBottom from "../../assets/img/1.png";

const Article5 = () => {
  return (
    <section className="relative  bg-gradient-to-b from-white to-[#F8FDF8] overflow-hidden mt-10 ">
      {/* Green wave at bottom - unchanged */}
      <img
        src={waveBottom}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none opacity-70 z-10"
        style={{ transform: "translateY(600px)" }} // keep your current position
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20">
        {/* Main Centered Heading (Single Div - Exact Figma Match) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-semibold text-[#020202] text-[60px] leading-[55px] tracking-[-0.03em]">
            Building a Greener Tomorrow,
            <br className="hidden lg:block" />
            <span className="block relative">
              One Space at a Time
              <span
                className="absolute left-0 right-0 h-[3px] "
                style={{ bottom: "-12px" }}
              />
            </span>
          </h2>
        </div>

        {/* Image + Paragraphs in One Grid Container */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl  my-[90px]">
          {/* Left: Image */}
          <div className="flex justify-center lg:justify-start w-full">
            <img
              src={greenHouse}
              alt="Sustainable modern home"
              className="w-[627px] h-auto mt-[60px] -translate-x-[20px] object-contain"
            />
          </div>

          {/* Right: All Text Content */}
          <div className="w-[711px] mr-10 space-y-7 font-medium text-[#547593] text-[24px] leading-[33px] tracking-normal ">
            <p>
              At XOTO, we believe sustainability isn’t a choice — it’s the
              foundation of future living. In a world where conscious living
              defines progress, embracing sustainable practices means creating
              spaces that thrive in harmony with nature and innovation. From
              eco-friendly landscaping and energy-efficient interiors to
              responsible partnerships and mindful material sourcing, every XOTO
              solution is designed to minimize impact and maximize value.
            </p>

            <p>
              Through our integrated approach, we help property owners,
              developers, and partners align with global sustainability goals —
              enhancing not just aesthetics, but long-term property worth and
              community wellbeing. Together, let’s design a future where living
              beautifully also means living responsibly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article5;
