import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[360px]">
        <Image
          src="/assets/home/hero_banner.webp"
          alt="Hero Banner"
          fill
          priority
        />
      </div>
    </section>
  );
}
