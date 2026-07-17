import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ubra.shop",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
