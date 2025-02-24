import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/users/LoginPage.jsx";
import AddNewProduct from "./pages/prodcuts/AddNewProduct.jsx";
import EditProductPage from "./pages/prodcuts/EditProductPage.jsx";
import ProductPage from "./pages/prodcuts/ProductPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import FAQPage from "./pages/FAQs/FAQPage.jsx";
import EditFAQPage from "./pages/FAQs/EditFAQPage.jsx";
import AddNewFAQPage from "./pages/FAQs/AddNewFAQPage.jsx";
import ProductsPage from "./pages/prodcuts/ProductsPage.jsx";
import AddNewCategoryPage from "./pages/categories/AddNewCategoryPage.jsx";
import EditCategoryPage from "./pages/categories/EditCategoryPage.jsx";
import PageWrapper from "./PageWrapper.jsx";
import motionBg from "./assets/motion.jpg";
import motionBg2 from "./assets/motion2.jpg";
// Welcome Spinner Component
const WelcomeSpinner = ({ motionBg }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 flex justify-center z-50"
      style={{
        backgroundImage: `url(${motionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#121212",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <p className="text-white text-4xl font-bold mt-[200px]">
          Welcome To VAPO...
        </p>
      </motion.div>
    </motion.div>
  );
};

const pageVariants = {
  initial: { x: "100vw", opacity: 0 }, // Start off-screen to the right
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  }, // Slide out to the left
};

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div
      id="app-container"
      className="w-full min-h-screen bg-[#000]"
      style={{
        backgroundImage: `url(${motionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <LoginPage />
                </PageWrapper>
              }
            />
            <Route
              path="/add-product"
              element={
                <PageWrapper>
                  <AddNewProduct />
                </PageWrapper>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <PageWrapper>
                  <EditProductPage />
                </PageWrapper>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageWrapper>
                  <ProductPage />
                </PageWrapper>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PageWrapper>
                  <ProductsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/settings"
              element={
                <PageWrapper>
                  <SettingsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/about-us"
              element={
                <PageWrapper>
                  <AboutUsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/faq"
              element={
                <PageWrapper>
                  <FAQPage />
                </PageWrapper>
              }
            />
            <Route
              path="/edit-faq/:id"
              element={
                <PageWrapper>
                  <EditFAQPage />
                </PageWrapper>
              }
            />
            <Route
              path="/add-faq"
              element={
                <PageWrapper>
                  <AddNewFAQPage />
                </PageWrapper>
              }
            />
            <Route
              path="/add-category"
              element={
                <PageWrapper>
                  <AddNewCategoryPage />
                </PageWrapper>
              }
            />
            <Route
              path="/edit-category/:id"
              element={
                <PageWrapper>
                  <EditCategoryPage />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFoundPage />
                </PageWrapper>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Show spinner for 2 seconds
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <WelcomeSpinner motionBg={motionBg} />
        ) : (
          <AnimatedRoutes />
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
