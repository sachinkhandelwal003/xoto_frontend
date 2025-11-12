'use client';

import React, { useState } from "react";
import { ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { FaUsers, FaChartLine, FaUserTie, FaRobot } from "react-icons/fa";
import huuuImage from '../../assets/img/huuu.png';
import Partner from '../../components/Ecosystem/Partner'
import Built from '../../components/Ecosystem/Built'
import Join from '../Ecosystem/Our'
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
    <main className="w-full overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${huuuImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl">
            One Ecosystem. Infinite Opportunities.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl opacity-90">
            XOTO empowers every stakeholder in the property lifecycle with AI-driven tools to
            simplify operations, increase revenue, and create seamless experiences for customers.
          </p>

        <Link
  to="/admin/login"
  className="mt-8 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-2"
>
  Join The Xoto Partner Ecosystem
  <ArrowRight className="w-5 h-5" />
</Link>
        </div>

        {/* Bottom Blue Line with X */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-16 pointer-events-none">
          <div className="relative w-full max-w-4xl">
            <div className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              X
            </div>
          </div>
        </div>

        {/* Bottom Curved White Shape */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z" />
          </svg>
        </div>

        {/* Top Blue Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
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

    </main>
  );
}