"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiService } from "../../manageApi/utils/custom.apiservice";
import { showSuccessAlert } from "../../manageApi/utils/sweetAlert";
import helloImage from "../../assets/img/hello.jpg"; // Update path if needed

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+1", label: "+1 USA/Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+61", label: "+61 Australia" },
];

export default function Consultation() {
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

    // Validation
    if (!formData.first_name.trim()) return alert("First name is required");
    if (!formData.last_name.trim()) return alert("Last name is required");
    if (!formData.email.includes("@")) return alert("Valid email is required");
    if (formData.number.length < 8) return alert("Mobile number must be at least 8 digits");
    if (!formData.message.trim()) return alert("Message is required");

    setLoading(true);

    const payload = {
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
      status: "submitted"
    };

    try {
      await apiService.post("/consult/", payload);

      showSuccessAlert(
        "Thank You!",
        "Your consultation request has been submitted successfully. We'll contact you within 24 hours!"
      );

      // Reset form
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
    <section className="relative w-full overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src={helloImage}
        alt="Luxury living room"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(92, 3, 155, 0.85) 20%, rgba(3, 164, 244, 0.85) 95%)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex flex-col-reverse lg:flex-row items-start justify-start max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 gap-20">

        {/* LEFT SIDE TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-white lg:text-left"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Book Consultation
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-white/90 font-light">
            One simple form to connect with XOTO experts for tailored interior design advice and project planning.
          </p>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Free Consultation Request
            </h3>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* NAME ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <sup className="text-purple-600">*</sup>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <sup className="text-purple-600">*</sup>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <sup className="text-purple-600">*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition"
                  placeholder="john@example.com"
                />
              </div>

              {/* MOBILE WITH COUNTRY CODE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <sup className="text-purple-600">*</sup>
                </label>
                <div className="flex gap-3">
                  <select
                    value={formData.country_code}
                    onChange={(e) => handleCountryCode(e.target.value)}
                    className="rounded-xl border border-gray-300 px-4 py-4 bg-white text-gray-700 focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
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
                    className="flex-1 rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition"
                    placeholder="501234567"
                  />
                </div>
                {formData.number && formData.number.length < 8 && (
                  <p className="text-red-500 text-sm mt-2">Minimum 8 digits required</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message <sup className="text-purple-600">*</sup>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-5 py-5 text-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition resize-none"
                  placeholder="Tell us about your project, budget, timeline, or any specific requirements..."
                />
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 py-5 text-xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
              >
                {loading ? "Submitting Request..." : "Book Free Consultation"}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}