import React, { useState } from "react";
import Imagemain from "../../assets/img/buy.jpg";
import toast, { Toaster } from "react-hot-toast";

export default function HeroSection() {
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState("Buy"); // BUY or SELL FORM

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    lookingTo: "",
    city: "",
    budget: "",
  });

  const handleOpenModal = (type) => {
    if (type === "Sell a Home") setActionType("Sell");
    else setActionType("Buy");

    setOpenModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      `Thank you, ${formData.firstName}! Your request for "${actionType}" has been submitted.`
    );

    setOpenModal(false);
  };

  return (
    <>
      {/* TOASTER */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden font-dm h-140">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Imagemain})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mx-auto mb-8 max-w-5xl heading-light">
            Transforming the Way You <br /> Rent, Buy, & Sell Your Home.
          </h1>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() => handleOpenModal("Rent a Home")}
              className="px-10 py-4 bg-[#5C039B] text-white font-extrabold rounded-lg shadow-md hover:bg-[#4A0080] transition"
            >
              Rent a Home
            </button>

            <button
              onClick={() => handleOpenModal("Find a Home")}
              className="px-10 py-4 bg-transparent border-2 text-white font-extrabold rounded-lg shadow-md hover:bg-[#5C039B] hover:border-none transition"
            >
              Find a Home
            </button>

            <button
              onClick={() => handleOpenModal("Sell a Home")}
              className="px-10 py-4 bg-transparent border-2 text-white font-extrabold rounded-lg shadow-md hover:bg-[#5C039B] hover:border-none transition"
            >
              Sell a Home
            </button>
          </div>
        </div>

        {/* Bottom clipping shapes */}
        <div className="absolute bottom-0 left-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-left-shape" />
        <div className="absolute bottom-0 right-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-right-shape" />

        <style>{`
          .clip-left-shape { clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%); }
          .clip-right-shape { clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%); }
        `}</style>
      </section>

      {/* MODAL FORM */}
  {openModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 text-3xl leading-none"
            >
              ×
            </button>

            {/* BUY / SELL Toggle */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-[#5C039B] rounded-full p-1 gap-2">
                <button
                  onClick={() => setActionType("Buy")}
                  className={`px-6 py-2 rounded-full text-lg font-extrabold ${
                    actionType === "Buy"
                      ? "bg-white text-[#5C039B]"
                      : "text-white"
                  }`}
                >
                  BUY
                </button>

                <button
                  onClick={() => setActionType("Sell")}
                  className={`px-6 py-2 rounded-full text-lg font-extrabold ${
                    actionType === "Sell"
                      ? "bg-white text-[#5C039B]"
                      : "text-white"
                  }`}
                >
                  SELL
                </button>
              </div>
            </div>

            {/* HEADING */}
            <h1 className="text-center text-4xl font-extrabold text-[#4a0075]">
              LET'S GET STARTED
            </h1>

            {/* DESCRIPTION */}
            <p className="text-center text-[#5F4A7A] mt-3 mb-8 text-lg font-medium">
              {actionType === "Sell"
                ? "We Have Buyers Waiting – Just Need Your Property Details!"
                : "Almost There! Share Your Information to Finalize Your Property Search."}
            </p>

            {/* BUY / RENT FORM */}
            {actionType === "Buy" && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    name="firstName"
                    placeholder="Name"
                    className=" w-full px-4 py-3 rounded-lg border border-[#5C039B] text-lg outline-none"
                    onChange={handleChange}
                    value={formData.firstName}
                    required
                  />

                  <input
                    name="number"
                    placeholder="Phone No."
                    className=" w-full px-4 py-3 rounded-lg border border-[#5C039B] text-lg outline-none"
                    onChange={handleChange}
                    value={formData.number}
                    required
                  />
                </div>

                <input
                  name="email"
                  placeholder="Your Email"
                  className=" w-full px-4 py-3 rounded-lg border border-[#5C039B] text-lg outline-none mb-4"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />

                <input
                  name="lookingTo"
                  placeholder="No. of bedrooms you are looking for"
                  className=" w-full px-4 py-3 rounded-lg border border-[#5C039B] text-lg outline-none mb-6"
                  onChange={handleChange}
                  value={formData.lookingTo}
                  required
                />

                {/* Contact Preference */}
                <p className="text-[#4a0075] font-semibold text-lg mb-3">
                  How do you prefer to be contacted?
                </p>

                <div className="flex gap-4 mb-6">
                  {["Call", "WhatsApp", "Email"].map((c) => (
                    <label key={c} className="flex items-center gap-2">
                      <input type="radio" name="contact" required />
                      <span className="bg-[#5C039B] text-white px-4 py-1 rounded-full text-lg font-bold">
                        {c}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Checkboxes */}
                <label className="flex items-start gap-3 mb-4">
                  <input type="checkbox" />
                  <p className="text-sm text-[#4a0075]">
                    I agree to receive newsletters and updates.
                  </p>
                </label>

                <label className="flex items-start gap-3 mb-6">
                  <input type="checkbox" required />
                  <p className="text-sm text-[#4a0075]">
                    I accept the Terms & Conditions.
                  </p>
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#5C039B] text-white py-3 rounded-full text-xl font-extrabold hover:bg-[#4A0080] transition"
                >
                  SUBMIT
                </button>
              </form>
            )}

            {/* SELL FORM */}
            {actionType === "Sell" && (
              <form onSubmit={handleSubmit}>
                {/* SELL FIELD CLASS */}
                <style>{`
      .sellInput {
        @apply w-full px-4 py-3 rounded-2xl border-2 border-[#5C039B]  bg-white text-base
               placeholder:text-[#5C039B] placeholder:font-medium placeholder:text-base;
      }
      .sellTextarea {
        @apply w-full px-4 py-3 rounded-2xl border-2 border-[#5C039B]  bg-white text-base h-40
               placeholder:text-[#5C039B] placeholder:font-medium placeholder:text-base;
      }
    `}</style>

                {/* Basic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Name"
                    required
                  />
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Phone No."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Your Email"
                    required
                  />
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Listing type"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="City"
                    required
                  />
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Area"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Project Name"
                  />
                  <input
                    className="sellInput bg-white rounded-lg"
                    placeholder="Developer"
                  />
                </div>

                <input
                  className="sellInput mb-8 bg-white rounded-lg"
                  placeholder="No. of bedrooms you are looking for"
                />

                {/* Unit Type */}
                <p className="font-semibold text-[#4a0075] text-lg mb-3">
                  Unit Type
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    "Apartment",
                    "Villa",
                    "Townhouse",
                    "Duplex",
                    "Penthouse",
                  ].map((u) => (
                    <label key={u} className="flex items-center gap-3">
                      <input type="radio" name="unit" />
                      <span className="px-5 py-2 bg-[#5C039B] text-white rounded-full text-lg font-bold">
                        {u}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Bedrooms */}
                <p className="font-semibold text-[#4a0075] text-lg mb-3">
                  Bedrooms
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    "Studio",
                    "1 Bed",
                    "2 Bed",
                    "3 Bed",
                    "4 Bed",
                    "5 Bed",
                    "6 Bed",
                    "7 Bed",
                    "8+ Bed",
                  ].map((b) => (
                    <label key={b} className="flex items-center gap-3">
                      <input type="radio" name="bed" />
                      <span className="px-5 py-2 bg-[#5C039B] text-white rounded-full text-lg font-bold ">
                        {b}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Price + Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    className="sellInput rounded-lg  bg-white"
                    placeholder="Unit Price (AED)"
                  />
                  <input
                    className="sellInput bg-white rounded-lg h-full"
                    placeholder="Unit Area (Sq. Ft.)"
                  />
                </div>

                {/* Description */}
                <textarea
                  className="sellTextarea mb-8 rounded-lg bg-white"
                  placeholder="Description"
                ></textarea>

                {/* Contact Preference */}
                <p className="font-semibold text-[#4a0075] text-lg mb-3">
                  Preferred Contact
                </p>
                <div className="flex gap-4 mb-8">
                  {["Call", "WhatsApp", "Email"].map((c) => (
                    <label key={c} className="flex items-center gap-3">
                      <input type="radio" name="contactSell" />
                      <span className="bg-[#5C039B] text-white px-5 py-2 rounded-full text-lg font-bold">
                        {c}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Checkboxes */}
                <label className="flex items-start gap-3 mb-4">
                  <input type="checkbox" />
                  <p className="text-sm text-[#4a0075]">
                    I agree to receive newsletters & marketing communications.
                  </p>
                </label>

                <label className="flex items-start gap-3 mb-8">
                  <input type="checkbox" required />
                  <p className="text-sm text-[#4a0075]">
                    I accept the Terms & Conditions.
                  </p>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#5C039B] text-white py-4 rounded-full text-2xl font-extrabold hover:bg-[#4A0080] transition"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
