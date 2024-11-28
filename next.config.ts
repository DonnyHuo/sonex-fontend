import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/swap",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return process.env.NEXT_PUBLIC_APP_ENV === "dev"
      ? [
          {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
          },
        ]
      : [];
  },
  images: {
    domains: [
      "token-icons.s3.amazonaws.com",
      "sonex-img.s3.ap-southeast-1.amazonaws.com",
      "s2.coinmarketcap.com",
    ],
  },
};

export default nextConfig;
