import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // eslint 설정에 대해 build 시 무시, 안하면 build 시 lint 에 대해 모두 error 지적
  }
};

export default nextConfig;
