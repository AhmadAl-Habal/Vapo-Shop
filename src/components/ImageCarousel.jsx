import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const images = [
  "https://via.placeholder.com/600x400.png?text=Slide+1",
  "https://via.placeholder.com/600x400.png?text=Slide+2",
  "https://via.placeholder.com/600x400.png?text=Slide+3",
];

const ImageCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Carousel
      withIndicators
      height={isMobile ? 200 : 400}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      classNames={{
        indicator: "bg-gray-500 hover:bg-gray-700 transition-all",
      }}
    >
      {images.map((src, index) => (
        <Carousel.Slide key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
