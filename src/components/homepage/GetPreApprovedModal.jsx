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
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="relative w-full max-w-2xl rounded-3xl shadow-2xl
          overflow-hidden text-black max-h-[95vh] md:max-h-none"
        >
          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f4f1ff] via-white to-[#e9fbff]" />

          {/* CONTENT */}
          <div
            className="relative bg-white rounded-3xl
            px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 overflow-y-auto"
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-6 sm:top-6
              p-2 rounded-full hover:bg-gray-100"
            >
              <FiX className="text-xl" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-left mb-6 sm:mb-8">
              Let's get started
            </h2>

            <div className="space-y-5 sm:space-y-6 text-sm">
              {/* NAME + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* NAME */}
                <div>
                  <label className="block text-left mb-1 font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="E.g.: John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
                    outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-left mb-1 font-medium">
                    Phone number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                    {/* COUNTRY */}
                    <div className="relative flex items-center bg-gray-100 border-r px-2">
                      <img
                        src={COUNTRY_CONFIG[country].flag}
                        className="w-5 mr-1"
                        alt={country}
                      />
                      <select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setForm({ ...form, phone: "" });
                        }}
                        className="bg-transparent pr-6 outline-none appearance-none text-sm"
                      >
                        {Object.keys(COUNTRY_CONFIG).map((c) => (
                          <option key={c} value={c}>
                            {COUNTRY_CONFIG[c].code}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-1 text-xs opacity-60 pointer-events-none" />
                    </div>

                    {/* PHONE INPUT */}
                    <input
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder={`Enter ${COUNTRY_CONFIG[country].digits} digit number`}
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
                <label className="block text-left mb-1 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="E.g.: john@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* FOUND PROPERTY */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Have you found a property?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="foundProperty"
                        checked={form.foundProperty === v}
                        onChange={() =>
                          setForm({ ...form, foundProperty: v })
                        }
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="block mb-1 font-medium">
                  Where is the property located?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
                    appearance-none outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Select</option>
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* CONTACT PREF */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  How do you prefer to be contacted?
                </label>
                <div className="flex gap-6 flex-wrap">
                  {["Call", "WhatsApp", "Email"].map((v) => (
                    <label key={v} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.contact.includes(v)}
                        onChange={() => toggleContact(v)}
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              {/* AGREEMENTS */}
              <div className="space-y-3">
                <label className="flex items-start gap-2">
                  <input type="checkbox" />
                  <span>
                    I agree to receive newsletters and marketing communications.
                  </span>
                </label>

                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={() =>
                      setForm({ ...form, terms: !form.terms })
                    }
                  />
                  <span>
                    I accept the{" "}
                    <span className="underline">Terms</span> &{" "}
                    <span className="underline">Privacy Policy</span>{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* CTA */}
              <button
                className="w-full mt-4 bg-[#5C039B] hover:bg-purple-800
                text-white py-3 sm:py-4 rounded-xl font-semibold
                text-base sm:text-lg transition"
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
