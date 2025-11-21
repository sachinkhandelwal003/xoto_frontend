// components/layout/Sidebar.js
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useCmsContext } from '../../contexts/CmsContext';
import { FiSettings, FiX, FiChevronDown } from 'react-icons/fi';
import logoNew from '../../../../assets/img/logoNew.png';

const roleSlugMap = {
  '0': 'superadmin',
  '1': 'admin',
    '2': "customer",
  '5': 'vendor-b2c',
  '6': 'vendor-b2b',
  '7': 'freelancer',
  '11': 'accountant',
    '12': 'supervisor',

};

const ROLE_MODULE_ORDER = {
  '0': ['Dashboard', 'Xoto Partners', 'Products', 'Seller B2C','Request', 'Projects', 'Payout', 'Module', 'Permission', 'Role', 'Inventory','Settings'],
  '1': ['Dashboard', 'Products', 'Xoto Partners', 'Projects', 'Payout', 'Request', 'Settings'],
  '5': ['Dashboard', 'Products', 'My Products', 'Orders', 'Payout', 'Settings'],
  '6': ['Dashboard', 'Products', 'Projects', 'Inventory', 'Payout'],
  '7': ['Dashboard', 'My Projects', 'All Projects', 'Add Projects', 'Payout'],
  '11': ['Dashboard', 'All accountant', 'Requested Projects', 'Payout'],
    '12': ['Dashboard', 'All accountant', 'Requested Projects', 'Payout'],

};

