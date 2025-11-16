import React from 'react';
import { CmsProvider } from '../../contexts/CmsContext';
import { useCmsContext } from '../../contexts/CmsContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BackToTop from './BackToTop';

const CmsLayoutContent = ({ children }) => {
  const { sidebarCollapsed, isMobile, sidebarOpen } = useCmsContext();

  const getMainContentMargin = () => {
    if (isMobile) {
      return 'ml-0';
    }
    if (sidebarCollapsed) {
      return 'ml-20';
    }
    return 'ml-64';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 min-w-0">
        <Topbar />
        <main
          className={`flex-1 overflow-y-auto pt-16 pb-6 transition-all duration-300 
            ${getMainContentMargin()} bg-gray-100`}
        >
          <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8 mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-8rem)]">
              {children}
            </div>
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