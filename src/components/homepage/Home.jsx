import React from "react";
import { useState } from "react";
import HeroSection from "../herosection";
import CategorySlider from "../designslider";
import WhyChooseUs from "../designslider/WhyChooseUs";
import TestimonialSlider from "../designslider/testimonial/TestimonialSlider";
import Stepper from "../designsteps";
import { motion } from "framer-motion";
import FaqPage from "../faq";
// import EstimateSection from '../estimate'
import TrustedPartnersSlider from "../designslider/partnersslider";
import HomeDesign from "../homedesign/HomeDesign";
import Trust from "../homedesign/Trust"
import FourStepDesign from "../AI/FourStepDesign/FourStepDesign";
import BookingBanner from "../banner/BookingBanner ";
import ServiceSection from "../services/ServiceSection";
import SecureOptionsSection from "../services/SecureOptionsSection";
import InteriorEcommerceSection from "../ecommerce/InteriorEcommerceSection";
import EcommerceBanner from "../banner/EcommerceBanner";
import AIPoweredEcosystemSection from "../AIPoweredEcosystemSection";
import StepCarousel from "../StepCarousel";
import TrendSlider from "../designslider/TrendingSlider";

import ConsultationSection from "../banner/BookingBanner ";
import SawtarUnique from "../AI/SawtarUnique";
import MagazinePage from "../magazines/MagazinePage";
import MagazineSlider from "../magazines/MagazinePage";
import SocialSection from "../social/Index";
import Homevideo from "../homedesign/Homevideo";
import ChatBoat from "./ChatBoat";

const Home = () => {
const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };
  return (
    <>
      <HeroSection />
      {/* <WhyChooseUs /> */}
      <HomeDesign />
      {/* <FourStepDesign/> */}
      <AIPoweredEcosystemSection />
      {/* <Homevideo /> */}
      {/* <ConsultationSection /> */}
      {/* <SawtarUnique /> */}
      {/* <StepCarousel /> */}

      {/* <CompactWhyWeBest/> */}
      {/* <ServiceSection /> */}

      {/* <CategorySlider/> */}
      {/* <InteriorEcommerceSection/> */}

      {/* <EstimateSection/> */}
      {/* <Stepper/> */}
      {/* <TrustedPartnersSlider/> */}
      {/* <FaqPage/> */}
      {/* <EcommerceBanner /> */}

      {/* <TrendSlider /> */}
      <MagazineSlider />
      {/* <SocialSection /> */}
    
      <TestimonialSlider />
      <Trust/>

 <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br from-purple-500 to-purple-800 hover:from-purple-600 hover:to-purple-900 transition-all z-50"
        style={{ boxShadow: "0 0 20px rgba(128,0,255,0.6)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isChatOpen ? 0 : [0, 10, -10, 0],
        }}
        transition={{ 
          rotate: { repeat: isChatOpen ? 0 : Infinity, duration: 2 }
        }}
      >
        {isChatOpen ? "×" : "💬"}
      </motion.button>

      {/* Slide-up Chatbot Panel */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white rounded-3xl shadow-2xl border border-purple-300 z-50 overflow-hidden"
        >
          <ChatBoat onClose={closeChat} />
        </motion.div>
      )}
    </>
  );
};

export default Home;
