import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Configurações para hot reload em Docker
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Polling a cada 1 segundo
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
