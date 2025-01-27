import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref for autoplay
  // const autoplay = useRef(
  //   Autoplay({ delay: 3000, stopOnInteraction: false })
  // );

  // Fetch hero images
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/settings");
        if (response.status === 200) {
          setHeroImages(response.data.data[0]?.hero || []); // Safely access hero images
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup autoplay plugin
    // return () => {
    //   if (autoplay.current) {
    //     autoplay.current.destroy(); // Ensure proper cleanup
    //   }
    // };
  }, []);

  // Map over the heroImages to create slides
  const slides = heroImages.map((url, index) => (
    <Carousel.Slide key={index}>
      <img
        src={url}
        alt={`Hero Slide ${index}`}
        className="w-full h-full object-cover"
      />
    </Carousel.Slide>
  ));

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center"></div>
      ) : (
        <Carousel
          slideSize="100%"
          height={400} // Set the desired height
          slideGap="md"
          controlSize={24}
          loop
          withIndicators
          withControls
          // plugins={[autoplay.current]}
          // onMouseEnter={() => autoplay.current?.stop()}
          // onMouseLeave={() => autoplay.current?.reset()}
        >
          {slides}
        </Carousel>
      )}
    </div>
  );
};

export default Hero;
