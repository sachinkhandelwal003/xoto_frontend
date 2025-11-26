// components/layout/Topbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../manageApi/store/authSlice";
import { useCmsContext } from "../../contexts/CmsContext";
import { FiBell, FiMenu, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const colors = getRoleColors(user?.role?.code);

  // ----------------------------
  // NEW: Unified roleSlug logic
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
        fixed top-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16
        transition-all duration-300 ${headerLeft}
      `}
    >
      <div className="flex justify-between items-center h-full px-4 sm:px-6">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="hidden sm:block w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-lg"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary }}
              >
                {user?.name?.charAt(0) ?? "U"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role?.name}</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border py-2 z-50">
                <button
                  onClick={() => {
                    navigate(getProfileUrl());
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-gray-50"
                >
                  <FiUser /> My Profile
                </button>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-gray-50"
                >
                  <FiSettings /> Settings
                </button>

                <hr className="my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <FiLogOut /> Logout
                </button>
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
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </header>
  );
};

export default Topbar;
