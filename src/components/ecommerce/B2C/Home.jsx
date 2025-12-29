import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../../assets/img/hero-bg.jpg';
import Category from '../Category';
import Products from '../Products';
import { Link } from 'react-router-dom';

const Ecommerce = () => {
  const navigate = useNavigate();

  

  return (
    <div className="bg-gray-50  font-sans">
      
      {/* ================= HERO SECTION (Updated to Match Landscaping UI) ================= */}
      <section className="relative flex items-center py-28 justify-center overflow-hidden h-[70vh]">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-light mb-6"
          >
            Redefine Your 
          Living Space
          </motion.h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
             AI-curated furniture collections that blend style, comfort, and functionality for your modern lifestyle.
          </p>

       


           <div className="flex flex-wrap gap-4 justify-center  pt-4">
                      <Link
                        to="/ecommerce/filter"
                        className="bg-[var(--color-primary)] px-8 py-3 rounded-md shadow-lg"
                      >
              Explore Collections
                      </Link>
          
                      <Link
                        to="/ecommerce/seller"
                        className="border-2 border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition"
                      >
              Become a Vendor
                      </Link>
                    </div>
        </div>
      </section>

      {/* ================= CATEGORIES & PRODUCTS ================= */}
      <Category />
      <Products />

      {/* ================= PROMO BANNER (AR Section) ================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Try Before You Buy with <span className="text-[var(--color-primary)]">AR Preview</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Visualize furniture in your space before purchasing. Our augmented reality feature lets you see exactly how it fits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: AR Preview */}
              <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-purple-50 rounded-xl p-6 border border-gray-200 hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-purple-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">AR Room Scan</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Use your phone's camera to scan your room and visualize furniture in 3D
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                  Start Scanning
                </motion.button>
              </div>

              {/* Card 2: Virtual Staging */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">🛋️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Virtual Staging</h3>
                <p className="text-gray-600 mb-6 text-center">
                  See how different furniture styles look in your space with AI-powered suggestions
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                  Try Virtual Staging
                </motion.button>
              </div>

              {/* Card 3: Measurements */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">📏</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Precision Fit</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Get exact measurements and see if furniture fits perfectly in your space
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                  Check Fit
                </motion.button>
              </div>
            </div>

            {/* Demo Video Section */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Scan Your Room</p>
                        <p className="text-gray-600 text-sm">Use your phone camera to capture your space</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Browse Furniture</p>
                        <p className="text-gray-600 text-sm">Select from our curated collection</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Preview in AR</p>
                        <p className="text-gray-600 text-sm">See furniture in your space in real-time</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-1">
                  <div className="bg-white rounded-xl p-6">
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl text-[var(--color-primary)]">▶️</span>
                        </div>
                        <p className="text-gray-900 font-semibold">AR Demo Video</p>
                        <p className="text-gray-600 text-sm mt-1">Watch how it works</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:opacity-90 transition-all"
                        >
                          Play Demo
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecommerce;