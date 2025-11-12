import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Navigate } from "react-router-dom";
import Navbar from "./components/navbar/index.jsx";
import Footer from "./components/footer/footer";
import FloatingIcons from "./components/FloatingIcons";
import QuoteModal from "./components/modal/QuoteModal.jsx";
import ScrollToTop from "./components/ScrollToTop.js";
import Loader from "./components/Loader.jsx";
import FreelancerNavbar from "./components/navbar/FreelancerNavbar.jsx";
import EcommerceNavbar from "./components/navbar/EcommerceNavbar.jsx";
import ProductFilterPage from "./components/ecommerce/ProductFilterPage.jsx";
import Freelisting from "./components/freelancers/Listing/Free-listing.jsx";
import Category from "./components/freelancers/Category.jsx";
import CreateBusiness from "./components/freelancers/Listing/CreateBusiness.jsx";
import Businesspage from "./components/freelancers/Listing/Businesspage.jsx";
import Productdetails from "./components/ecommerce/Productdetails.jsx";
import MainEcommercePage from "./components/ecommerce/Index";
import HomeB2B from "./components/ecommerce/B2B/Home";
import HomeB2C from "./components/ecommerce/B2C/Home";
import CartPage from "./components/ecommerce/CartPage";
import CmsApp from "./components/CMS/CmsApp";
import AITool from "./components/AI/Tool/AITool";
const NotFound = lazy(() => import("./components/NotFound"));
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Login from "./components/login";
import Profile from "./components/CMS/components/Profile/Profile";
import Employeedashboard from "./components/CMS/pages/Employeedashboard";
import Customerdashboard from "./components/CMS/pages/Customerdashboard";
import AdminLogin from "./components/login/AdminLogin";
import SellerPage from "./components/ecommerce/B2C/SellerPage";
import Sellerb2b from "./components/ecommerce/B2C/Sellerb2b";
import Landspackng from "./components/homepage/Landspackng";
import Ynterior from "./components/homepage/Yniterior";
import Buy from "./components/homepage/BuyRent";
import Ecosystem from "./components/homepage/Ecosystem";
import About from "./components/homepage/About";
import AccountantLogin from "./components/login/AccountantLogin";
import Service from "./components/homepage/Services";
import Page2 from "./components/homepage/Page2";
import Page3 from "./components/homepage/Page3";
import Page from "./components/homepage/Page";

// Lazy-loaded components
const Home = lazy(() => import("./components/homepage/Home"));
const Consult = lazy(() => import("./components/consultation/Consult"));
const Designs = lazy(() => import("./components/AI/Designs"));
const Quotation = lazy(() => import("./components/quotation/Quotation"));
const Social = lazy(() => import("./components/social/Index"));
const Howitworks = lazy(() => import("./components/How-it-works/Index"));
const Completeproductview = lazy(
  () => import("./components/Completeproductview")
);
const Designers = lazy(() => import("./components/Designers/Designers"));
const Freelancers = lazy(() => import("./components/freelancers/index"));
const Browsecategory = lazy(
  () => import("./components/freelancers/Browsecategory")
);
const Mainfreelancers = lazy(
  () => import("./components/freelancers/Mainfreelancers")
);
const FreelancerProfile = lazy(
  () => import("./components/freelancers/FreelancerProfile")
);
const LivingRoom = lazy(
  () => import("./components/Interiorsection/livingroom/Index")
);
const Bathroom = lazy(
  () => import("./components/Interiorsection/bathroom/Index")
);
const Kitchen = lazy(
  () => import("./components/Interiorsection/kitchen/Index")
);
const Studyroom = lazy(
  () => import("./components/Interiorsection/Studyroom/Index")
);
const Wardrobe = lazy(
  () => import("./components/Interiorsection/wardrobe/Index")
);
const Bedroom = lazy(
  () => import("./components/Interiorsection/bedroom/Index")
);
const Registration = lazy(
  () => import("./components/freelancers/Registeration")
);
const Magazine = lazy(() => import("./components/magazines/Index"));

// PrivateRoute component for protected routes
function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user || !user.role?.code)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role.code))
    return <Navigate to="/" replace />;
  return children;
}

