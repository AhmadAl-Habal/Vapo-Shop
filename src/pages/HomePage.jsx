import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ProductsListing from "../components/ProductsListing";

import ViewAllJobs from "../components/ViewAllJobs";

const HomePage = () => {
  return (
    <><div className="bg-blue-50">
      <Hero />
      <ProductsListing isHome={true} />
      {/* <HomeCards />
      <ViewAllJobs /> */}
      </div>
    </>
  );
};

export default HomePage;
