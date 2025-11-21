import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// PAGES
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import Freelancerdashboard from "./pages/Freelancerdashboard";
import Modules from "./pages/modules/Modules";
import Permission from "./pages/permission/Permission";
import Role from "./pages/role/Role";
import VendorB2C from "./pages/dashboardPages/managevendor/VendorB2C";
import VendorB2CProfile from "./pages/dashboardPages/managevendor/VendorB2CProfile";
import ProductRequestB2C from "./pages/dashboardPages/manageProducts/ProductRequestB2C";
import CategoryFreelancers from "./pages/dashboardPages/managefreelancer/freelancer/categoryandsubcategory/CategoryFreelancers";
import Freelancers from "./pages/dashboardPages/managefreelancer/freelancer/Freelancers";
import FreelancerProfile from "./pages/dashboardPages/managefreelancer/freelancer/FreelancerProfile";
import MyprofileFreelancer from "./pages/dashboardPages/managefreelancer/freelancer/MyprofileFreelancer";
import UpdateFreelncerProfile from "./pages/dashboardPages/managefreelancer/freelancer/UpdateFreelncerProfile";
import Projects from "./pages/dashboardPages/managefreelancer/freelancer/Projects/Projects";
import MyProjects from "./pages/dashboardPages/managefreelancer/freelancer/Projects/MyProjects";
import Accountant from "./pages/dashboardPages/manageaccountant/Accountant";
import AccountantDashboard from "./pages/AccountantDashboard";
import ManageProjects from "./pages/dashboardPages/manageaccountant/ManageProjects";
import AddProjects from "./pages/dashboardPages/managefreelancer/freelancer/Projects/AddProjects";
import AddCategory from "../ecommerce/B2C/products/AddCategory";
import AddMaterial from "../ecommerce/B2C/products/AddMaterial";
import AddBrand from "../ecommerce/B2C/products/AddBrand";
import AllVendorProductB2C from "./pages/dashboardPages/manageProducts/AllVendorProductB2C";
import VendorProducts from "../ecommerce/B2C/products/VendorProducts";
import AddProducts from "../ecommerce/B2C/products/AddProducts";
import Currency from "./pages/settings/Currency";
import Tax from "./pages/settings/Tax";
import ProductReview from "./pages/dashboardPages/manageProducts/ProductReview";
import ProductProfile from "../ecommerce/B2C/products/ProductProfile";
import VendorProfile from "./pages/dashboardPages/managevendor/VendorProfile";
import UsersRoleList from "./pages/dashboardPages/users/UsersRoleList";
import LeadsList from "./pages/dashboardPages/leads/LeadsList";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import AssignedLeadsList from "./pages/dashboardPages/leads/AssignedLeadsList";
import QuatationLeadsList from "./pages/dashboardPages/leads/QuatationLeadsList";
import Myestimates from "./pages/dashboardPages/leads/Myestimates";
import Leads from "./pages/dashboardPages/leads/Leads";
import Customerdashboard from "./pages/Customerdashboard";

const roleSlugMap = {
  0: "superadmin",
  1: "admin",
    2: "customer",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
    12: "supervisor",

};

const dashboardMap = {
  0: <Dashboard />,
  1: <Dashboard />,
  2:<Customerdashboard/>,
  5: <VendorDashboard />,
  6: <VendorDashboard />,
  7: <Freelancerdashboard />,
  11: <AccountantDashboard />,
    12: <SupervisorDashboard />,

};

const componentMap = {
  "products/list": <ProductRequestB2C />,
  "modules/list": <Modules />,
  permission: <Permission />,
  roles: <Role />,
  "seller/list": <VendorB2C />,
  "freelancer/category": <CategoryFreelancers />,
  "freelancer/list": <Freelancers />,
  "request/projects": <ManageProjects />,
  "sellers/list": <VendorB2C />,
  projects: <Projects />,
  myProjects: <MyProjects />,
  accountant: <Accountant />,
    users: <UsersRoleList />,

  addProjects: <AddProjects />,
  categories: <AddCategory />,
  material: <AddMaterial />,
  currency: <Currency />,
  tax: <Tax />,
  brands: <AddBrand />,
  "products/my": <VendorProducts />,
  "products/add": <AddProducts />,
  "leads/requested":<LeadsList/>,
  "leads/assigned":<AssignedLeadsList/>,
    "request/quatation":<QuatationLeadsList/>,
  "estimates/my":<Myestimates/>,
  deals: <Leads />,

};

// Placeholder for missing components
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full p-10 text-center text-gray-400">
    <div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p>No component is assigned for this module yet.</p>
    </div>
  </div>
);

const CmsRoutes = () => {
  const { user, permissions } = useSelector((s) => s.auth);
  const location = useLocation();

  if (!user?.role?.code) {
    return <div className="p-8 text-center">Loading user...</div>;
  }

  const roleSlug = roleSlugMap[user.role.code] ?? "dashboard";
  const base = `/dashboard/${roleSlug}`; // REMOVED /sawtar

  // Redirect root dashboard to role-specific
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/"
  ) {
    return <Navigate to={base} replace />;
  }

  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={dashboardMap[user.role.code] ?? <Dashboard />} />

      {/* Dynamic Routes from Permissions */}
      {Object.entries(permissions ?? {}).map(([key, p]) => {
        if (!p?.canView || !p?.route) return null;

        const clean = p.route.replace(/^\/+/, "");
        const Component = componentMap[clean];

        const [moduleName] = key.split("→").map((s) => s.trim());

        return (
          <Route
            key={clean}
            path={clean}
            element={Component ?? <Placeholder title={moduleName} />}
          />
        );
      })}

      {/* Static Routes */}
      <Route
        path="seller/:id/product-request"
        element={
          permissions?.["Vendor B2C→All Vendors"]?.canView ? (
            <ProductRequestB2C />
          ) : (
            <Navigate to="/seller/list" replace />
          )
        }
      />

      <Route path="products" element={<ProductReview />} />
      <Route path="products/view/:id" element={<ProductProfile />} />
      <Route path="seller/:id" element={<VendorB2CProfile />} />
            <Route path="seller/product/:id" element={<ProductRequestB2C />} />
<Route path="freelancer" element={<FreelancerProfile />} />

      <Route path="freelancer/myprofile" element={<MyprofileFreelancer />} />
      <Route path="/update/:id" element={<UpdateFreelncerProfile />} />

      {/* Catch-all fallback */}
    </Routes>
  );
};

export default CmsRoutes;