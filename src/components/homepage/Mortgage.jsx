import React, { useState, useEffect } from 'react';
import GetPreApprovedModal from '../homepage/GetPreApprovedModal';

import { Navigate } from 'react-router-dom';
const LoanCalculator = () => {
  const [calculatorType, setCalculatorType] = useState('borrow');
  const [showResidencyDropdown, setShowResidencyDropdown] = useState(false);
  const [showEmploymentDropdown, setShowEmploymentDropdown] = useState(false);
  const [residencyStatus, setResidencyStatus] = useState('UAE Resident');
  const [employmentType, setEmploymentType] = useState('Employed');
  const [monthlyIncome, setMonthlyIncome] = useState(20000);
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [loanDuration, setLoanDuration] = useState(25);
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [selectedMortgageProduct, setSelectedMortgageProduct] = useState(0);
  
  const mortgageProducts = [
    { name: '3 yr fixed', rate: 3.99 },
    { name: '5 yr fixed', rate: 4.19 },
    { name: 'Variable', rate: 7 }
  ];
  

  const [showPreApprovalModal, setShowPreApprovalModal] = useState(false);

  const residencyOptions = ['UAE Resident', 'UAE National', 'Not Resident'];
  const employmentOptions = ['Employed', 'Self Employed'];
  
  const [homeAffordability, setHomeAffordability] = useState(1918975);
  const [monthlyPayment, setMonthlyPayment] = useState(10000);
  const [loanAmount, setLoanAmount] = useState(800000);
  const [costMonthlyPayment, setCostMonthlyPayment] = useState(3576.00);

  const calculateAffordability = () => {
    const annualIncome = monthlyIncome * 12;
    const totalDebt = monthlyDebt * 12 * loanDuration;
    const baseAffordability = annualIncome * 4.5;
    const adjustedAffordability = Math.max(0, baseAffordability - (totalDebt * 0.1));
    
    const interestRate = 0.04;
    const loanAmt = adjustedAffordability;
    const monthlyRate = interestRate / 12;
    const numberOfPayments = loanDuration * 12;
    
    const payment = loanAmt * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setHomeAffordability(Math.round(adjustedAffordability));
    setMonthlyPayment(Math.round(payment));
  };

  const calculateCost = () => {
    const calculatedLoanAmount = propertyValue - downPayment;
    setLoanAmount(calculatedLoanAmount);
    
    const annualRate = mortgageProducts[selectedMortgageProduct].rate / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = loanDuration * 12;
    
    const payment = calculatedLoanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setCostMonthlyPayment(Math.round(payment * 100) / 100);
  };

  useEffect(() => {
    if (calculatorType === 'borrow') {
      calculateAffordability();
    } else {
      calculateCost();
    }
  }, [
    calculatorType,
    monthlyIncome, 
    monthlyDebt, 
    loanDuration,
    propertyValue,
    downPayment,
    selectedMortgageProduct,
    residencyStatus,
    employmentType
  ]);

  const handleDownPaymentPercentage = (percentage) => {
    const newDownPayment = (propertyValue * percentage) / 100;
    setDownPayment(Math.round(newDownPayment));
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowResidencyDropdown(false);
      setShowEmploymentDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Calculator Section */}
          <div className="lg:w-1/2 p-6 lg:p-8">
            
            {/* Calculator Type */}
            <div className="mb-8">
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  What do you want to calculate?
                </h2>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setCalculatorType('borrow')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    calculatorType === 'borrow'
                      ? 'bg-[#5C039B] text-white border-[#5C039B] shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  How much can I borrow?
                </button>
                <button
                  onClick={() => setCalculatorType('cost')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    calculatorType === 'cost'
                      ? 'bg-[#5C039B] text-white border-[#5C039B] shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  How much does it cost?
                </button>
              </div>
            </div>

            {/* Mortgage Products */}
            {calculatorType === 'cost' && (
              <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="mb-3">
                  <p className="text-sm text-gray-600 font-medium">
                    Try out some of our available mortgage products
                  </p>
                </div>
                <div className="flex space-x-3">
                  {mortgageProducts.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMortgageProduct(index)}
                      className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                        selectedMortgageProduct === index
                          ? 'bg-[#5C039B]/10 text-[#5C039B] border-[#5C039B]/30 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-xl font-bold mb-1">{product.rate}%</div>
                      <div className="text-xs text-gray-600 font-medium">{product.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Inputs */}
            <div className="space-y-6">
              {/* Residency Status and Employment Type - ONLY FOR BORROW CALCULATOR */}
              {calculatorType === 'borrow' ? (
                <>
                  {/* Residency Status Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Residency Status
                    </label>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setShowResidencyDropdown(!showResidencyDropdown);
                          setShowEmploymentDropdown(false);
                        }}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 outline-none transition-all bg-white"
                      >
                        <span className="text-base font-medium text-gray-900">{residencyStatus}</span>
                        <svg 
                          className={`w-4 h-4 text-gray-500 transition-transform ${showResidencyDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showResidencyDropdown && (
                        <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                          {residencyOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setResidencyStatus(option);
                                setShowResidencyDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                residencyStatus === option ? 'bg-[#5C039B]/10 text-[#5C039B] font-medium' : 'text-gray-900'
                              }`}
                            >
                              <span className="text-sm">{option}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Employment Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment type
                    </label>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setShowEmploymentDropdown(!showEmploymentDropdown);
                          setShowResidencyDropdown(false);
                        }}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left flex justify-between items-center hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 outline-none transition-all bg-white"
                      >
                        <span className="text-base font-medium text-gray-900">{employmentType}</span>
                        <svg 
                          className={`w-4 h-4 text-gray-500 transition-transform ${showEmploymentDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showEmploymentDropdown && (
                        <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                          {employmentOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setEmploymentType(option);
                                setShowEmploymentDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                employmentType === option ? 'bg-[#5C039B]/10 text-[#5C039B] font-medium' : 'text-gray-900'
                              }`}
                            >
                              <span className="text-sm">{option}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}

              {/* Monthly Income and Monthly Debt in ONE ROW - Only for BORROW calculator */}
              {calculatorType === 'borrow' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Monthly Income */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-sm text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="text"
                        value={monthlyIncome.toLocaleString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          if (!isNaN(value)) setMonthlyIncome(Number(value) || 0);
                        }}
                        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-base font-medium text-gray-900 outline-none hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Monthly Debt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Debt
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-sm text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="text"
                        value={monthlyDebt.toLocaleString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          if (!isNaN(value)) setMonthlyDebt(Number(value) || 0);
                        }}
                        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-base font-medium text-gray-900 outline-none hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Property Value and Downpayment for COST calculator */
                <>
                  {/* Property Value */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Property value
                      </label>
                      <span className="text-xs text-gray-500 font-medium">Interest Rate</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <span className="text-sm text-gray-500 font-medium">AED</span>
                        </div>
                        <input
                          type="text"
                          value={propertyValue.toLocaleString()}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, '');
                            if (!isNaN(value)) setPropertyValue(Number(value) || 0);
                          }}
                          className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-base font-medium text-gray-900 outline-none hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div className="sm:w-24">
                        <div className="border border-gray-300 rounded-xl px-4 py-3 text-center bg-gray-50">
                          <div className="text-base font-bold text-gray-900">{mortgageProducts[selectedMortgageProduct].rate}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Downpayment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Downpayment
                      </label>
                      <span className="text-xs text-gray-500 font-medium">Quick select</span>
                    </div>
                    <div className="relative mb-3">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-sm text-gray-500 font-medium">AED</span>
                      </div>
                      <input
                        type="text"
                        value={downPayment.toLocaleString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          if (!isNaN(value)) setDownPayment(Number(value) || 0);
                        }}
                        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-base font-medium text-gray-900 outline-none hover:border-gray-400 focus:border-[#5C039B] focus:ring-2 focus:ring-[#5C039B]/20 transition-all"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex space-x-2">
                      {[10, 15, 20, 25].map((percent) => (
                        <button
                          key={percent}
                          onClick={() => handleDownPaymentPercentage(percent)}
                          className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-medium border border-gray-200 transition-all hover:border-gray-300"
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Loan Duration Slider */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Loan Duration
                    </label>
                    <div className="text-xs text-gray-500 mt-1">Years</div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-2">
                      <input
                        type="text"
                        value={loanDuration}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(value) && value >= 1 && value <= 30) {
                            setLoanDuration(Number(value) || 1);
                          }
                        }}
                        className="w-12 text-center text-base font-bold text-gray-900 bg-transparent outline-none"
                      />
                      <span className="text-sm text-gray-500 ml-1">years</span>
                    </div>
                  </div>
                </div>
                
                {/* Custom Slider */}
                <div className="relative pt-1">
                  {/* Grey background track */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
                  
                  {/* Purple filled portion */}
                  <div 
                    className="absolute top-1/2 left-0 h-2 bg-[#5C039B] rounded-full transform -translate-y-1/2"
                    style={{ width: `${((loanDuration - 1) / 29) * 100}%` }}
                  ></div>
                  
                  {/* Purple thumb/dot */}
                  <div 
                    className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#5C039B] rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-md transition-transform hover:scale-110"
                    style={{ left: `${((loanDuration - 1) / 29) * 100}%` }}
                  ></div>
                  
                  {/* Hidden input for interaction */}
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(parseInt(e.target.value))}
                    className="absolute top-0 left-0 w-full h-6 opacity-0 cursor-pointer z-10"
                  />
                  
                  {/* Labels */}
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span className="font-medium">1 Year</span>
                    <span className="font-medium">30 Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Section - PERFECT ROUNDED BORDER LIKE IMAGE */}
          <div className="lg:w-1/2">
            <div className="bg-[#5C039B] h-full p-8 text-white rounded-xl lg:rounded-l-none lg:rounded-r-2xl flex flex-col justify-center">
              
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white">
                  {calculatorType === 'borrow' ? "Here's your affordability" : "How much will it cost?"}
                </h3>
              </div>

              {/* Results Section */}
              <div className="space-y-6 mb-10">
                
                {/* Home Affordability / Loan Amount */}
                <div>
                  <p className="text-sm text-white/90 mb-2">
                    {calculatorType === 'borrow' ? 'Home affordability' : 'Loan Amount'}
                  </p>
                  <div className="text-3xl font-bold">
                    AED {calculatorType === 'borrow' ? 
                      homeAffordability.toLocaleString('en-US') : 
                      loanAmount.toLocaleString('en-US')
                    }
                  </div>
                </div>

                {/* Divider - Exact like image */}
                <div className="w-full h-[1px] bg-white/30"></div>

                {/* Monthly Payment */}
                <div>
                  <p className="text-sm text-white/90 mb-2">
                    Monthly payment
                  </p>
                  <div className="text-3xl font-bold">
                    AED {calculatorType === 'borrow' ? 
                      monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2}) : 
                      costMonthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2})
                    }
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                
                {/* Primary CTA - Exact like image */}
                <button 
                  className="w-full bg-white text-[#5C039B] hover:bg-gray-50 py-3.5 rounded-lg font-medium text-sm transition-colors shadow"
                >
                  Check your complete loan summary and cost breakdown
                </button>
                
                {/* Secondary Actions - Exact like image */}
                <div className="flex space-x-3">
<button
  onClick={() => setShowPreApprovalModal(true)}
  className="w-full mt-3 bg-transparent border border-white text-white hover:bg-white/10 py-3.5 rounded-lg font-medium text-sm transition-colors"
>
  Get pre-approval
</button>
                 
                </div>
          <GetPreApprovedModal
  open={showPreApprovalModal}
  onClose={() => setShowPreApprovalModal(false)}
/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Remove number input arrows */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        /* Smooth transitions */
        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoanCalculator;