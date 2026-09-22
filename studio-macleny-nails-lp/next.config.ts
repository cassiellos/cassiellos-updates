import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Todas as imagens sao locais (public/). Nenhum dominio remoto e permitido
    // de proposito: assets externos nao devem virar dependencia de producao.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
