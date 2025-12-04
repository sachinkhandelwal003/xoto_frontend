{
  /* Timeline */
}
<div className="relative mt-16">
  {/* Centered Horizontal Line */}
  <div className="hidden md:block absolute inset-x-0 top-[50%] -translate-y-1/2 z-0">
    <div
      className="w-full h-[3px]"
      style={{
        background: "linear-gradient(to right, #03A4F4, #64EF0A)",
      }}
    ></div>
  </div>

  {/* Steps Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-20 text-center relative z-10">
    {/* --- STEP 01 --- */}
    <div className="flex flex-col items-center">
      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 01
      </span>

      {/* Circle centered on line */}
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl mb-4">
        <img src={rentimg} alt="step 1" className="w-12 md:w-14" />
      </div>

      <h3 className="text-white font-semibold text-lg leading-tight">
        Consultation & <br /> Pre-Check
      </h3>
      <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
        We assess your finances and suggest options.
      </p>
    </div>

    {/* --- STEP 02 --- */}
    <div className="flex flex-col items-center">
      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 02
      </span>

      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl mb-4">
        <img src={personimg} alt="step 2" className="w-6 md:w-8" />
      </div>

      <h3 className="text-white font-semibold text-lg leading-tight">
        Offer <br /> Comparison
      </h3>
      <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
        Multiple lenders evaluated for best fit.
      </p>
    </div>

    {/* --- STEP 03 --- */}
    <div className="flex flex-col items-center">
      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 03
      </span>

      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#5C039B] shadow-xl mb-6"></div>

      <h3 className="text-white font-semibold text-lg leading-tight">
        Select & <br /> Apply
      </h3>
      <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
        Choose your offer, we handle documentation.
      </p>
    </div>

    {/* --- STEP 04 --- */}
    <div className="flex flex-col items-center">
      <span className="text-green-300 font-semibold tracking-wider mb-2">
        STEP 04
      </span>

      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#5C039B] shadow-xl mb-6"></div>

      <h3 className="text-white font-semibold text-lg leading-tight">
        Approval & <br /> Disbursement
      </h3>
      <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
        Funds released with our support.
      </p>
    </div>
  </div>
</div>;
