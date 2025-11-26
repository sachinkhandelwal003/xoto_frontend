import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function MortgagePreApproval() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lookingFor: '',
    city: '',
    budget: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <>
      {/* Full Background with Wave */}
      <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full h-64 -z-10">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#wave1)"
              fillOpacity="0.3"
              d="M0,160 C320,50 640,250 960,150 C1280,50 1440,150 1440,160 L1440,0 L0,0 Z"
            />
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full h-48 -z-10">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#wave2)"
              fillOpacity="0.3"
              d="M0,200 C360,100 720,300 1080,200 C1296,100 1440,180 1440,200 L1440,320 L0,320 Z"
            />
            <defs>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Text & Buttons */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Ready to get your mortgage started?
              </h1>
              <p className="text-lg text-gray-700">
                Start your application today and get pre-approval in 48 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  style={{ backgroundColor: '#5C039B' }}
                  className="px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Get Pre-Approved Now
                </button>
                <button className="px-8 py-4 rounded-lg border-2 border-purple-600 text-purple-700 font-semibold hover:bg-purple-50 transition-all">
                  Talk to an Expert
                </button>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 max-w-xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Discover, Decide, and Deal – All in One Place.
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition pr-10"
                        >
                          <option value="">Select option</option>
                          <option>Home Loan</option>
                          <option>Refinance</option>
                          <option>Personal Loan</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                        placeholder="Mumbai"
                      />
                    </div>
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                      placeholder="₹50 Lakhs - ₹1 Crore"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: '#5C039B' }}
                    className="w-full py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 mt-6"
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