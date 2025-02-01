import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperCarousel = ({ images }) => {
  return (
    <>
      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            color: red !important;
            font-size: 40px !important; /* Reduce icon size */
            width: 50px !important; /* Reduce button width */
            height: 50px !important; /* Reduce button height */
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 30px !important; /* Reduce arrow size */
          }

          .swiper-pagination-bullet {
            background: gray;
          }

          .swiper-pagination-bullet-active {
            background: red !important;
          }
        `}
      </style>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperCarousel;
