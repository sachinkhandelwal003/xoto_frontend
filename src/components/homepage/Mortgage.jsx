import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, ChevronDown, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Mortgage from '../homepage/MortgagesProduct'; // Ensure the path is correct

// --- UI COMPONENTS (Defined OUTSIDE to prevent re-rendering/blinking) ---

const HeroSection = ({ step }) => {
  let title = "The right mortgage for your property!";
  if (step === 2) title = "Let's get to know you!";
  if (step === 3) title = "You are almost done!";

  return (
    <div className="hidden lg:flex flex-col w-5/12 bg-gray-50 p-12 justify-center sticky top-0 h-screen overflow-hidden">
      <div className="max-w-md mx-auto w-full z-10">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.15] mb-12 tracking-tight">
          {title}
        </h1>
        <div className="relative w-full aspect-square bg-[#F0F0F0] rounded-[3rem] flex items-center justify-center shadow-inner">
           <div className="relative w-48 h-80 bg-white rounded-[2.5rem] border-[6px] border-gray-800 shadow-2xl transform -rotate-12 flex flex-col items-center pt-4 overflow-hidden z-20">
              <div className="w-16 h-4 bg-gray-100 rounded-full mb-4"></div>
              <div className="w-full px-4 space-y-3">
                 <div className="h-2 w-full bg-gray-100 rounded"></div>
                 <div className="h-8 w-full bg-blue-50 rounded border border-blue-100"></div>
                 <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                 <div className="h-8 w-full bg-gray-50 rounded border border-gray-100"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
           </div>
           <div className="absolute top-1/4 right-10 w-20 h-20 bg-purple-200 rounded-full blur-xl opacity-60"></div>
           <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-blue-200 rounded-full blur-xl opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ step }) => (
  <div className="flex space-x-3 mb-8 w-full max-w-3xl">
    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-black' : 'bg-gray-200'}`}></div>
    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
  </div>
);

const RadioCard = ({ label, name, value, checked, onChange, width = "w-full" }) => (
  <label 
    className={`cursor-pointer border rounded-md px-4 py-3.5 flex items-center justify-between transition-all bg-white hover:border-gray-400 ${
      checked ? 'border-black ring-1 ring-black' : 'border-gray-300'
    } ${width}`}
  >
    <span className="text-base text-gray-800 font-normal">{label}</span>
    <input 
      type="radio" 
      name={name} 
      className="hidden" 
      checked={checked} 
      onChange={() => onChange(value)} 
    />
    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${checked ? 'border-black' : 'border-gray-300'}`}>
      {checked && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
    </div>
  </label>
);

const SuffixInput = ({ label, value, onChange, placeholder, suffix, error }) => (
  <div className="w-full">
    <label className="block text-lg font-bold text-gray-900 mb-3">{label}</label>
    <div className={`flex items-center border rounded-md overflow-hidden transition-all bg-white ${
        error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black'
    }`}>
      <input 
        type="number" 
        className="flex-1 px-4 py-3.5 outline-none text-gray-900 placeholder-gray-400 w-full" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suffix && (
        <div className="bg-white border-l border-gray-300 px-4 py-3 text-gray-500 text-sm font-medium tracking-wide">
          {suffix}
        </div>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/> {error}</p>}
  </div>
);

const TextInput = ({ label, value, onChange, placeholder, error }) => (
  <div className="w-full">
    {label && <label className="block text-lg font-bold text-gray-900 mb-3">{label}</label>}
    <input 
      type="text" 
      className={`w-full px-4 py-3.5 border rounded-md outline-none transition-all placeholder-gray-400 ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-1 focus:ring-black focus:border-black'
      }`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
     {error && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/> {error}</p>}
  </div>
);

const SelectInput = ({ label, value, onChange, options, placeholder, error }) => (
  <div className="w-full">
    <label className="block text-lg font-bold text-gray-900 mb-3">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none border rounded-md px-4 py-3.5 outline-none bg-white text-gray-900 transition-all ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-black focus:ring-1 focus:ring-black'
        }`}
      >
          <option value="" disabled>{placeholder}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/> {error}</p>}
  </div>
);

// --- STEP COMPONENTS (Defined OUTSIDE) ---

