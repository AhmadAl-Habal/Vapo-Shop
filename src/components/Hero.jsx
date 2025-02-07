import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

import SwiperCarousel from "./SwiperCarousel";
import Spinner from "./Spinner";

const Hero = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/settings");
        if (response.status === 200) {
          setHeroImages(response.data.data[0]?.hero || []);
          sessionStorage.setItem(
            "settings",
            JSON.stringify(response.data.data[0] || [])
          );
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedSettings = JSON.stringify(sessionStorage.getItem("settings"));

    setHeroImages(storedSettings.hero);
  }, []);

  return (
    <div className="w-full bg-black h-[300px]">
      {loading ? <Spinner></Spinner> : <SwiperCarousel images={heroImages} />}
    </div>
  );
};

export default Hero;
