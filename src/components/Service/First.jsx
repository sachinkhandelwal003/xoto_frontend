import React from 'react';
import CTAButtons from './CTAButtons.jsx';
import herobg from '../../assets/img/serviceimg1.png';

/* Inject DM Sans font inside component */
const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function HomeLoanHero() {
  return (
    <section
      className=" relative w-full bg-cover bg-center w-full h-140"
      style={{ backgroundImage: `url(${herobg})`, ...dmSans }}
    >
   
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

      <div className="hero-overlay p-8 md:p-16" style={dmSans}>
        <div className="max-w-6xl mx-auto text-center text-white py-20 md:py-28" style={dmSans}>
          
          <h1
            className="text-3xl md:text-6xl font-extrabold drop-shadow-sm"
            style={{ lineHeight: "1.4", ...dmSans }}
          >
            Smarter Home Loans, Simplified
          </h1>

          <p
            className="mt-4 md:w-3/4 mx-auto text-sm md:text-2xl text-gray-100/90"
            style={dmSans}
          >
            Compare lenders, get pre-approved, and secure your dream <br />
            home faster — all in one place.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap" style={dmSans}>
            <CTAButtons />
          </div>
        </div>
      </div>

    </section>
  );
}
