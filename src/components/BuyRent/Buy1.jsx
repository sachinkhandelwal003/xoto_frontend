import React from 'react';
import Imagemain from '../../assets/img/imageBuy.png';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden font-dm">
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
        <h1 className="mx-auto mb-8 max-w-5xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Transforming the Way You Rent, Buy, &amp; Sell Your Home.
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-6">

          {/* Rent a Home */}
          <button
            className="rounded-xl bg-[#5C039B] px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#5C039B] hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 sm:px-8 sm:py-4 sm:text-lg"
            aria-label="Rent a home"
          >
            Rent a Home
          </button>

          {/* Find a Home */}
          <button
            className="rounded-xl border-2 border-white px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#5C039B] hover:text-white hover:white focus:outline-none focus:ring-4 focus:ring-white/50 sm:px-8 sm:py-4 sm:text-lg"
            aria-label="Find a home"
          >
            Find a Home
          </button>

          {/* Sell a Home */}
          <button
            className="rounded-xl border-2 border-white px-6 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#5C039B] hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50 sm:px-8 sm:py-4 sm:text-lg"
            aria-label="Sell a home"
          >
            Sell a Home
          </button>
        </div>
      </div>

   
    </section>
  );
}