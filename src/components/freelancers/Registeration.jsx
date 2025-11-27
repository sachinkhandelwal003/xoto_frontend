/* src/components/freelancers/Registration.jsx */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import {
  User, Mail, Phone, Lock, Briefcase, Wrench,
  Plus, Trash2, ChevronLeft, ChevronRight, Check, ArrowRight,
} from "lucide-react";
import { Form, Input, Select, Button, Checkbox, message, Spin } from "antd";
import registerimage from "../../assets/img/registergarden.jpg";
import { apiService } from "../../manageApi/utils/custom.apiservice";

const { Option } = Select;

// Options (unchanged)
const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
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
  { value: "english", label: "English" },
  { value: "arabic", label: "Arabic" },
  { value: "hindi", label: "Hindi" },
  { value: "french", label: "French" },
];

const uaeLocations = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman",
  "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain",
];

/* API */
const fetchCategories = async () => {
  const res = await apiService.get("/freelancer/category?active=true");
  return res.data.map(c => ({ value: c._id, label: c.name }));
};

const fetchSubcategories = async (catId) => {
  if (!catId) return [];
  const res = await apiService.get(`/freelancer/subcategory?category=${catId}`);
  return res.data.map(s => ({ value: s._id, label: s.name }));
};

const Registration = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");
  const [services, setServices] = useState([{
    category: "",
    subcategories: [],
    description: "",
    unit: "per job"
  }]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [apiErrors, setApiErrors] = useState({});

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => setValue("is_mobile_verified", true), [setValue]);

  useEffect(() => {
    const num = mobileNumber.replace(/\D/g, "").slice(0, 15);
    if (num) {
      setValue("mobile", { country_code: countryCode, number: num });
    }
  }, [countryCode, mobileNumber, setValue]);

  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const firstCatId = services[0]?.category;
  const { data: subcategories = [] } = useQuery({
    queryKey: ["subcats", firstCatId],
    queryFn: () => fetchSubcategories(firstCatId),
    enabled: !!firstCatId,
  });

  const next = async () => {
    const fields = step === 0
      ? ["first_name", "last_name", "email", "password", "confirmPassword"]
      : ["experience_years", "bio", "city", "state"];

    const ok = await trigger(fields);
    if (ok) setStep(s => s + 1);
  };

  const back = () => setStep(s => s - 1);

  const addService = () => {
    setServices(prev => [...prev, {
      category: "", subcategories: [], description: "", unit: "per job"
    }]);
  };

  const removeService = (i) => {
    setServices(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateService = (idx, field, value) => {
    setServices(prev => {
      const newServices = [...prev];
      if (field === "subcategories") {
        newServices[idx].subcategories = value || [];
      } else {
        newServices[idx][field] = value;
      }
      return newServices;
    });
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return message.error("Passwords do not match");
    }
    if (selectedLanguages.length === 0) {
      return message.error("Please select at least one language");
    }
    if (services.some(s => !s.category || s.subcategories.length === 0 || !s.description)) {
      return message.error("Please complete all required service fields");
    }

    setLoading(true);
    setApiErrors({});

    const payload = {
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      name: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
      mobile: data.mobile,
      is_mobile_verified: true,
      location: {
        city: data.city,
        state: data.state,
        country: "UAE",
      },
      professional: {
        experience_years: Number(data.experience_years),
        bio: data.bio,
        skills: [],
        availability: "Full-time",
      },
      services_offered: services.map(s => ({
        category: s.category,
        subcategories: s.subcategories,
        description: s.description,
        unit: s.unit,
      })),
      payment: {
        preferred_method: data.preferred_method,
      },
      languages: selectedLanguages,
      meta: {
        agreed_to_terms: true,
      },
    };

    try {
      await axios.post("https://kotiboxglobaltech.online/api/freelancer", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true);
      message.success("Registration successful! Awaiting admin approval.");
    } catch (err) {
      const res = err.response?.data;
      if (res?.errors?.length) {
        const errMap = {};
        res.errors.forEach(e => { errMap[e.field] = e.message; });
        setApiErrors(errMap);
        message.error(res.errors[0].message);
      } else {
        message.error(res?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${registerimage})` }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your request has been sent to the <strong>Super-Admin</strong>.<br />
            You will receive an email once approved.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
            Go to Login <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${registerimage})` }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar - Updated to Purple */}
          <div className="bg-gradient-to-b from-purple-700 to-purple-900 text-white p-8">
            <h3 className="text-2xl font-bold mb-2">Join as a Pro</h3>
            <p className="text-purple-200 mb-8">Grow your landscaping business</p>
            <div className="space-y-6">
              <div className={`flex items-center gap-3 ${step >= 0 ? "text-white" : "text-purple-300"}`}><User className="w-6 h-6" /> Basic Info</div>
              <div className={`flex items-center gap-3 ${step >= 1 ? "text-white" : "text-purple-300"}`}><Briefcase className="w-6 h-6" /> Professional</div>
              <div className={`flex items-center gap-3 ${step >= 2 ? "text-white" : "text-purple-300"}`}><Wrench className="w-6 h-6" /> Services</div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Execution Partner Registration</h2>
            <p className="text-gray-600 mb-8">Step {step + 1} of 3</p>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

              {/* STEP 0 */}
              {step === 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="First Name" required validateStatus={errors.first_name ? "error" : ""} help={errors.first_name?.message || apiErrors.first_name}>
                      <Controller name="first_name" control={control} rules={{ required: "Required" }} render={({ field }) => <Input prefix={<User />} size="large" {...field} />} />
                    </Form.Item>
                    <Form.Item label="Last Name" required validateStatus={errors.last_name ? "error" : ""} help={errors.last_name?.message || apiErrors.last_name}>
                      <Controller name="last_name" control={control} rules={{ required: "Required" }} render={({ field }) => <Input prefix={<User />} size="large" {...field} />} />
                    </Form.Item>
                  </div>

                  <Form.Item label="Email" required validateStatus={errors.email ? "error" : ""} help={errors.email?.message || apiErrors.email}>
                    <Controller name="email" control={control} rules={{ required: "Required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }} render={({ field }) => <Input prefix={<Mail />} size="large" {...field} />} />
                  </Form.Item>

                  <Form.Item label="Mobile Number" required help={apiErrors.mobile}>
                    <div className="flex gap-3">
                      <Select value={countryCode} onChange={setCountryCode} style={{ width: 140 }} size="large">
                        {countryCodes.map(c => <Option key={c.value} value={c.value}>{c.label}</Option>)}
                      </Select>
                      <Input prefix={<Phone />} value={mobileNumber} onChange={e => setMobileNumber(e.target.value.replace(/\D/g, ""))} placeholder="501234567" size="large" style={{ flex: 1 }} />
                    </div>
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Password" required validateStatus={errors.password ? "error" : ""} help={errors.password?.message}>
                      <Controller name="password" control={control} rules={{ required: "Required", minLength: { value: 6, message: "Min 6 characters" } }} render={({ field }) => <Input.Password prefix={<Lock />} size="large" {...field} />} />
                    </Form.Item>
                    <Form.Item label="Confirm Password" required>
                      <Controller name="confirmPassword" control={control} rules={{ required: "Required" }} render={({ field }) => <Input.Password prefix={<Lock />} size="large" {...field} />} />
                    </Form.Item>
                  </div>

                  <div className="text-right mt-8">
                    <Button type="primary" size="large" onClick={next}
                      style={{ backgroundColor: '#5C039B', borderColor: '#5C039B' }}>
                      Next <ChevronRight className="inline" />
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <Form.Item label="Years of Experience" required validateStatus={errors.experience_years ? "error" : ""} help={errors.experience_years?.message}>
                    <Controller name="experience_years" control={control} rules={{ required: "Required" }} render={({ field }) => (
                      <Select size="large" placeholder="Select years" {...field}>
                        {experienceOptions.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
                      </Select>
                    )} />
                  </Form.Item>

                  <Form.Item label="Professional Bio" required validateStatus={errors.bio ? "error" : ""} help={errors.bio?.message}>
                    <Controller name="bio" control={control} rules={{ required: "Required" }} render={({ field }) => <Input.TextArea rows={5} size="large" {...field} />} />
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="City" required>
                      <Controller name="city" control={control} rules={{ required: "Required" }} render={({ field }) => (
                        <Select size="large" placeholder="Select city" {...field}>
                          {uaeLocations.map(city => <Option key={city} value={city}>{city}</Option>)}
                        </Select>
                      )} />
                    </Form.Item>
                    <Form.Item label="State/Emirate" required>
                      <Controller name="state" control={control} rules={{ required: "Required" }} render={({ field }) => (
                        <Select size="large" placeholder="Select state" {...field}>
                          {uaeLocations.map(state => <Option key={state} value={state}>{state}</Option>)}
                        </Select>
                      )} />
                    </Form.Item>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button size="large" onClick={back}><ChevronLeft /> Back</Button>
                    <Button type="primary" size="large" onClick={next}
                      style={{ backgroundColor: '#5C039B', borderColor: '#5C039B' }}>
                      Next <ChevronRight />
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <Spin spinning={loading}>
                  {services.map((svc, i) => (
                    <div key={i} className="border border-gray-300 rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Service {i + 1}</h3>
                        {services.length > 1 && <Button danger onClick={() => removeService(i)}><Trash2 className="w-5 h-5" /></Button>}
                      </div>

                      <Form.Item label="Category" required>
                        <Select loading={catLoading} value={svc.category} onChange={v => updateService(i, "category", v)} placeholder="Select category" size="large">
                          {categories.map(c => <Option key={c.value} value={c.value}>{c.label}</Option>)}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Subcategories (Multiple)" required>
                        <Select
                          mode="multiple"
                          value={svc.subcategories}
                          onChange={v => updateService(i, "subcategories", v)}
                          placeholder="Select subcategories"
                          size="large"
                          disabled={!svc.category}
                        >
                          {subcategories.map(s => <Option key={s.value} value={s.value}>{s.label}</Option>)}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Description" required>
                        <Input.TextArea
                          value={svc.description}
                          onChange={e => updateService(i, "description", e.target.value)}
                          rows={3}
                          size="large"
                        />
                      </Form.Item>
                    </div>
                  ))}

                  <Button type="dashed" onClick={addService} block size="large" className="mb-6">
                    <Plus /> Add Another Service
                  </Button>

                  <Form.Item label="Languages Spoken" required>
                    <Select mode="multiple" value={selectedLanguages} onChange={setSelectedLanguages} size="large">
                      {languageOptions.map(l => <Option key={l.value} value={l.value}>{l.label}</Option>)}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Payment Method" required>
                    <Controller
                      name="preferred_method"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <Select size="large" placeholder="Select method" {...field}>
                          {paymentOptions.map(p => <Option key={p.value} value={p.value}>{p.label}</Option>)}
                        </Select>
                      )}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Controller
                      name="agreed_to_terms"
                      control={control}
                      rules={{ required: "You must agree" }}
                      render={({ field }) => (
                        <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)}>
                          I agree to <a href="#" className="text-purple-600 font-medium">Terms</a> & <a href="#" className="text-purple-600 font-medium">Privacy Policy</a>
                        </Checkbox>
                      )}
                    />
                  </Form.Item>

                  <div className="flex justify-between mt-10">
                    <Button size="large" onClick={back}><ChevronLeft /> Back</Button>
                    <Button type="primary" htmlType="submit" loading={loading} size="large"
                      style={{ backgroundColor: '#5C039B', borderColor: '#5C039B' }}>
                      Complete Registration <Check className="inline ml-2" />
                    </Button>
                  </div>
                </Spin>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;