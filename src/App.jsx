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

// Welcome Spinner Component
const WelcomeSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 flex items-center justify-center bg-[#121212] z-50"
    >
      <motion.div
        className="text-white text-2xl font-bold"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Welcome To VAPO...
      </motion.div>
    </motion.div>
  );
};




const pageVariants = {
  initial: { x: "100vw", opacity: 0 },  // Start off-screen to the right
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { x: "-100vw", opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }, // Slide out to the left
};


// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div id="app-container" className="w-full h-screen bg-[#121212] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/add-product" element={<AddNewProduct />} />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/products/:id" element={<ProductsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/edit-faq/:id" element={<EditFAQPage />} />
              <Route path="/add-faq" element={<AddNewFAQPage />} />
              <Route path="/add-category" element={<AddNewCategoryPage />} />
              <Route path="/edit-category/:id" element={<EditCategoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </motion.div>
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
        {isLoading ? <WelcomeSpinner /> : <AnimatedRoutes />}
      </AnimatePresence>
    </Router>
  );
}

export default App;

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";
// import LoginPage from "./pages/users/LoginPage.jsx";
// import AddNewProduct from "./pages/prodcuts/AddNewProduct.jsx";
// import EditProductPage from "./pages/prodcuts/EditProductPage.jsx";
// import ProductPage from "./pages/prodcuts/ProductPage.jsx";
// import SettingsPage from "./pages/SettingsPage.jsx";
// import AboutUsPage from "./pages/AboutUsPage.jsx";
// import FAQPage from "./pages/FAQs/FAQPage.jsx";
// import EditFAQPage from "./pages/FAQs/EditFAQPage.jsx";
// import AddNewFAQPage from "./pages/FAQs/AddNewFAQPage.jsx";
// import ProductsPage from "./pages/prodcuts/ProductsPage.jsx";
// import Category from "./components/categories/Category.jsx";
// import AddNewCategoryPage from "./pages/categories/AddNewCategoryPage.jsx";
// import EditCategoryPage from "./pages/categories/EditCategoryPage.jsx";
// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/add-product" element={<AddNewProduct />} />
//         <Route path="/edit-product/:id" element={<EditProductPage />} />
//         <Route path="/product/:id" element={<ProductPage />} />
//         <Route path="/products/:id" element={<ProductsPage />} />
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/about-us" element={<AboutUsPage />} />
//         <Route path="/faq" element={<FAQPage />} />
//         <Route path="/edit-faq/:id" element={<EditFAQPage />} />
//         <Route path="/add-faq" element={<AddNewFAQPage />} />
//         <Route path="/add-category" element={<AddNewCategoryPage />} />
//         <Route path="/edit-category/:id" element={<EditCategoryPage />} />

//         <Route path="*" element={<NotFoundPage />} />
//         <Route path="/jobs/*" element={<NotFoundPage />} />
//       </Route>
//     )
//   );
//   return (
//     // <BrowserRouter>
//     //   <Routes>
//     //     <Route element={<MainLayout />}>
//     //       <Route index element={<HomePage />} />
//     //       <Route path="/jobs" element={<JobsPage />} />
//     //       <Route path="/add-job" element={<AddJobPage />} />
//     //       <Route path="*" element={<NotFoundPage />} />
//     //     </Route>
//     //   </Routes>
//     // </BrowserRouter>
//     <RouterProvider router={router} />
//   );
// }

// export default App;
