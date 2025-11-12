import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useCmsContext } from '../../contexts/CmsContext';
import { FiSettings } from 'react-icons/fi';
import { getRoleColors } from '../../../../manageApi/utils/roleColors';
import logoNew from "../../../../assets/img/logoNew.png";

const roleSlugMap = {
  '0': 'superadmin',
  '1': 'admin',
  '5': 'vendor-b2c',
  '6': 'vendor-b2b',
  '7': 'freelancer',
  '11': 'accountant',
};

const Sidebar = () => {
  const { sidebarOpen, sidebarCollapsed } = useCmsContext();
  const location = useLocation();
  const { user, token, permissions } = useSelector((s) => s.auth);
  const colors = getRoleColors(user?.role?.code);

  if (!user || !token) return null;

  const roleSlug = roleSlugMap[user.role.code] ?? 'dashboard';
  const basePath = `/dashboard/${roleSlug}`; // REMOVED /sawtar

  /*** 1. Build the tree from permissions ***/
  const navTree = React.useMemo(() => {
    const tree = [];

    // ---- Dashboard (always visible) ----
    tree.push({
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      to: basePath,
      exact: true,
      submenus: [],
    });

    // ---- Walk through every permission entry ----
    Object.entries(permissions ?? {}).forEach(([key, p]) => {
      if (!p?.canView || !p?.route) return;

      const [module, sub] = key.split('→').map((s) => s.trim());
      const clean = p.route.replace(/^\/+/, ''); // Remove leading slashes
      const full = `${basePath}/${clean}`; // No /sawtar

      if (!sub) {
        // ---- Main module (no arrow) ----
        tree.push({
          title: module,
          icon: p.icon ?? 'fas fa-cube',
          to: full,
          submenus: [],
        });
      } else {
        // ---- Sub-module ----
        let parent = tree.find((i) => i.title === module);
        if (!parent) {
          parent = {
            title: module,
            icon: p.icon ?? 'fas fa-cube',
            to: null,
            submenus: [],
          };
          tree.push(parent);
        }
        parent.submenus.push({
          title: sub,
          to: full,
          icon: p.icon ?? 'fas fa-circle',
        });
      }
    });

    return tree;
  }, [permissions, basePath]);

  /*** 2. Helper – is a parent active? ***/
  const isParentActive = (item) => {
    if (!item.submenus?.length) return false;
    return item.submenus.some((s) => location.pathname.startsWith(s.to));
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 bg-[#1E2B37] shadow-xl flex flex-col h-screen 
        transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}
        ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
    >

      {/* ---------- Header with Logo & Role Info ---------- */}
      <div className="flex flex-col items-center justify-center py-5 border-b border-gray-700 space-y-3">
        {/* Logo */}
        <div className="flex justify-center items-center w-full">
          <img
            src={logoNew}
            alt="Logo"
            className={`transition-all duration-300 ${sidebarOpen ? 'w-32' : 'w-10'} object-contain`}
          />
        </div>

        {/* Role Info (Optional - Uncomment if needed) */}
        {/* <div className="flex items-center space-x-2">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}
          >
            <span className="text-white font-bold text-lg">
              {user.role?.name?.[0]}
            </span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-sm font-semibold text-white truncate">
              <span className={colors.text}>{user.role?.name}</span>
            </span>
          )}
        </div> */}
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {navTree.map((item) => (
          <div key={item.title} className="space-y-1">
            {/* ---------- DIRECT LINK (no children) ---------- */}
            {item.to && (!item.submenus || item.submenus.length === 0) ? (
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-all group 
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                }
              >
                <i className={`${item.icon} text-lg mr-3 group-hover:scale-110 transition-transform`} />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            ) : (
              /* ---------- PARENT + SUB-MENUS ---------- */
              <div>
                {/* Parent line */}
                <div
                  className={`flex items-center px-4 py-3 rounded-xl transition-all group cursor-default
                  ${isParentActive(item) || location.pathname.startsWith(item.to ?? '')
                    ? 'text-white bg-gray-800'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                  <i className={`${item.icon} text-lg mr-3`} />
                  <span className="font-medium">{item.title}</span>
                </div>

                {/* Sub-items */}
                {item.submenus.map((sub) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-xl transition-all group ml-6 text-sm
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
                    }
                  >
                    <i className={`${sub.icon} text-xs mr-3`} />
                    <span>{sub.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && <div className="text-sm text-gray-300">v2.0.0</div>}
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-all">
            <FiSettings className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;