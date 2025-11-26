import React from "react";

export default function CTAButtons() {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">

      {/* Left Button - Solid Purple */}
      <button
        onClick={() => alert("Get Pre-Approved clicked")}
        className="
          px-8 py-3 
          bg-[#5C039B] 
          text-white 
          font-semibold 
          rounded-md 
          shadow-sm
          hover:bg-[#4A0080]
          transition
        "
      >
        Get Pre-Approved
      </button>

      {/* Right Button - Transparent */}
      <button
        onClick={() => alert("Calculate Mortgage clicked")}
        className="
          px-8 py-3 
          bg-transparent
          border border-white/60
          text-white 
          font-semibold 
          rounded-md
          hover:bg-white hover:text-[#5C039B]
          transition
        "
      >
        Calculate Your Mortgage
      </button>

    </div>
  );
}
