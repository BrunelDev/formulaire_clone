import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  images: {
    domains: ["mesplansdepermis.fr"],
  },
  output: "standalone",
};

export default nextConfig;
