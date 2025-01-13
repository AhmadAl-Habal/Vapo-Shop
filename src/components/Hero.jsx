import React, { useEffect, useState } from "react";
import hero from "../assets/hero.webp";
import axios from "../api/axios";
const Hero = () => {
  const [dollarValue, setDollarValue] = useState("");
  const [settings, setSettings] = useState({});
  const [heroImages, setHeroImages] = useState([]);
  
useEffect(() => {
 
  const fetchData = async () => {
    try {
      const response = await axios.get("/settings");
      if (response.status == "200") {
        const dollarPrice = response.data.data[0].dollar_price;
        
        setDollarValue(response.data.data[0].dollar_price);
        setHeroImages(response.data.data[0].hero);
        setSettings(response.data.data);
        sessionStorage.setItem("dollar_value", dollarPrice);
      } else setSettings(response.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCategories(false);
    }
  };
  fetchData();
  console.log(settings);
  
}, []);
  return (
    <>
      <section className="flex justify-center">
        <img
          className="w-full h-[300px] opacity-90 shadow-lg"
          src={hero}
          
          alt=""
        />
        {/* <p onClick={console.log(settings)
          }>test</p> */}
      </section>
    </>
  );
};

export default Hero;
