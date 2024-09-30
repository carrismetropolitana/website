/* * */

import createNextIntlPlugin from 'next-intl/plugin'

/* * */

const withNextIntl = createNextIntlPlugin()

/* * */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.carrismetropolitana.pt',
        port: '',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      //
      // { destination: '/alerts', permanent: true, source: '/alertas' },
      // //
      // { destination: '/stops', permanent: true, source: '/paragens' },
      // //
      { destination: '/lines', permanent: true, source: '/horarios' },
      // //
      { destination: '/vehicles', permanent: true, source: '/veiculos' },
      // //
      { destination: '/stores', permanent: true, source: '/encm' },
      // { destination: '/stores', permanent: true, source: '/espacos-navegante' },
      //
    ]
  },
}

/* * */

export default withNextIntl(nextConfig)
