/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { s3Storage } from '@payloadcms/storage-s3';
import { type Block, buildConfig } from 'payload';
import sharp from 'sharp';

/* * */

import { createLexicalConfig, lexicalEditorConfig as nestedLexicalEditorConfig } from '@/configs/lexical-editor-config';
import { Campaigns } from '@/schemas/Campaigns/collection';
import { CaseStudies } from '@/schemas/CaseStudies/collection';
import { KnowledgeBase } from '@/schemas/KnowledgeBase/collection';
import { Media } from '@/schemas/Media/collection';
import { News } from '@/schemas/News/collection';
import { Notes } from '@/schemas/Notes/collection';
import { Projects } from '@/schemas/Projects/collection';
import { Topics } from '@/schemas/Topics/collection';
import { Users } from '@/schemas/Users/collection';

/* * */

import { Settings } from '@/globals/config';
import { Articles } from '@/schemas/Articles/collection';
import { Faqs } from '@/schemas/Faqs/collection';
import { FaqsNavegante } from '@/schemas/FaqsNavegante/collection';
import { GeneralStatus } from '@/schemas/GeneralStatus/global';
import { HomeSlider } from '@/schemas/HomeSlider/global';

/* * */

import { accordionFields } from '@/fields/accordion';
import { galleryFields } from '@/fields/gallery';
import { linkFields } from '@/fields/link';
import { createSectionFields } from '@/fields/section';
import { createSurfaceFields } from '@/fields/surface';
import { videoFields } from '@/fields/video';
import { CardBlock } from '@/lexical/layout/card';
import { ThreeColumnsTextBlock } from '@/lexical/layout/three-columns-text';
import { TwoColumnsTextBlock } from '@/lexical/layout/two-columns-text';
import { TwoColumnsTextImageBlock } from '@/lexical/layout/two-columns-text-image';

import { spacerFields } from './fields/spacer';

/* * */

const richTextBlocks: Block[] = [
	{
		fields: spacerFields,
		slug: 'spacer',
	},
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
	{
		admin: { group: 'Layout' },
		fields: createSectionFields(nestedLexicalEditorConfig),
		slug: 'section',
	},
	{
		admin: { group: 'Layout' },
		fields: createSurfaceFields(nestedLexicalEditorConfig),
		slug: 'surface',
	},
	{
		...ThreeColumnsTextBlock,
		admin: { group: 'Layout' },
	},
	{
		...TwoColumnsTextBlock,
		admin: { group: 'Layout' },
	},
	{
		...TwoColumnsTextImageBlock,
		admin: { group: 'Layout' },
	},
	{
		...CardBlock,
		admin: { group: 'Layout' },
	},
];

const mainLexicalEditorConfig = createLexicalConfig(richTextBlocks);

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
			collections: ['news', 'campaigns'],
			url: ({ collectionConfig, data }) => {
				if (!data?.id) return undefined;
				const base = getPublicVariable('server_url_frontend');
				const slug = collectionConfig?.slug as unknown as string | undefined;
				return slug === 'campaigns'
					? `${base}/campaigns/preview?id=${data.id}`
					: `${base}/news/preview?id=${data.id}`;
			},
		},
		meta: {
			description: 'Backoffice da CMetropolitana',
			title: 'Backoffice | CMetropolitana',
		},
		user: 'users',
	},

	collections: [Campaigns, Articles, CaseStudies, Media, News, Topics, Users, KnowledgeBase, Notes, Projects, Faqs, FaqsNavegante],

	csrf: [
		getPublicVariable('server_url_backoffice').replace(/\/$/, ''),
		`${getPublicVariable('server_url_backoffice').replace(/\/$/, '')}/admin`,
	],

	db: mongooseAdapter({ url: process.env.WEBSITEDB_URI ?? 'mongodb://placeholder:placeholder@placeholder:12345/placeholder' }),

	editor: mainLexicalEditorConfig,

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

	localization: {
		defaultLocale: 'pt-PT',
		fallback: true,
		locales: ['pt-PT', 'en'],
	},

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
