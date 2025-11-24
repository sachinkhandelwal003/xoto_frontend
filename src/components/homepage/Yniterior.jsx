'use client';
// import Eco from './Eco';

import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Star , Fan, ArrowUp } from 'lucide-react';
import heImage from '../../assets/img/he.png';
import helloImage from '../../assets/img/hello.jpg';
import fourthImage from '../../assets/img/fourth.jpg';
import mainbgImage from '../../assets/img/mainbg.jpg';
import exploreoneImage from '../../assets/img/exploreone.png';
import exploretwoImage from '../../assets/img/exploretwo.png';
import explorethreeImage from '../../assets/img/explorethree.png';
import lasttImage from '../../assets/img/lastt.jpg';
import Dreamspacking from './Dreamspacking';
import Eco from '../../components/homepage/Eco';
import bbImage from '../../assets/img/bb.png';
import  Fifth from '../Service/Fifth'
import Hero from '../../components/Interior/Hero'
import Builder from '../../components/Interior/Builder'
import Book from '../../components/Interior/Book'
import Ourport from '../../components/Interior/Ourport'
import yyyImage from '../../assets/img/yyy.png';
export default function App() {
  return (
    <>
      {/* ────────────────────── HERO SECTION ────────────────────── */}
      <Hero/>

      {/* ────────────────────── INTERACTIVE BUILDER ────────────────────── */}
     <Builder/>

      {/* ────────────────────── BOOK CONSULTATION ────────────────────── */}
 <Book/>
      {/* ────────────────────── OUR SERVICES PORTFOLIO ────────────────────── */}
     <Ourport/>

      {/* ────────────────────── EXPLORE DREAM SPACES ────────────────────── */}
      <Dreamspacking/>
      {/* ────────────────────── CLIENT TESTIMONIALS (STATIC + PROFESSIONAL) ────────────────────── */}
      <Fifth/>
      {/* last sectionm */}
      <Eco/>
    </>
  );
}