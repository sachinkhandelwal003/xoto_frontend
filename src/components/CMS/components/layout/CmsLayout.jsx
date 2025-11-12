// 2. FIXED CmsLayout.jsx – Use {children} (NO <Outlet />)
import React from 'react';
import { CmsProvider } from '../../contexts/CmsContext';
import { useCmsContext } from '../../contexts/CmsContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BackToTop from './BackToTop';

const CmsLayoutContent = ({ children }) => {
  const { sidebarCollapsed } = useCmsContext();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Topbar />
        <main
          className={`flex-1 overflow-y-auto pt-16 pb-6 transition-all duration-300 
            ${sidebarCollapsed ? 'ml-20' : 'ml-64'} bg-gray-200`}
        >
          <div className="max-w-full px-4 py-8 sm:px-6 lg:px-8 mx-auto">
            {children}  {/* ← CmsRoutes renders HERE */}
          </div>
          <BackToTop />
        </main>
      </div>
    </div>
  );
};

const CmsLayout = ({ children }) => (
  <CmsProvider>
    <CmsLayoutContent>{children}</CmsLayoutContent>
  </CmsProvider>
);

export default CmsLayout;