import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "example.com" },
      {
        protocol: "https",
        hostname: "wdione.com",
        pathname: "/web/image/**",
      },
    ],
  },
};

export default nextConfig;
