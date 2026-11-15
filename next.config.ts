import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is prerendered and there are no server actions or API routes,
  // so the whole site exports to plain HTML that any static host can serve.
  output: "export",

  // Emits `concrete-calculator/index.html` rather than `concrete-calculator.html`.
  // Apache serves the directory index automatically, so clean URLs work on
  // shared hosting with no rewrite rules at all.
  trailingSlash: true,

  // Pinned because a lockfile higher up the tree makes the inferred root wrong.
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["lucide-react"] },
};

export default nextConfig;
