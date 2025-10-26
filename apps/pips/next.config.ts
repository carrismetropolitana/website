/* * */

import { type NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/* * */

const nextConfig: NextConfig = {

	basePath: '/pips',

	output: 'standalone',

	reactStrictMode: true,

};

/* * */

export default createNextIntlPlugin()(nextConfig);
