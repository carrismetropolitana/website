/* * */

import withNextIntlFn from 'next-intl/plugin'
// const withNextIntl = require('next-intl/plugin')();

/* * */
const withNextIntl = withNextIntlFn()

export default withNextIntl({
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
      { destination: '/alerts', permanent: true, source: '/alertas' },
      //
      { destination: '/stops', permanent: true, source: '/paragens' },
      //
      { destination: '/lines', permanent: true, source: '/horarios' },
      //
      { destination: '/vehicles', permanent: true, source: '/veiculos' },
      //
      { destination: '/stores', permanent: true, source: '/encm' },
      { destination: '/stores', permanent: true, source: '/espacos-navegante' },
      //
    ]
  },
})