const Step1 = ({ formData, handleChange, errors }) => (
  <div className="space-y-7 animate-fade-in">
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">What would you like to do?</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <RadioCard label="I want to buy a home" name="intent" value="buy" checked={formData.intent === 'buy'} onChange={(val) => handleChange('intent', val)} />
        <RadioCard label="I want to refinance" name="intent" value="refinance" checked={formData.intent === 'refinance'} onChange={(val) => handleChange('intent', val)} />
      </div>
    </div>

    {formData.intent === 'buy' && (
      <>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Have you found a property yet?</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <RadioCard label="Yes" name="propFound" value="yes" checked={formData.propertyFound === 'yes'} onChange={(val) => handleChange('propertyFound', val)} />
            <RadioCard label="No" name="propFound" value="no" checked={formData.propertyFound === 'no'} onChange={(val) => handleChange('propertyFound', val)} />
          </div>
        </div>
        
        <SuffixInput 
          label={formData.propertyFound === 'yes' ? "What is the property price?" : "What's your budget?"} 
          placeholder="0" 
          suffix="AED" 
          value={formData.propertyPrice} 
          onChange={(val) => handleChange('propertyPrice', val)}
          error={errors.propertyPrice} 
        />
        
        <div>
          <label className="block text-xl font-bold text-gray-900 mb-4">Where is the property located?</label>
          <TextInput 
              placeholder="Search by area (e.g., Dubai Marina ..)" 
              value={formData.location} 
              onChange={(val) => handleChange('location', val)} 
              error={errors.location}
          />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Do you already have a mortgage?</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <RadioCard label="Yes" name="hasMort" value="yes" checked={formData.hasMortgage === 'yes'} onChange={(val) => handleChange('hasMortgage', val)} />
            <RadioCard label="No" name="hasMort" value="no" checked={formData.hasMortgage === 'no'} onChange={(val) => handleChange('hasMortgage', val)} />
          </div>
        </div>
      </>
    )}

    {formData.intent === 'refinance' && (
      <>
          <SelectInput 
              label="Which bank is your mortgage with?" 
              placeholder="Select Bank" 
              value={formData.bankName} 
              onChange={(val) => handleChange('bankName', val)} 
              options={["Abu Dhabi Commercial Bank", "Emirates NBD", "Dubai Islamic Bank", "FAB", "Mashreq"]} 
              error={errors.bankName}
          />
          <SuffixInput label="What's your home worth today?" placeholder="0" suffix="AED" value={formData.homeValue} onChange={(val) => handleChange('homeValue', val)} error={errors.homeValue} />
          <SuffixInput label="How much is left on your loan?" placeholder="0" suffix="AED" value={formData.loanBalance} onChange={(val) => handleChange('loanBalance', val)} error={errors.loanBalance} />
      </>
    )}
  </div>
);

const Step2 = ({ formData, handleChange, errors }) => (
  <div className="space-y-7 animate-fade-in">
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">What is your residency status?</h3>
      <div className="flex flex-col gap-3">
          <div className='flex flex-col sm:flex-row gap-3'>
              <RadioCard label="UAE Resident (expat)" name="residency" value="uae-resident" checked={formData.residency === 'uae-resident'} onChange={(val) => handleChange('residency', val)} />
              <RadioCard label="UAE National" name="residency" value="uae-national" checked={formData.residency === 'uae-national'} onChange={(val) => handleChange('residency', val)} />
          </div>
          <RadioCard label="Non-resident" name="residency" value="non-resident" checked={formData.residency === 'non-resident'} onChange={(val) => handleChange('residency', val)} />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">What is your employment type?</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <RadioCard label="Salaried" name="employment" value="salaried" checked={formData.employment === 'salaried'} onChange={(val) => handleChange('employment', val)} />
        <RadioCard label="Self-employed" name="employment" value="self-employed" checked={formData.employment === 'self-employed'} onChange={(val) => handleChange('employment', val)} />
      </div>
    </div>
    <SuffixInput label="What is your monthly income?" placeholder="77,777" suffix="AED" value={formData.income} onChange={(val) => handleChange('income', val)} error={errors.income} />
    <SuffixInput label="What is your age?" placeholder="30" suffix="YEARS" value={formData.age} onChange={(val) => handleChange('age', val)} error={errors.age} />
  </div>
);

