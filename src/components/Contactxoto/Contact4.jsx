import React, { useState } from "react";
import Picture1 from "../../assets/img/image3.png";
import Picture2 from "../../assets/img/Image4.png";
import wave2 from "../../assets/img/wave/wave2.png";

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    partnerType: "",
    proposal: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!formData.organization.trim())
      err.organization = "Organization Name is required.";

    if (!formData.email.trim()) {
      err.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = "Enter a valid email.";
    }

    if (!formData.partnerType) err.partnerType = "Partner Type is required.";

    if (!formData.proposal.trim())
      err.proposal = "Proposal description is required.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form Submitted Successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="relative w-full bg-[var(--color-body)] flex flex-col items-center py-10 overflow-visible">
      <div className="w-full flex flex-col items-center relative z-10">
        {/* TOP SECTION */}
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full p-6 sm:p-8 flex flex-col md:flex-row gap-10 md:gap-16">
            {/* LEFT CONTENT */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black">
                Partner & <br /> Collaboration Form
              </h2>

              <p className="text-[#547593] font-medium text-base sm:text-lg">
                Interested in collaborating with XOTO?
                <br className="hidden sm:block" />
                Tell us more about your business or project.
              </p>

              <div
                className="w-full h-56 sm:h-64 md:h-72 bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${Picture1})` }}
              />
            </div>

            {/* RIGHT — FORM */}
            <div className="md:w-1/2 w-full bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Organization */}
                <div>
                  <label className="text-sm font-medium">
                    Organization Name*
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Enter Organization Name"
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
                      errors.organization
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  />
                  {errors.organization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.organization}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium">Contact Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* ✅ Partner Type Dropdown */}
                <div>
                  <label className="text-sm font-medium">Partner Type*</label>
                  <select
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleChange}
                    className={`border rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 ${
                      errors.partnerType
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  >
                    <option value="">Select Partner Type</option>
                    <option value="Business Associates">
                      Business Associates
                    </option>
                    <option value="Execution Partner">Execution Partner</option>
                    <option value="Strategic Alliances">
                      Strategic Alliances
                    </option>
                    <option value="Developers">Developers</option>
                    <option value="Financial Institution">
                      Financial Institution
                    </option>
                  </select>
                  {errors.partnerType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.partnerType}
                    </p>
                  )}
                </div>

                {/* Proposal */}
                <div>
                  <label className="text-sm font-medium">
                    Describe Your Proposal*
                  </label>
                  <textarea
                    name="proposal"
                    rows="3"
                    value={formData.proposal}
                    onChange={handleChange}
                    placeholder="Describe Your Proposal"
                    className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
                      errors.proposal
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-purple-500"
                    }`}
                  />
                  {errors.proposal && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.proposal}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#5C039B] text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition"
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CHAT SECTION */}
        <div className="w-full flex justify-center px-4 mt-10">
          <div className="max-w-6xl w-full bg-gradient-to-t from-[#03A4F4] to-[#5C039B] text-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 px-8 py-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-extrabold mb-4">
                Xobia Chat (24/7 AI Help)
              </h2>
              <p className="text-lg mb-5">
                Have a question right now? Xobia, our AI assistant, is available
                24/7 to guide you.
              </p>
              <button className="bg-[#5C039B] px-6 py-3 rounded-md font-semibold">
                Chat With Xobia
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img src={Picture2} alt="xobia" className="w-72 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* WAVE */}
      <div className="absolute bottom-[-200px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave2}
          alt=""
          className="w-full scale-[1.4] pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
