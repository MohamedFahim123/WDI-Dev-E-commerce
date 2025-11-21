"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Container from "../Container/Container";

export default function ImagesBanner() {
  const images = [
    "/assets/home/slider/image2.png",
    "/assets/home/slider/image3.png",
    "/assets/home/slider/image4.png",
    "/assets/home/slider/image5.png",
    "/assets/home/slider/image6.png",
    "/assets/home/slider/image2.png",
    "/assets/home/slider/image3.png",
    "/assets/home/slider/image4.png",
    "/assets/home/slider/image5.png",
    "/assets/home/slider/image6.png",
  ];

  return (
    <section>
      <Container className="py-10 overFlowHidden cursor-grab">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="pl-2">
            {images.map((src, i) => (
              <CarouselItem
                key={i}
                className="
                pl-2
                flex-shrink-0
                basis-1/2
                sm:basis-1/2 
                md:basis-1/3 
                lg:basis-1/5 
                xl:basis-1/6 
              "
              >
                <div className="p-2 rounded-md bg-white shadow-sm">
                  <Image
                    width={300}
                    height={300}
                    src={src}
                    alt={`Image ${i + 1}`}
                    className="w-full h-60 object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
}
