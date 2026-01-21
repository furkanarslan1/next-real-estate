import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jtfzfsjajrxacfymnuxl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // Sadece storage içindeki public dosyalara izin verir
      },
    ],
  },
};

export default nextConfig;
