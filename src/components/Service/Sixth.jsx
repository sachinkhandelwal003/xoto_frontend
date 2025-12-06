import { useState } from "react";
import { ChevronDown } from "lucide-react";
import wave1 from "../../assets/img/wave/waveint2.png";
import wave2 from "../../assets/img/wave/wave2.png";

const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function MortgagePreApproval() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
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
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden"
        style={dmSans}
      >
        {/* ---- TOP WAVE ---- */}
        <div className="absolute top-0 left-0 w-full -translate-y-1/2 z-0 overflow-hidden">
          <img
            src={wave2}
            alt=""
            className="w-full h-auto object-cover opacity-90 pointer-events-none select-none"
          />
        </div>

        {/* ---- BOTTOM WAVE ---- */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/3 z-0 overflow-hidden">
          <img
            src={wave1}
            alt=""
            className="w-full h-auto object-cover opacity-90 pointer-events-none select-none"
          />
        </div>

        {/* ---- MAIN CONTENT ---- */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

            {/* ---------- LEFT CONTENT ---------- */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
                Ready to get your <br />
                mortgage started?
              </h1>

              <p className="text-lg sm:text-xl text-[#547593] mb-8">
                Start your application today and <br className="hidden sm:block" />
                get pre-approval in 48 hours.
              </p>

              <div className="grid gap-4 justify-center lg:justify-start">
                <button className="px-6 py-3 w-full sm:w-auto bg-[var(--color-primary)] rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Get Pre-Approved Now
                </button>

                <button className="px-6 py-3 w-full sm:w-auto rounded-lg border-2 border-purple-600 text-purple-700 font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all">
                  Talk to an Expert
                </button>
              </div>
            </div>

            {/* ---------- RIGHT SIDE FORM ---------- */}
            <div className="relative w-full flex justify-center">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-xl">
                
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
                  Discover, Decide, and Deal – All in One Place.
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* NAME FIELDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="John"
                      />
                    </div>

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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL + PHONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number <span className="text-red-500">*</span>
                      </label>

                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>

                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* LOOKING FOR */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-600 pr-10"
                        >
                          <option value="">Select option</option>
                          <option>Home Loan</option>
                          <option>Refinance</option>
                          <option>Personal Loan</option>
                        </select>

                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>

                  {/* BUDGET */}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="₹50 Lakhs - ₹1 Crore"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    style={{ backgroundColor: "#5C039B" }}
                    className="w-full py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 mt-4"
                  >
                    Get Pre-Approved Now
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
