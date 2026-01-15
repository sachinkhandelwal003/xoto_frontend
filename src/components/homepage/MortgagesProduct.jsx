import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Upload, 
  FileText, 
  User,
  LayoutGrid,
  CheckCircle,
  Save,
  Check,
  Mail,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- SUB-COMPONENTS ---

const StatusBadge = ({ status }) => (
  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
    {status}
  </span>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-xs mb-1">{label}</span>
    <span className="text-gray-900 font-medium text-sm">{value}</span>
  </div>
);

const ApplicationReadyBanner = () => (
  <div className="bg-[#F0FDF4] border border-green-200 rounded-xl p-6 mb-6 animate-fade-in">
    <h3 className="text-lg font-bold text-gray-900 mb-2">Your application is almost ready!</h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      To help move the process along smoothly, please upload the required documents and complete your personal details. 
      Your assigned agent will reach out with the next steps, and you can always return to this dashboard to track your progress.
    </p>
  </div>
);

// --- FORM INPUTS (For Inline Editing) ---

const FormInput = ({ label, value, onChange, type = "text", placeholder, suffix, required }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative flex items-center">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:ring-1 focus:ring-black focus:border-black text-sm text-gray-900 transition-all shadow-sm"
      />
      {suffix && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 bg-gray-50 border-l border-gray-300 rounded-r-md text-gray-500 text-sm font-medium">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

const FormSelect = ({ label, value, onChange, options, required }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-900 mb-1.5 flex items-center">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:ring-1 focus:ring-black focus:border-black text-sm text-gray-900 appearance-none bg-white shadow-sm"
      >
        <option value="" disabled>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// --- CARD & LIST COMPONENTS ---

const DataRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 min-h-[50px]">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="text-gray-900 text-sm font-medium">{value}</span>
  </div>
);

const Card = ({ title, subTitle, children, onEdit, isEditing, onUpload, isExpanded = true, toggleExpand, icon }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden shadow-sm transition-all">
      <div className="p-6 flex items-start justify-between">
        <div className="flex gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-500">
               {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{subTitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Header Upload Button */}
          {onUpload && (
            <button onClick={onUpload} className="flex items-center text-gray-600 text-sm font-medium hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
              <Upload size={16} className="mr-2" /> Upload
            </button>
          )}
          
          {/* Header Edit/Save Button */}
          {onEdit && (
            <button onClick={onEdit} className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${isEditing ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200'}`}>
              {isEditing ? <><Save size={16} className="mr-2" /> Save</> : <><Edit2 size={16} className="mr-2" /> Edit</>}
            </button>
          )}
          
          {/* Expand/Collapse Toggle */}
          <button onClick={toggleExpand} className="text-gray-400 hover:text-gray-600 p-1">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-transparent animate-fade-in">
           <div className="h-px w-full bg-gray-100 mb-6"></div> 
           {children}
        </div>
      )}
    </div>
  );
};

const ProductOffer = ({ productId, bankName, tags, details, isSelected, onSelect, isDetailsOpen, onToggleDetails }) => {
  return (
    <div className={`border rounded-lg p-5 mb-4 relative group transition-all duration-300 ${isSelected ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-gray-400 hover:shadow'}`}>
      
      <div className="flex justify-between items-start mb-4">
         <div className="flex gap-2">
            {tags && tags.map((tag, idx) => (
                <span key={idx} className={`text-xs px-2 py-1 rounded ${tag.includes('Popular') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {tag}
                </span>
            ))}
         </div>
         {isSelected ? (
            <span className="flex items-center text-purple-600 font-bold text-sm bg-white px-3 py-1.5 rounded-full shadow-sm border border-purple-100">
                <CheckCircle size={16} className="mr-1 text-purple-600" fill="currentColor" stroke="none"/> 
                Selected
            </span>
        ) : (
            <button 
                onClick={() => onSelect(productId)}
                className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-sm"
            >
                Select Offer
            </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
        <div className="flex items-center gap-3 w-full md:w-1/4">
           <div className="font-bold text-xl text-gray-800">{bankName}</div> 
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
           <div>
              <p className="text-gray-500 text-xs mb-1">Initial rate</p>
              <p className="font-bold text-gray-900 text-lg">{details.rate}</p>
           </div>
           <div>
              <p className="text-gray-500 text-xs mb-1">Monthly EMI</p>
              <p className="font-bold text-gray-900 text-lg">{details.emi}</p>
           </div>
           <div>
              <p className="text-gray-500 text-xs mb-1">Bank processing fee</p>
              <p className="font-bold text-gray-900 text-lg">{details.fee}</p>
           </div>
           <div>
              <p className="text-gray-500 text-xs mb-1">Total upfront cost</p>
              <p className="font-bold text-gray-900 text-lg">{details.upfront}</p>
           </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button 
            onClick={() => onToggleDetails(productId)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
            {isDetailsOpen ? (
                <><ChevronUp size={16} className="mr-1"/> Hide details</>
            ) : (
                <><ChevronDown size={16} className="mr-1"/> View details</>
            )}
        </button>
      </div>
      
      {isDetailsOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in bg-white/50">
            <h4 className="font-medium text-gray-900 mb-2">5 year(s) FIXED | 65% Loan to value application | Conventional</h4>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Your monthly installment will be {details.emi} based on a loan over 25 years, with an initial rate of {details.rate}. 
                At your purchase price, the total upfront cost including fees will be {details.upfront} with your bank financing the remaining balance.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h5 className="font-semibold text-gray-900 mb-4 border-b pb-2">Costs breakdown</h5>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">Down payment</span> <span className="font-medium">159,440 AED</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Dubai land department fee</span> <span className="font-medium">18,801.8 AED</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Mortgage registration fee</span> <span className="font-medium">1,030.26 AED</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Trustee fee</span> <span className="font-medium">4,200 AED</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Bank processing fee</span> <span className="font-medium">{details.fee}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Valuation</span> <span className="font-medium">2,625 AED</span></div>
                        <div className="flex justify-between text-red-500"><span className="">Fees add to loan</span> <span className="font-medium">-0 AED</span></div>
                        <div className="flex justify-between pt-2 border-t font-bold text-gray-900"><span className="">Total upfront cost</span> <span className="">{details.upfront}</span></div>
                    </div>
                </div>

                <div>
                    <h5 className="font-semibold text-gray-900 mb-4 border-b pb-2">Loan breakdown</h5>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">Product type</span> <span className="font-medium">Fixed</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Initial interest rate</span> <span className="font-medium">{details.rate}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Follow on rate</span> <span className="font-medium">1.69% + 3 Months Eibor</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Bank processing fee</span> <span className="font-medium">{details.fee}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Life insurance</span> <span className="font-medium">--</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Property insurance</span> <span className="font-medium">--</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Over payments allowed</span> <span className="font-medium">25%</span></div>
                    </div>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT STARTS HERE ---

const MortgageProduct = ({ uploadedFiles = {} }) => {
  const navigate = useNavigate();

  // --- STATES ---
  const [expandedSections, setExpandedSections] = useState({
    products: true,
    documents: false, // Default Closed
    personal: false,  // Default Closed
    requirements: false // Default Closed
  });

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openDetailsId, setOpenDetailsId] = useState(null); 
  
  // Helper to check if any files exist
  const hasFiles = Object.keys(uploadedFiles).length > 0;

  // Initial Data
  const [personalDetails, setPersonalDetails] = useState({
      name: "Shivam Mishra", dob: "1995-05-15", gender: "Male", marital: "Single", residence: "I'm a UAE resident", nationality: "Indian",
      salary: "45,151", employer: "Tech Solutions", passportNo: "N1234567", passportCountry: "India", emiratesId: "784-1234-1234567-1", emiratesExpiry: "2026-10-10",
      building: "Marina Heights", unit: "1204", street: "Al Marsa Street", country: "UAE", city: "Dubai", emirate: "Dubai"
  });

  const productRequirements = {
      purchaseType: "Buy Out", incomeType: "Salaried", propertyValue: "455,545", loanPeriod: "25 Years", ltv: "80%", income: "45,151", age: "21"
  };

  // --- HANDLERS ---
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePersonalChange = (field, value) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  };

  // Navigation Handlers
  const handleUploadClick = () => {
    navigate('/mortgages-product-upload-document');
  };

  const handleEditRequirements = () => {
    navigate('/product-requirements-edit');
  };

  const handleViewApplications = () => {
    navigate('/my-applications');
  };

  const handleSelectOffer = (id) => {
      setSelectedProductId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleProductDetails = (id) => {
      setOpenDetailsId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans p-6 md:p-12 text-[#1a1a1a]">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-gray-500 text-sm mb-2">My Applications / Details</div>
            <h1 className="text-3xl font-bold text-gray-900">Application ID - XMQS2760</h1>
          </div>
          <button 
            onClick={handleViewApplications}
            className="bg-[#5c039b] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center hover:bg-[#4a027a] transition shadow-sm"
          >
            <LayoutGrid size={16} className="mr-2" /> View My Applications
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 bg-transparent">
          <SummaryItem label="Loan type" value={productRequirements.purchaseType} />
          <SummaryItem label="Income type" value={productRequirements.incomeType} />
          <SummaryItem label="Property value" value={productRequirements.propertyValue} />
          <SummaryItem label="Loan period" value={productRequirements.loanPeriod} />
          <div className="flex flex-col items-start">
             <span className="text-gray-500 text-xs mb-1">Status</span>
             <StatusBadge status="In Progress" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 w-full lg:max-w-[calc(100%-350px)]">
          
          {selectedProductId && <ApplicationReadyBanner />}

          {/* 1. Product Selection */}
          <Card 
            title="Select your product" 
            subTitle="Hover over a product and click select. Monthly EMI is calculated based on a 25 year mortgage term."
            icon={<CheckCircle size={20} />}
            isExpanded={expandedSections.products}
            toggleExpand={() => toggleSection('products')}
          >
             <ProductOffer productId={1} bankName="HSBC" tags={['Popular 1-2 Year Fixed']} details={{ rate: "3.99%", emi: "1,921 AED", fee: "0 AED", upfront: "105,540 AED" }} isSelected={selectedProductId === 1} onSelect={handleSelectOffer} isDetailsOpen={openDetailsId === 1} onToggleDetails={toggleProductDetails} />
             <ProductOffer productId={2} bankName="Dubai Islamic Bank" tags={['3-4 Year Fixed']} details={{ rate: "3.95%", emi: "1,913 AED", fee: "500 AED", upfront: "105,914 AED" }} isSelected={selectedProductId === 2} onSelect={handleSelectOffer} isDetailsOpen={openDetailsId === 2} onToggleDetails={toggleProductDetails} />
             <ProductOffer productId={3} bankName="ADCB" tags={['Variable Rate']} details={{ rate: "4.15%", emi: "1,980 AED", fee: "1000 AED", upfront: "106,540 AED" }} isSelected={selectedProductId === 3} onSelect={handleSelectOffer} isDetailsOpen={openDetailsId === 3} onToggleDetails={toggleProductDetails} />
          </Card>

          {/* 2. Documents Upload */}
          <Card 
            title="Upload your documents" 
            subTitle={hasFiles ? `${Object.keys(uploadedFiles).length} documents added` : "Upload documents required for your mortgage application (e.g., Passport, Salary Certificate)"}
            icon={<FileText size={20} />}
            onUpload={handleUploadClick}
            isExpanded={expandedSections.documents}
            toggleExpand={() => toggleSection('documents')}
          >
             {hasFiles ? (
                 <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(uploadedFiles).map(([key, file]) => (
                            <div key={key} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="bg-green-50 p-2 rounded-full mr-3 text-green-600">
                                    <Check size={16} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleUploadClick} className="mt-4 text-sm text-[#5c039b] font-medium hover:underline flex items-center">
                        <Edit2 size={14} className="mr-1" /> Manage Documents
                    </button>
                 </div>
             ) : (
                 <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
                    <div className="w-20 h-20 mb-4 text-gray-300 bg-white rounded-full flex items-center justify-center shadow-sm">
                       <Upload size={32} />
                    </div>
                    <p className="text-gray-600 font-medium">No documents uploaded yet.</p>
                    <button 
                      onClick={handleUploadClick}
                      className="mt-4 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      Start Uploading
                    </button>
                 </div>
             )}
          </Card>

          {/* 3. Personal Details (INLINE EDIT) */}
          <Card 
            title={isEditingPersonal ? "Add personal details" : "Personal details"}
            subTitle="Manage your personal information."
            icon={<User size={20} />}
            onEdit={() => setIsEditingPersonal(!isEditingPersonal)}
            isEditing={isEditingPersonal}
            isExpanded={expandedSections.personal}
            toggleExpand={() => toggleSection('personal')}
          >
             {isEditingPersonal ? (
                <div className="space-y-8 animate-fade-in py-2">
                    {/* Basic Info */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-5">Basic Info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Full Name" required value={personalDetails.name} onChange={(e) => handlePersonalChange('name', e.target.value)} />
                            <FormInput label="Date of Birth" required type="date" value={personalDetails.dob} onChange={(e) => handlePersonalChange('dob', e.target.value)} />
                            <FormSelect label="Gender" required options={["Male", "Female"]} value={personalDetails.gender} onChange={(e) => handlePersonalChange('gender', e.target.value)} />
                            <FormSelect label="Marital Status" required options={["Single", "Married", "Divorced"]} value={personalDetails.marital} onChange={(e) => handlePersonalChange('marital', e.target.value)} />
                            <FormInput label="Residence status" required value={personalDetails.residence} onChange={(e) => handlePersonalChange('residence', e.target.value)} />
                            <FormInput label="Nationality" required value={personalDetails.nationality} onChange={(e) => handlePersonalChange('nationality', e.target.value)} />
                        </div>
                    </div>
                    {/* Detailed Info */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-5 border-t pt-6">Detailed info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Monthly Salary" required type="number" suffix="AED" value={personalDetails.salary} onChange={(e) => handlePersonalChange('salary', e.target.value)} />
                            <FormInput label="Employer" required value={personalDetails.employer} onChange={(e) => handlePersonalChange('employer', e.target.value)} />
                            <FormInput label="Passport Number" required value={personalDetails.passportNo} onChange={(e) => handlePersonalChange('passportNo', e.target.value)} />
                            <FormSelect label="Passport Issuing Country" required options={["India", "UAE", "UK", "USA"]} value={personalDetails.passportCountry} onChange={(e) => handlePersonalChange('passportCountry', e.target.value)} />
                            <FormInput label="Emirates ID#" value={personalDetails.emiratesId} onChange={(e) => handlePersonalChange('emiratesId', e.target.value)} />
                            <FormInput label="Emirates Expiry Date" type="date" value={personalDetails.emiratesExpiry} onChange={(e) => handlePersonalChange('emiratesExpiry', e.target.value)} />
                        </div>
                    </div>
                    {/* Address */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-5 border-t pt-6">Residential address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Building name" value={personalDetails.building} onChange={(e) => handlePersonalChange('building', e.target.value)} />
                            <FormInput label="Unit" value={personalDetails.unit} onChange={(e) => handlePersonalChange('unit', e.target.value)} />
                            <FormInput label="Street address" value={personalDetails.street} onChange={(e) => handlePersonalChange('street', e.target.value)} />
                            <FormSelect label="Country" options={["UAE", "India"]} value={personalDetails.country} onChange={(e) => handlePersonalChange('country', e.target.value)} />
                            <FormInput label="City" value={personalDetails.city} onChange={(e) => handlePersonalChange('city', e.target.value)} />
                            <FormInput label="Emirate/State" value={personalDetails.emirate} onChange={(e) => handlePersonalChange('emirate', e.target.value)} />
                        </div>
                    </div>
                </div>
             ) : (
                <>
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Basic Info</h4>
                        <DataRow label="Name" value={personalDetails.name} />
                        <DataRow label="Date of birth" value={personalDetails.dob} />
                        <DataRow label="Gender" value={personalDetails.gender} />
                        <DataRow label="Marital status" value={personalDetails.marital} />
                        <DataRow label="Residence status" value={personalDetails.residence} />
                        <DataRow label="Nationality" value={personalDetails.nationality} />
                    </div>
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Detailed Info</h4>
                        <DataRow label="Salary (AED)" value={personalDetails.salary} />
                        <DataRow label="Employer" value={personalDetails.employer} />
                        <DataRow label="Passport number" value={personalDetails.passportNo} />
                        <DataRow label="Passport Country" value={personalDetails.passportCountry} />
                        <DataRow label="Emirates ID#" value={personalDetails.emiratesId} />
                    </div>
                    <div className="mb-2">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Address</h4>
                        <DataRow label="City" value={personalDetails.city} />
                        <DataRow label="Country" value={personalDetails.country} />
                    </div>
                </>
             )}
          </Card>

          {/* 4. Product Requirements (NAVIGATION EDIT) */}
          <Card 
            title="Product requirements" 
            subTitle="Review and update your loan requirements."
            icon={<LayoutGrid size={20} />}
            onEdit={handleEditRequirements} 
            isEditing={false}
            isExpanded={expandedSections.requirements}
            toggleExpand={() => toggleSection('requirements')}
          >
             <div className="mb-8">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Loan Details</h4>
               <DataRow label="Purchase type" value={productRequirements.purchaseType} />
               <DataRow label="Loan period" value={productRequirements.loanPeriod} />
               <DataRow label="Loan to value" value={productRequirements.ltv} />
             </div>

             <div className="mb-8">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Financials</h4>
               <DataRow label="Income type" value={productRequirements.incomeType} />
               <DataRow label="Monthly Income" value={productRequirements.income} />
               <DataRow label="Age" value={productRequirements.age} />
             </div>

             <div className="mb-2">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Property</h4>
               <DataRow label="Property value" value={productRequirements.propertyValue} />
             </div>
          </Card>

        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="w-full lg:w-80 flex-shrink-0 sticky top-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                   <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                   <h3 className="font-bold text-gray-900 text-lg">Syed Uddin</h3>
                   <p className="text-sm text-gray-500">Mortgage Advisor</p>
                </div>
             </div>

             <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                   <Mail size={16} /> syed.salman@holo.ae
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                   <Phone size={16} /> +971566138560
                </div>
             </div>

             <div className="space-y-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-[#5c039b] text-white p-3 rounded-lg font-medium hover:bg-[#4a027a] transition flex items-center justify-center">
                    Contact Advisor
                </button>
                <div className="text-xs text-gray-500 text-center px-4 leading-relaxed">
                    Need help? Your advisor is just a click away to assist with your application.
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MortgageProduct;