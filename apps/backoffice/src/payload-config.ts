/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { MentionFeature } from '@/lexical/mention/feature.server';
import { CaseStudies } from '@/schemas/CaseStudies/collection';
import { Media } from '@/schemas/Media/collection';
import { News } from '@/schemas/News/collection';
import { Topics } from '@/schemas/Topics/collection';
import { Users } from '@/schemas/Users/collection';

/* * */

import { GeneralStatus } from '@/schemas/GeneralStatus/global';
import { HomeSlider } from '@/schemas/HomeSlider/global';

import { accordionFields } from './fields/accordion';
import { galleryFields } from './fields/gallery';
import { videoFields } from './fields/video';

/* * */

export default buildConfig({

	admin: {
		livePreview: {
			collections: ['news'],
			url: ({ data }) => {
				if (!data?.id) return undefined;
				return `${getPublicVariable('server_url_frontend')}/news/${data.id}`;
			},
		},
		user: 'users',
	},

	collections: [CaseStudies, Media, News, Topics, Users],

	db: mongooseAdapter({ url: process.env.WEBSITEDB_URI ?? 'mongodb://placeholder:placeholder@placeholder:12345/placeholder' }),

	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			BlocksFeature({
				blocks: [
					{
						fields: accordionFields,
						slug: 'accordion',
					},
					{
						fields: galleryFields,
						slug: 'gallery',
					},
					{
						fields: videoFields,
						slug: 'video',
					},
				],
			}),
			MentionFeature(),
		],
	}),

	email: nodemailerAdapter({
		defaultFromAddress: process.env.EMAIL_FROM_ADDRESS ?? '',
		defaultFromName: process.env.EMAIL_FROM_NAME ?? '',
		skipVerify: true,
		transportOptions: {
			auth: {
				pass: process.env.EMAIL_SERVER_PASSWORD,
				user: process.env.EMAIL_SERVER_USER,
			},
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
		},
	}),

	globals: [
		GeneralStatus,
		HomeSlider,
	],

	plugins: [
		s3Storage({
			bucket: process.env.OCI_S3_NAMESPACE ?? 'placeholder', // Bucket should be the namespace in OCI Object Storage
			collections: {
				media: true,
			},
			config: {
				credentials: {
					accessKeyId: process.env.OCI_S3_ACCESS_KEY_ID ?? 'placeholder',
					secretAccessKey: process.env.OCI_S3_SECRET_ACCESS_KEY ?? 'placeholder',
				},
				endpoint: process.env.OCI_S3_ENDPOINT ?? 'https://placeholder.endpoint.com',
				region: process.env.OCI_S3_REGION ?? 'placeholder',
				requestHandler: {
					connectionTimeout: 5_000,
					httpAgent: {
						keepAlive: false,
						maxSockets: 300,
					},
					httpsAgent: {
						keepAlive: false,
						maxSockets: 300,
					},
					requestTimeout: 30_000,
				},
			},
		}),
	],

	routes: {
		admin: '/',
	},

	secret: process.env.PAYLOAD_SECRET || 'placeholder',

	serverURL: getPublicVariable('server_url_backoffice'),

	sharp: sharp,

});
