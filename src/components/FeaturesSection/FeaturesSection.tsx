"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Container from "../Container/Container";
import Autoplay from "embla-carousel-autoplay";

export default function FeaturesSection() {
  const features = [
    {
      icon: "/assets/home/support.svg",
      title: "Support 24/7",
      subtitle: "Top quality 24/7 support",
    },
    {
      icon: "/assets/home/shipping.svg",
      title: "Free Shipping",
      subtitle: "Free shipping over 1000 AED",
    },
    {
      icon: "/assets/home/lock.svg",
      title: "Payment Secure",
      subtitle: "100% Payment Safe",
    },
    {
      icon: "/assets/home/money_back.svg",
      title: "100% Money Back",
      subtitle: "Customers Money Back Guarantee",
    },
    {
      icon: "/assets/home/like.svg",
      title: "Quality Products",
      subtitle: "We Ensure Product Quality",
    },
  ];

  return (
    <section className="py-6 md:py-10 bg-white">
      <Container className="overflow-hidden cursor-grab">
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
            {features.map((item, i) => (
              <CarouselItem
                key={i}
                className="
                  pl-2
                  flex-shrink-0
                  basis-1/2
                  sm:basis-1/2
                  md:basis-1/3
                  lg:basis-1/4
                  xl:basis-1/5
                "
              >
                <FeatureCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        flex items-center gap-3 
        bg-[#FFF5EE] hover:bg-[#FFF0E5] transition-colors
        px-3 sm:px-4 py-3 sm:py-4
        rounded-md shadow-sm hover:shadow-md
        w-full h-full
      "
    >
      <div
        className="
          p-2 sm:p-3 bg-green-100 rounded-full 
          flex items-center justify-center flex-shrink-0
        "
      >
        <Image
          src={icon}
          alt={title}
          width={36}
          height={36}
          className="object-contain w-6 h-6 sm:w-8 sm:h-8"
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span
          title={title}
          className="font-semibold text-[#008249] text-sm sm:text-base truncate"
        >
          {title}
        </span>
        <span
          title={subtitle}
          className="text-xs sm:text-sm text-[#5F5D5D] truncate"
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
