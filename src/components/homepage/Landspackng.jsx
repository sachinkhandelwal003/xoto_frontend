"use client";

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
import Dreamspacking from '../../components/homepage/dreamspacking';
import Eco from '../../components/homepage/Eco';

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

export default function Landspackng() {
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
    },
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
      {/* === HERO SECTION === */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={interiorImage}
            alt="Premium rooftop garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

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
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transforming Homes With Premium
            <br />
            <span className="text-white">Outdoor Solution</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left"
              >
                <div className="text-purple-400 mb-2">{service.icon}</div>
                <h3 className="text-sm font-semibold text-white">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl transition-all flex items-center mx-auto"
          >
            Get a free estimate
            <ArrowRight className="ml-2 w-3 h-3" />
          </motion.button>
        </div>
      </section>

      {/* === NEW: SCIENCE & TECHNOLOGY INNOVATION SECTION === */}
       {/* ────────────────────── INTERACTIVE BUILDER ────────────────────── */}
            <section className="relative  bg-[var(--color-body)] py-16 md:py-24 overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="inline-block  border-cyan-500 p-1">
                      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                        Bring your vision to life with our{' '}
                        <span className="text-cyan-600">interactive builder</span>
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
                      src={interImage}
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
      
      {/* === BOOK CONSULTATION === */}
     
     <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
  {/* Background Image with Gradient Overlay */}
  <div className="absolute inset-0">
    <img
      src={ffImage}
      alt="Luxury outdoor space"
      className="w-full h-full object-cover"
    />
    {/* 🔥 Gradient overlay as requested */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(92, 3, 155, 0.8) 19.27%, rgba(3, 164, 244, 0.8) 93.91%)",
      }}
    ></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left text content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Book Consultation
        </h2>
        <p className="text-lg mb-6 opacity-90">
          One simple form to connect with XOTO experts for tailored landscaping
          advice and project planning.
        </p>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg mx-auto lg:mx-0"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email address*
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Number*
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Message*
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                required
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </button>
        </form>
      </motion.div>
    </div>
  </div>
</section>

      {/* === OUR SERVICES PORTFOLIO === */}
      <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-32 md:h-48 fill-purple-100 opacity-50"
            preserveAspectRatio="none"
          >
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
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
      </section>
{/* exploreeee */}
<Dreamspacking/>

      {/* === WHAT OUR CLIENTS SAY === */}
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

      {/* === EXPLORE CURATED DREAM SPACES === */}
    <Eco/>
    </>
  );
} 