'use client';

import React, { useState } from "react";
import { ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { FaUsers, FaChartLine, FaUserTie, FaRobot } from "react-icons/fa";
import huuuImage from '../../assets/img/huuu.png';
import Partner from '../../components/Ecosystem/Partner'
import Built from '../../components/Ecosystem/Built'
import Join from '../Ecosystem/Join'
import Our from '../Ecosystem/Our'
import Grow from '../../components/Ecosystem/Grow'
import { Link } from "react-router-dom";

// import { Grow } from "@mui/material";
export default function XotoLandingPage() {
  /* ---------- Join Form State ---------- */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    stakeholder: '',
    contact: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  /* ---------- Partner Ecosystem Data ---------- */
  const partners = [
    "Elite Contractors Network",
    "Elite Contractors Network",
    "Elite Contractors Network",
    "Elite Contractors Network",
    "Elite Contractors Network",
    "Elite Contractors Network",
  ];

  return (
    <>

   {/* ================= HERO SECTION ================= */}
<section className="relative w-full h-[546px] overflow-hidden">\
    {/* Bottom Decorative Shapes - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-70 h-10 bg-white z-[5] clip-left-shape"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-70 h-10 bg-white z-[5] clip-right-shape"></div>

      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
  {/* Background Image using img tag */}
  <img
    src={huuuImage}
    alt="Hero Background"
    className="w-full h-full object-cover object-center"
  />
  
  {/* Content */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
    <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-6xl">
      One Ecosystem. Infinite Opportunities.
    </h1>
    <p className="mt-4 text-lg md:text-xl max-w-3xl opacity-90">
      XOTO empowers every stakeholder in the property lifecycle with AI-driven tools to
      simplify operations, increase revenue, and create seamless experiences for customers.
    </p>

    <Link
      to="/login"
      className="mt-8 px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
    >
      Join The Xoto Partner Ecosystem
    </Link>
  </div>
</section>
      {/* ================= WHY PARTNER SECTION ================= */}
     <Partner/>

      {/* ================= BUILT FOR EVERY STAKEHOLDER ================= */}
      <Built/>

      {/* ================= OUR PARTNER ECOSYSTEM ================= */}
     <Join/>
      {/* ================= JOIN XOTO PARTNER ECOSYSTEM ================= */}
     <Our/>
      {/* ================= GROW. EARN. XOTO ================= */}
     <Grow/>

    </>
  );
}