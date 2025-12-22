import React, { useState } from "react";
import HeroSection from "../herosection";
import TestimonialSlider from "../designslider/testimonial/TestimonialSlider";
import HomeDesign from "../homedesign/HomeDesign";
import Trust from "../homedesign/Trust";
import AIPoweredEcosystemSection from "../AIPoweredEcosystemSection";
import MagazineSlider from "../magazines/MagazinePage";
import Moduleboat from "./Moduleboat";
import XobiaChatbot from "./XobiaChatbot";
import { motion } from "framer-motion";
import LocationCategoryModal from "../modal/LocationCategoryModal";
import { useEffect } from "react";

const Home = () => {
  const [isModuleOpen, setIsModuleOpen] = useState(false);
    // const [showLocationModal, setShowLocationModal] = useState(false);

  // useEffect(() => {
  //   setShowLocationModal(true);
  // }, []);
  return (
    <>

{/* 
         {showLocationModal && (
        <LocationCategoryModal />
      )} */}

      <HeroSection />
      <HomeDesign />
      <AIPoweredEcosystemSection />
      <MagazineSlider />
      <TestimonialSlider />
      <Trust />

      {/* ✅ Xobia AI Widget */}
      <XobiaChatbot />

      {/* MODULE MODAL (UNCHANGED) */}  
      {isModuleOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsModuleOpen(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-3xl p-6 shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsModuleOpen(false)}
                className="absolute top-4 right-4 text-white text-3xl font-bold hover:scale-110 transition"
              >
                ×
              </button>

              <Moduleboat />
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
