import { useState } from "react";
import { ChevronDown } from "lucide-react";
import wave1 from "../../assets/img/wave/wave1.png";
import wave2 from "../../assets/img/wave/wave2.png";
/* Local DM Sans application */
const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function MortgagePreApproval() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lookingFor: "",
    city: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Include Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />



      {/* Full Background with Waves */}
      <div
        className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden"
        style={dmSans}
      >


          <div className="absolute top-[-20px] lg:top-[-605px] left-0 w-full z-0 overflow-hidden">
                <img
                  src={wave2}
                  alt=""
                  className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
                />
              </div>
        
              <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
                <img
                  src={wave1}
                  alt=""
                  className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
                />
              </div>
        {/* Top Wave */}
       

        {/* Content Container */}
        <div className="container mx-auto px-6 py-16 lg:py-24" >
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* LEFT SIDE */}
            <div className="space-y-4 -mt-55 ">
              <h1 className="text-5xl z-20 relative md:text-5xl card-heading-1 text-black leading-tight">
                Ready to get your  <br />mortgage started?
              </h1>
              <p className="text-xl text-[#547593] paragraph-light-1 mb-10  z-20 relative" >
                Start your application today and<br/> get pre-approval in 48 hours.
              </p>

              <div className="  relative z-20 grid gap-4">
                <button
                  style={{ backgroundColor: "#5C039B" }}
                  className="px-8 py-4 mx-3 w-2xs h-xs rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Get Pre-Approved Now
                </button>
                <button className="px-5 py-4 w-xs h-xs rounded-lg border-2 border-purple-600 text-purple-700 font-semibold hover:bg-purple-50 transition-all">
                  Talk to an Expert
                </button>
              </div>
            </div>
{/* RIGHT SIDE — FORM */}
<div className="relative" style={dmSans}>
  <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 max-w-xl h-145 mx-auto  -mt-12">

    <h3 className="text-xl font-semibold text-gray-900 mb-6">
      Discover, Decide, and Deal – All in One Place.
    </h3>

    <form onSubmit={handleSubmit} className="space-y-5">

      {/* First + Last */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* FIRST NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-600"
            placeholder="John"
            style={dmSans}
          />
        </div>

        {/* LAST NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-600"
            placeholder="Doe"
            style={dmSans}
          />
        </div>

      </div>

      {/* Email + Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-600"
            placeholder="john@example.com"
            style={dmSans}
          />
        </div>

        {/* PHONE NUMBER WITH COUNTRY CODE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2">

            {/* COUNTRY CODE */}
            <select
              name="countryCode"
              required
              value={formData.countryCode}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-600"
              style={dmSans}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+971">🇦🇪 +971</option>
            </select>

            {/* PHONE INPUT */}
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-600"
              placeholder="9876543210"
              style={dmSans}
            />
          </div>
        </div>

      </div>

      {/* Looking For + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* LOOKING FOR */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am Looking to <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <select
              name="lookingFor"
              required
              value={formData.lookingFor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              appearance-none focus:ring-2 focus:ring-purple-600 pr-10"
              style={dmSans}
            >
              <option value="">Select option</option>
              <option>Home Loan</option>
              <option>Refinance</option>
              <option>Personal Loan</option>
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
            w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* CITY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-600"
            placeholder="Mumbai"
            style={dmSans}
          />
        </div>

      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="budget"
          required
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-purple-600"
          placeholder="₹50 Lakhs - ₹1 Crore"
          style={dmSans}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{ backgroundColor: "#5C039B", ...dmSans }}
        className="w-full py-4 rounded-lg text-white font-semibold text-lg
        shadow-lg hover:shadow-xl transition-all hover:scale-105 mt-6"
      >
        Get Pre-Approved Now
      </button>

    </form>

  </div>
</div>
{/* END FORM */}

          </div>
        </div>
      </div>
    </>
  );
}
