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

  {/* Rent a Home – Primary button */}
  <button
    className="
      px-10 py-4 
      bg-[#5C039B] 
      text-white 
      font-extrabold 
      rounded-lg 
      shadow-md 
      transition-all 
      duration-300
      hover:bg-[#4A0080]
      hover:shadow-xl
      hover:scale-105
    "
  >
    Rent a Home
  </button>

  {/* Find a Home – Outline button */}
  <button
    onClick={() => handleOpenModal('Find a Home')}
    className="
      px-10 py-4 
      bg-transparent 
      border-2 border-white 
      text-white 
      font-extrabold 
      rounded-lg 
      shadow-md 
      transition-all 
      duration-300
      hover:bg-[#5C039B]
      hover:border-[#5C039B]
      hover:shadow-xl
      hover:scale-105
    "
  >
    Find a Home
  </button>

  {/* Sell a Home – Outline button */}
  <button
    onClick={() => handleOpenModal('Sell a Home')}
    className="
      px-10 py-4 
      bg-transparent 
      border-2 border-white 
      text-white 
      font-extrabold 
      rounded-lg 
      shadow-md 
      transition-all 
      duration-300
      hover:bg-[#5C039B]
      hover:border-[#5C039B]
      hover:shadow-xl
      hover:scale-105
    "
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
      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#EEE5FF] to-[#C8B3FF] max-w-3xl w-full p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 bg-green-500 text-white w-8 h-8 rounded-full text-xl"
            >
              ×
            </button>

            {/* TOGGLE */}
            <div className="flex justify-center mb-6">
              <div className="flex bg-[#5C039B] p-1 rounded-full">
                {["Buy", "Sell"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActionType(t)}
                    className={`px-6 py-2 rounded-full font-bold ${
                      actionType === t
                        ? "bg-white text-[#5C039B]"
                        : "text-white"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-4xl text-center font-extrabold text-[#5C039B] mb-3">
              LETS GET STARTED
            </h2>

            <p className="text-center text-[#5C039B] mb-8">
              {actionType === "Sell"
                ? "We Have Buyers Waiting – Just Need Your Property Details!"
                : "Almost There! Share Your Information to Finalize Your Property Search."}
            </p>

            {/* BUY FORM */}
            {actionType === "Buy" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME & PHONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="firstName"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#5C039B]
                   placeholder:text-[#5C039B] outline-none"
                    required
                  />
                  <input
                    name="number"
                    placeholder="Phone No."
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#5C039B]
                   placeholder:text-[#5C039B] outline-none"
                    required
                  />
                </div>

                {/* EMAIL */}
                <input
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#5C039B]
                 placeholder:text-[#5C039B] outline-none"
                  required
                />

                {/* BEDROOM */}
                <input
                  name="lookingTo"
                  placeholder="No. of bedrooms you are looking for in the property"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#5C039B]
                 placeholder:text-[#5C039B] outline-none"
                  required
                />

                {/* CONTACT */}
                <div>
                  <p className="text-[#5C039B] text-lg font-semibold mb-3">
                    How do you prefer to be contacted?
                  </p>

                  <div className="flex flex-wrap gap-6">
                    {["Call", "WhatsApp", "Email"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="radio" name="contact" />
                        <span className="bg-[#5C039B] text-white px-4 py-1 rounded-full font-semibold">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CHECKBOXES */}
                <label className="flex gap-3 text-[#5C039B] text-sm">
                  <input type="checkbox" />I agree to receive newsletters and
                  marketing communications from via digital media, and
                  understand I can unsubscribe at any time.
                </label>

                <label className="flex gap-3 text-[#5C039B] text-sm">
                  <input type="checkbox" required />I have read, understood, and
                  accept the Terms and Conditions and Privacy Policy of Xoto. *
                </label>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-[#5C039B] text-white py-4 rounded-full text-xl font-bold"
                >
                  SUBMIT
                </button>
              </form>
            )}

            {/* SELL FORM */}
            {actionType === "Sell" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Name",
                    "Phone No.",
                    "Your Email",
                    "Listing type",
                    "City",
                    "Area",
                    "Project Name",
                    "Developer",
                  ].map((f) => (
                    <input key={f} placeholder={f} className="input" />
                  ))}
                </div>

                <input
                  placeholder="No. of bedrooms you are looking for in the property"
                  className="input"
                />

                <div>
                  <p className="label">Unit type</p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Apartment",
                      "Villa",
                      "Townhouse",
                      "Duplex",
                      "Penthouse",
                    ].map((t) => (
                      <label key={t} className="pill">
                        <input type="radio" name="unit" />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label">Bedroom</p>
                  <div className="flex flex-wrap gap-4">
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
                      <label key={b} className="pill">
                        <input type="radio" name="bed" />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="Unit price (AED)" className="input" />
                  <input placeholder="Unit area (Sq. Ft.)" className="input" />
                </div>

                <textarea placeholder="Description" className="input h-40" />
                {/* CONTACT */}
                <div>
                  <p className="text-[#5C039B] text-lg font-semibold mb-3">
                    How do you prefer to be contacted?
                  </p>

                  <div className="flex flex-wrap gap-6">
                    {["Call", "WhatsApp", "Email"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="radio" name="contact" />
                        <span className="bg-[#5C039B] text-white px-4 py-1 rounded-full font-semibold">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CHECKBOXES */}
                <label className="flex gap-3 text-[#5C039B] text-sm">
                  <input type="checkbox" />I agree to receive newsletters and
                  marketing communications from via digital media, and
                  understand I can unsubscribe at any time.
                </label>

                <label className="flex gap-3 text-[#5C039B] text-sm">
                  <input type="checkbox" required />I have read, understood, and
                  accept the Terms and Conditions and Privacy Policy of Xoto. *
                </label>
                <button className="submit-btn">SUBMIT</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* REUSABLE STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #5C039B;
          outline: none;
        }
        .pill {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background: #5C039B;
          padding: 0.4rem 1rem;
          color: white;
          border-radius: 9999px;
          font-weight: 600;
        }
        .submit-btn {
          width: 100%;
          background: #5C039B;
          color: white;
          padding: 1rem;
          border-radius: 9999px;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .label {
          font-weight: bold;
          color: #5C039B;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
}
