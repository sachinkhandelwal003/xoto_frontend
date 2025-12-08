import React, { useState } from "react";
import interiorImage from "../../assets/img/interior.jpg";
import interio2Image from "../../assets/img/interio2.png";
import ffImage from "../../assets/img/ff.png";
import heeyImage from "../../assets/img/heey.jpg";
import oneImage from "../../assets/img/one.png";
import twoImage from "../../assets/img/two.jpg";
import threeImage from "../../assets/img/three.png";
import lasttImage from "../../assets/img/lastt.jpg";
import interImage from "../../assets/img/inter.png";
import { motion } from "framer-motion";
import Dreamspacking from './Dreamspacking';
import Eco from './Eco';
import wave1 from "../../assets/img/wave/wave1.png";

import { Link } from "react-router-dom";
import {
  TreePine,
  Home,
  Droplets,
  Sparkles,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Zap,
  Lightbulb,
  Target,
  Users,
  Award,
  Globe,
  Brain,
  Rocket,
} from "lucide-react";
import EcoSmartSection from "./Eco";
import QuoteModal from "../modal/QuoteModal";
import TestimonialsSection from "../Service/Fifth";
import wave2 from "../../assets/img/wave/wave2.png";
import Servicelandspacing from "./Servicelandspacing";
import Consultation from "./Consultation";

