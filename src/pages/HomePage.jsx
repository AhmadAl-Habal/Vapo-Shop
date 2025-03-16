import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import hero from "../assets/motion11.jpg";
import CategoriesSection from "../components/categories/CategoriesSection";
import AllProductsSection from "../components/products/AllProductsSection";

const HomePage = () => {
  return (
    <>
      <div className="relative ">
        <div className="relative z-10">
          <Hero />
          <CategoriesSection isHome={true} />
          <AllProductsSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
