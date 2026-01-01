"use client";

import React, { useState } from "react";
import { notification } from "antd"; // Import Ant Design notification
import { apiService } from "../../manageApi/utils/custom.apiservice";
import Image from "../../assets/img/Image2.jpg";

const countryCodes = [
  { value: "+91", label: "+91" },
  { value: "+971", label: "+971" },
  { value: "+966", label: "+966" },
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+61", label: "+61" },
];

export default function QuickEnquiry() {
  // 1. Initialize Ant Design Notification
  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+971",
    number: "",
    message: ""
  });

  // 2. Helper to trigger notification
  const openNotification = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
      placement: "topRight",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryCode = (e) => {
    setFormData(prev => ({ ...prev, country_code: e.target.value }));
  };

  const handleNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setFormData(prev => ({ ...prev, number: value }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) return "First name is required";
    if (!formData.last_name.trim()) return "Last name is required";
    if (!formData.email.includes("@")) return "Valid email is required";
    if (formData.number.length < 8) return "Mobile number must be at least 8 digits";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      openNotification("error", "Validation Error", error);
      return;
    }

    setLoading(true);

    const payload = {
      type: "enquiry",
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

      // 3. Success Notification
      openNotification(
        "success",
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
      openNotification(
        "error",
        "Submission Failed",
        err.response?.data?.message || "Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 4. Render the notification context holder */}
      {contextHolder}

      <section
        className="relative bg-cover bg-center py-14 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${Image})` }}
      >
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-500/70"></div>

        {/* Content Wrapper */}
        <div
          className="relative z-10 max-w-6xl mx-auto 
          flex flex-col md:flex-row  
          justify-between gap-10 px-5 sm:px-6 lg:px-8"
        >

          {/* LEFT SIDE TEXT */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-snug">
              Quick Enquiry
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
              Need answers fast? Drop your details below <br className="hidden sm:block" />
              and we'll get back to you shortly.
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full md:max-w-xl bg-white  rounded-xl shadow-xl p-6 sm:p-8 md:p-10 text-gray-800">
            
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">

              {/* FIRST & LAST NAME - 2 Columns on Mobile & Desktop */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="w-full min-w-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 md:py-2.5 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                  />
                </div>

                <div className="w-full min-w-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 md:py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                  />
                </div>
              </div>

              {/* EMAIL & PHONE - 2 Columns on Mobile & Desktop */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="w-full min-w-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Email address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 md:py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                  />
                </div>

                <div className="w-full min-w-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Mobile Number*
                  </label>
                  <div className="flex gap-1 md:gap-2">
                    <select
                      value={formData.country_code}
                      onChange={handleCountryCode}
                      className="w-[70px] md:w-[80px] border border-gray-300 rounded-md px-1 py-2 md:py-2.5 bg-white text-xs md:text-sm
                      focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                    >
                      {countryCodes.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={handleNumber}
                      maxLength="15"
                      placeholder="501234567"
                      className="w-full border border-gray-300 rounded-md px-2 py-2 md:py-2.5 text-sm
                      focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Message - Full Width */}
              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Message*
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5C039B] text-white py-3 md:py-3.5 rounded-md font-semibold 
                hover:bg-opacity-90 transition disabled:opacity-70 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>

            </form>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}