export default function Landspackng() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Consultation booked! We'll contact you shortly.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const services = [
    {
      icon: <TreePine className="w-5 h-5" />,
      title: "Landscape Design & Execution",
      desc: "Custom outdoor spaces tailored to your vision",
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: "Hardscaping & Surface Works",
      desc: "Durable patios, walkways, and retaining walls",
    }
  ];
  const services1 = [
   
    {
      icon: <Droplets className="w-5 h-5" />,
      title: "Swimming Pools & Water Features",
      desc: "Luxury pools, fountains, and water elements",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Outdoor Structures & Living Spaces",
      desc: "Pergolas, decks, and outdoor kitchens",
    },
  ];

  const hardscapeItems = [
    "Paving (interlock, tiles, stone)",
    "Pergolas & gazebos",
    "Decking (wood, WPC, composite)",
    "Boundary walls & fencing, retaining walls",
    "Outdoor kitchens & BBQ stations",
    "Water features (fountains, waterfalls)",
  ];

  const softscapeItems = [
    "Soil preparation & leveling",
    "Plantation (trees, shrubs, groundcover)",
    "Grass lawns (natural, artificial) & vertical gardens",
    "Mulching & soil amendments",
    "Seasonal planting & color themes",
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Homeowner, Beverly Hills",
      content:
        "XOTO transformed our backyard into a private oasis. The attention to detail and creativity exceeded our expectations!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "James Chen",
      role: "CEO, Tech Startup",
      content:
        "Professional, timely, and stunning results. Our rooftop garden is now the highlight of our office space.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Maria Gonzalez",
      role: "Interior Designer",
      content:
        "Collaborating with XOTO was seamless. Their hardscaping perfectly complemented our modern minimalist vision.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // === DREAM SPACES CAROUSEL STATE ===
  const [currentDreamSpace, setCurrentDreamSpace] = useState(0);

  const dreamSpaces = [
    {
      title: "Luxury Pool Villa",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop",
    },
    {
      title: "Rooftop Garden Oasis",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=550&fit=crop",
      badge: "Seamless Indoor-Outdoor Lounge & Pool",
    },
    {
      title: "Modern Terrace Retreat",
      image: "https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=600&h=500&fit=crop",
    },
  ];

  const nextDreamSpace = () => {
    setCurrentDreamSpace((prev) => (prev + 1) % dreamSpaces.length);
  };

  const prevDreamSpace = () => {
    setCurrentDreamSpace((prev) => (prev - 1 + dreamSpaces.length) % dreamSpaces.length);
  };

  // === NEW: SCIENCE & TECHNOLOGY SECTION ===
  const techFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Innovative Awareness",
      description: "Bringing new awareness of science through technology"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Transformative Success",
      description: "Striving to offer transformative success into comprehensive life experience"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Modern Management",
      description: "Creative and modern management-friendly solutions"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Curated Excellence",
      description: "Our portfolio showcases our passion for crafting dream spaces"
    }
  ];

  return (
    <>
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />      {/* === HERO SECTION === */}
      <section className="relative  flex items-center py-20 pb-20 md:py-20 lg:py-28 xl:py-36 justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={interiorImage}
            alt="Premium rooftop garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-70 h-10 bg-[#f5f5f5] z-[5] clip-left-shape border-none "></div>
        <div className="absolute bottom-0 right-0 w-70 h-10 bg-[#f5f5f5] z-[5] clip-right-shape border-none"></div>

        {/* Custom clip paths */}
        <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" mb-6 heading-light"
          >
            Transforming Homes With Premium
            <br />
            <span className="text-white">Outdoor Solution</span>
          </motion.h1>

   {/* FIRST SERVICES SECTION */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="grid grid-cols-2 md:grid-cols-2 gap-3 w-full max-w-[780px] mx-auto mb-5 items-end"
>
  {services.map((service, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: i < 2 ? 0.9 : 1 }}
      transition={{ delay: 0.4 + i * 0.1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2 flex-col flex"
    >
      <div className="flex items-center justify-center">
        <h3 className="text-white text-sm sm:text-base md:text-xl text-center">
          {service.title}
        </h3>
      </div>
    </motion.div>
  ))}
</motion.div>

{/* SECOND SERVICES SECTION */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="grid grid-cols-2 md:grid-cols-2 gap-3 w-full max-w-[850px] mx-auto mb-10 items-end"
>
  {services1.map((service, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: i < 2 ? 0.9 : 1 }}
      transition={{ delay: 0.4 + i * 0.1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2 flex-col flex"
    >
      <div className="flex items-center justify-center">
        <h3 className="text-white text-sm sm:text-base md:text-xl text-center">
          {service.title}
        </h3>
      </div>
    </motion.div>
  ))}
</motion.div>




          <div className="flex items-center justify-center gap-4 mt-6">
          

            {/* <Link to='/aiPlanner'>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-primary)] hover:bg-purple-700 text-white px-10 py-3 rounded-md text-lg font-bold shadow-xl transition-all flex items-center"
              >
                AI Planner
              </motion.button>
            </Link> */}
            <Link to='/estimate/calculator'>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-primary)] text-white px-10 py-3 rounded-md text-lg font-bold shadow-xl transition-all flex items-center"
              >
                Get a free estimate
              </motion.button>
            </Link>
            
          </div>

        </div>
      </section>

      {/* === NEW: SCIENCE & TECHNOLOGY INNOVATION SECTION === */}
      {/* ────────────────────── INTERACTIVE BUILDER ────────────────────── */}
      <section className="relative z-20 bg-[#f5f5f5] pt-8 sm:pt-12 md:pt-16 lg:pt-24 overflow-hidden">

  {/* Wave Background - Mobile Friendly */}
  <div className="absolute left-0 w-full z-0 overflow-visible bottom-[-120px] sm:bottom-[-100px] md:bottom-[-60px] lg:bottom-[-500px]">
    <img
      src={wave2}
      alt=""
      className="pointer-events-none select-none w-full scale-[1.4] sm:scale-[1.2] md:scale-[1.05] lg:scale-100"
    />
  </div>

  {/* Content Wrapper */}
  <div className="mx-auto relative z-20 max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">

      {/* Left Content Column */}
      <div className="space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="inline-block border-cyan-500 p-1 mx-auto lg:mx-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl heading-dark-1 text-black text-center lg:text-left">
            Bring your vision to  <br />life with our interactive builder
          </h2>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-[#547593] max-w-md mx-auto lg:mx-0 text-center lg:text-left paragrapah-light-1">
          Upload your space or choose a template, and get instant AI-powered design previews.
        </p>

        <Link to="/aiPlanner" className="flex justify-center lg:justify-start mt-4">
          <button className="rounded-md bg-[var(--color-primary)] px-8 sm:px-10 py-3 text-lg font-medium text-white shadow-lg transition-all ">
            Take a first step
          </button>
        </Link>
      </div>

      {/* Right Image Column */}
      <div className="flex justify-center lg:justify-end self-stretch mt-6 lg:mt-0">
        <img
          src={interImage}
          alt="3D rendered modern living room"
          className="w-full h-full object-cover max-w-none drop-shadow-2xl"
        />
      </div>

    </div>
  </div>
</section>



      {/* === BOOK CONSULTATION === */}

      <Consultation />

      {/* === OUR SERVICES PORTFOLIO === */}
      {/* <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      
 <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave1}
          alt=""
          className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
        />
      </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-16">
            Our Services Portfolio
          </h2>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 border-t-2 border-dashed border-purple-300 pointer-events-none z-10"></div>

              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative z-20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">Hardscape</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {hardscapeItems.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">Check</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative z-20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">Softscape</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {softscapeItems.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">Check</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center items-center mt-12 space-x-4">
              <button className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition transform hover:scale-110">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                <div className="w-8 h-2 rounded-full bg-purple-600"></div>
                <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                <div className="w-2 h-2 rounded-full bg-purple-300"></div>
              </div>
              <button className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition transform hover:scale-110">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center mt-4 text-sm text-purple-600 font-medium">
              1 / 3
            </p>
          </div>
        </div>
      </section> */}
      <Servicelandspacing />
      {/* exploreeee */}
      <Dreamspacking />

      {/* === WHAT OUR CLIENTS SAY === */}
      <TestimonialsSection />

      {/* === EXPLORE CURATED DREAM SPACES === */}
      <Eco />
    </>
  );
}