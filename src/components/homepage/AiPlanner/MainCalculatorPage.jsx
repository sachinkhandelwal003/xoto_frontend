import React from 'react'
import { Calculator, Leaf, Home, ArrowRight } from 'lucide-react'
import aaImage from "../../../assets/img/aa.jpg";

export default function MainCalculatorPage() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center p-6">
      {/* Top navigation / breadcrumb */}
      

      {/* Page heading */}
      <header className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Choose a Property Calculator
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Quick tools to estimate landscaping costs or interior renovation budgets.
        </p>
      </header>

      {/* Two cards in the middle */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Landscaping Card */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl border border-white/10 group transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-[#500286] via-[#3a015f] to-[#500286]">
          <div className="relative z-10 p-6 flex flex-col gap-4 text-white">
            <h2 className="text-xl font-bold drop-shadow-lg">Landscaping Calculator</h2>
            <p className="text-sm opacity-90">Estimate garden & outdoor costs by area, materials and labour.</p>

            <div className="mt-auto flex items-center justify-between">
              <a href="/landscaping-calculator" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#500286] font-semibold shadow hover:bg-gray-100 transition-all">
                <Calculator className="w-4 h-4 text-[#500286]" /> Calculate Now
              </a>
              <a href="/landscaping-calculator" className="text-sm underline opacity-90 text-white">Open details →</a>
            </div>
          </div>
        </section>

        {/* Interior Calculator */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl border border-white/10 group transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-[#500286] via-[#3a015f] to-[#500286]">
          <div className="relative z-10 p-6 flex flex-col gap-4 text-white">
            <h2 className="text-xl font-bold drop-shadow-lg">Landscaping Calculator</h2>
            <p className="text-sm opacity-90">Estimate garden & outdoor costs by area, materials and labour.</p>

            <div className="mt-auto flex items-center justify-between">
              <a href="/landscaping-calculator" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#500286] font-semibold shadow hover:bg-gray-100 transition-all">
                <Calculator className="w-4 h-4 text-[#500286]" /> Calculate Now
              </a>
              <a href="/landscaping-calculator" className="text-sm underline opacity-90 text-white">Open details →</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer link or extra action */}
      <footer className="w-full max-w-4xl mt-10 text-center">
        <a
          href="/all-calculators"
          className="inline-block px-4 py-2 rounded-md bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100"
        >
          See all calculators
        </a>
      </footer>
    </div>
  )
}
