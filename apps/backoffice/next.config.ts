/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	basePath: '/admin',
	experimental: {
		serverActions: {
			bodySizeLimit: '4gb',
		},
	},
	images: {
		dangerouslyAllowLocalIP: true,
		remotePatterns: [
			{
				hostname: 'localhost',
				pathname: '/**',
				port: '49001',
				protocol: 'http',
			},
			{
				hostname: 'staging.carrismetropolitana.pt',
				pathname: '/**',
				protocol: 'https',
			},
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
