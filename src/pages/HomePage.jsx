import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";

import CategoriesSection from "../components/categories/CategoriesSection";

const HomePage = () => {
  return (
    <>
      <div className="bg-blue-50">
        <Hero />
        <CategoriesSection isHome={true} />
      </div>
    </>
  );
};

export default HomePage;
