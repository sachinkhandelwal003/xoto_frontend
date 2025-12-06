import React from "react";

export default function CTAButtons() {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-center">

      {/* PRIMARY BUTTON */}
      <button
        onClick={() => alert("Get Pre-Approved clicked")}
        className="
          px-8 py-3
               bg-[var(--color-primary)] 

          text-white
          font-semibold
          rounded-lg
          shadow-md
          transition-all duration-300
        "
      >
        Get Pre-Approved
      </button>

      {/* OUTLINE BUTTON */}
      <button
        onClick={() => alert("Calculate Mortgage clicked")}
        className="
          px-8 py-3
          border-2 border-white/70
          text-white
          font-semibold
          rounded-lg
          backdrop-blur-sm
          transition-all duration-300

          hover:bg-[var(--color-primary)] 

          hover:border-[#5C039B]
          hover:shadow-lg
        "
      >
        Calculate Your Mortgage
      </button>

    </div>
  );
}
