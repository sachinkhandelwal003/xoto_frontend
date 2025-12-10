import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";

import waveint6 from "../../assets/img/wave/waveint6.png";
import waveint from "../../assets/img/wave/waveint4.png";
import image from "../../assets/img/bggg.png";

export default function HeroSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    country: "",
    lookingFor: "",
    city: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits in phone
    if (name === "phone" && value && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const required = [
      form.firstName,
      form.lastName,
      form.email,
      form.countryCode,
      form.phone,
      form.country,
      form.lookingFor,
      form.city,
      form.budget,
    ];

    if (required.some((field) => !field || !field.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const payload = {
      type: form.lookingFor.toLowerCase(), // "buy", "sell", or "rent"
      name: {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
      },
      mobile: {
        country_code: form.countryCode,
        number: form.phone,
      },
      email: form.email.toLowerCase().trim(),
      country: form.country === "Dubai" ? "UAE" : form.country,
      preferred_city: form.city,
      budget: form.budget.trim(),
    };

    try {
      const res = await apiService.post("/property/lead", payload);

      if (res.success) {
        toast.success("Thank you! We'll contact you very soon");
        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phone: "",
          country: "",
          lookingFor: "",
          city: "",
          budget: "",
        });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <section className="relative w-full bg-[var(--color-body)] py-16 overflow-hidden">
        {/* Background Waves */}
        <div className="absolute top-0 left-0 w-full z-0">
          <img src={waveint6} alt="" className="w-full" />
        </div>
        <div className="absolute -bottom-30 left-0 w-full z-0">
          <img src={waveint} alt="" className="w-full" />
        </div>

        <div className="max-w-8xl  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-10 relative z-20">
            <h1 className="text-5xl card-heading-1 text-gray-900 ps-20  leading-tight">
              Where Dreams <br /> Meet Doorsteps
            </h1>
            <p className="text-lg text-gray-600 ps-20">
              Find, Sell & Finance Your Dream Home <br />
              Smarter, Faster, Easier
            </p>
            <img
              src={image}
              alt="Luxury Home"
              className="w-full max-w-3xl mt-8 "
            />
          </div>

          {/* Right Form - Premium Clean Design */}
          <div className="relative z-20">
            <div className="bg-white shadow-[0_0_30px_rgba(92,3,155,0.3)] rounded-3xl p-8 max-w-lg mx-auto border border-purple-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Discover, Decide, Deal
              </h2>
              <p className="text-gray-700 mb-8">All in One Place.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name*"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name*"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                />

                {/* Phone */}
                <div className="grid grid-cols-3 gap-3">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  >
                    <option value="" disabled hidden>Code*</option>
                    <option value="+91">+91 India</option>
                    <option value="+971">+971 UAE</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number*"
                    required
                    className="col-span-2 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  />
                </div>

                {/* Country & Looking For */}
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  >
                    <option value="" disabled hidden>Country*</option>
                    <option value="India">India</option>
                    <option value="Dubai">UAE / Dubai</option>
                  </select>

                  <select
                    name="lookingFor"
                    value={form.lookingFor}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                  >
                    <option value="" disabled hidden>Looking for*</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                {/* City */}
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                >
                  <option value="" disabled hidden>Preferred City*</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                </select>

                {/* Budget */}
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Budget* (e.g. 1.5 Cr or AED 2M)"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 transition-all"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-primary)] text-white font-bold py-5 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Now
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}