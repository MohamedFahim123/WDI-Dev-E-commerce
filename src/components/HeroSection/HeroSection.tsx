import Image from "next/image";
import GlobalSearchBar from "../GlobalSearchBar/GlobalSearchBar";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[460px] xl:h-[450px]">
        <Image
          src="/assets/home/152767e83a91bdde7d70a524884a1dc185c4a39d.png"
          alt="Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top object-right"
        />

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6 lg:hidden">
          <div className="w-full max-w-md">
            <GlobalSearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
