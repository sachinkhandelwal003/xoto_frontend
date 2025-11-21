// contexts/CmsContext.js
import { createContext, useState, useContext, useEffect } from "react";

const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setSidebarCollapsed(true);
      } else {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(v => !v);
      setSidebarCollapsed(v => !v);
    } else {
      setSidebarCollapsed(v => !v);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(true);
    }
  };

  return (
    <CmsContext.Provider
      value={{ isMobile, sidebarOpen, sidebarCollapsed, toggleSidebar, closeSidebar }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCmsContext = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCmsContext must be used inside CmsProvider");
  return ctx;
};