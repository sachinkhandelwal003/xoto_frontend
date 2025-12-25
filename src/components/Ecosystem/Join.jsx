import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";

import joinImage from "../../assets/img/join.png";
import wave1 from "../../assets/img/wave/waveint5.png";

const PartnerEcosystemSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    stakeholder: "",
    countryCode: "+971",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in contact
    if (name === "contact" && value && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return false;
    if (!formData.lastName.trim()) return false;
    if (!formData.company.trim()) return false;
    if (!formData.stakeholder) return false;
    if (!formData.message.trim()) return false;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return false;
    if (!formData.contact || !/^[0-9]{8,10}$/.test(formData.contact)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    const payload = {
      type: "partner",
      name: {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
      },
      email: formData.email.toLowerCase().trim(),
      company: formData.company.trim(),
      stakeholder_type: formData.stakeholder,
      mobile: {
        country_code: formData.countryCode,
        number: formData.contact,
      },
      message: formData.message.trim(),
    };

    try {
      const res = await apiService.post("/property/lead", payload);

      if (res.success) {
        toast.success("Thank you! Your partnership request has been sent.");
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
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <section className="w-full relative bg-[var(--color-body)] py-16 md:py-20 px-6 md:px-12 z-10">
       <div className="absolute top-[-40px] sm:top-[-80px] lg:top-[-150px] left-0 w-full z-0 overflow-hidden">
  <img
    src={wave1}
    alt=""
    className="
      w-full
      h-auto
      object-cover

      scale-[1.6] sm:scale-[1.3] lg:scale-100
      -ml-[30%] sm:-ml-[15%] lg:ml-0

      pointer-events-none
      select-none
    "
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
                disabled={loading}
                className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-md shadow-md transition opacity-100 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerEcosystemSection;