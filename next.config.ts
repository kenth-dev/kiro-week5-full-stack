import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't infer a parent dir from stray lockfiles.
  turbopack: {
    root: process.cwd(),
  },
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
