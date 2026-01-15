import React, { useState, useRef } from 'react';
import { Upload, ChevronLeft, FileText, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Upload Item Component (Now Functional) ---
const UploadItem = ({ id, label, required, description, link, selectedFile, onFileSelect, onFileRemove }) => {
  const fileInputRef = useRef(null);

  // Trigger hidden input click
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(id, e.target.files[0]);
    }
  };

  return (
    <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0 last:mb-0">
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        className="hidden" 
        accept="image/*,.pdf" // Accepts Images and PDFs
      />

      {/* Conditional Rendering: Show Button OR Selected File */}
      {!selectedFile ? (
        // STATE 1: No File Selected
        <button 
          onClick={handleClick}
          className="border border-gray-300 bg-white text-gray-700 px-4 py-2.5 rounded-md text-sm flex items-center hover:bg-gray-50 transition-colors shadow-sm group"
        >
          <Upload size={16} className="mr-2 text-gray-400 group-hover:text-black" /> Click to upload
        </button>
      ) : (
        // STATE 2: File Selected (Show Name & Remove Option)
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-md text-sm shadow-sm">
                <FileText size={16} className="mr-2" />
                <span className="font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                <CheckCircle size={16} className="ml-2 text-green-600" />
            </div>
            <button 
                onClick={() => onFileRemove(id)}
                className="text-gray-400 hover:text-red-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Remove file"
            >
                <X size={18} />
            </button>
        </div>
      )}

      {description && (
        <p className="text-xs text-gray-500 mt-3 leading-relaxed max-w-xl">
          {description} {link && <span className="text-blue-600 underline cursor-pointer">Learn More</span>}
        </p>
      )}
    </div>
  );
};

// --- Main Component ---
const UploadDocuments = () => {
  const navigate = useNavigate();
  
  // State to store uploaded files based on section ID
  const [files, setFiles] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  // Function to update state when a file is chosen
  const handleFileSelect = (id, file) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  // Function to remove a file
  const handleFileRemove = (id) => {
    setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[id];
        return newFiles;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans p-6 md:p-12 text-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 animate-fade-in">
          <div className="text-gray-500 text-sm mb-2">My Applications / Details / Upload Document</div>
          <h1 className="text-4xl font-bold text-gray-900">Upload your documents</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          
          {/* SECTION 1: Personal Documents */}
          <div className="flex flex-col md:flex-row gap-12 border-b border-gray-200 pb-12 mb-12">
            
            {/* Left Column: Title & Desc */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personal documents</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please upload your personal documents. You may upload more than one file per section. If you have a joint application, please upload for each spouse.
              </p>
            </div>

            {/* Right Column: Upload Fields */}
            <div className="w-full md:w-2/3">
              <UploadItem 
                id="passport"
                label="Passport" 
                required 
                description="Please make sure the passport is valid and image is clear with all information visible. It must be in full color - black and white will be rejected."
                link={true}
                selectedFile={files['passport']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="visa"
                label="Visa" 
                required 
                selectedFile={files['visa']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="emiratesId"
                label="Emirates ID" 
                required 
                selectedFile={files['emiratesId']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="marriageCert"
                label="Marriage certificate"
                selectedFile={files['marriageCert']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            </div>
          </div>

          {/* SECTION 2: Income Documents */}
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Title & Desc */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Income documents</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please upload your income documents. You may upload more than one file per section. If you have a joint application, please upload for each spouse.
              </p>
            </div>

            {/* Right Column: Upload Fields */}
            <div className="w-full md:w-2/3">
              <UploadItem 
                id="bankStatements"
                label="Bank Statements (6 Months)" 
                selectedFile={files['bankStatements']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="payslips"
                label="Payslips (6 Months)" 
                selectedFile={files['payslips']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="salaryCert"
                label="Salary Certificate (Proof of Bonus)" 
                selectedFile={files['salaryCert']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleBack}
              className="bg-[#5c039c] text-white px-6 py-3 rounded-lg text-sm font-medium  transition-colors"
            >
              Back to application
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;

//