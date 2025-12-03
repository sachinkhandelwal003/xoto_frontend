"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import mainbgImage from "../../assets/img/mainbg.jpg"; // ← change your image path
import { Link } from "react-router-dom";
export default function HeroSectionInterior
  () {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={mainbgImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-6xl heading-light font-extrabold sm:text-5xl md:text-6xl lg:text-6xl">
            Interiors That Reflect You
          </h1>

          <p className="mb-8 text-2xl paragraph-light text-white sm:text-lg md:text-xl lg:text-2xl max-w-[700px] ml-2">
            Tailored designs, smart solutions, and expert execution for every
            corner of your home.
          </p>

   <div className="flex flex-wrap items-center justify-center gap-6 mx-auto">
  <button className="group inline-flex items-center gap-3 rounded-md bg-[#5C039B] px-6 py-4 text-xl font-semibold text-white shadow-xl transition-all hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-1">
    <span className="text-2xl sm:text-xl">Get a free estimate</span>
    <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
  </button>

  <Link to="/ecommerce/b2c">
    <button className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-md text-lg font-bold shadow-xl transition-all flex items-center border-2 border-white/30 hover:border-white">
      Explore our store
    </button>
  </Link>
</div>


        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

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
    </div>

  );
}