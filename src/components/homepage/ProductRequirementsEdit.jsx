import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ... (Reusable UI Components: FormInput, FormSelect remain unchanged)
// Input field with optional Suffix (AED/%) or Clear Icon (X)
const FormInput = ({ label, value, onChange, type = "text", suffix, showClear, onClear }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-black focus:border-black transition-shadow ${suffix ? 'rounded-r-none border-r-0' : ''}`}
        />
        
        {/* Clear Button (X icon) */}
        {showClear && value && (
          <button 
            onClick={onClear} 
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}

        {/* Suffix Box (AED / %) */}
        {suffix && (
          <div className="bg-white border border-l-0 border-gray-300 rounded-r-md px-3 py-2.5 text-gray-500 text-sm font-medium min-w-[3rem] flex justify-center items-center">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

// Select Dropdown Component
const FormSelect = ({ label, value, onChange, options, showClear, onClear }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-black focus:border-black appearance-none bg-white"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        
        {/* Icons: Clear X or Chevron Down */}
        <div className="absolute right-3 top-2.5 flex items-center pointer-events-none">
           {showClear && value ? (
             <X size={16} className="text-gray-400" /> // Visual only since select handles clicks differently
           ) : (
             <div className="border-2 border-gray-400 rounded-full p-0.5">
                {/* Visual representation of a radio-style selection or just arrow */}
                <ChevronDown size={14} className="text-gray-500" />
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const ProductRequirementsEdit = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    purchaseType: "New purchase",
    hasMortgage: "Yes",
    foundProperty: "Yes",
    applicant: "Single Applicant",
    mortgageType: "Fixed",
    fixedTerm: "3 - 4 Years",
    loanType: "Islamic",
    loanPeriod: "25",
    ltv: "60",
    
    // Income
    incomeType: "Salaried",
    income: "45,151",
    age: "21",
    financeAudit: "No",

    // Property
    propertyValue: "455,545",
    propertyEmirate: "Dubai",
    propertyArea: "Dubai Creek Harbour"
  });

  // Handler to update state
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = (field) => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  };

  // Handler for Submit button
  const handleSubmit = () => {
    // Add any submission logic here (e.g., API call)
    // Then navigate back
    navigate('/mortgages-product'); // Navigates explicitly to the mortgage product page
    // Alternatively: navigate(-1); // Goes back one step in history
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans p-6 md:p-12 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Breadcrumbs */}
        <div className="mb-8 animate-fade-in">
          <div className="text-gray-500 text-sm mb-2">My Applications / Details / Product Requirement</div>
          <h1 className="text-4xl font-bold text-gray-900">Edit your product requirements</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          {/* SECTION 1: Loan Information */}
          <div className="mb-10">
            {/* ... (Loan Information inputs remain the same) */}
             <h3 className="text-lg font-medium text-gray-900 mb-6">Loan Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput 
                    label="Purchase type" 
                    value={formData.purchaseType} 
                    onChange={(e) => handleChange('purchaseType', e.target.value)}
                    showClear 
                    onClear={() => handleClear('purchaseType')}
                />
                <FormInput 
                    label="Do you have an existing mortgage in the UAE?" 
                    value={formData.hasMortgage} 
                    onChange={(e) => handleChange('hasMortgage', e.target.value)}
                    showClear 
                    onClear={() => handleClear('hasMortgage')}
                />
                
                <FormInput 
                    label="Found property" 
                    value={formData.foundProperty} 
                    onChange={(e) => handleChange('foundProperty', e.target.value)}
                    showClear 
                    onClear={() => handleClear('foundProperty')}
                />
                <FormInput 
                    label="Applicant" 
                    value={formData.applicant} 
                    onChange={(e) => handleChange('applicant', e.target.value)}
                    showClear 
                    onClear={() => handleClear('applicant')}
                />

                <FormInput 
                    label="Mortgage type" 
                    value={formData.mortgageType} 
                    onChange={(e) => handleChange('mortgageType', e.target.value)}
                    showClear 
                    onClear={() => handleClear('mortgageType')}
                />
                <FormInput 
                    label="Fixed term" 
                    value={formData.fixedTerm} 
                    onChange={(e) => handleChange('fixedTerm', e.target.value)}
                    showClear 
                    onClear={() => handleClear('fixedTerm')}
                />

                <FormInput 
                    label="Loan type" 
                    value={formData.loanType} 
                    onChange={(e) => handleChange('loanType', e.target.value)}
                    showClear 
                    onClear={() => handleClear('loanType')}
                />
                <FormInput 
                    label="Loan period" 
                    value={formData.loanPeriod} 
                    onChange={(e) => handleChange('loanPeriod', e.target.value)}
                    showClear 
                    onClear={() => handleClear('loanPeriod')}
                />

                <FormInput 
                    label="Loan To Value" 
                    value={formData.ltv} 
                    onChange={(e) => handleChange('ltv', e.target.value)}
                    suffix="%"
                />
            </div>
          </div>

          <div className="h-px w-full bg-gray-100 my-8"></div>

          {/* SECTION 2: Income Information */}
          <div className="mb-10">
            {/* ... (Income Information inputs remain the same) */}
            <h3 className="text-lg font-medium text-gray-900 mb-6">Income Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput 
                    label="Primary applicant income type" 
                    value={formData.incomeType} 
                    onChange={(e) => handleChange('incomeType', e.target.value)}
                    showClear 
                    onClear={() => handleClear('incomeType')}
                />
                <FormInput 
                    label="Primary applicant income" 
                    value={formData.income} 
                    onChange={(e) => handleChange('income', e.target.value)}
                    suffix="AED"
                />

                <FormInput 
                    label="Primary applicant Age" 
                    value={formData.age} 
                    onChange={(e) => handleChange('age', e.target.value)}
                />
                <FormInput 
                    label="Primary applicant finance audit" 
                    value={formData.financeAudit} 
                    onChange={(e) => handleChange('financeAudit', e.target.value)}
                    showClear 
                    onClear={() => handleClear('financeAudit')}
                />
            </div>
          </div>

          <div className="h-px w-full bg-gray-100 my-8"></div>

          {/* SECTION 3: Property Information */}
          <div className="mb-6">
            {/* ... (Property Information inputs remain the same) */}
            <h3 className="text-lg font-medium text-gray-900 mb-6">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput 
                    label="Property value" 
                    value={formData.propertyValue} 
                    onChange={(e) => handleChange('propertyValue', e.target.value)}
                    suffix="AED"
                />
                <FormInput 
                    label="Property emirate" 
                    value={formData.propertyEmirate} 
                    onChange={(e) => handleChange('propertyEmirate', e.target.value)}
                    showClear 
                    onClear={() => handleClear('propertyEmirate')}
                />

                <FormInput 
                    label="Property area" 
                    value={formData.propertyArea} 
                    onChange={(e) => handleChange('propertyArea', e.target.value)}
                    showClear 
                    onClear={() => handleClear('propertyArea')}
                />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back to application
            </button>
            <button 
              onClick={handleSubmit} // Added onClick handler here
              className="bg-[#5c039b] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#4a027a] transition-colors"
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductRequirementsEdit;