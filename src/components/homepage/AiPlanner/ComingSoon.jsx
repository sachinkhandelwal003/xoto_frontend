import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom

const ComingSoon = ({ 
  pageName = "New Feature", 
  description = "We're currently crafting this experience. Stay tuned for something amazing.",
  imageSrc = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1470&q=80" // Default generic coding/tech image
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 font-sans flex items-center justify-center p-4 relative overflow-hidden">

  

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-30 animate-pulse delay-1000" />
      </div>

      {/* Main Card */}
      <motion.div
        className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        {/* Top Decorative Bar */}
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

        <div className="p-8 md:p-14 flex flex-col items-center text-center">
          
          {/* Icon/Logo Circle */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-inner mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Under Development
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {pageName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Coming Soon</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-500 max-w-lg mb-10 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Preview Image (Optional) */}
          <motion.div
            className="w-full max-w-2xl relative group"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-2xl">
              <img
                src={imageSrc}
                alt="Feature Preview"
                className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end justify-center pb-8">
                <p className="text-white/90 text-sm font-medium tracking-wide">
                  Building the future of {pageName}
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
           <p className="text-gray-400 text-xs">
             &copy; {new Date().getFullYear()} Xoto. All rights reserved.
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;