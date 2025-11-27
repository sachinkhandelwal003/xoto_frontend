import React from "react";
import waveImg from "../../assets/img/wv1.png";
import missionImg from "../../assets/img/image 108.png";



const Check = ({ className = "" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full flex-shrink-0 ${className}`}
    style={{
      width: 28,
      height: 28,
      background: "#5C039B",
      boxShadow: "0 4px 10px rgba(92,3,155,0.18)",
      marginTop: 6,
    }}
  >
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 5.5L5 9L13 1"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Article3 = () => {
  return (
    <section className="relative w-full bg-[var(--color-body)]  overflow-hidden py-20">
      {/* Wave - Same position as original */}
      <div
        className="absolute left-0 bottom-0 w-full overflow-hidden pointer-events-none"
        style={{ height: 200, zIndex: 0 }}
      >
        <img
          src={waveImg}
          alt=""
          className="w-full object-cover"
          style={{ transform: "translateY(10px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* LEFT: CIRCLE IMAGE - Responsive but fixed 320px on desktop */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-start">
  <div
    className="relative flex items-center justify-center overflow-hidden rounded-full"
    style={{
      width: "398px",
      height: "398px",
      borderRadius: "50%",
      boxShadow: "0px 25px 60px rgba(0,0,0,0.18)",
      flexShrink: 0,
    }}
  >
    {/* Image inside masked circle */}
    <img
      src={missionImg}
      alt="Mission"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    {/* Mission Text (exact Figma values) */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: "48px",
        lineHeight: "55px",
        letterSpacing: "-0.03em",
        textShadow: "0px 4px 15px rgba(0,0,0,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      Mission
    </div>
  </div>
</div>


          {/* RIGHT: TEXT LIST */}
         {/* RIGHT SIDE LIST - Pixel-perfect to Figma */}
<div className="w-full lg:w-3/5">
  <ul style={{ paddingLeft: 0, margin: 0 }} className="space-y-8 lg:space-y-10">
    {/* ITEM 1 */}
    <li className="flex items-start gap-5 lg:gap-6">
      <div style={{ marginTop: 6 /* align check with first text line */ }}>
        <Check />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,           // Medium (500)
          fontSize: "24px",          // exact Figma size
          lineHeight: "33px",        // exact Figma line-height
          letterSpacing: "0.012em",  // 1.2% shown in Figma
          color: "#547593",          // exact color
          maxWidth: "614px",         // Figma text box width (from screenshot)
          textAlign: "left",
        }}
      >
        Establish ourselves as one of the leading technology-driven distribution company focusing on Home Upgrades, Real Estate & Mortgages in the UAE
      </p>
    </li>

    {/* ITEM 2 */}
    <li className="flex items-start gap-5 lg:gap-6">
      <div style={{ marginTop: 6 }}>
        <Check />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "33px",
          letterSpacing: "0.012em",
          color: "#547593",
          maxWidth: "614px",
          textAlign: "left",
        }}
      >
        Build and maintain the largest network of agents and freelancers in the market.
      </p>
    </li>

    {/* ITEM 3 */}
    <li className="flex items-start gap-5 lg:gap-6">
      <div style={{ marginTop: 6 }}>
        <Check />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "33px",
          letterSpacing: "0.012em",
          color: "#547593",
          maxWidth: "614px",
          textAlign: "left",
        }}
      >
        Harness Technology & AI to drive scalability and enable seamless expansion
      </p>
    </li>
  </ul>
</div>

        </div>
      </div>
    </section>
  );
};

export default Article3;