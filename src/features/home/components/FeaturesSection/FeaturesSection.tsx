"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/src/components/ui/carousel";
import Container from "@/src/components/Container/Container";
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
    <section className="bg-white py-6 md:py-10">
      <Container className="overflow-hidden">
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
                  basis-[90%] 
                  sm:basis-[60%]
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

export function FeatureCard({
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
        flex items-start gap-3
        h-full
        w-full min-w-[220px]
        rounded-md bg-[#FFF5EE]
        px-3 py-3 shadow-sm
        transition-colors hover:bg-[#FFF0E5] hover:shadow-md
        sm:px-4 sm:py-4
      "
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 p-2 sm:h-12 sm:w-12 sm:p-3">
        <Image
          src={icon}
          alt={title}
          width={36}
          height={36}
          className="h-6 w-6 object-contain sm:h-8 sm:w-8"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-snug text-[#008249] sm:text-base whitespace-normal">
          {title}
        </span>
        <span className="mt-0.5 text-xs leading-snug text-[#5F5D5D] sm:text-sm whitespace-normal">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

