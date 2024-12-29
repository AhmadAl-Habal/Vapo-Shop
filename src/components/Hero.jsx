import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
Link
const Hero = () => {
  return (
    <>
      {" "}
      <section className="py-2 mb-4 flex justify-center">
        <img className="w-full h-[200px] max-w-[500px]" src={logo} alt="" />
      </section>{" "}
      <div className="block"><Link to={"/add-product"}>Add new Product</Link></div>
    </>
  );
};

export default Hero;
