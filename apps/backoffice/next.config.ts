/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	basePath: '/admin',
	experimental: {
		serverActions: {
			bodySizeLimit: '4gb', // 2GB max body size for file uploads
		},
	},
	images: {
		remotePatterns: [
			{
				hostname: '*.oraclecloud.com',
				port: '',
				protocol: 'https',
			},
		],
	},
	output: 'standalone',
	reactStrictMode: true,
};

/* * */

export default withPayload(nextConfig);