// LayoutWrapper manages visibility
function LayoutWrapper({ children }) {
  const location = useLocation();

  const hideNavbarPaths = [
    "/login",
    "/quotation",
    "/freelancer/browse-category",
    "/freelancer/category",
    "/ecommerce/filter",
    "/freelancer/free-listing",
    "/ecommerce/b2c",
    "/ecommerce",
    "/freelancer/create-business",
    "/designs/Tool",
    "/dashboard",
    "/customer/dashboard",
    "/admin/login",
    "/ecommerce/seller",
    "/ecommerce/cart",
  ];

  const hideNavbar =
    hideNavbarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/ecommerce/product/") ||
    location.pathname.startsWith("/dashboard/");

  const showFreelancerNavbar =
    location.pathname === "/freelancer/browse-category" ||
    location.pathname === "/freelancer/free-listing" ||
    location.pathname === "/freelancer/category" ||
    location.pathname === "/freelancer/create-business";

  const showEcommerceNavbar =
    location.pathname === "/ecommerce/b2c" ||
    location.pathname === "/ecommerce/filter" ||
    location.pathname === "/ecommerce" ||
    location.pathname === "/ecommerce/cart" ||
    location.pathname.startsWith("/ecommerce/product/");

  const hideFooterPaths = [
    "/login",
    "/quotation",
    "/designs/Tool",
    "/dashboard",
    "/customer/dashboard",
    "/profile",
    "/admin/login",
    "/ecommerce/seller",
    "/freelancer/registration",
  ];

  const hideFooter =
    hideFooterPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/") ||
    location.pathname.startsWith("/profile/");

  const hideQuoteModalPaths = [
    "/login",
    "/quotation",
    "/freelancer/browse-category",
    "/freelancer/registration",
    "/ecommerce/filter",
    "/freelancer/free-listing",
    "/freelancer/category",
    "/freelancer/create-business",
    "/freelancer/business",
    "/freelancer/profile",
    "/designs/Tool",
    "/dashboard",
    "/customer/dashboard",
    "/admin/login",
    "/ecommerce/seller",
    "/ecommerce/product",
  ];

  const hideQuoteModal =
    hideQuoteModalPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/") ||
    location.pathname.startsWith("/ecommerce/product") ||
    location.pathname.startsWith("/ecommerce/cart");

  const hideFloatingIconsPaths = [
    "/dashboard",
    "/customer/dashboard",
    "/designs/Tool",
    "/profile",
    "/admin/login",
    "/ecommerce/seller",
    "/ecommerce/product",
  ];

  const hideFloatingIcons =
    hideFloatingIconsPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/") ||
    location.pathname.startsWith("/ecommerce/product") ||
    location.pathname.startsWith("/ecommerce/cart");

  return (
    <div className="min-h-screen relative">
      {!hideNavbar && <Navbar />}
      {showFreelancerNavbar && <FreelancerNavbar />}
      {showEcommerceNavbar && <EcommerceNavbar />}
      {children}
      {!hideFooter && <Footer />}
      {/* {!hideFloatingIcons && <FloatingIcons />} */}
      {/* {!hideQuoteModal && <QuoteModal />} */}
    </div>
  );
}

function App() {
  return (
    <LayoutWrapper>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landscaping" element={<Landspackng />} />
          <Route path="/services/interior" element={<Ynterior />} />
          <Route path="/marketplace" element={<Buy />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/accountant/login" element={<AccountantLogin />} />

          <Route path="/consultation" element={<Consult />} />
          <Route path="/designs" element={<Designs />} />
          <Route
            path="/designs/Tool"
            element={
              <DndProvider backend={HTML5Backend}>
                <AITool />
              </DndProvider>
            }
          />
          <Route path="/Services" element={<Service />} />
          <Route path="/properties" element={<Page2 />} />
          <Route path="/explore" element={<Page3 />} />
          <Route path="/contact" element={<Page />} />

          <Route path="/quotation" element={<Quotation />} />
          <Route path="/ecommerce" element={<MainEcommercePage />} />
          <Route path="/ecommerce/b2c" element={<HomeB2C />} />
          <Route path="/ecommerce/seller" element={<SellerPage />} />
          <Route path="/ecommerce/seller/b2b" element={<Sellerb2b />} />
          <Route path="/ecommerce/b2b" element={<HomeB2B />} />
          <Route path="/ecommerce/cart" element={<CartPage />} />
          <Route path="/ecommerce/filter" element={<ProductFilterPage />} />
          <Route path="/ecommerce/product/:id" element={<Productdetails />} />
          <Route path="/social" element={<Social />} />
          <Route path="/how-it-works" element={<Howitworks />} />
          <Route path="/project-view" element={<Completeproductview />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/freelancer" element={<Freelancers />} />
          <Route
            path="/freelancer/browse-subcategory/:id"
            element={<Browsecategory />}
          />
          <Route
            path="/services/landscaping/:id"
            element={<Category />}
          />
          <Route path="/freelancer/home" element={<Mainfreelancers />} />
          <Route
            path="/freelancer/profile"
            element={<FreelancerProfile />}
          />
          <Route
            path="/freelancer/free-listing"
            element={<Freelisting />}
          />
          <Route
            path="/freelancer/create-business"
            element={<CreateBusiness />}
          />
          <Route
            path="/freelancer/business"
            element={<Businesspage />}
          />
          <Route
            path="/freelancer/registration"
            element={<Registration />}
          />
          <Route path="/interior/living-room" element={<LivingRoom />} />
          <Route path="/interior/bathroom" element={<Bathroom />} />
          <Route path="/interior/bedroom" element={<Bedroom />} />
          <Route path="/interior/modular-kitchen" element={<Kitchen />} />
          <Route path="/interior/study-room" element={<Studyroom />} />
          <Route path="/interior/wardrobe" element={<Wardrobe />} />
          <Route path="/magazines" element={<Magazine />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/customer/dashboard"
            element={<Customerdashboard />}
          />
          <Route
            path="/dashboard/:roleSlug/*"
            element={
              <PrivateRoute
                allowedRoles={["0", "1", "2", "3", "6", "5", "8", "7", "11"]}
              >
                <CmsApp />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LayoutWrapper>
  );
}

export default App;