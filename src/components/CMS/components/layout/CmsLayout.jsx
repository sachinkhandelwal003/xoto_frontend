// components/layout/CmsLayout.js
import React from "react";
import { CmsProvider, useCmsContext } from "../../contexts/CmsContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BackToTop from "./BackToTop";

const CmsLayoutContent = ({ children }) => {
  const { sidebarCollapsed, isMobile } = useCmsContext();

  const mainMargin = isMobile || sidebarCollapsed ? "ml-0" : "ml-64";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${mainMargin}`}>
        <Topbar />

        <main className="flex-1 overflow-y-auto pt-16 pb-6 bg-gray-300">
          <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8 mx-auto w-full">
              {children}
           
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