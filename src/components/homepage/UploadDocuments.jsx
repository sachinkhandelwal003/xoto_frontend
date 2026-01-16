import React, { useState, useRef } from 'react';
import { Upload, ChevronLeft, FileText, X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://xoto.ae";

// --- Reusable Upload Item Component ---
const UploadItem = ({ id, label, required, description, link, fileData, onFileSelect, onFileRemove }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(id, e.target.files[0]);
    }
    // Reset input so the same file can be selected again if needed (e.g. after error)
    e.target.value = ''; 
  };

  // Determine current state based on fileData
  const isUploading = fileData?.status === 'uploading';
  const isSuccess = fileData?.status === 'success';
  const isError = fileData?.status === 'error';
  const hasFile = fileData?.file;

  return (
    <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0 last:mb-0">
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        className="hidden" 
        accept="image/*,.pdf" 
        disabled={isUploading} // Disable while uploading
      />

      {!hasFile ? (
        // STATE 1: Empty - Show Upload Button
        <button 
          onClick={handleClick}
          className="border border-gray-300 bg-white text-gray-700 px-4 py-2.5 rounded-md text-sm flex items-center hover:bg-gray-50 transition-colors shadow-sm group"
        >
          <Upload size={16} className="mr-2 text-gray-400 group-hover:text-black" /> Click to upload
        </button>
      ) : (
        // STATE 2: File Selected - Show Status
        <div className="flex items-center gap-3">
            <div className={`flex items-center border px-4 py-2.5 rounded-md text-sm shadow-sm min-w-[200px] justify-between ${
                isError ? 'bg-red-50 border-red-200 text-red-700' : 
                isSuccess ? 'bg-green-50 border-green-200 text-green-700' : 
                'bg-gray-50 border-gray-200 text-gray-700'
            }`}>
                <div className="flex items-center overflow-hidden">
                    <FileText size={16} className="mr-2 flex-shrink-0" />
                    <span className="font-medium truncate max-w-[150px]">{fileData.file.name}</span>
                </div>

                {/* Status Icons */}
                <div className="ml-3">
                    {isUploading && <Loader2 size={16} className="animate-spin text-blue-600" />}
                    {isSuccess && <CheckCircle size={16} className="text-green-600" />}
                    {isError && <AlertCircle size={16} className="text-red-600" />}
                </div>
            </div>

            {/* Remove Button (Disabled while uploading) */}
            <button 
                onClick={() => onFileRemove(id)}
                disabled={isUploading}
                className={`p-2 rounded-full transition-colors ${
                    isUploading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                }`}
                title="Remove file"
            >
                <X size={18} />
            </button>
        </div>
      )}

      {/* Error Message */}
      {isError && (
          <p className="text-xs text-red-500 mt-2">Upload failed. Please remove and try again.</p>
      )}

      {description && !hasFile && (
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
  
  // State structure: { [id]: { file: FileObj, status: 'uploading'|'success'|'error', url: string } }
  const [files, setFiles] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  const uploadFileToApi = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' is the key expected by standard upload APIs

    try {
        const response = await fetch(`${BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData,
            // Note: Do NOT set Content-Type header manually for FormData, 
            // the browser sets it automatically with the boundary.
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // ✅ FIX APPLIED HERE: Use Optional Chaining (?.)
            // Checks if result.data exists before accessing .url, otherwise falls back to result.url
            const uploadedUrl = result.data?.url || result.url;

            setFiles(prev => ({
                ...prev,
                [id]: { ...prev[id], status: 'success', url: uploadedUrl } 
            }));
        } else {
            throw new Error(result.message || "Upload failed");
        }
    } catch (error) {
        console.error(`Error uploading ${id}:`, error);
        setFiles(prev => ({
            ...prev,
            [id]: { ...prev[id], status: 'error' }
        }));
    }
  };

  const handleFileSelect = (id, file) => {
    // 1. Set local state to 'uploading' immediately
    setFiles((prev) => ({ 
        ...prev, 
        [id]: { file: file, status: 'uploading', url: null } 
    }));

    // 2. Trigger API upload
    uploadFileToApi(id, file);
  };

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
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personal documents</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please upload your personal documents. You may upload more than one file per section. If you have a joint application, please upload for each spouse.
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <UploadItem 
                id="passport"
                label="Passport" 
                required 
                description="Please make sure the passport is valid and image is clear with all information visible."
                link={true}
                fileData={files['passport']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="visa"
                label="Visa" 
                required 
                fileData={files['visa']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="emiratesId"
                label="Emirates ID" 
                required 
                fileData={files['emiratesId']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="marriageCert"
                label="Marriage certificate"
                fileData={files['marriageCert']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            </div>
          </div>

          {/* SECTION 2: Income Documents */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Income documents</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please upload your income documents.
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <UploadItem 
                id="bankStatements"
                label="Bank Statements (6 Months)" 
                fileData={files['bankStatements']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="payslips"
                label="Payslips (6 Months)" 
                fileData={files['payslips']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
              <UploadItem 
                id="salaryCert"
                label="Salary Certificate (Proof of Bonus)" 
                fileData={files['salaryCert']}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end">
            <button 
              onClick={handleBack}
              className="bg-[#5c039c] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
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