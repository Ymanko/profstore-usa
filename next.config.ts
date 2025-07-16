/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Увімкнено для оптимізації стилів і кешування
    inlineCss: true,
  // // Дозволені домени для крос-доменного доступу в dev-режимі
  // allowedDevOrigins: ['https://bdc3-47-187-144-82.ngrok-free.app'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};

export default nextConfig;