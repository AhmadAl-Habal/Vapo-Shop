import React, { useEffect, useState } from "react";
import SwiperCarousel from "./SwiperCarousel";
import Spinner from "./Spinner";

const Hero = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true); // Default to true to wait for sessionStorage

  useEffect(() => {
    const storedSettings = sessionStorage.getItem("settings");

    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setHeroImages(parsedSettings.hero || []);
      setLoading(false); // Stop loading if settings exist
    } else {
      setLoading(false); // If no settings, just stop loading
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