const Step3 = ({ formData, handleChange, errors }) => (
  <div className="space-y-7 animate-fade-in">
    <div className="bg-white rounded-lg">
       <h3 className="text-2xl font-bold text-gray-900 mb-8">One step left before you view your mortgage options</h3>
       
       <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
          <TextInput 
              placeholder="Enter your full name" 
              value={formData.fullName} 
              onChange={(val) => handleChange('fullName', val)} 
              error={errors.fullName}
          />
       </div>
       
       <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">Email Address</label>
          <TextInput 
              placeholder="Enter your email address" 
              value={formData.email} 
              onChange={(val) => handleChange('email', val)} 
              error={errors.email}
          />
       </div>
       
       <div className="mb-8">
          <label className="block text-base font-semibold text-gray-800 mb-2">Phone Number</label>
          <div className={`flex border rounded-md overflow-hidden bg-white transition-all ${
              errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus-within:ring-1 focus-within:ring-black focus-within:border-black'
          }`}>
              <div className="bg-white px-3 py-3.5 border-r border-gray-300 flex items-center cursor-pointer min-w-[80px] justify-between hover:bg-gray-50">
                  <span className="text-xl">🇦🇪</span>
                  <ChevronDown size={14} className="text-gray-500" />
              </div>
              <div className="py-3.5 px-3 text-gray-900 font-medium">+971</div>
              <input 
                  type="number" 
                  className="flex-1 px-2 py-3.5 outline-none text-gray-900 w-full" 
                  placeholder="50 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
              />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/> {errors.phone}</p>}
       </div>
       <p className="text-gray-500 leading-relaxed text-sm">While we review your details, feel free to explore your dashboard and check out different mortgage options tailored for you!</p>
    </div>
  </div>
);

// --- Modal Component (Outside) ---

const SuccessModal = ({ email, navigate }) => {
  useEffect(() => {
      const timer = setTimeout(() => {
          navigate('/mortgages-product'); // Navigates to Mortgage page
      }, 5000);
      return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
      navigate('/mortgages-product'); // Navigates to Mortgage page
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl relative">
              <button onClick={handleContinue} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                  <X size={20} />
              </button>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl">
                  <Check className="text-white w-8 h-8" strokeWidth={3} />
              </div>
              <p className="text-gray-500 mb-3 text-lg">Congratulations</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Thank you! Your application has been submitted successfully!</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                  We have created your account, and the password has been sent to your registered email.
              </p>
              <div className="bg-gray-100 px-6 py-4 rounded-lg w-full flex items-center justify-center space-x-3 mb-8">
                  <div className="text-gray-500 text-xl">✉️</div>
                  <span className="text-gray-900 font-medium text-lg">{email || "shivam@gmail.com"}</span>
              </div>
              <button 
                  onClick={handleContinue}
                  type="button" 
                  className="bg-black text-white px-10 py-3.5 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg w-full"
              >
                  Continue
              </button>
              <p className="text-xs text-gray-400 mt-6">Redirecting to home in 5 seconds...</p>
          </div>
      </div>
  );
};

// --- MAIN COMPONENT ---

const MortgageWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    intent: 'buy', 
    propertyFound: 'yes',
    propertyPrice: '',
    location: '',
    hasMortgage: 'no',
    bankName: '',
    homeValue: '',
    loanBalance: '',
    residency: 'uae-resident',
    employment: 'salaried',
    income: '',
    age: '',
    fullName: '',
    email: '',
    phone: ''
  });

  const validateStep = (currentStep) => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
        if (formData.intent === 'buy') {
            if (!formData.propertyPrice) newErrors.propertyPrice = "Price/Budget is required";
            if (!formData.location) newErrors.location = "Location is required";
        } else if (formData.intent === 'refinance') {
            if (!formData.bankName) newErrors.bankName = "Please select a bank";
            if (!formData.homeValue) newErrors.homeValue = "Home value is required";
            if (!formData.loanBalance) newErrors.loanBalance = "Loan balance is required";
        }
    }

    if (currentStep === 2) {
        if (!formData.income) newErrors.income = "Monthly income is required";
        if (!formData.age) newErrors.age = "Age is required";
        else if (formData.age < 18 || formData.age > 75) newErrors.age = "Age must be between 18 and 75";
    }

    if (currentStep === 3) {
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (formData.phone.length < 7) {
            newErrors.phone = "Phone number is too short";
        }
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        isValid = false;
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
        setStep((prev) => prev + 1);
        setErrors({});
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
        setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1a1a1a]">
      
      {step === 4 && <SuccessModal email={formData.email} navigate={navigate} />}

      <HeroSection step={step} />

      <div className="flex-1 flex flex-col">
        <div className="w-full max-w-3xl mx-auto pt-16 px-8 lg:px-0">
            <ProgressBar step={step} />
        </div>

        <div className="w-full max-w-3xl mx-auto flex-1 px-8 lg:px-0 pb-16 flex flex-col">
          <div className="mt-2 flex-1">
            {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
          </div>

          <div className="flex justify-between items-center mt-12 pt-0">
            {step > 1 ? (
            <button 
                type="button" 
                onClick={handleBack}
                className="flex items-center text-gray-600 font-semibold px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
            </button>
            ) : (
                <div></div> 
            )}

            <button 
            type="button" 
            onClick={handleNext}
            className="bg-gray-600 text-white px-12 py-3.5 rounded-md font-bold text-lg hover:bg-black transition-colors shadow-sm"
            >
            {step === 3 ? 'Explore mortgages' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageWizard;