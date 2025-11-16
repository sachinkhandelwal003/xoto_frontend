/* src/components/freelancers/Registration.jsx */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  Wrench,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react";
import registerimage from "../../assets/img/registergarden.jpg";
import { showToast } from "../../manageApi/utils/toast";

// Keep country codes
const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi" },
  { value: "+1", label: "+1 USA/Canada" },
];

const experienceOptions = Array.from({ length: 11 }, (_, i) => ({
  value: i,
  label: i === 0 ? "Less than 1 year" : `${i} year${i > 1 ? "s" : ""}`,
})).concat({ value: 15, label: "15 years" }, { value: 20, label: "20+ years" });

const paymentOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Bank Transfer", label: "Bank Transfer" },
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Hindi", label: "Hindi" },
  { value: "French", label: "French" },
];

/* ---------- API helpers ---------- */
const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://kotiboxglobaltech.online/api/freelancer/category?active=true"
  );
  if (!data.success) throw new Error("Failed to load categories");
  return data.categories.map((c) => ({ value: c._id, label: c.name }));
};

const fetchSubcategories = async (catId) => {
  const { data } = await axios.get(
    `https://kotiboxglobaltech.online/api/freelancer/subcategory?category=${catId}`
  );
  if (!data.success) throw new Error("Failed to load subcategories");
  return data.subcategories.map((s) => ({ value: s._id, label: s.name }));
};

