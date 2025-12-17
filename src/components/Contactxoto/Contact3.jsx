"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiService } from "../../manageApi/utils/custom.apiservice";
import { showSuccessAlert } from "../../manageApi/utils/sweetAlert";
import Image from "../../assets/img/Image2.jpg";

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+1", label: "+1 USA/Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+61", label: "+61 Australia" },
];

export default function QuickEnquiry() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+971",
    number: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryCode = (value) => {
    setFormData(prev => ({ ...prev, country_code: value }));
  };

  const handleNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setFormData(prev => ({ ...prev, number: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name.trim()) return alert("First name is required");
    if (!formData.last_name.trim()) return alert("Last name is required");
    if (!formData.email.includes("@")) return alert("Valid email is required");
    if (formData.number.length < 8) return alert("Mobile number must be at least 8 digits");
    if (!formData.message.trim()) return alert("Message is required");

    setLoading(true);

    const payload = {
        type: "enquiry",              // ✅ REQUIRED
      name: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim()
      },
      mobile: {
        country_code: formData.country_code,
        number: formData.number
      },
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    try {
      await apiService.post("/property/lead", payload);

      showSuccessAlert(
        "Thank You!",
        "Your enquiry has been submitted successfully. We'll contact you shortly!"
      );

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        country_code: "+971",
        number: "",
        message: ""
      });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Submission failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center py-14 sm:py-16 md:py-20 lg:py-24 text-white"
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-500/70"></div>

      {/* Content Wrapper */}
      <div
        className="relative z-10 max-w-7xl mx-auto 
        flex flex-col md:flex-row md:items-center 
        justify-between gap-10 px-5 sm:px-6 lg:px-8"
      >

        {/* LEFT SIDE TEXT */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-snug"
          >
            Quick Enquiry
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            Need answers fast? Drop your details below <br className="hidden sm:block" />
            and we'll get back to you shortly.
          </motion.p>
        </div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full  bg-white border rounded-xl shadow-xl p-6 sm:p-8 md:p-10 text-gray-800"
        >
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* First Name */}
            <div>
              <label className="text-sm font-medium">First Name*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2.5 mt-1 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium">Last Name*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2.5 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2.5 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium">Mobile Number*</label>
              <div className="flex gap-2">
                <select
                  value={formData.country_code}
                  onChange={(e) => handleCountryCode(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2.5 bg-white text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 w-32"
                >
                  {countryCodes.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.number}
                  onChange={handleNumber}
                  required
                  maxLength="15"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                  placeholder="501234567"
                />
              </div>
              {formData.number && formData.number.length < 8 && (
                <p className="text-red-500 text-xs mt-1">Minimum 8 digits required</p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md p-2.5 mt-1
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#5C039B] text-white py-3.5 rounded-md font-semibold 
                hover:bg-opacity-90 transition disabled:opacity-70 shadow-md hover:shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </motion.button>
            </div>

          </form>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            We respect your privacy. Your information is safe with us.
          </p>
        </motion.div>

      </div>
    </section>
  );
}