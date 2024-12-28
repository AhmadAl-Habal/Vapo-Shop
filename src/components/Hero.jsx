import React from "react";
import logo from "../assets/logo.png";
const Hero = () => {
  return (
    <section className="py-2 mb-4 flex justify-center">
      <img className="w-full h-[200px] max-w-[500px]" src={logo} alt="" />
    </section>
  );
};

export default Hero;
