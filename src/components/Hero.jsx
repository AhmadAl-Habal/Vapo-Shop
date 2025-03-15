import React, { useEffect, useState } from "react";
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
            JSON.stringify(response.data.data[0] || {})
          );
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const storedSettings = sessionStorage.getItem("settings");

    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setHeroImages(parsedSettings.hero || []);
    }
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full bg-black h-[85vh] min-h-[400px] mb-5">
      <SwiperCarousel images={heroImages} />
    </div>
  );
};

export default Hero;
