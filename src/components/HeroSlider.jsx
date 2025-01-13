import React, { useState, useEffect } from "react";

const HeroSlider = ({ heroImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  // Handlers for arrows
  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length
      );
      setIsTransitioning(false);
    }, 500); // Match duration of CSS transition
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      setIsTransitioning(false);
    }, 500); // Match duration of CSS transition
  };

  return (
    <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden shadow-lg">
      <div
        className={`w-full h-full flex transition-transform duration-500 ease-in-out ${
          isTransitioning ? "transform translate-x-0" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
      >
        &#8592; {/* Left Arrow Symbol */}
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
      >
        &#8594; {/* Right Arrow Symbol */}
      </button>
    </section>
  );
};

export default HeroSlider;
