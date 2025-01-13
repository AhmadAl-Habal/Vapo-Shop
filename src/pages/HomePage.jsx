import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";

import ProductsSection from "../components/ProductsSection";

const HomePage = () => {
 
  return (
    <>
      <div className="bg-blue-50">
        <Hero />
        <ProductsSection isHome={true} />
      </div>
    </>
  );
};

export default HomePage;
