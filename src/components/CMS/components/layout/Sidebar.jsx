// components/layout/Sidebar.js
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useCmsContext } from '../../contexts/CmsContext';
import { FiSettings, FiX, FiChevronDown, FiAlertCircle } from 'react-icons/fi';
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
  '0': ['Dashboard',"All Leads","Deals", 'Xoto Partners', 'Products', 'Seller B2C','Request', 'Projects', 'Payout', 'Module', 'Permission', 'Role', 'Inventory','Settings'],
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

  // Close on route change (mobile)
  useEffect(() => {
    if (isMobile && sidebarOpen) closeSidebar();
  }, [location.pathname, isMobile, sidebarOpen, closeSidebar]);

  // Close on outside click
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

  // FREELANCER PENDING APPROVAL CHECK
  const isFreelancer = roleCode === '7';
  const isPendingApproval = isFreelancer && user.status !== 1;

  const navTree = useMemo(() => {
    // Always show Dashboard
    const tree = [{ title: 'Dashboard', icon: 'fas fa-home', to: basePath, exact: true, submenus: [] }];

    // If freelancer not approved → show nothing else
    if (isPendingApproval) {
      return tree;
    }

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
    const customOrder = ROLE_MODULE_ORDER[roleCode] || [];
    customOrder.forEach(t => modulesMap[t] && ordered.push(modulesMap[t]) && delete modulesMap[t]);
    ordered.push(...Object.values(modulesMap));

    return [...tree, ...ordered];
  }, [permissions, basePath, isPendingApproval]);

  const toggleModule = (mod) => setOpenModule(openModule === mod ? null : mod);
  const isParentActive = (item) => item.submenus.some(s => location.pathname.startsWith(s.to));
  const handleNavClick = () => isMobile && closeSidebar();

  const sidebarWidth = isMobile
    ? (sidebarOpen ? 'w-64' : '-translate-x-full')
    : (sidebarCollapsed ? 'w-0' : 'w-64');

  return (
    <>
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
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-800/50">
          <div className="flex flex-col items-center gap-3 flex-1">
            <img src={logoNew} alt="Logo" className="h-12" />
            {!sidebarCollapsed && (
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-purple-300/80">Welcome</div>
                <div className="text-sm font-bold text-purple-200">{user.role?.name || 'User'}</div>
              </div>
            )}
          </div>
          {isMobile && sidebarOpen && (
            <button onClick={closeSidebar} className="p-2 text-purple-300 hover:text-white">
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* PENDING APPROVAL CARD - ONLY FOR FREELANCER */}
        {isPendingApproval && (
          <div className="mx-4 mt-6 mb-4">
            <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/50 rounded-xl p-5 text-center">
              <FiAlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Account Under Review</h3>
              <p className="text-purple-200 text-sm">
                Your freelancer account is being reviewed by our team.<br />
                <strong>You'll be notified via email once approved.</strong>
              </p>
              <div className="mt-4 text-xs text-purple-300">
                Usually takes 24–48 hours
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 sidebar-scrollbar">
          {navTree.map((item) => {
            const hasSub = item.submenus.length > 0;
            const active = location.pathname === item.to || (hasSub && isParentActive(item));
            const expanded = openModule === item.title;

            // Hide all except Dashboard if pending approval
            if (isPendingApproval && item.title !== 'Dashboard') return null;

            return (
              <div key={item.title}>
                {!hasSub ? (
                  <NavLink
                    to={item.to}
                    end={item.exact}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                      ${isActive 
                        ? 'bg-purple-600/50 text-white shadow-lg shadow-purple-500/20' 
                        : 'text-purple-300 hover:bg-purple-800/30 hover:text-white'
                      }
                    `}
                  >
                    <i className={`${item.icon} w-5 text-center`} />
                    {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleModule(item.title)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                        ${active || expanded ? 'text-white bg-purple-800/30' : 'text-purple-300 hover:text-white hover:bg-purple-800/20'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${item.icon} w-5`} />
                        {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
                      </div>
                      {!sidebarCollapsed && <FiChevronDown className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />}
                    </button>

                    {expanded && !sidebarCollapsed && (
                      <div className="mt-1 ml-8 space-y-1 border-l border-purple-700/30 pl-4">
                        {item.submenus.map(sub => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={handleNavClick}
                            className={({ isActive }) => `
                              block py-2 px-3 rounded-lg text-sm transition
                              ${isActive ? 'text-purple-100 font-medium' : 'text-purple-300 hover:text-white'}
                            `}
                          >
                            {sub.title}
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
        <div className="p-4 border-t border-purple-900/40 text-center text-xs text-purple-400">
          <span>v2.0.0</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;