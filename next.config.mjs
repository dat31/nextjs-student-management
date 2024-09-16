console.log(
  `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`
);

console.log("domain", process.env.DOMAIN);

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "vi-VN"],
    defaultLocale: "en-US",
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
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
      allowedOrigins: [process.env.DOMAIN, "127.0.0.1:3000", "localhost:3000"],
    },
  },
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
};

export default nextConfig;
