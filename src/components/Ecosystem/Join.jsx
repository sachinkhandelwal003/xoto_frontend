import React, { useState } from "react";
import joinImage from "../../assets/img/join.png";
import wave1 from "../../assets/img/wave/waveint5.png";

const PartnerEcosystemSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    stakeholder: "",
    countryCode: "+971", // Dubai default
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return false;
    if (!formData.lastName.trim()) return false;
    if (!formData.company.trim()) return false;
    if (!formData.stakeholder) return false;
    if (!formData.message.trim()) return false;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return false;

    // UAE: 8–9 digits | India: 10 digits
    if (!formData.contact || !/^[0-9]{8,10}$/.test(formData.contact))
      return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all fields correctly");
      return;
    }

    const phoneNumber = `${formData.countryCode}${formData.contact}`;

    console.log({
      ...formData,
      phone: phoneNumber,
    });

    alert("Form submitted successfully ✅");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      stakeholder: "",
      countryCode: "+971",
      contact: "",
      message: "",
    });
  };

  return (
    <section className="w-full relative bg-[var(--color-body)] py-16 md:py-20 px-6 md:px-12 z-10">
      <div className="absolute top-[-20px] lg:top-[-150px] left-0 w-full z-0">
        <img
          src={wave1}
          alt=""
          className="w-full min-w-[140%] -ml-[20%] scale-[1.8] 
          lg:scale-100 lg:min-w-full lg:ml-0 
          pointer-events-none select-none"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto grid md:grid-cols-2 items-center">
        {/* LEFT */}
        <div className="flex flex-col items-center">
          <h2 className="hidden lg:block text-2xl md:text-5xl font-semibold text-black mb-6">
            Join the XOTO <br /> Partner Ecosystem <br /> Today
          </h2>

          <h2 className="block lg:hidden text-3xl md:text-4xl font-bold text-black mb-6">
            Join the XOTO Partner <br /> Ecosystem Today
          </h2>

          <img
            src={joinImage}
            alt="People collaborating"
            className="w-full max-w-md mt-4 md:mt-8"
          />
        </div>

        {/* FORM */}
        <div className="bg-white shadow-2xl rounded-2xl md:p-10 p-4 w-full mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                name="company"
                type="text"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="stakeholder"
                value={formData.stakeholder}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select</option>
                <option>Business Associate</option>
                <option>Execution Partner</option>
                <option>Developer</option>
                <option>Investor</option>
              </select>

              {/* Country code + number */}
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="+971">+971 (UAE)</option>
                  <option value="+91">+91 (India)</option>
                </select>

                <input
                  name="contact"
                  type="tel"
                  placeholder="Enter number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              rows="3"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-md shadow-md transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemSection;
