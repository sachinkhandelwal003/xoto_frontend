import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  UserCheck,
  Star,
  FileText,
  Users,
  Building,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountantDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  // === DUMMY DATA (NO API CALL) ===
  const accountant = {
    name: { first_name: "Rahul", last_name: "Sharma" },
    email: "rahul.sharma@accountant.com",
    firm_name: "Sharma & Co.",
    gst_number: "22AAAAA0000A1Z5",
  };

  const progress = {
    completionPercentage: 78,
    summary: "Almost there!",
    sections: {
      personal_info: 100,
      gst_details: 75,
      bank_info: 50,
      qualifications: 90,
    },
  };

  const stats = [
    {
      title: "Active Clients",
      value: "18",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-100",
    },
    {
      title: "Invoices This Month",
      value: "42",
      icon: <FileText className="w-6 h-6 text-teal-500" />,
      color: "bg-teal-100",
    },
    {
      title: "Total Revenue",
      value: "$48,750",
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      color: "bg-green-100",
    },
    {
      title: "GST Filings",
      value: "12",
      icon: <Building className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {accountant.name.first_name}
        </h1>
        <p className="text-gray-500">
          Manage client accounts, invoices, GST filings, and financial reports.
        </p>
      </motion.div>

      {/* ===== STATS GRID ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className={`p-5 rounded-2xl shadow-md flex items-center gap-4 ${item.color}`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{item.title}</p>
              <h2 className="text-2xl font-semibold text-gray-800">
                {item.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== PROFILE COMPLETION BAR ===== */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-md p-6 mb-10"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Completion
          </h2>
          <span
            className={`text-sm font-semibold ${
              progress.completionPercentage === 100 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {progress.summary}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
          <motion.div
            className={`h-3 rounded-full ${
              progress.completionPercentage >= 100 ? "bg-green-500" : "bg-indigo-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress.completionPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        <button
          className={`mt-2 px-5 py-2 rounded-lg font-medium transition ${
            progress.completionPercentage >= 100
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={() =>
            navigate(`/sawtar/dashboard/accountant/update/${user?.id || "demo"}`)
          }
          disabled={progress.completionPercentage >= 100}
        >
          {progress.completionPercentage < 100
            ? "Complete Your Profile"
            : "Profile Fully Updated"}
        </button>
      </motion.div>

      {/* ===== SECTION PROGRESS ===== */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Section Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(progress.sections).map(([section, value]) => (
            <div
              key={section}
              className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col gap-2"
            >
              <p className="font-medium capitalize text-gray-700">
                {section.replace(/_/g, " ")}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="text-sm text-gray-500">{value}% completed</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AccountantDashboard;