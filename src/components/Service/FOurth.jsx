import React from "react";

// Icons + Loop Image
import iconAI from "../../assets/img/icons123/icon1.png";
import iconCost from "../../assets/img/icons123/icon2.png";
import iconGuide from "../../assets/img/icons123/icon3.png";
import iconFast from "../../assets/img/icons123/icon4.png";
import loopImg from "../../assets/img/icons123/loop.png";

// Label Component
function LoopLabel({ title, text, align = "left" }) {
  return (
    <div className={`w-60 ${align === "right" ? "text-right" : "text-left"}`}>
      {/* Title bubble */}
      <p
        className="
          font-semibold
          text-[#020202]
          bg-white
          px-4 py-1
          rounded-lg
          inline-block
          shadow-[0_0_20px_rgba(0,0,0,0.1)]
          border border-gray-200
        "
      >
        {title}
      </p>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

export default function OurPartners() {
  return (
    <section className="w-full bg-white  px-6 md:px-12 p-5 lg:px-20 pb-20 relative ">

      {/* ================= TITLE ================= */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b1739]">
          We Make Lenders <br /> Work for You
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed max-w-md">
          Xoto partners with leading banks and institutions so you get
          access to exclusive mortgage offers — faster, easier, and with full
          transparency.
        </p>
      </div>

      {/* ================= INFINITY LOOP ================= */}
      <div className="relative w-full max-w-6xl mx-auto">

        {/* LOOP SVG */}
        <img
          src={loopImg}
          alt="Infinity Loop"
          className="w-140 max-w-6xl mx-auto pointer-events-none select-none"
        />

        {/* ---- TOP LEFT ---- */}
        <div
          className="absolute flex items-start gap-4"
          style={{
            top: "-10px",
            left: "11%",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-[#5B0EB0] flex items-center justify-center shadow-lg mx-60 -mt-5">
            <img src={iconAI} className="w-8 h-8" alt="AI" />
          </div>
<div className="absolute -mx-31">
          <LoopLabel
            title="AI Matched Offers"
            text="We match you to mortgage plans suited to your income, property, and goals."
          />
          </div>
        </div>

        {/* ---- TOP RIGHT ---- */}
        <div
          className="absolute flex items-start gap-4 mx-60 mb-10 "
          style={{
            top: "-10px",
            right: "11%",
          }}
        >
         <div className="absolute mx-80">
          <LoopLabel
            title="Transparent Cost"
            text="All fees, interest, and charges are shown upfront — no last-minute surprises."
            
          />
          </div>

          <div className="w-16 h-16 rounded-full bg-[#5B0EB0] flex items-center justify-center shadow-lg mx-10 -mt-5">
            <img src={iconCost} className="w-8 h-8" alt="Cost" />
          </div>
        </div>

        {/* ---- BOTTOM LEFT ---- */}
        <div
          className="absolute flex items-start gap-4"
          style={{
            bottom: "-15px",
            left: "11%",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-[#5B0EB0] flex items-center justify-center shadow-lg mx-60 -mt-5">
            <img src={iconGuide} className="w-8 h-8" alt="Guide" />
          </div>
<div className="absolute -mx-31">
          <LoopLabel
            title="Personal Guidance"
            text="Our mortgage experts help guide you through every step, including paperwork."
          />
          </div>
        </div>

        {/* ---- BOTTOM RIGHT ---- */}
        <div
          className="absolute flex items-start gap-4 "
          style={{
            bottom: "-15px",
            right: "11%",
          }}
        >
            <div className="absolute mx-140 ">
          <LoopLabel
            title="Fast Process"
            text="Fastest Pre approval to disbursement."
            
          />
          </div>

          <div className="w-16 h-16 rounded-full bg-[#5B0EB0] flex items-center justify-center shadow-lg mx-70 -mt-5">
            <img src={iconFast} className="w-8 h-8" alt="Fast" />
          </div>
        </div>
      </div>
    </section>
  );
}
