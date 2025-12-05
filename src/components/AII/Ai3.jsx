import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import waveBottom from "../../assets/img/waveAi.png";

const Ai3 = () => {
  return (
    <div className="relative w-full bg-white px-4 sm:px-6 lg:px-10 py-16 sm:py-20 overflow-hidden">
      {/* ========================= WAVE BG ========================= */}
      <img
        src={waveBottom}
        alt="Wave"
        className="
          absolute left-1/2 -translate-x-1/2 
          bottom-0 sm:-bottom-32 md:-bottom-60 lg:-bottom-80
          w-[220%] sm:w-[170%] md:w-[150%] lg:w-[140%]
          pointer-events-none select-none opacity-95
        "
        style={{ zIndex: 5 }}
      />

      {/* ========================= DESKTOP LAYOUT ========================= */}
      <div className="max-w-7xl mx-auto hidden md:grid grid-cols-3 gap-10 relative z-20">
        {/* LEFT SIDE CONTENT */}
        <div className="col-span-2 flex flex-col gap-16">
          {/* ARTICLE SECTION */}
          <section>
            <h2 className="text-3xl md:text-[34px] font-bold mb-6 text-[#020202]">
              Main Heading &amp; Points
            </h2>

            <p className="text-[#547593] leading-relaxed mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>

            <ul className="list-disc pl-6 text-[#547593] mb-6 leading-relaxed">
              <li>Vivamus eu lacus scelerisque, placerat commodo lectus.</li>
              <li>Etiam et ante at ex porta fringilla.</li>
              <li>Nullam dignissim sem eu magna aliquet.</li>
            </ul>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed mb-6">
              We are a dedicated team of passionate product managers,
              developers...
            </p>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed">
              There are many variations of passages of Lorem Ipsum available...
            </p>
          </section>

          {/* TAGS + SHARE LIST */}
          <div className="flex flex-col gap-16">
            {/* TAGS */}
            <section>
              <h3 className="text-[28px] font-bold mb-4 text-[#020202]">
                Tags
              </h3>
              <ul className="list-disc pl-6 text-[#547593] space-y-1">
                <li>Trends</li>
                <li>Design</li>
                <li>Research</li>
              </ul>
            </section>

            {/* SHARE (TEXT LIST) */}
            <section>
              <h3 className="text-[28px] font-bold mb-4 text-[#020202]">
                Share
              </h3>
              <ul className="list-disc pl-6 text-[#547593] space-y-1">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Linkedin</li>
              </ul>
            </section>
          </div>

          {/* NEWSLETTER FORM */}
          <section className="relative z-30">
            <h3 className="text-3xl font-bold mb-6 text-[#020202]">
              Join Our Newsletter
            </h3>

            <div className="bg-white border border-gray-100 shadow-2xl p-6 sm:p-8 rounded-[16px] max-w-[570px]">
              <form className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["First Name*", "Last Name*"].map((label, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                        {label}
                      </label>
                      <input className="border border-gray-300 rounded-md px-3 py-3 text-sm" />
                    </div>
                  ))}
                </div>

                {/* Email & Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                      Email*
                    </label>
                    <input
                      type="email"
                      className="border border-gray-300 rounded-md px-3 py-3 text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                      Number*
                    </label>
                    <input
                      type="tel"
                      className="border border-gray-300 rounded-md px-3 py-3 text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                    Message*
                  </label>
                  <textarea className="border border-gray-300 rounded-md px-3 py-3 h-20 resize-none" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C039B] text-white font-semibold text-[16px] rounded-md py-3 sm:py-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* ========================= RIGHT SIDEBAR ========================= */}
        <aside className="space-y-10">
          {/* SOCIAL BUTTONS */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h3 className="text-[24px] font-bold mb-4 text-[#020202]">Share</h3>

            {[
              {
                label: "Facebook",
                bg: "#526FA3",
                icon: <FaFacebookF size={16} />,
              },
              {
                label: "Twitter",
                bg: "#46C4FF",
                icon: <FaTwitter size={16} />,
              },
              {
                label: "Linkedin",
                bg: "#3C86AD",
                icon: <FaLinkedinIn size={16} />,
              },
            ].map((btn, i) => (
              <button
                key={i}
                className="w-full h-11 flex items-center px-4 gap-3 text-white rounded-md"
                style={{ backgroundColor: btn.bg }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* NEWSLETTER CARD */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-[24px] font-bold mb-4 text-[#020202]">
              Join our Newsletter
            </h3>

            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-md mb-4"
              placeholder="Email address"
            />

            <button className="w-full bg-[#5C039B] text-white py-3 rounded-md font-medium">
              Subscribe
            </button>
          </div>
        </aside>
      </div>

      {/* ========================= MOBILE LAYOUT ========================= */}
      <div className="max-w-7xl mx-auto md:hidden relative z-20">
        {/* ARTICLE + SHARE CARD */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          {/* ARTICLE CONTENT */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-[#020202]">
              Main Heading &amp; Points
            </h2>

            <p className="text-[#547593] leading-relaxed mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>

            <ul className="list-disc pl-5 mb-6 text-[#547593] leading-relaxed space-y-1">
              <li>Vivamus eu lacus scelerisque.</li>
              <li>Etiam et ante at ex porta fringilla.</li>
              <li>Nullam dignissim sem eu magna aliquet.</li>
            </ul>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed mb-6">
              We are a dedicated team of passionate product managers...
            </p>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed">
              There are many variations of passages of Lorem Ipsum available...
            </p>
          </div>

          {/* SHARE CARD */}
          <div className="w-full sm:w-56 bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-[24px] font-bold mb-4 text-[#020202]">Share</h3>

            {[
              {
                label: "Facebook",
                bg: "#526FA3",
                icon: <FaFacebookF size={16} />,
              },
              {
                label: "Twitter",
                bg: "#46C4FF",
                icon: <FaTwitter size={16} />,
              },
              {
                label: "Linkedin",
                bg: "#3C86AD",
                icon: <FaLinkedinIn size={16} />,
              },
            ].map((btn, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-center gap-3 text-white h-11 rounded-md mb-3 last:mb-0"
                style={{ backgroundColor: btn.bg }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
          <h3 className="text-[24px] font-bold mb-4 text-[#020202]">
            Join our Newsletter
          </h3>

          <input
            type="email"
            className="w-full border border-gray-300 p-3 rounded-md mb-4"
            placeholder="Email address"
          />

          <button className="w-full bg-[#5C039B] text-white py-3 rounded-md font-medium">
            Subscribe
          </button>
        </div>

        {/* TAGS + SHARE LIST */}
        <div className="grid grid-cols-2 gap-10 mb-10">
          <section>
            <h3 className="text-2xl font-bold mb-4 text-[#020202]">Tags</h3>
            <ul className="list-disc pl-5 text-[#547593] space-y-1">
              <li>Trends</li>
              <li>Design</li>
              <li>Research</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4 text-[#020202]">Share</h3>
            <ul className="list-disc pl-5 text-[#547593] space-y-1">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Linkedin</li>
            </ul>
          </section>
        </div>

        {/* NEWSLETTER FORM - LARGE */}
        <section className="relative">
          <h3 className="text-3xl font-bold mb-4 text-[#020202]">
            Join Our Newsletter
          </h3>

          <div className="bg-white shadow-2xl rounded-[16px] p-6 sm:p-8 border border-gray-100 mt-8">
            <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                    First Name*
                  </label>
                  <input className="border rounded-md px-3 py-3 text-sm border-gray-300" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                    Last Name*
                  </label>
                  <input className="border rounded-md px-3 py-3 text-sm border-gray-300" />
                </div>
              </div>

              {/* Email + Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                    Email*
                  </label>
                  <input className="border rounded-md px-3 py-3 text-sm border-gray-300" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                    Number*
                  </label>
                  <input className="border rounded-md px-3 py-3 text-sm border-gray-300" />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-xs text-[#7b8fa4] mb-2 font-medium">
                  Message*
                </label>
                <textarea className="border rounded-md px-3 py-3 h-20 text-sm resize-none border-gray-300" />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5C039B] text-white font-semibold py-3 sm:py-4 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ai3;
