// components/layout/Topbar.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../manageApi/store/authSlice";
import { useCmsContext } from "../../contexts/CmsContext";
import { FiBell, FiMenu, FiSettings, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { getRoleColors } from "../../../../manageApi/utils/roleColors";

// ----------------------
// SAME roleSlugMap as Sidebar
// ----------------------
const roleSlugMap = {
  "0": "superadmin",
  "1": "admin",
  "2": "customer",
  "5": "vendor-b2c",
  "6": "vendor-b2b",
  "7": "freelancer",
  "11": "accountant",
  "12": "supervisor",
};

const Topbar = () => {
  const { toggleSidebar, sidebarCollapsed, isMobile } = useCmsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth?.user);
  
  // State & Refs
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const colors = getRoleColors(user?.role?.code);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ----------------------------
  // Role Logic
  // ----------------------------
  const roleCode = user?.role?.code?.toString();
  const roleSlug = roleSlugMap[roleCode] ?? "dashboard";

  const getProfileUrl = () => {
    return `/dashboard/${roleSlug}/myprofile`;
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const headerLeft = isMobile || sidebarCollapsed ? "left-0" : "left-64";

  return (
    <header
      className={`
        fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 h-16
        transition-all duration-300 ${headerLeft} shadow-sm
      `}
    >
      <div className="flex justify-between items-center h-full px-4 sm:px-6">
        
        {/* LEFT: Menu Toggle & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="hidden sm:block w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className={`
                flex items-center gap-3 p-1.5 pr-3 rounded-full border border-transparent 
                transition-all duration-200
                ${dropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}
              `}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: colors.primary }}
              >
                {user?.name?.charAt(0) ?? "U"}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <p className="text-sm font-semibold text-gray-700 leading-tight">
                  {user?.name?.split(' ')[0]}
                </p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {user?.role?.name}
                </p>
              </div>
              <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* THE DROPDOWN MENU */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animation-fade-in-up">
                
                {/* 1. User Header Info (Inside Dropdown) */}
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                </div>

                {/* 2. Main Menu Items */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      navigate(getProfileUrl());
                      setDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <FiUser className="w-4 h-4" /> My Profile
                  </button>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="w-full px-3 py-2.5 flex items-center gap-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <FiSettings className="w-4 h-4" /> Account Settings
                  </button>
                </div>

                {/* 3. Logout Section */}
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2.5 flex items-center gap-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" /> 
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
    </header>
  );
};

export default Topbar;