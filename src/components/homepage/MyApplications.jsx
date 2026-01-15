import React from 'react';
import { Plus, Info } from 'lucide-react';

// --- Sub-Components ---

const DetailItem = ({ label, value, isManager }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-500 text-sm w-1/3">{label}</span>
    <div className="w-2/3 flex justify-start">
        {isManager ? (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 gap-2">
                {/* Avatar Placeholder */}
                <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden">
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=jolene" 
                        alt="manager" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-gray-700 text-sm font-medium">{value}</span>
            </div>
        ) : (
            <span className="text-gray-900 font-medium text-sm">{value}</span>
        )}
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className="bg-[#FFF8E1] text-[#9A6B16] text-xs px-3 py-1 rounded-md font-medium border border-[#FFE082]/30">
    {status}
  </span>
);

const ApplicationCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-5xl">
      {/* Card Header */}
      <div className="p-6 pb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">AFFZ4487</h3>
          <p className="text-gray-500 text-xs mt-1">Submit: 13 Jan 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status="In Progress" />
          <button className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
            Continue
          </button>
        </div>
      </div>

      {/* Warning/Info Strip */}
      <div className="px-6 mb-6">
        <div className="bg-[#FFFBE6] border border-[#FFE58F] text-[#595959] text-sm px-4 py-3 rounded-md flex items-center gap-2">
          <Info size={16} className="text-[#FAAD14]" fill="currentColor" color="white" />
          <span>Complete the requirements to get your mortgage</span>
        </div>
      </div>

      {/* Selected Bank Section */}
      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-white p-1">
            {/* Using a text placeholder for DIB Logo based on screenshot */}
            <span className="text-[10px] font-bold text-green-700 text-center leading-tight">
                بنك دبي الإسلامي<br/>DIB
            </span>
        </div>
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs">Selected Bank</span>
            <span className="text-gray-900 font-bold text-sm">DIB</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {/* Left Column */}
            <div>
                <DetailItem label="Loan type" value="New Purchase" />
                <DetailItem label="Income type" value="Salaried" />
                <DetailItem label="Property value" value="455,545 AED" />
                <DetailItem label="Loan Amount" value="273,327 AED" />
            </div>

            {/* Right Column */}
            <div>
                <DetailItem label="Mortgage Manager" value="jolene gallagher" isManager={true} />
                <DetailItem label="Mortgage type" value="FIXED" />
                <DetailItem label="Loan preference" value="Islamic" />
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const MyApplications = () => {
  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans p-8 md:p-12 text-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
          
          <button className="bg-[#D1D5DB] text-white px-4 py-2.5 rounded-md text-sm font-medium flex items-center hover:bg-gray-400 transition-colors shadow-sm disabled:opacity-70">
            <Plus size={18} className="mr-2" /> Create a new application
          </button>
        </div>

        {/* Section Title */}
        <h2 className="text-gray-500 text-lg font-medium mb-4">Active</h2>

        {/* Application List */}
        <div className="space-y-6">
            <ApplicationCard />
        </div>

      </div>
    </div>
  );
};

export default MyApplications;