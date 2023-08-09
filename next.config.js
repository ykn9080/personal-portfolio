/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.ipregistry.co",
        port: "",
        pathname: "/flags/noto/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/gitdagray/test-blogposts/main/images/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/ykn9080/personal-contents/main/images/**",
      },
    ],
  },
  // i18n: {
  //   locales: ["en", "kr"],
  //   defaultLocale: "kr",
  // },
};

module.exports = nextConfig;
