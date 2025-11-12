import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Users, Handshake, Wrench } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "For Customers",
    description:
      "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    id: 2,
    title: "For Partners",
    description:
      "Reimagine your business with seamless AI integrations that unlock smarter design and sales workflows.",
    icon: <Handshake className="w-6 h-6 text-white" />,
  },
  {
    id: 3,
    title: "For Professionals",
    description:
      "Collaborate, innovate, and deliver next-level experiences powered by Xoto’s unified ecosystem.",
    icon: <Wrench className="w-6 h-6 text-white" />,
  },
];

export default function BuiltForEveryone() {
  return (
    <section className="relative w-full bg-[var(--color-body)] overflow-hidden py-20 px-6 flex flex-col items-center justify-center text-center">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-12">
        Built For Everyone
      </h2>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-12">
        {/* Left Circle Graphic */}
        <div className="relative flex justify-center items-center lg:w-1/3 w-full">
          <div className="relative w-[250px] h-[250px] flex items-center justify-center">
            {/* Circular gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5C039B] via-[#64EF0A] to-[#00D4FF] opacity-90 blur-[1px]"></div>

            {/* Inner ring pattern */}
            <div className="absolute inset-4 border-4 border-white/30 rounded-full"></div>

            {/* Center icon circle */}
            <div className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#64EF0A] to-[#5C039B] shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Decorative lines */}
          <div className="absolute -bottom-10 w-full h-20 bg-gradient-to-t from-[var(--color-body)] via-transparent to-transparent opacity-70"></div>
        </div>

        {/* Right Slider */}
        <div className="lg:w-2/3 w-full">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-slide",
              prevEl: ".prev-slide",
            }}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            className="relative pb-10"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col items-start text-left gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C039B] to-[#64EF0A] flex items-center justify-center">
                    {slide.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button className="prev-slide bg-white/80 hover:bg-white text-gray-700 p-3 rounded-full shadow-md transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="next-slide bg-[var(--color-primary)] text-white p-3 rounded-full shadow-md hover:scale-105 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative wave background */}
      <div className="absolute bottom-0 left-0 w-full h-[120px] bg-[radial-gradient(ellipse_at_bottom,var(--color-secondary)_0%,transparent_70%)] opacity-50"></div>
    </section>
  );
}