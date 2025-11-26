import React from "react";
import logo from "../../assets/img/xoto vault.png"
import maskgroup from "../../assets/img/Maskgroup1.png";
import rentimg from "../../assets/img/rental-home1.png";
import personimg from "../../assets/img/rent-person.png" ;


const Step = ({ number, title, subtitle, icon }) => (
  <div className="relative flex-1 min-w-0">
    {/* circle icon */}
    <div className="flex items-start gap-4">
      <div className="w-20 h-20 rounded-full bg-[#3b0c66] flex items-center justify-center shadow-lg translate-y-2">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#12c5b6] to-[#00a7e6] flex items-center justify-center">
          {/* icon (svg) */}
          <img src={logo} alt="" className="w-6 h-6" />
        </div>
      </div>

      <div className="ml-3">
        <div className="text-xs text-[#7ef3d4] font-bold tracking-wide">STEP {number.toString().padStart(2, "0")}</div>
        <h3 className="text-lg md:text-xl font-bold text-white mt-1 leading-tight">{title}</h3>
        <p className="text-sm text-white/90 mt-2 max-w-xs">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default function Third() {
 
    return (
    <section
      aria-label="Four step mortgage flow"
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${maskgroup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* purple --> teal overlay to match image tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/85 via-purple-700/45 to-cyan-500/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* top row: title + circular logo badge */}
        <div className="flex items-start justify-between">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl">
            Your Mortgage, <br className="md:hidden" /> Simplified in 4 Steps
          </h2>

          {/* circular logo at top-right (matches screenshot) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl translate-y-0">
              {/* replace with your real logo image if available */}
              <img src={logo} alt="" className="w-30 h-25" />
              {/* <span className="text-white font-extrabold text-lg md:text-xl">Xoto<br /><span className="text-xs">VAULT</span></span> */}
            </div>
          </div>
        </div>

     {/* ================= TIMELINE SECTION ================= */}
<div className="relative w-full mt-20">

  {/* Horizontal Line Behind Steps */}
  <div className="absolute top-20 left-0 right-0 hidden md:flex justify-center">
    <div className="w-full max-w-5xl h-[2px] bg-white/40"></div>
  </div>

  {/* Steps */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-center flex flex-col items-center translate-x-[-75px]">

    {/* ========== STEP 01 (BIG ICON) ========== */}
    <div className="flex flex-col items-center">
      
      <span className="text-green-300 font-semibold tracking-wider md-2  ">
        STEP 01
      </span>

      <div className="w-28 h-28 rounded-full bg-[#6800A8] flex items-center justify-center shadow-xl border border-purple-300">
        <img src={rentimg} alt="step 1" className="w-14 h-14" />
      </div>

      <h3 className="text-white font-semibold mt-4 text-lg ">
        Consultation & Pre-Check
      </h3>
      <p className="text-white/70 text-sm mt-1 leading-relaxed max-w-[200px]">
        We assess your finances and suggest options.
      </p>
    </div>

    {/* ========== STEP 02 ========== */}
    <div className="flex flex-col items-center">

      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 02
      </span>

      <div className="w-14 h-14 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg border border-purple-300">
        <img src={personimg} alt="step 2" className="w-6 h-6" />
      </div>

      <h3 className="text-white font-semibold mt-4 text-lg">
        Offer Comparison
      </h3>
      <p className="text-white/70 text-sm mt-1 leading-relaxed max-w-[200px]">
        Multiple lenders evaluated for best fit.
      </p>
    </div>

    {/* ========== STEP 03 (DOT ONLY) ========== */}
    <div className="flex flex-col items-center">

      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 03
      </span>

      {/* Small Purple Dot */}
      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#5C039B] shadow-lg border border-purple-300"></div>

      <h3 className="text-white font-semibold mt-4 text-lg">
        Select & Apply
      </h3>
      <p className="text-white/70 text-sm mt-1 leading-relaxed max-w-[200px]">
        Choose your offer; we handle documentation.
      </p>
    </div>

    {/* ========== STEP 04 ========== */}
    <div className="flex flex-col items-center">

      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 04
      </span>

      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg border border-purple-300 ">
        {/* <div className="w-5 h-5 bg-purple-300 rounded-full"></div> */}
      </div>

      <h3 className="text-white font-semibold mt-4 text-lg">
        Approval & Disbursement
      </h3>
      <p className="text-white/70 text-sm mt-1 leading-relaxed max-w-[200px]">
        Funds released with our support.
      </p>
    </div>

  </div>
</div>



        {/* bottom spacing to mimic cutout */}
        <div className="mt-10 md:mt-14" />
      </div>

      {/* decorative bottom fade to white (so next section overlaps nicely) */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/0 md:h-36" />
    </section>
  );
}