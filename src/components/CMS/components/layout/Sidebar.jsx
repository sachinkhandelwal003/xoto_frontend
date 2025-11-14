// Full improved Sidebar.jsx with purple theme, accordion, hidden scrollbar, clean JS
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useCmsContext } from '../../contexts/CmsContext';
import { FiSettings } from 'react-icons/fi';
import logoNew from '../../../../assets/img/logoNew.png';

const roleSlugMap = {
  '0': 'superadmin',
  '1': 'admin',
  '5': 'vendor-b2c',
  '6': 'vendor-b2b',
  '7': 'freelancer',
  '11': 'accountant',
};

const ROLE_MODULE_ORDER = {
  '0': ['Dashboard', 'Xoto Partners', 'Products', 'Seller B2C','Request', 'Projects', 'Payout', 'Module', 'Permission', 'Role', 'Inventory','Settings'],
  '1': ['Dashboard', 'Products', 'Xoto Partners', 'Projects', 'Payout', 'Request', 'Settings'],
  '5': ['Dashboard', 'Products', 'My Products', 'Orders', 'Payout', 'Settings'],
  '6': ['Dashboard', 'Products', 'Projects', 'Inventory', 'Payout'],
  '7': ['Dashboard', 'My Projects', 'All Projects', 'Add Projects', 'Payout'],
  '11': ['Dashboard', 'All accountant', 'Requested Projects', 'Payout'],
};

const Sidebar = () => {
  const { sidebarOpen, sidebarCollapsed } = useCmsContext();
  const location = useLocation();
  const { user, token, permissions } = useSelector((s) => s.auth);
  const [openModule, setOpenModule] = useState(null);

  if (!user || !token) return null;

  const roleCode = user.role.code.toString();
  const roleSlug = roleSlugMap[roleCode] ?? 'dashboard';
  const basePath = `/dashboard/${roleSlug}`;
  const customOrder = ROLE_MODULE_ORDER[roleCode] || [];

  const navTree = useMemo(() => {
    const tree = [];

    tree.push({ title: 'Dashboard', icon: 'fas fa-home', to: basePath, exact: true, submenus: [] });

    const modulesMap = {};

    Object.entries(permissions ?? {}).forEach(([key, p]) => {
      if (!p?.canView || !p?.route) return;

      const [module, sub] = key.split('→').map((s) => s.trim());
      const cleanRoute = p.route.replace(/^\/+/, '');
      const fullPath = `${basePath}/${cleanRoute}`;

      if (!modulesMap[module]) {
        modulesMap[module] = {
          title: module,
          icon: p.icon || 'fas fa-cube',
          to: null,
          submenus: [],
        };
      }

      if (!sub) modulesMap[module].to = fullPath;
      else
        modulesMap[module].submenus.push({
          title: sub,
          to: fullPath,
          icon: p.icon || 'fas fa-circle',
        });
    });

    Object.values(modulesMap).forEach((mod) => mod.submenus.sort((a, b) => a.title.localeCompare(b.title)));

    const ordered = [];
    customOrder.forEach((title) => {
      if (modulesMap[title]) {
        ordered.push(modulesMap[title]);
        delete modulesMap[title];
      }
    });
    ordered.push(...Object.values(modulesMap));

    return [...tree, ...ordered];
  }, [permissions, basePath]);

  const toggleModule = (mod) => setOpenModule(openModule === mod ? null : mod);

  const isParentActive = (item) => item.submenus.some((s) => location.pathname.startsWith(s.to));

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 flex flex-col
      ${sidebarOpen ? 'w-64' : 'w-20'}
      ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      bg-gradient-to-b from-[#1a0b2e] via-[#2a1247] to-[#14051f]
      border-r border-purple-800/40 shadow-2xl`}
    >
      <style>{`
        ::-webkit-scrollbar { width: 2 !important; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: transparent; }
      `}</style>

      <div className="flex flex-col items-center py-6 border-b border-purple-800/50">
        <img
          src={logoNew}
          alt="Logo"
          className={`${sidebarOpen ? 'w-40' : 'w-12'} transition-all duration-300 drop-shadow-[0_0_15px_rgba(147,51,234,0.6)]`}
        />
        {sidebarOpen && (
          <div className="mt-4 text-center">
            <div className="text-xs uppercase tracking-widest text-purple-300/80">Welcome</div>
            <div className="text-lg font-bold text-purple-200">{user.role?.name}</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-3">
        {navTree.map((item) => {
          const active = location.pathname === item.to || isParentActive(item);
          const expanded = openModule === item.title;

          return (
            <div key={item.title}>
              {!item.submenus.length ? (
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-medium transition-all
                    ${active ? 'bg-purple-700/40 text-purple-100 shadow-lg' : 'text-purple-300 hover:bg-purple-900/30 hover:text-purple-100'}`}
                >
                  <i className={`${item.icon} text-lg`} />
                  {sidebarOpen && <span className="truncate">{item.title}</span>}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => toggleModule(item.title)}
                    className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-semibold transition-all
                      ${active ? 'text-purple-100 bg-purple-900/20' : 'text-purple-300 hover:text-purple-100'}`}
                  >
                    <i className={`${item.icon} text-lg`} />
                    {sidebarOpen && <span>{item.title}</span>}
                    {sidebarOpen && (
                      <i
                        className={`ml-auto fas fa-chevron-down text-xs transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {expanded && sidebarOpen && (
                    <div className="pl-8 mt-1 space-y-1 animate-fadeIn">
                      {item.submenus.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all
                            ${isActive ? 'bg-purple-600/40 text-purple-50 font-semibold' : 'text-purple-300 hover:bg-purple-900/20 hover:text-purple-100'}`
                          }
                        >
                          <i className={`${sub.icon} text-xs`} />
                          <span>{sub.title}</span>
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

      <div className="p-2 border-t border-purple-900/40">
        <div className="flex items-center justify-between text-xs text-purple-400/60">
          <span>v2.0.0</span>
          <button className="p-3 rounded-xl hover:bg-purple-900/30 transition-all group">
            <FiSettings className="w-5 h-5 text-purple-400 group-hover:text-purple-200 group-hover:rotate-90 transition-all duration-300" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
