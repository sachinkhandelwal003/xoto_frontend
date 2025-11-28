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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* Heading with DM Sans Extra-Bold */}
       <h1
  className="
    mx-auto mb-8 max-w-5xl
    text-white
    font-extrabold
    leading-[76px]
    tracking-[0px]
    text-[40px]
    sm:text-[48px]
    md:text-[60px]
  "
>
  Transforming the Way You <br/> Rent, Buy, & Sell Your Home.
</h1>


     
          <div className="flex items-center gap-3 flex-wrap justify-center">

      {/* Left Button - Solid Purple */}
   <button
  
  className="
    px-8 md:px-10 lg:px-12   /* horizontal padding */
    py-3 md:py-4             /* vertical padding */
    bg-[#5C039B]             /* purple fill */
    text-white
    font-extrabold
    text-base md:text-lg
    rounded-lg
    shadow-md
    hover:bg-[#4A0080]
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[#5C039B]/40
  "
>
  Rent a Home
</button>


      {/* Right Button - Transparent */}
      <button
       
        className="
    px-8 md:px-10 lg:px-12   /* horizontal padding */
    py-3 md:py-4             /* vertical padding */
    bg-transparent
    border-2            /* purple fill */
    text-white
    font-extrabold
    text-base md:text-lg
    rounded-lg
    shadow-md
    hover:bg-white hover:text-[#5C039B]
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[#5C039B]/40
  "
      >
            Find a Home
      </button>
  <button
         className="
    px-8 md:px-10 lg:px-12   /* horizontal padding */
    py-3 md:py-4             /* vertical padding */
    bg-transparent
    border-2          /* purple fill */
    text-white
    font-extrabold
    text-base md:text-lg
    rounded-lg
    shadow-md
    hover:bg-white hover:text-[#5C039B]
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[#5C039B]/40
  "
      >
            Sell a Home
      </button>
    </div>
      </div>

   
    </section>
  );
}