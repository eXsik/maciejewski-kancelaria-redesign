import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Keep Next.js type-checking in-process; the CLI subprocess currently
    // drops --showConfig output under this Linux/Node combination.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
