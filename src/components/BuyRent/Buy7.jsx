import React, { useState } from "react";
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow digits only in phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.countryCode) {
      newErrors.phone = "Select country code";
    } else if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length < 8 || form.phone.length > 12) {
      newErrors.phone = "Number must be 8–12 digits";
    }

    if (!form.country) newErrors.country = "Select country";
    if (!form.lookingFor) newErrors.lookingFor = "Select an option";
    if (!form.city) newErrors.city = "Select preferred city";
    if (!form.budget) newErrors.budget = "Budget is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      phone: `${form.countryCode}${form.phone}`,
    };

    console.log("Form Submitted ✅", payload);
    alert("Form submitted successfully!");
  };

  return (
    <section className="relative w-full bg-[var(--color-body)]  py-16 overflow-hidden  ">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-18 items-center">
        {/* WAVES */}
        <div className="absolute top-0 left-0 w-full z-0">
          <img src={waveint6} alt="" className="w-full" />
        </div>
        <div className="absolute -bottom-30 left-0 w-full z-0">
          <img src={waveint} alt="" className="w-full" />
        </div>

        {/* LEFT */}
        <div className="space-y-10 relative z-20 px-">
          <h1 className="text-5xl card-heading-1 text-gray-900 px-30">
            Where Dreams <br /> Meet Doorsteps
          </h1>
          <p className="text-lg text-gray-600 px-30">
            Find, Sell & Finance Your Dream Home <br />
            Smarter, Faster, Easier
          </p>
          <img src={image} alt="House" className="w-[920px] mt-6 " />
        </div>

        {/* FORM */}
        <div className="bg-white shadow-[0_0_25px_rgba(92,3,155,0.35)] justify-end rounded-xl p-5 w-full max-w-lg z-20">
          <h2 className="text-3xl font-bold text-gray-900">
            Discover, Decide, Deal
          </h2>
          <p className="text-black mb-6">All in One Place.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name*"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
              <input
                name="lastName"
                placeholder="Last Name*"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email Address*"
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            />

            {/* Phone with country code */}
            <div className="grid grid-cols-3 gap-3">
              <select
                name="countryCode"
                onChange={handleChange}
                className="border rounded-lg p-3 text-gray-500"
              >
                <option value="" disabled hidden>
                  Code*
                </option>
                <option value="+91">+91 (India)</option>
                <option value="+971">+971 (Dubai)</option>
              </select>

              <input
                name="phone"
                placeholder="Phone Number*"
                value={form.phone}
                onChange={handleChange}
                className="border rounded-lg p-3 col-span-2"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            {/* Country & Looking For */}
            <div className="grid grid-cols-2 gap-4">
              <select
                name="country"
                onChange={handleChange}
                className="border rounded-lg p-3 text-gray-500"
              >
                <option value="" disabled hidden>
                  Select Country*
                </option>
                <option value="India">India</option>
                <option value="Dubai">Dubai</option>
              </select>

              <select
                name="lookingFor"
                onChange={handleChange}
                className="border rounded-lg p-3 text-gray-500"
              >
                <option value="" disabled hidden>
                  I am looking for*
                </option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/* City */}
            <select
              name="city"
              onChange={handleChange}
              className="border rounded-lg p-3 w-full text-gray-500"
            >
              <option value="" disabled hidden>
                Preferred City*
              </option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
            </select>

            {/* Budget */}
            <input
              name="budget"
              placeholder="Budget*"
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            />

            <button
              type="submit"
              className="w-full bg-[#5C039B] text-white font-semibold py-3 rounded-lg"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
