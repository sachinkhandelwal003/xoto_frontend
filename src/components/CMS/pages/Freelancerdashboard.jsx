import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, UserCheck, Star } from "lucide-react";
import { apiService } from "../../../manageApi/utils/custom.apiservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Freelancerdashboard = () => {
  const [freelancer, setFreelancer] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user); // ✅ Added this
  console.log(user);

  // === FETCH FREELANCER PROFILE ===
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiService.get("/freelancer/profile");
        console.log(res.freelancer);
        setFreelancer(res.freelancer);
        setProgress(res.profileProgress);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  if (!freelancer || !progress) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Unable to load freelancer profile.
      </div>
    );
  }

  const stats = [
    {
      title: "All Jobs",
      value: "5", // Replace with actual data
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Under Review Jobs",
      value: "$3,250", // Replace with actual data
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      color: "bg-green-100",
    },
    {
      title: "Jobs Approved",
      value: `${progress.completionPercentage}%`,
      icon: <UserCheck className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-100",
    },
    {
      title: "Current Month Payout",
      value: "12", // Replace with actual data
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100",
    },
       {
      title: "Total Payout",
      value: "12", // Replace with actual data
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100",
    },
      {
      title: "Performance Score",
      value: "12", // Replace with actual data
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-100",
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
          Welcome back, {freelancer?.name?.first_name || "Freelancer"} 👋
        </h1>
        <p className="text-gray-500">
          Manage your landscaping jobs, proposals, and client interactions here.
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
              progress.completionPercentage === 100
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {progress.summary}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
          <motion.div
            className={`h-3 rounded-full ${
              progress.completionPercentage >= 100
                ? "bg-green-500"
                : "bg-blue-500"
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
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={() =>
            navigate(`/sawtar/dashboard/freelancer/update/${user?.id}`)
          }
        >
          {progress.completionPercentage < 100
            ? "Complete Your Profile"
            : "Profile Fully Updated ✅"}
        </button>
      </motion.div>

      {/* ===== SECTION DETAILS ===== */}
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
              <p className="font-medium capitalize text-gray-700">{section}</p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-blue-500 rounded-full"
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

export default Freelancerdashboard;
