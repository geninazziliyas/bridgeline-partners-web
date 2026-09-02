/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Photographies de placeholder. A remplacer par les visuels de marque
      // (bureaux, equipe) avant mise en production. Voir README, section "Visuels".
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
};

module.exports = nextConfig;
