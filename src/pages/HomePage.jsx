import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ProductsSection from "../components/ProductsSection";

import ViewAllJobs from "../components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <div className="bg-blue-50">
        <Hero />
        <ProductsSection isHome={true} />
        {/* <HomeCards />
      <ViewAllJobs /> */}
      </div>
    </>
  );
};

export default HomePage;
