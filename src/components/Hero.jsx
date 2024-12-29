import React from "react";
import hero from "../assets/hero.webp";

const Hero = () => {
  return (
    <>
      <section className="mb-4 flex justify-center">
        <img className="w-full h-[300px]" src={hero} alt="" />
      </section>
    </>
  );
};

export default Hero;
