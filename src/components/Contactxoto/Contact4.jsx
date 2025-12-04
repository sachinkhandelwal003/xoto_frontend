import React, { useState } from "react";
import Picture1 from "../../assets/img/image3.png";
import Picture2 from "../../assets/img/Image4.png";

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

    if (!formData.partnerType.trim())
      err.partnerType = "Partner Type is required.";

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
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-10">

      {/* TOP SECTION */}
      <div className="w-[92%] sm:w-[90%] md:w-[85%] xl:w-[80%] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16">

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

          {/* IMAGE — made fully responsive */}
          <div
            className="w-full h-56 sm:h-64 md:h-72 flex justify-center bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${Picture1})`  }}
          ></div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="md:w-1/2 w-full bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Organization Name */}
            <div>
              <label className="text-sm font-medium">Organization Name*</label>
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
                <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
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

            {/* Partner Type */}
            <div>
              <label className="text-sm font-medium">Partner Type*</label>
              <input
                type="text"
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                placeholder="Enter Partner Type"
                className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
                  errors.partnerType
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
              />
              {errors.partnerType && (
                <p className="text-red-500 text-sm mt-1">{errors.partnerType}</p>
              )}
            </div>

            {/* Proposal */}
            <div>
              <label className="text-sm font-medium">Describe Your Proposal*</label>
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
              ></textarea>
              {errors.proposal && (
                <p className="text-red-500 text-sm mt-1">{errors.proposal}</p>
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

      {/* BOTTOM CHAT SECTION */}
      <div className="w-[92%] sm:w-[90%] md:w-[85%] xl:w-[80%] 
        bg-gradient-to-t from-[#03A4F4] to-[#5C039B] text-white 
        rounded-2xl shadow-xl mt-10
        flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 px-8 py-10">

        {/* LEFT TEXT */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
            Xobia Chat (24/7 AI Help)
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-5 leading-relaxed">
            Have a question right now? Xobia, our AI assistant, is available 24/7 
            to guide you through product details, support requests, or general 
            inquiries—anytime you need.
          </p>

          <button className="bg-[#5C039B] text-white font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition">
            Chat With Xobia
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            src={Picture2}
            alt="xobia"
            className="w-48 sm:w-56 md:w-72 lg:w-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
