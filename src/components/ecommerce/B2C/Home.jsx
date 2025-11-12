import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import home from '../../../assets/img/ecommerce/ecoAr.png';
import Products from '../Products';
import Category from '../Category';
import heroBg from '../../../assets/img/hero-bg.jpg';

const Ecommerce = () => {
  const navigate = useNavigate();

  // Gradient style for all buttons
  const gradientStyle = {
    background: 'linear-gradient(90deg, rgba(92,3,155,1) 0%, rgba(147,25,211,1) 100%)'
  };

  return (
    <div className="bg-[var(--color-body)] min-h-screen font-sans">
      {/* Hero Section */}
      <div
        className="relative h-[42rem] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-12 py-16 flex items-center">
            {/* Left Section */}
            <div className="w-full md:w-1/2 lg:w-2/5 space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6 line-clamp-2 drop-shadow-xl">
                  Transform Your Living Space
                </h1>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 leading-snug mb-5 sm:mb-7 line-clamp-2 drop-shadow-lg">
                  Premium Interior Design Solutions
                </h2>

                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 drop-shadow">
                  Discover curated furniture collections that blend style, comfort, and functionality for your dream home.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={() => navigate('/sawtar/ecommerce/filter')}
                  className="text-white px-6 py-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:brightness-110"
                  style={gradientStyle}
                >
                  Explore Collections
                </button>

                <button
                  onClick={() => navigate('/sawtar/ecommerce/seller')}
                  className="text-white px-6 py-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:brightness-110 border border-white "
                >
                  Register as a Vendor
                </button>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Category & Products */}
      <Category />
      <Products />

      {/* Promo Section */}
      <section className="py-20 mb-2 max-w-7xl mx-auto bg-gradient-to-r from-[var(--color-text-secondary)] to-[var(--color-text-primary)]">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-white)] mb-4 drop-shadow-lg">
              Discover Stylish Interiors at Exclusive Prices
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-white)]/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Explore our curated collection of modern furniture, decor, and home accessories designed to elevate your space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:brightness-110"
                  style={gradientStyle}
                >
                  Shop Collection
                </motion.button>
              </Link>
              <Link to="/deals">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:brightness-110"
                  style={gradientStyle}
                >
                  View Offers
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ecommerce;