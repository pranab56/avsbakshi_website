import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        '10.10.7.98:3000',
        '10.10.7.98',
        '10.10.7.37:3000',
        '10.10.7.37',
        'localhost:3000',
        '192.168.1.202',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.rizipt.com',
      },
      {
        protocol: 'https',
        hostname: 'api.zilahomes.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mamp.one',
      },
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'media.thecloudsalon.com',
      },
      {
        protocol: 'https',
        hostname: 'api.thecloudsalon.com',
      },
      {
        protocol: 'https',
        hostname: 'thecloudsalon.com',
      },
      {
        protocol: 'https',
        hostname: '**.thecloudsalon.com',
      },
      {
        protocol: 'https',
        hostname: 'api.oriencorapiddelivery.com',
      },
      {
        protocol: 'http',
        hostname: '10.10.26.188',
      },
    ],
  },
};

export default nextConfig;
