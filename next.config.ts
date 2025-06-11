/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  }
  /* experimental: {
    turbo: false, // Desative o TurboPack temporariamente
    appDir: true
  }, */
};

module.exports = nextConfig;