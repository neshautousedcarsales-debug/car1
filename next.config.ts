import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "brandfetch.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.brandfetch.io", pathname: "/**" },
      { protocol: "https", hostname: "asset.brandfetch.io", pathname: "/**" },
    ],
  },
};

export default nextConfig;
