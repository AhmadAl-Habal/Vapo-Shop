import React, { useEffect, useState } from "react";
import hero from "../assets/hero.webp";
import axios from "../api/axios";
import HeroSlider from "./HeroSlider";
const Hero = () => {
  const [dollarValue, setDollarValue] = useState("");
  const [settings, setSettings] = useState({});
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");
        if (response.status == "200") {
          const dollarPrice = response.data.data[0].dollar_price;

          setDollarValue(response.data.data[0].dollar_price);
          setHeroImages(response.data.data[0].hero);
          setSettings(response.data.data);
          sessionStorage.setItem(
            "settings",
            JSON.stringify(response.data.data[0])
          );
          sessionStorage.setItem("dollar_value", dollarPrice);
        } else setSettings(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <HeroSlider heroImages={heroImages} />
    </>
  );
};

export default Hero;
