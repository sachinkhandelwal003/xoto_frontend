'use client';

import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Star , Fan, ArrowUp } from 'lucide-react';
import heImage from '../../assets/img/he.png';
import helloImage from '../../assets/img/hello.jpg';
import fourthImage from '../../assets/img/fourth.jpg';
import mainbgImage from '../../assets/img/mainbg.jpg';
import exploreoneImage from '../../assets/img/exploreone.png';
import exploretwoImage from '../../assets/img/exploretwo.png';
import explorethreeImage from '../../assets/img/explorethree.png';
import lasttImage from '../../assets/img/lastt.jpg';
import Dreamspacking from './Dreamspacking';
import Eco from '../../components/homepage/Eco';
import bbImage from '../../assets/img/bb.png';

import yyyImage from '../../assets/img/yyy.png';
export default function App() {
  return (
    <>
      {/* ────────────────────── HERO SECTION ────────────────────── */}
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0">
          <img
            src={mainbgImage}
            alt="Modern living room with city view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
          <div className="max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
              Interiors That Reflect You
            </h1>
            <p className="mb-10 text-lg text-gray-100 drop-shadow-md md:text-xl">
              Tailored designs, smart solutions, and expert execution for every corner of your home.
            </p>
            <button className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-8 py-4 font-medium text-white shadow-xl transition-all hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-1">
              <span>Get a free estimate</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-3xl bg-white/5 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-3xl bg-white/5 backdrop-blur-sm"></div>
      </div>

      {/* ────────────────────── INTERACTIVE BUILDER ────────────────────── */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-block  border-cyan-500 p-1">
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Bring your vision to life with our{' '}
                  <span className="black">interactive builder</span>
                </h2>
              </div>
              <p className="text-lg text-gray-600">
                Upload your space or choose a template, and get instant AI-powered design previews.
              </p>
              <p className="text-sm text-gray-500">531 x 165</p>
              <button className="rounded-full bg-purple-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl">
                Take a first step
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={heImage}
                alt="3D rendered modern living room"
                className="w-full max-w-lg drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden">
          <svg viewBox="0 0 1440 320" className="w-full text-green-50" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,160C672,128,768,96,864,112C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="absolute top-0 left-0 h-32 w-px bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </section>

      {/* ────────────────────── BOOK CONSULTATION ────────────────────── */}
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
  <img
    src={helloImage}
    alt="Luxury living room"
    className="absolute inset-0 h-full w-full object-cover opacity-70"
  />
  {/* ---- GRADIENT OVERLAY ---- */}
  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(180deg, rgba(92, 3, 155, 0.8) 19.27%, rgba(3, 164, 244, 0.8) 93.91%)',
    }}
  />
  {/* -------------------------------- */}
  <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
    <div className="max-w-md text-white">
      <h2 className="inline-block whitespace-nowrap text-4xl font-bold md:text-5xl lg:text-6xl">
        Book Consultation
      </h2>
      <p className="mt-4 text-lg text-gray-200">
        One simple form to connect with XOTO experts for tailored interior
        design advice and project planning.
      </p>
    </div>

    <div className="w-full max-w-lg">
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name<sup className="text-purple-600">*</sup>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name<sup className="text-purple-600">*</sup>
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address<sup className="text-purple-600">*</sup>
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number<sup className="text-purple-600">*</sup>
              </label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message<sup className="text-purple-600">*</sup>
            </label>
            <textarea
              required
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Xyz"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-purple-600 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg"
          >
            Book Free Consultation
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
      {/* ────────────────────── OUR SERVICES PORTFOLIO ────────────────────── */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Our Services Portfolio
          </h2>

          <div className="relative flex items-center justify-center">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent z-0"></div>

            <div className="relative z-10 flex items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-48 md:w-56">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-sm"></div>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-semibold text-gray-800">
                    Modular Kitchens
                  </h3>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="w-12 md:w-20 h-px bg-cyan-300"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-48 md:w-56">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-sm"></div>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-semibold text-gray-800">
                    Modular Wardrobes
                  </h3>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-12 md:w-20 h-px bg-cyan-300"></div>
                  <X className="w-5 h-5 text-cyan-400 mx-1" />
                  <div className="w-12 md:w-20 h-px bg-cyan-300"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-48 md:w-56">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-sm"></div>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-semibold text-gray-800">
                    Lighting
                  </h3>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-12 md:w-20 h-px bg-cyan-300"></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-48 md:w-56">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-sm"></div>
                  </div>
                  <h3 className="text-center text-sm md:text-base font-semibold text-gray-800">
                    Flooring
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-purple-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 -z-10 overflow-hidden">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-40 text-cyan-50"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,181C672,170,768,192,864,197C960,203,1056,192,1152,181C1248,170,1344,160,1392,155L1440,150L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* ────────────────────── EXPLORE DREAM SPACES ────────────────────── */}
      <Dreamspacking/>
      {/* ────────────────────── CLIENT TESTIMONIALS (STATIC + PROFESSIONAL) ────────────────────── */}
      <section className="relative bg-gradient-to-b from-purple-50 to-pink-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#wave-gradient)"
              fillOpacity="0.2"
              d="M0,100 C300,200 400,50 720,100 C1000,150 1140,50 1440,100 L1440,0 L0,0 Z"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Seamless Design Experience</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                The team at XOTO transformed our outdated apartment into a modern masterpiece. Their attention to detail and use of premium materials exceeded expectations.
              </p>
              <div className="flex gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Priya Sharma</p>
              <p className="text-sm text-gray-500">Dubai Marina</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">On-Time & On-Budget</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                From concept to completion, the project was delivered on schedule and within budget. The 3D previews helped us visualize the final outcome perfectly.
              </p>
              <div className="flex gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Ahmed Al-Mansoori</p>
              <p className="text-sm text-gray-500">Jumeirah, Dubai</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Luxury Redefined</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                Our villa now feels like a 5-star resort. The smart home integration and sustainable materials make it both luxurious and eco-friendly.
              </p>
              <div className="flex gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Fatima Khan</p>
              <p className="text-sm text-gray-500">Palm Jumeirah</p>
            </div>

            {/* Card 4 - With Avatar */}
            <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-10 right-4 w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Rahul"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">Dream Home Realized</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                The modular kitchen and wardrobe solutions are both beautiful and functional. XOTO made our dream home a reality with zero stress.
              </p>
              <div className="flex gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Rahul Desai</p>
              <p className="text-sm text-gray-500">Abu Dhabi</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-purple-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>
      {/* last sectionm */}
      <section className="bg-gradient-to-b from-white via-blue-50 to-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ────── TOP PART (your original) ────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              EcoSmart Living Interiors
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At XOTO, EcoSmart Living for interiors means designing homes that blend style,
              sustainability, and smart technology. Our spaces are thoughtfully crafted to be
              energy-efficient, environmentally friendly, and effortlessly modern.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md p-6 border-2 border-blue-300 rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-lg">
              <img
                src={bbImage}
                alt="Eco-friendly smart home"
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>

        {/* ────── BOTTOM PART (diagram + arrow) ────── */}
        <div className="relative">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            How We Bring It to Life
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ─── LEFT: Circular Diagram ─── */}
            <div className="relative flex justify-center">
              <div className="relative w-96 h-96">

                {/* ── CENTER HOUSE + ARROW ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                  {/* House image */}
                  <img
                    src={yyyImage}
                    alt="Smart Home"
                    className="w-44 h-auto rounded-xl shadow-2xl"
                  />
                  {/* Arrow – placed directly under the house */}
                  <ArrowUp className="w-7 h-7 text-teal-600 mt-2" />
                </div>

                {/* ── FEATURE CIRCLES + LINES ── */}
                {[
                  { label: "Smart Climate Control",      angle:   0, dot: "bg-teal-400" },
                  { label: "Led & Solar Lighting",       angle:  60, dot: "bg-cyan-400" },
                  { label: "Sustainable Materials",      angle: 120, dot: "bg-green-400" },
                  { label: "Water-Efficient Fixtures",   angle: 180, dot: "bg-blue-400" },
                  { label: "Automated Home Management",  angle: 240, dot: "bg-purple-400" },
                  { label: "Future-Ready Interiors",     angle: 300, dot: "bg-indigo-400" },
                ].map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const radius = 160;                     // distance from centre to circle centre
                  const cx = 192 + radius * Math.cos(rad);
                  const cy = 192 + radius * Math.sin(rad);

                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{ top: `${cy - 56}px`, left: `${cx - 56}px` }}   // 56 = half of circle size
                    >

                      {/* ── LINE FROM CENTRE → CIRCLE ── */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
                        style={{ transform: `rotate(${item.angle}deg)`, transformOrigin: 'center' }}
                      >
                        <line
                          x1="50%" y1="50%"                     // start = centre of diagram
                          x2="calc(50% + 130px)" y2="50%"        // end inside the circle
                          stroke="url(#lineGrad)"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* ── CIRCLE ── */}
                      <div className="w-28 h-28 rounded-full bg-white shadow-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-3 text-center">
                        <div className={`w-3 h-3 ${item.dot} rounded-full mb-1`} />
                        <p className="text-xs font-semibold text-gray-700 leading-tight">
                          {item.label.split(" ").map((w, j) => (
                            <span key={j}>{w}<br /></span>
                          ))}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* ── GRADIENT DEFINITION (once) ── */}
                <svg className="absolute -top-96 left-0 w-0 h-0">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c084fc" />   {/* purple */}
                      <stop offset="50%" stopColor="#14b8a6" />  {/* teal */}
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* ─── RIGHT: Feature Callout ─── */}
            <div className="flex items-center gap-6 bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-3xl shadow-lg">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center shadow-md">
                  <Fan className="w-9 h-9 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Smart Climate Control</h4>
                <p className="text-gray-600 mt-1">
                  Automated temperature and ventilation systems for energy savings.
                </p>
              </div>
            </div>
          </div>

          {/* ── WAVE BACKGROUND ── */}
          <div className="absolute bottom-0 left-0 right-0 h-40 -z-10 overflow-hidden">
            <svg viewBox="0 0 1440 320" className="w-full h-full text-blue-100 opacity-70" preserveAspectRatio="none">
              <path fill="currentColor"
                d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,170.7C672,160,768,160,864,170.7C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L0,320Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}