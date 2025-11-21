import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="w-full">
        <Image
          src="/assets/home/hero_banner.webp"
          alt="Hero Banner"
          width={1425}
          height={386}
          priority
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
