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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-product" element={<AddNewProduct />} />

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
