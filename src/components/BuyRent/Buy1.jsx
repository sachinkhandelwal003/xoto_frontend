import React, { useState } from "react";
import Imagemain from "../../assets/img/buy.jpg";
import toast, { Toaster } from "react-hot-toast";

export default function HeroSection() {
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState("");
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
    setActionType(type);
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

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      lookingTo: "",
      city: "",
      budget: "",
    });
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
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
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

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-gray-800">
                {actionType}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Submit your information and our team will reach out shortly.
              </p>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">First Name</label>
                <input
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">Last Name</label>
                <input
                  name="lastName"
                  required
                  placeholder="Enter last name"
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="example@mail.com"
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">Phone Number</label>
                <input
                  name="number"
                  required
                  placeholder="+971 XXXXXXXXX"
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.number}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">I am looking to</label>
                <select
                  name="lookingTo"
                  required
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.lookingTo}
                >
                  <option value="">Select an option</option>
                  <option value="Rent">Rent</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-sm">Preferred City</label>
                <input
                  name="city"
                  required
                  placeholder="Dubai, Sharjah, Abu Dhabi..."
                  className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                  onChange={handleChange}
                  value={formData.city}
                />
              </div>

              {/* Budget (Full width) */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-gray-700 text-sm">Budget (AED)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                    AED
                  </span>
                  <input
                    name="budget"
                    required
                    placeholder="Enter your budget"
                    className="border w-full px-14 py-3 rounded-lg focus:ring-2 focus:ring-[#5C039B] outline-none"
                    onChange={handleChange}
                    value={formData.budget}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="md:col-span-2 w-full bg-[#5C039B] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#4A0080] transition"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
