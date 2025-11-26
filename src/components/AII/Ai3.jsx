import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Ai3 = () => {
  return (
    <div className="relative w-full bg-white px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE CONTENT */}
        <div className="lg:col-span-2 flex flex-col gap-16">
          {/* MAIN HEADING & POINTS */}
          <section>
            <h2 className="text-[32px] font-bold tracking-[-0.03em] text-[#020202] mb-6">
              Main Heading &amp; Points
            </h2>

            <p className="text-[#547593] leading-relaxed mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the
            </p>

            <ul className="list-disc pl-6 text-[#547593] leading-relaxed mb-6">
              <li>Vivamus eu lacus scelerisque, placerat commodo lectus.</li>
              <li>Etiam et ante at ex porta fringilla.</li>
              <li>
                Nullam dignissim sem eu magna aliquet, sit amet volutpat tellus.
              </li>
            </ul>

            <p className="text-[#547593] leading-relaxed mb-6">
              Unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the
            </p>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed mb-6">
              We are a dedicated team of passionate product managers,
              developers, UX/UI designers, QA engineers experts helping
              businesses from new startups
            </p>

            <hr className="border-gray-300 my-8" />

            <p className="text-[#547593] leading-relaxed">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable making this the first true generator on the
              Internet. It uses a dictionary
            </p>
          </section>

          {/* TAGS */}
          <section>
            <h3 className="text-[24px] font-bold tracking-[-0.03em] text-[#020202] mb-4">
              Tags
            </h3>

            <ul className="list-disc pl-6 text-[#547593] leading-relaxed">
              <li>Trends</li>
              <li>Design</li>
              <li>Research</li>
            </ul>
          </section>

          {/* SHARE TEXT LIST */}
          <section>
            <h3 className="text-[24px] font-bold tracking-[-0.03em] text-[#020202] mb-4">
              Share
            </h3>

            <ul className="list-disc pl-6 text-[#547593] leading-relaxed">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Linkedin</li>
            </ul>
          </section>

          {/* SIMPLE NEWSLETTER */}
          <section>
            <h3 className="text-[24px] font-bold tracking-[-0.03em] text-[#020202] mb-4">
              Join our newsletter
            </h3>

            <p className="text-[#547593]">Email address Subscribe</p>
          </section>
        </div>

        {/* RIGHT SIDEBAR CARD */}
        <div className="space-y-10">
          {/* SHARE BUTTON CARD */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#020202]">Share</h3>

            {/* Facebook */}
            <button
              className="w-full h-11 flex items-center px-4 gap-3 text-white text-[14px] font-medium rounded-md"
              style={{ backgroundColor: "#526FA3" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <FaFacebookF size={16} />
              </div>
              Facebook
            </button>

            {/* Twitter */}
            <button
              className="w-full h-11 flex items-center px-4 gap-3 text-white text-[14px] font-medium rounded-md"
              style={{ backgroundColor: "#46C4FF" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <FaTwitter size={16} />
              </div>
              Twitter
            </button>

            {/* LinkedIn */}
            <button
              className="w-full h-11 flex items-center px-4 gap-3 text-white text-[14px] font-medium rounded-md"
              style={{ backgroundColor: "#3C86AD" }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <FaLinkedinIn size={16} />
              </div>
              Linkedin
            </button>
          </div>

          {/* NEWSLETTER CARD */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#020202] mb-4">
              Join our Newsletter
            </h3>

            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-md outline-none mb-4"
              placeholder="Email address"
            />

            <button
              className="w-full text-white py-3 rounded-md font-medium"
              style={{ backgroundColor: "#5C039B" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai3;
