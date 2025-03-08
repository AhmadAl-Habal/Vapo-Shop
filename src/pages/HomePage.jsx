import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import hero from "../assets/motion11.jpg";
import CategoriesSection from "../components/categories/CategoriesSection";
import AllProductsSection from "../components/products/AllProductsSection";

const HomePage = () => {
  return (
    <>
      <div className="relative bg-blue-50">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

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
