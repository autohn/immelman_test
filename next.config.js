/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["avatars.mds.yandex.net"],
  },
  env: {
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
  },
};

module.exports = nextConfig;
