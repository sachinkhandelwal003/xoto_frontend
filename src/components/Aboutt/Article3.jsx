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
              className="rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: "clamp(280px, 80vw, 320px)",
                height: "clamp(280px, 80vw, 320px)",
                position: "relative",
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                flexShrink: 0,
              }}
            >
              <img
                src={missionImg}
                alt="Mission"
                className="w-full h-full object-cover"
              />

              {/* "Mission" Text Overlay */}
              <div
                style={{
                  position: "absolute",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(36px, 10vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              >
                Mission
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT LIST */}
          <div className="w-full lg:w-3/5">
            <ul className="space-y-8 lg:space-y-10 pl-0">
              {/* ITEM 1 */}
              <li className="flex gap-5 lg:gap-6 items-start">
                <Check />
                <p
                  className="text-justify lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(18px, 4vw, 24px)",
                    lineHeight: "1.4",
                    letterSpacing: "0.012em",
                    fontWeight: 500,
                    color: "#547593",
                    margin: 0,
                  }}
                >
                  Establish ourselves as one of the leading technology-driven
                  distribution company focusing on Home Upgrades, Real Estate &
                  Mortgages in the UAE
                </p>
              </li>

              {/* ITEM 2 */}
              <li className="flex gap-5 lg:gap-6 items-start">
                <Check />
                <p
                  className="text-justify lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(18px, 4vw, 24px)",
                    lineHeight: "1.4",
                    letterSpacing: "0.012em",
                    fontWeight: 500,
                    color: "#547593",
                    margin: 0,
                  }}
                >
                  Build and maintain the largest network of agents and freelancers
                  in the market.
                </p>
              </li>

              {/* ITEM 3 */}
              <li className="flex gap-5 lg:gap-6 items-start">
                <Check />
                <p
                  className="text-justify lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(18px, 4vw, 24px)",
                    lineHeight: "1.4",
                    letterSpacing: "0.012em",
                    fontWeight: 500,
                    color: "#547593",
                    margin: 0,
                  }}
                >
                  Harness Technology & AI to drive scalability and enable seamless
                  expansion
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