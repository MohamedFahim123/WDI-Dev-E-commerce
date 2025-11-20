"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Container from "../Container/Container";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <Image
          width={40}
          height={37}
          src={"/assets/home/support.svg"}
          alt="Support Icon"
          className="w-auto h-auto object-contain"
        />
      ),
      title: "Support 24/7",
      subtitle: "Top quality 24/7 Support",
    },
    {
      icon: (
        <Image
          width={40}
          height={37}
          src={"/assets/home/shipping.svg"}
          alt="shipping Icon"
          className="w-auto h-auto object-contain"
        />
      ),
      title: "Free Shipping",
      subtitle: "Free shipping over 1000 AED",
    },
    {
      icon: (
        <Image
          width={40}
          height={37}
          src={"/assets/home/lock.svg"}
          alt="lock Icon"
          className="w-auto h-auto object-contain"
        />
      ),
      title: "Payment Secure",
      subtitle: "Got 100% Payment Safe",
    },
    {
      icon: (
        <Image
          width={40}
          height={37}
          src={"/assets/home/money_back.svg"}
          alt="money back Icon"
          className="w-auto h-auto object-contain"
        />
      ),
      title: "100% Money Back",
      subtitle: "Customers Money Backs",
    },
    {
      icon: (
        <Image
          width={40}
          height={37}
          src={"/assets/home/like.svg"}
          alt="like Icon"
          className="w-auto h-auto object-contain"
        />
      ),
      title: "Quality Products",
      subtitle: "We Ensure Product Quality",
    },
  ];

  return (
    <section>
      <div className="py-6 md:py-10">
        <Container className=" overFlowHidden cursor-grab">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="pl-2">
              {features.map((item, i) => (
                <CarouselItem
                  key={i}
                  className="
                  pl-2
                  flex-shrink-0
                  basis-full 
                  sm:basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4 
                  xl:basis-1/5
                "
                >
                  <Feature {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-[#FFF5EE] px-4 py-3 rounded-md w-full h-full">
      <div className="p-2 bg-green-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-[#009152]">{title}</span>
        <span className="text-sm text-[#5F5D5D]">{subtitle}</span>
      </div>
    </div>
  );
}
