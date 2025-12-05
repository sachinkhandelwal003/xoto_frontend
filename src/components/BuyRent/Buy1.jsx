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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              {actionType} – Submit Your Information
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                required
                placeholder="First Name"
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.firstName}
              />

              <input
                name="lastName"
                required
                placeholder="Last Name"
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.lastName}
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.email}
              />

              <input
                name="number"
                required
                placeholder="Phone Number"
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.number}
              />

              <select
                name="lookingTo"
                required
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.lookingTo}
              >
                <option value="">I am looking to</option>
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>

              <input
                name="city"
                required
                placeholder="Preferred City"
                className="border p-3 rounded"
                onChange={handleChange}
                value={formData.city}
              />

              {/* UPDATED BUDGET INPUT WITH AED LABEL */}
              <div className="relative col-span-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                  AED
                </span>

                <input
                  name="budget"
                  required
                  placeholder="Enter Budget"
                  className="border p-3 pl-16 rounded w-full"
                  onChange={handleChange}
                  value={formData.budget}
                />
              </div>

              <button
                type="submit"
                className="col-span-2 bg-[#5C039B] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#4A0080] transition"
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
