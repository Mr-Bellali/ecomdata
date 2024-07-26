"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/herp-1.jpg", alt: "smartwatch" },
  { imgUrl: "/assets/images/herp-2.jpg", alt: "bag" },
  { imgUrl: "/assets/images/herp-3.jpg", alt: "lamp" },
  { imgUrl: "/assets/images/herp-4.jpg", alt: "air fryer" },
  { imgUrl: "/assets/images/herp-5.jpg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        infiniteLoop
        // interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
