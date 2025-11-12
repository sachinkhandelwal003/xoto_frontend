import React from "react";
import { Link } from "react-router-dom";
import { Home, Image, Trees, Sparkles, Building2, Paintbrush } from "lucide-react";
import houseimage from "../../assets/img/house.png";

const HomeDesign = () => {
  const badges = [
    { id: 1, label: "Exterior Upgrade", icon: <Building2 className="w-4 h-4 text-white" />, top: "5%", left: "36%" },
    { id: 2, label: "Interior Transformation", icon: <Home className="w-4 h-4 text-white" />, top: "30%", left: "65%" },
    { id: 3, label: "Smart Furniture Swap", icon: <Sparkles className="w-4 h-4 text-white" />, top: "56%", left: "70%" },
    { id: 4, label: "Landscaping", icon: <Trees className="w-4 h-4 text-white" />, bottom: "10%", left: "60%" },
    { id: 5, label: "Image Perfection", icon: <Image className="w-4 h-4 text-white" />, bottom: "15%", left: "35%" },
    { id: 6, label: "Virtual Design Studio", icon: <Paintbrush className="w-4 h-4 text-white" />, top: "34%", left: "23%" },
  ];

  return (
    <section className="relative w-full bg-[var(--color-body)] overflow-hidden pt-28 pb-28">
      <div className="relative z-10 flex flex-col lg:flex-row items-center px-6 sm:px-12 lg:px-24">
        {/* ---------- LEFT SIDE (Content) ---------- */}
        <div className="lg:w-[40%] w-full z-20 space-y-6 relative pb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-black leading-tight">
            Your Space, <br />
            <span className="text-black">
              Redefined Instantly.
            </span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed max-w-md">
            Upload your villa layout and let{" "}
            <span className="font-semibold">Xoto AI</span> craft stunning
            outdoor and interior design options — tailored perfectly to your
            taste.
          </p>

          <Link
            to=""
            className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5533d8] transition-all shadow-md"
          >
            Get Free Estimate Now
          </Link>
        </div>

        {/* ---------- RIGHT SIDE (Image + Badges) ---------- */}
        <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-[70%]">
          <div className="relative w-full flex justify-end items-center">
            {/* 3D House Image */}
            <img
              src={houseimage}
              alt="3D House"
              className="w-[90%] max-w-3xl drop-shadow-2xl select-none"
            />

            {/* Floating Badges */}
            {badges.map((b) => (
              <div
                key={b.id}
                className="absolute flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 whitespace-nowrap transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white"
                style={{
                  top: b.top,
                  left: b.left,
                  bottom: b.bottom,
                }}
              >
                {/* Icon bubble */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--color-gradient--btn-blue-green)",
                  }}
                >
                  {b.icon}
                </div>
                <span className="text-sm font-semibold">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDesign;