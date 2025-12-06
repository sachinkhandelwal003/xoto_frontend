import React, { useState } from "react";
import GrowImage from "../../assets/img/Grow.png";
import wave1 from "../../assets/img/wave/wave1.png";

const CtaSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !inquiryType.trim()) {
      setToast("Please fill in required fields.");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setToast(
      `Thank you, ${name}!\nYour ${inquiryType} inquiry has been submitted.\nXOTO team will contact you soon.`
    );

    setOpenModal(false);
    setName("");
    setInquiryType("");

    setTimeout(() => setToast(null), 3500);
  };

  return (
    <>
      {/* CTA SECTION */}
      <section className="relative w-full flex justify-center items-center py-12 px-6 md:h-[450px]">

        {/* Wave Background */}
        <div className="absolute bottom-[-20px] lg:bottom-[-70px] left-0 w-full z-0 overflow-hidden">
          <img
            src={wave1}
            alt=""
            className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
          />
        </div>

        {/* CTA Container */}
        <div
          className="
            max-w-6xl relative banner-gradient-color rounded-2xl text-white
            flex flex-col md:flex-row justify-between 
            items-center md:items-start
            p-8 md:p-14 gap-6
            text-center md:text-left
          "
        >
          {/* LEFT CONTENT */}
          <div className="md:w-2/3 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-snug heading-light mb-6">
              Grow. Earn. XOTO is your one-stop property ecosystem.
            </h2>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#5C039B] px-6 py-3 rounded-md font-semibold text-white shadow-md transition"
            >
              Talk to our team today
            </button>
          </div>

          {/* RESPONSIVE IMAGE */}
          <div className="mt-6 md:mt-0 md:absolute md:bottom-0 md:right-0">
            <img
              src={GrowImage}
              alt="Property ecosystem illustration"
              className="object-contain h-56 md:h-80 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Team Inquiry Form</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Name *</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Your email"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <div className="flex gap-2">
                  <select className="border px-3 py-2 rounded-md">
                    <option value="+971">🇦🇪 UAE +971</option>
                    <option value="+91">🇮🇳 India +91</option>
                  </select>
                  <input
                    type="tel"
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              {/* TYPE OF INQUIRY */}
              <div>
                <label className="text-sm font-medium">Type of Inquiry *</label>
                <select
                  className="w-full border px-3 py-2 rounded-md"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                >
                  <option value="">Select inquiry type</option>
                  <option value="Buying Property">Buying Property</option>
                  <option value="Selling Property">Selling Property</option>
                  <option value="Renting Property">Renting Property</option>
                  <option value="Real Estate Investment">Real Estate Investment</option>
                  <option value="Property Management">Property Management</option>
                  <option value="Property Valuation">Property Valuation</option>
                  <option value="Other Real Estate Inquiry">Other Inquiry</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full border px-3 py-2 rounded-md"
                  rows="4"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#5C039B] w-full py-3 rounded-md text-white font-semibold"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-[#5C039B] text-white px-5 py-4 rounded-lg shadow-lg whitespace-pre-line text-sm font-medium animate-fadeIn z-[9999]">
          {toast}
        </div>
      )}
    </>
  );
};

export default CtaSection;
