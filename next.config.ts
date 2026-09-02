import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  ...(isGitHubPages
    ? {
        basePath: "/rent-a-bot",
        assetPrefix: "/rent-a-bot",
      }
    : {}),
};

export default nextConfig;
