import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mdxeditor/editor", "react-diff-view"],
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },

  // output: "export",
  //output: "standalone",
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

const withMDX = createMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
export default withMDX(nextConfig);
