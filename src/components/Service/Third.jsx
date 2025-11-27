import React from "react";
import logo from "../../assets/img/xoto vault.png";
import maskgroup from "../../assets/img/Maskgroup1.png";
import rentimg from "../../assets/img/rental-home1.png";
import personimg from "../../assets/img/rent-person.png";

/* Apply DM Sans only inside this component */
const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function Third() {
  return (
    <section
      aria-label="Four step mortgage flow"
      className="relative w-full h-160 overflow-hidden"
      style={{
        backgroundImage: `url(${maskgroup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...dmSans,
      }}
    >
      {/* Load DM Sans */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/85 via-purple-700/45 to-cyan-500/30 pointer-events-none" />

      <div
        className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24"
        style={dmSans}
      >
        {/* Title + Circle */}
        <div className="flex items-start justify-between -mt-14" style={dmSans}>
          <h2
            className="text-3xl md:text-4xl  mt-2 lg:text-5xl font-extrabold text-white leading-relaxed max-w-2xl"
            style={dmSans}
          >
            Your Mortgage, <br/> Simplified in 4 Steps
          </h2>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-20 h-20 md:w-41 md:h-41  rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
              <img src={logo} alt="" className="w-27 h-27" />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative w-full mt-20" style={dmSans}>
          {/* Horizontal Line */}
          <div className="absolute top-20 left-0 right-0 hidden md:flex justify-center">
            <div className="w-full max-w-5xl h-[2px] bg-white/40" 
             style={{
      width: "100%", 
      background: "linear-gradient(to right, #03A4F4, #64EF0A)",
    }}></div>
          </div>

          {/* Steps */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-center translate-x-[-75px]">
            {/* STEP 01 */}
           <div className="flex flex-col items-center -mt-4" style={dmSans}>
  <span className="text-green-300 -mt-6 font-semibold tracking-wider mb-2">
    STEP 01
  </span>

  <div className="w-40 h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
    <img src={rentimg} alt="step 1" className="w-18 h-18" />
  </div>
<div className="text-left ml-13">
  <h3 className="text-white font-semibold mt-4 text-lg">
    Consultation &<br/>Pre-Check
  </h3>

  <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
    We assess your finances<br/> and suggest options.
  </p>
  </div>
</div>


            {/* STEP 02 */}
            <div className="flex flex-col mt-5 items-center" style={dmSans}>
              <span className="text-green-300 font-semibold tracking-wider mb-2">
                STEP 02
              </span>

              <div className="w-15 h-15 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg ">
                <img src={personimg} alt="step 2" className="w-6 h-6" />
              </div>
             <div className="text-left ml-25">
              <h3 className="text-white font-semibold mt-14 text-lg">
                Offer<br/> Comparison
              </h3>
              <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                Multiple lenders evaluated for best fit.
              </p>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="flex flex-col mt-9 items-center" style={dmSans}>
              <span className="text-green-300 font-semibold tracking-wider mb-2">
                STEP 03
              </span>

              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#5C039B] shadow-lg"></div>
              <div className="text-left ml-30">
              <h3 className="text-white font-semibold mt-17 text-lg">
                Select &<br/> Apply
              </h3>
              <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                Choose your offer, we<br/> handle documention.
              </p>
              </div>
            </div>

            {/* STEP 04 */}
            <div className="flex flex-col mt-9 items-center" style={dmSans}>
              <span className="text-green-300 font-semibold tracking-wider mb-2">
                STEP 04
              </span>

              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#5C039B] shadow-lg"></div>
          <div className="text-left ml-30">
              <h3 className="text-white font-semibold mt-17 text-lg">
                Approval &<br/> Disbursement
              </h3>
              <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                Funds released<br/> with our support.
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom spacing */}
        <div className="mt-10 md:mt-14" />
      </div>

      {/* Fade bottom */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/0 md:h-36" />
    </section>
  );
}