const Sidebar = () => {
  const { sidebarOpen, sidebarCollapsed, isMobile, closeSidebar } = useCmsContext();
  const location = useLocation();
  const { user, token, permissions } = useSelector((s) => s.auth);
  const [openModule, setOpenModule] = useState(null);
  const sidebarRef = useRef(null);

  console.log(permissions)
  // Close on route change (mobile)
  useEffect(() => {
    if (isMobile && sidebarOpen) closeSidebar();
  }, [location.pathname, isMobile, sidebarOpen, closeSidebar]);

  // Close on outside click (mobile)
  useEffect(() => {
    const handleOutside = (e) => {
      if (isMobile && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isMobile, sidebarOpen, closeSidebar]);

  if (!user || !token) return null;

  const roleCode = user.role.code.toString();
  const roleSlug = roleSlugMap[roleCode] ?? 'dashboard';
  const basePath = `/dashboard/${roleSlug}`;
  const customOrder = ROLE_MODULE_ORDER[roleCode] || [];

  const navTree = useMemo(() => {
    const tree = [{ title: 'Dashboard', icon: 'fas fa-home', to: basePath, exact: true, submenus: [] }];
    const modulesMap = {};

    Object.entries(permissions ?? {}).forEach(([key, p]) => {
      if (!p?.canView || !p?.route) return;
      const [module, sub] = key.split('→').map(s => s.trim());
      const cleanRoute = p.route.replace(/^\/+/, '');
      const fullPath = `${basePath}/${cleanRoute}`;

      if (!modulesMap[module]) {
        modulesMap[module] = { title: module, icon: p.icon || 'fas fa-cube', to: null, submenus: [] };
      }
      if (!sub) modulesMap[module].to = fullPath;
      else modulesMap[module].submenus.push({ title: sub, to: fullPath, icon: p.icon || 'fas fa-circle' });
    });

    Object.values(modulesMap).forEach(m => m.submenus.sort((a, b) => a.title.localeCompare(b.title)));

    const ordered = [];
    customOrder.forEach(t => modulesMap[t] && ordered.push(modulesMap[t]) && delete modulesMap[t]);
    ordered.push(...Object.values(modulesMap));

    return [...tree, ...ordered];
  }, [permissions, basePath, customOrder]);

  const toggleModule = (mod) => setOpenModule(openModule === mod ? null : mod);
  const isParentActive = (item) => item.submenus.some(s => location.pathname.startsWith(s.to));
  const handleNavClick = () => isMobile && closeSidebar();

  // Dynamic sidebar width: 256px (20%) or 0px
  const sidebarWidth = isMobile
    ? (sidebarOpen ? 'w-64' : '-translate-x-full')
    : (sidebarCollapsed ? 'w-0' : 'w-64');

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeSidebar} />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-gradient-to-b from-[#1a0b2e] via-[#2a1247] to-[#14051f]
          border-r border-purple-800/40 shadow-2xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${sidebarWidth}
        `}
      >
        <style>{`
          .sidebar-scrollbar::-webkit-scrollbar { width: 4px; }
          .sidebar-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .sidebar-scrollbar::-webkit-scrollbar-thumb { 
            background: rgba(168, 85, 247, 0.3); border-radius: 10px;
          }
          .sidebar-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.5); }
          @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-slideDown { animation: slideDown 0.2s ease-out; }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-800/50">
         <div className="flex flex-col items-center gap-3 flex-1 min-w-0">
  <img
    src={logoNew}
    alt="Logo"
    className={`transition-all duration-300 
    }`}
  />

  {!sidebarCollapsed && (
    <div className="flex-1 min-w-0 flex flex-col items-center">
      <div className="text-xs uppercase tracking-widest text-purple-300/80 truncate">
        Welcome
      </div>
      <div className="text-sm font-bold text-purple-200 truncate">
        {user.role?.name}
      </div>
    </div>
  )}
</div>

          {isMobile && sidebarOpen && (
            <button onClick={closeSidebar} className="p-2 text-purple-300 hover:text-purple-100 hover:bg-purple-800/30 rounded-lg">
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 sidebar-scrollbar">
          {navTree.map((item) => {
            const hasSub = item.submenus.length > 0;
            const active = location.pathname === item.to || (hasSub && isParentActive(item));
            const expanded = openModule === item.title;

            return (
              <div key={item.title}>
                {!hasSub ? (
                  <NavLink
                    to={item.to}
                    end={item.exact}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${isActive ? 'bg-purple-600/50 text-purple-50 shadow-lg shadow-purple-500/20' : 'text-purple-300 hover:bg-purple-800/30 hover:text-purple-100'}
                    `}
                  >
                    <i className={`${item.icon} text-lg w-5 text-center flex-shrink-0`} />
                    {!sidebarCollapsed && <span className="truncate flex-1">{item.title}</span>}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        {item.title}
                      </div>
                    )}
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleModule(item.title)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                        ${active || expanded ? 'text-purple-100 bg-purple-800/20' : 'text-purple-300 hover:text-purple-100 hover:bg-purple-800/20'}
                      `}
                    >
                      <i className={`${item.icon} text-lg w-5 text-center flex-shrink-0`} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{item.title}</span>
                          <FiChevronDown className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </>
                      )}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg">
                          {item.title}
                        </div>
                      )}
                    </button>

                    {expanded && !sidebarCollapsed && (
                      <div className="mt-1 ml-3 pl-3 space-y-1 border-l border-purple-800/30 animate-slideDown">
                        {item.submenus.map(sub => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={handleNavClick}
                            className={({ isActive }) => `
                              flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                              ${isActive ? 'bg-purple-600/30 text-purple-50 font-medium' : 'text-purple-300 hover:bg-purple-800/20 hover:text-purple-100'}
                            `}
                          >
                            <i className={`${sub.icon} text-xs w-4 text-center flex-shrink-0`} />
                            <span className="truncate">{sub.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-purple-900/40">
          <div className={`flex items-center justify-between text-xs text-purple-400/60 transition-all ${!sidebarCollapsed ? 'opacity-100' : 'opacity-0'}`}>
            <span>v2.0.0</span>
            <button className={`p-2 rounded-xl hover:bg-purple-900/30 transition-all group ${sidebarCollapsed ? 'w-full flex justify-center' : ''}`}>
              <FiSettings className="w-4 h-4 text-purple-400 group-hover:text-purple-200 group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;