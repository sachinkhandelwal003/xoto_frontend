import React from 'react';
import Imagemain from '../../assets/img/buy.jpg';

export default function HeroSection() {
  return (
    <section className="relative  w-full overflow-hidden font-dm h-140">
      {/* ---------- Background Image ---------- */}
       <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      {/* Custom clip paths */}
      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Imagemain})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* Heading with DM Sans Extra-Bold */}
        <h1 className="mx-auto mb-8 max-w-5xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Transforming the Way You Rent, Buy, &amp; Sell Your Home.
        </h1>

     
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
            Rent a Home
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
            Find a Home
      </button>
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
            Sell a Home
      </button>
    </div>
      </div>

   
    </section>
  );
}