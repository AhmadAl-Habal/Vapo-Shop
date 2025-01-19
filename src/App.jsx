import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

import HomePage from "./pages/HomePage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AddNewProduct from "./pages/AddNewProduct.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import EditFAQPage from "./pages/EditFAQPage.jsx";
import AddNewFAQPage from "./pages/AddNewFAQPAge.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-product" element={<AddNewProduct />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/edit-faq/:id" element={<EditFAQPage />} />
        <Route path="/add-faq" element={<AddNewFAQPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/jobs/*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<MainLayout />}>
    //       <Route index element={<HomePage />} />
    //       <Route path="/jobs" element={<JobsPage />} />
    //       <Route path="/add-job" element={<AddJobPage />} />
    //       <Route path="*" element={<NotFoundPage />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}

export default App;
