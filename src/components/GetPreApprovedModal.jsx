import { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

export default function GetPreApprovedModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    foundProperty: "",
    location: "",
    contact: [],
    marketing: false,
    terms: false,
  });

  /* ================= COUNTRY CONFIG ================= */
  const COUNTRY_CONFIG = {
    UAE: {
      code: "+971",
      flag: "https://flagcdn.com/w20/ae.png",
      digits: 9,
    },
    India: {
      code: "+91",
      flag: "https://flagcdn.com/w20/in.png",
      digits: 10,
    },
    "Saudi Arabia": {
      code: "+966",
      flag: "https://flagcdn.com/w20/sa.png",
      digits: 9,
    },
    UK: {
      code: "+44",
      flag: "https://flagcdn.com/w20/gb.png",
      digits: 10,
    },
    Australia: {
      code: "+61",
      flag: "https://flagcdn.com/w20/au.png",
      digits: 9,
    },
  };

  const [country, setCountry] = useState("UAE");

  if (!open) return null;

  /* ================= HANDLERS ================= */
  const toggleContact = (v) => {
    setForm((p) => ({
      ...p,
      contact: p.contact.includes(v)
        ? p.contact.filter((x) => x !== v)
        : [...p.contact, v],
    }));
  };

  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const maxLength = COUNTRY_CONFIG[country].digits;

    setForm({
      ...form,
      phone: onlyDigits.slice(0, maxLength),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Modal Card */}
        <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden text-black">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f4f1ff] via-white to-[#e9fbff]" />

          {/* Content */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl px-6 sm:px-8 py-8 sm:py-10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close modal"
            >
              <FiX className="text-xl" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-left mb-6 sm:mb-8">
              Let's get started
            </h2>

            <div className="space-y-6 text-sm">
              {/* NAME + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NAME */}
                <div>
                  <label className="block text-left mb-1 font-medium text-black">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="E.g.: John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-left mb-1 font-medium text-black">
                    Phone number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 transition">
                    {/* Country Selector */}
                    <div className="relative flex items-center bg-gray-100 border-r px-3 py-3">
                      <img
                        src={COUNTRY_CONFIG[country].flag}
                        className="w-5 mr-2"
                        alt={country}
                      />
                      <select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setForm({ ...form, phone: "" });
                        }}
                        className="bg-transparent pr-8 py-1 outline-none appearance-none text-sm font-medium cursor-pointer"
                      >
                        {Object.keys(COUNTRY_CONFIG).map((c) => (
                          <option key={c} value={c}>
                            {COUNTRY_CONFIG[c].code}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-60 pointer-events-none" />
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder={`Enter ${COUNTRY_CONFIG[country].digits} digits`}
                      className="flex-1 px-4 py-3 outline-none"
                      inputMode="numeric"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {COUNTRY_CONFIG[country].digits} digits required
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-left mb-1 font-medium text-black">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="E.g.: john@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* FOUND PROPERTY */}
              <div>
                <label className="block text-left mb-2 font-medium text-black">
                  Have you found a property? <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-wrap gap-6">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foundProperty"
                        checked={form.foundProperty === v}
                        onChange={() => setForm({ ...form, foundProperty: v })}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-base">{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="block mb-1 font-medium text-black text-left">
                  Where is the property located?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 appearance-none outline-none focus:ring-2 focus:ring-purple-500 transition bg-white"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* CONTACT PREFERENCE */}
              <div>
                <label className="block text-left mb-2 font-medium text-black">
                  How do you prefer to be contacted?
                </label>

                <div className="flex flex-wrap gap-6">
                  {["Call", "WhatsApp", "Email"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.contact.includes(v)}
                        onChange={() => toggleContact(v)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-base">{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AGREEMENTS */}
              <div className="space-y-4 text-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.marketing}
                    onChange={() => setForm({ ...form, marketing: !form.marketing })}
                    className="mt-0.5"
                  />
                  <span>
                    I agree to receive newsletters and marketing communications.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={() => setForm({ ...form, terms: !form.terms })}
                    className="mt-0.5"
                  />
                  <span>
                    I accept the{" "}
                    <span className="underline">Terms</span> &{" "}
                    <span className="underline">Privacy Policy</span>{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                className="w-full mt-8 bg-[#5C039B] hover:bg-purple-800 text-white py-4 rounded-xl font-semibold text-lg transition duration-200 shadow-lg"
                onClick={() => console.log("Form submitted:", form)} // Replace with actual submit
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}