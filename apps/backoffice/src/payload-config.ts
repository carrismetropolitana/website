/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { Campaigns } from '@/schemas/Campaigns/collection';
import { CaseStudies } from '@/schemas/CaseStudies/collection';
import { KnowledgeBase } from '@/schemas/KnowledgeBase/collection';
import { Media } from '@/schemas/Media/collection';
import { News } from '@/schemas/News/collection';
import { Notes } from '@/schemas/Notes/collection';
import { Topics } from '@/schemas/Topics/collection';
import { Users } from '@/schemas/Users/collection';

/* * */

import { Settings } from '@/globals/config';
import { GeneralStatus } from '@/schemas/GeneralStatus/global';
import { HomeSlider } from '@/schemas/HomeSlider/global';

/* * */

import { accordionFields } from './fields/accordion';
import { galleryFields } from './fields/gallery';
import { linkFields } from './fields/link';
import { videoFields } from './fields/video';

/* * */

export default buildConfig({

	admin: {
		components: {
			graphics: {
				Icon: '@/graphics/Icon/index.tsx#Icons',
				Logo: '@/graphics/Logo/index.tsx#Logos',
			},
		},
		livePreview: {
			collections: ['news'],
			url: ({ data }) => {
				if (!data?.id) return undefined;
				return `${getPublicVariable('server_url_frontend')}/news/preview?id=${data.id}`;
			},
		},
		meta: {
			description: 'Backoffice da CMetropolitana',
			title: 'Backoffice | CMetropolitana',
		},
		user: 'users',
	},

	collections: [Campaigns, CaseStudies, Media, News, Topics, Users, KnowledgeBase, Notes],

	csrf: [
		getPublicVariable('server_url_backoffice').replace(/\/$/, ''),
		`${getPublicVariable('server_url_backoffice').replace(/\/$/, '')}/admin`,
	],

	db: mongooseAdapter({ url: process.env.WEBSITEDB_URI ?? 'mongodb://placeholder:placeholder@placeholder:12345/placeholder' }),

	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures.filter(f => f.key !== 'heading'),
			HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
			HeadingAnchorFeature(),
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
						fields: linkFields,
						slug: 'link',
					},
					{
						fields: videoFields,
						slug: 'video',
					},
				],
			}),
			BackgroundColorFeature(),
			EXPERIMENTAL_TableFeature(),
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
		Settings,
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

	serverURL: `${getPublicVariable('server_url_backoffice').replace(/\/$/, '')}/admin`,

	sharp: sharp,

});
