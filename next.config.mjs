/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "vi-VN"],
    defaultLocale: "en-US",
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        pathname: "**",
        hostname: `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`,
      },
      {
        pathname: "**",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    serverActions: {
      bodySizeLimit: "3mb",
      allowedOrigins: ["localhost:3000", "danang-real-estate.click"],
    },
  },
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
};

export default nextConfig;
