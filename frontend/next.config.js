/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  i18n: {
    locales: ['pt-PT' /* ,'en-US' */],
    defaultLocale: 'pt-PT',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.carrismetropolitana.pt',
        port: '',
        // pathname: '/account123/**'
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/horarios',
        destination: '/lines',
        permanent: true,
      },
      {
        source: '/paragens',
        destination: '/stops',
        permanent: true,
      },
      {
        source: '/espacos-navegante',
        destination: '/encm',
        permanent: true,
      },
      {
        source: '/helpdesks',
        destination: '/encm',
        permanent: true,
      },
    ];
  },
};
