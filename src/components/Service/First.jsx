  import React from 'react';
  import CTAButtons from './CTAButtons.jsx';
  import herobg from '../../assets/img/serviceimg1.png';

  export default function HomeLoanHero() {
    // NOTE: using absolute path to the uploaded image:
    // const heroUrl = "/mnt/data/00d194c7-c08c-48fa-adc1-393ab2a8e190.png"

    return (
      <section
      className="bg-cover bg-center w-full"
    style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="hero-overlay p-8 md:p-16">
          <div className="max-w-6xl mx-auto text-center text-white py-20 md:py-28">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm">
              Smarter Home Loans, Simplified
            </h1>
            <p className="mt-4 md:w-3/4 mx-auto text-sm md:text-base text-gray-100/90">
              Compare lenders, get pre-approved, and secure your dream<br/> home faster — all in one place.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <CTAButtons />
            </div>
          </div>

          {/* Curved white card cutout effect */}
          {/* <div className="absolute left-0 right-0 -bottom-12"> */}
            {/* <div className="mx-auto max-w-4xl bg-white rounded-t-xl p-6 card"> */}
              {/* <div className="text-center font-semibold">Plan Your Mortgage with Confidence</div> */}
            </div>
          {/* </div> */}
        {/* </div> */}
        {/* Spacer to ensure content below overlaps nicely */}
        <div className="h-24 md:h-28"></div>
      </section>
    )
  }