/* ---------- Main Component ---------- */
const Registration = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Keep country code & mobile state
  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");

  const [services, setServices] = useState([
    { category: "", subcategory: "", description: "" },
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const mobile = watch("mobile");

  // Auto-set mobile verified = true (bypass OTP for testing)
  useEffect(() => {
    setValue("is_mobile_verified", true);
  }, [setValue]);

  // Sync full mobile number with selected country code
  useEffect(() => {
    const cleaned = mobileNumber.replace(/\D/g, "").slice(0, 15);
    const fullMobile = cleaned ? `${countryCode}${cleaned}` : "";
    setValue("mobile", fullMobile);
  }, [countryCode, mobileNumber, setValue]);

  /* ----- Queries ----- */
  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const firstCat = services[0]?.category;
  const { data: subcategories = [], isLoading: subLoading } = useQuery({
    queryKey: ["subcategories", firstCat],
    queryFn: () => fetchSubcategories(firstCat),
    enabled: !!firstCat,
  });

  /* ----- Navigation ----- */
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const addService = () => {
    setServices((prev) => [
      ...prev,
      { category: "", subcategory: "", description: "" },
    ]);
  };

  const removeService = (idx) => {
    setServices((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateService = (idx, field, value) => {
    setServices((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };

  /* ----- Submit ----- */
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (!data.agreed_to_terms) {
      showToast("You must agree to terms", "error");
      return;
    }

    setLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      name: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
      mobile: data.mobile,
      is_mobile_verified: true, // Always true in test mode
      professional: {
        experience_years: Number(data.experience_years) || 0,
        bio: data.bio || "",
        skills: [],
      },
      location: {
        city: data.city,
        state: data.state || "",
        country: data.country || "UAE",
        pincode: data.pincode || "",
      },
      languages: selectedLanguages,
      services_offered: services
        .filter((s) => s.category && s.subcategory && s.description)
        .map((s) => ({
          category: s.category,
          subcategory: s.subcategory,
          description: s.description,
        })),
      payment: { preferred_method: data.preferred_method.value },
      meta: { agreed_to_terms: true },
    };

    try {
      await axios.post("https://kotiboxglobaltech.online/api/freelancer", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(true);
      showToast("Registration successful! Await admin approval.", "success");
    } catch (err) {
      const res = err.response?.data;
      if (res?.errors?.length) {
        showToast(`${res.errors[0].field}: ${res.errors[0].message}`, "error");
      } else {
        showToast(res?.message || "Registration failed", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ----- Success Screen ----- */
  if (success) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${registerimage})`,
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your request has been sent to the <strong>Super-Admin</strong>.
            <br />
            You will receive an email once approved.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Go to Login
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${registerimage})`,
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="bg-teal-600 text-white p-8">
            <h3 className="text-2xl font-bold mb-2">Join as a Pro</h3>
            <p className="text-teal-100 mb-8">Grow your landscaping business</p>
            <div className="space-y-6">
              <div className={`flex items-center gap-3 ${step >= 0 ? "text-white" : "text-teal-300"}`}>
                <User className="w-5 h-5" /> Basic Info
              </div>
              <div className={`flex items-center gap-3 ${step >= 1 ? "text-white" : "text-teal-300"}`}>
                <Briefcase className="w-5 h-5" /> Professional
              </div>
              <div className={`flex items-center gap-3 ${step >= 2 ? "text-white" : "text-teal-300"}`}>
                <Wrench className="w-5 h-5" /> Services
              </div>
            </div>
            <p className="text-teal-200 text-sm mt-8">
              Already have an account? <a href="/login" className="underline font-medium">Sign in</a>
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Landscaper Registration
            </h2>
            <p className="text-gray-600">Step {step + 1} of 3</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

              {/* STEP 0: Basic Info */}
              {step === 0 && (
                <div className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          {...register("first_name", { required: "Required" })}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                          placeholder="John"
                        />
                      </div>
                      {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          {...register("last_name", { required: "Required" })}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                          placeholder="Doe"
                        />
                      </div>
                      {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        {...register("email", {
                          required: "Required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                        })}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Mobile with Country Code Select (OTP Removed) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <div className="flex gap-2">
                      <Select
                        value={countryCodes.find(c => c.value === countryCode)}
                        onChange={(opt) => setCountryCode(opt.value)}
                        options={countryCodes}
                        className="w-40"
                        classNamePrefix="react-select"
                      />
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                        <input
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 15))}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                          placeholder="501234567"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Full: {mobile || "—"} (Auto-verified in test mode)
                    </p>
                  </div>

                  {/* Passwords */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          {...register("password", {
                            required: "Required",
                            minLength: { value: 6, message: "Min 6 chars" },
                          })}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          {...register("confirmPassword", { required: "Required" })}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Next Button - Always enabled (no OTP needed) */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
                    >
                      Next <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1 & 2 are exactly same as your original (just removed isMobileVerified checks) */}
              {step === 1 && (
                <div className="space-y-5">
                  {/* Same as your original Step 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <Controller
                      name="experience_years"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <Select {...field} options={experienceOptions} placeholder="Select experience" classNamePrefix="react-select" />
                      )}
                    />
                    {errors.experience_years && <p className="text-red-500 text-xs mt-1">{errors.experience_years.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      {...register("bio", { required: "Required" })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="I specialize in..."
                    />
                    {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input {...register("city", { required: "Required" })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Dubai" />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input {...register("state")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Dubai" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input {...register("pincode")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="123456" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Working Radius (km)</label>
                      <input {...register("working_radius")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="50" />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={back} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={next} className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
                      Next <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Services (unchanged) */}
              {step === 2 && (
                <div className="space-y-6">
                  {services.map((svc, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Service {i + 1}</h4>
                        {services.length > 1 && (
                          <button type="button" onClick={() => removeService(i)} className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <Select
                          isLoading={catLoading}
                          placeholder="Category"
                          value={categories.find(c => c.value === svc.category)}
                          onChange={(opt) => updateService(i, "category", opt.value)}
                          options={categories}
                          classNamePrefix="react-select"
                        />
                        <Select
                          isLoading={subLoading}
                          placeholder="Subcategory"
                          value={subcategories.find(s => s.value === svc.subcategory)}
                          onChange={(opt) => updateService(i, "subcategory", opt.value)}
                          options={subcategories}
                          isDisabled={!svc.category}
                          classNamePrefix="react-select"
                        />
                        <textarea
                          placeholder="Description"
                          value={svc.description}
                          onChange={(e) => updateService(i, "description", e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addService}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-600 hover:border-teal-500 hover:text-teal-600"
                  >
                    <Plus className="w-5 h-5" /> Add Another Service
                  </button>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <Select
                      isMulti
                      value={languageOptions.filter(l => selectedLanguages.includes(l.value))}
                      onChange={(opts) => setSelectedLanguages(opts.map(o => o.value))}
                      options={languageOptions}
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <Controller
                      name="preferred_method"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <Select {...field} options={paymentOptions} placeholder="Select payment method" classNamePrefix="react-select" />
                      )}
                    />
                    {errors.preferred_method && <p className="text-red-500 text-xs mt-1">{errors.preferred_method.message}</p>}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("agreed_to_terms", { required: "You must agree" })}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-teal-600 underline">Terms</a> and <a href="#" className="text-teal-600 underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreed_to_terms && <p className="text-red-500 text-xs">{errors.agreed_to_terms.message}</p>}

                  <div className="flex justify-between">
                    <button type="button" onClick={back} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Complete Registration"}
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;