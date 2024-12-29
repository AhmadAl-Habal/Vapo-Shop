import React from "react";
import hero from "../assets/hero.webp";
import { Link } from "react-router-dom";
Link;
const Hero = () => {
  return (
    <>
     
      <section className="py-2 mb-4 flex justify-center">
        <img className="w-full h-[300px]" src={hero} alt="" />
      </section>
      <div className="block">
        <Link to={"/add-product"}>Add new Product</Link>
      </div>
    </>
  );
};

export default Hero;
