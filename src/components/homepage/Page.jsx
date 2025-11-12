import React from "react";
import Picture from "../../assets/img/Image1.png";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from '../../assets/img/Image2.jpg'
import Picture1 from '../../assets/img/Image3.jpg'
import Picture2 from '../../assets/img/Image4.png'


const Page = () => {
  return (
    <div className="text-gray-900">
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Picture})` }}
      >
       
        <div className="absolute inset-0 bg-black/40"></div>

        
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Contact XOTO
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Get in touch with our luxury real estate experts. We’re here to help you
            with all your property needs in the UAE.
          </p>
        </div>
      </section>

            <section className="bg-white py-16">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Contact Information
      </h2>

      {/* Info Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 px-6">
        {/* Email */}
        <div className="flex items-start gap-4 w-full md:w-1/3">
          <div className="bg-purple-700 text-white rounded-full p-4 shrink-0">
            <Mail size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Email Us</h3>
            <p className="text-gray-600">Feel free to contact us at</p>
            <p className="text-gray-800 font-medium">info@xotikltd.com</p>
            <p className="text-gray-600 text-sm">We’ll respond promptly</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4 w-full md:w-1/3">
          <div className="bg-purple-700 text-white rounded-full p-4 shrink-0">
            <MapPin size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p className="text-gray-600">A-21, Business Bay Tower, Dubai</p>
            <p className="text-gray-600 text-sm">UAE</p>
          </div>
        </div>

        {/* Number */}
        <div className="flex items-start gap-4 w-full md:w-1/3">
          <div className="bg-purple-700 text-white rounded-full p-4 shrink-0">
            <Phone size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Number</h3>
            <p className="text-gray-600">+91 7878909689</p>
            <p className="text-gray-600 text-sm">Mon–Sat | 9AM–6PM</p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-16 flex justify-center">
        <iframe
          title="XOTO Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.820969606218!2d75.78727027523847!3d26.87734947667366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db69c602469ed%3A0x9395d07b39cdd8b5!2sGanesh%20Glory!5e0!3m2!1sen!2sin!4v1706799612345!5m2!1sen!2sin"
          width="1000"
          height="400"
          loading="lazy"
          allowFullScreen=""
          className="rounded-xl shadow-md w-[90%] md:w-[80%] border"
        ></iframe>
      </div>
    </section>

      <section
      className="relative bg-cover bg-center py-16 md:py-24 text-white"
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-500/70"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold mb-4">Quick Enquiry</h2>
          <p className="text-lg text-gray-200">
            Need answers fast? Drop your details below and we’ll get back to you
            shortly.
          </p>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 text-gray-800">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email address*</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Number*</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message*</label>
              <textarea
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition"
              >
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

     <div className="w-full min-h-screen bg-gradient-to-b from-white to-[#e8e8ff] flex flex-col items-center py-10">
      {/* Top Section */}
      <div className="w-[90%] md:w-[80%] bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Partner & Collaboration Form
          </h2>
          <p className="text-gray-600">
            Interested in collaborating with XOTO? Tell us more about your
            business or project.
          </p>
         <div
    className="w-full md:w-1/2 flex justify-center ml-10 "
    style={{
      backgroundImage: `url(${Picture1})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "350px",
    

    }}
  ></div>
        </div>

       
        <div className="md:w-1/2 bg-white rounded-xl shadow-md p-6">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Organization Name*"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Contact Email*"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Partner Type*"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Describe Your Proposal*"
              rows="3"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-medium transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Chat Section */}
      <div className="w-[90%] md:w-[80%] bg-gradient-to-r from-[#a174ff] to-[#3e0fff] text-white rounded-2xl shadow-xl mt-10 flex flex-col md:flex-row justify-between items-center p-8">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3">Xobia Chat (24/7 AI Help)</h3>
          <p className="text-sm text-gray-100 mb-4">
            Have a question right now? Xobia, our AI assistant, is available
            24/7 to guide you through product details, support requests, or
            general inquiries — anytime you need.
          </p>
          <button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
            Chat With Xobia
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={Picture2}
            alt="xobia"
            className="w-60 md:w-50"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
