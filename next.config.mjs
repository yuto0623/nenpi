import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
};


const withPWAConfig = withPWA({
  disable: process.env.NODE_ENV === 'development',
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPWAConfig(nextConfig)