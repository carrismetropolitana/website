/* * */

import type { Block, Field } from 'payload';

import { galleryFields } from '@/fields/gallery';
import { linkFields } from '@/fields/link';
import { spacerFields } from '@/fields/spacer';
import { videoFields } from '@/fields/video';
import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

function createLexicalFeatures(blocks: readonly Block[]) {
	return ({ defaultFeatures }) => ([
		...defaultFeatures.filter(f => f.key !== 'heading'),
		BlocksFeature({ blocks: [...blocks] }),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		HeadingAnchorFeature(),
		BackgroundColorFeature(),
		EXPERIMENTAL_TableFeature(),
		MentionFeature(),
	]);
}

function createLexicalFeaturesNoBlocks() {
	return ({ defaultFeatures }) => ([
		...defaultFeatures.filter(f => f.key !== 'heading'),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		HeadingAnchorFeature(),
		BackgroundColorFeature(),
		EXPERIMENTAL_TableFeature(),
		MentionFeature(),
	]);
}

/* * */

const nestedRichTextEditorNoBlocks = lexicalEditor({
	features: createLexicalFeaturesNoBlocks(),
});

const SAFE_NESTED_BLOCKS: Block[] = [
	{
		fields: spacerFields,
		slug: 'spacer',
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
		fields: [
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Coluna esquerda',
				name: 'leftColumn',
				required: true,
				type: 'richText',
			},
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Coluna centro',
				name: 'centerColumn',
				required: true,
				type: 'richText',
			},
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Coluna direita',
				name: 'rightColumn',
				required: true,
				type: 'richText',
			},
		] as Field[],
		labels: {
			plural: 'Três colunas (texto)',
			singular: 'Três colunas (texto)',
		},
		slug: 'three-columns-text',
	},
	{
		admin: { group: 'Layout' },
		fields: [
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Coluna esquerda',
				name: 'leftColumn',
				required: true,
				type: 'richText',
			},
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Coluna direita',
				name: 'rightColumn',
				required: true,
				type: 'richText',
			},
		] as Field[],
		labels: {
			plural: 'Duas colunas (texto)',
			singular: 'Duas colunas (texto)',
		},
		slug: 'two-columns-text',
	},
	{
		admin: { group: 'Layout' },
		fields: [
			{
				editor: nestedRichTextEditorNoBlocks,
				label: 'Texto',
				name: 'text',
				required: true,
				type: 'richText',
			},
			{
				filterOptions: () => ({
					mimeType: {
						in: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
					},
				}),
				label: 'Imagem',
				name: 'image',
				relationTo: 'media',
				required: true,
				type: 'relationship',
			},
			{
				defaultValue: 'right',
				label: 'Posição da imagem',
				name: 'imagePosition',
				options: [
					{ label: 'Esquerda', value: 'left' },
					{ label: 'Direita', value: 'right' },
				],
				type: 'radio',
			},
		] as Field[],
		labels: {
			plural: 'Duas colunas (texto + imagem)',
			singular: 'Duas colunas (texto + imagem)',
		},
		slug: 'two-columns-text-image',
	},
	{
		admin: { group: 'Layout' },
		fields: [
			{
				admin: {
					components: {
						Field: '@/components/ButtonColorField#ButtonColorField',
					},
				},
				defaultValue: '#ffdd01',
				label: 'Cor da borda (hex/rgb)',
				name: 'borderColor',
				type: 'text',
			},
			{
				admin: {
					components: {
						Field: '@/components/ButtonColorField#ButtonColorField',
					},
				},
				defaultValue: '#ffdd01',
				label: 'Cor primária (hex/rgb)',
				name: 'primaryColor',
				type: 'text',
			},
			{
				admin: {
					components: {
						Field: '@/components/ButtonColorField#ButtonColorField',
					},
				},
				defaultValue: '#000000',
				label: 'Cor do texto (hex/rgb)',
				name: 'textColor',
				type: 'text',
			},
			{
				admin: {
					initCollapsed: false,
				},
				defaultValue: [],
				fields: [
					{
						label: 'Título do cartão',
						name: 'title',
						required: true,
						type: 'text',
					},
					{
						label: 'Número (ex: 25m)',
						name: 'number',
						required: true,
						type: 'text',
					},
					{
						label: 'Imagem (opcional)',
						name: 'image',
						relationTo: 'media',
						type: 'relationship',
					},
					{
						label: 'Texto no conteúdo (opcional)',
						name: 'description',
						type: 'textarea',
					},
				] as Field[],
				label: 'Cartões para stack',
				minRows: 1,
				name: 'cards',
				type: 'array',
			},
		] as Field[],
		labels: {
			plural: 'Card',
			singular: 'Card',
		},
		slug: 'card',
	},
];

const nestedRichTextEditorSafeBlocks = lexicalEditor({
	features: ({ defaultFeatures }) => ([
		...createLexicalFeaturesNoBlocks()({ defaultFeatures }),
		BlocksFeature({ blocks: SAFE_NESTED_BLOCKS }),
	]),
});

const FULL_NESTED_BLOCKS: Block[] = [
	...SAFE_NESTED_BLOCKS,
	{
		fields: [
			{
				admin: {
					initCollapsed: false,
				},
				defaultValue: [],
				fields: [
					{
						label: 'Título',
						name: 'title',
						required: true,
						type: 'text',
					},
					{
						editor: nestedRichTextEditorSafeBlocks,
						label: 'Conteúdo',
						name: 'content',
						required: true,
						type: 'richText',
					},
				],
				label: 'Accordion',
				name: 'accordion',
				type: 'array',
			},
		] as Field[],
		slug: 'accordion',
	},
	{
		admin: { group: 'Layout' },
		fields: [
			{
				defaultValue: false,
				label: 'Com Espaçamento Entre Elementos',
				name: 'withGap',
				type: 'checkbox',
			},
			{
				defaultValue: false,
				label: 'Com Divisor Inferior',
				name: 'withBottomDivider',
				type: 'checkbox',
			},
			{
				defaultValue: 'none',
				label: 'Padding',
				name: 'withPadding',
				options: [
					{ label: 'Sem padding', value: 'none' },
					{ label: 'Desktop', value: 'desktop' },
					{ label: 'Mobile', value: 'mobile' },
					{ label: 'Desktop + Mobile', value: 'all' },
				],
				type: 'select',
			},
			{
				editor: nestedRichTextEditorSafeBlocks,
				label: 'Conteúdo',
				name: 'content',
				required: true,
				type: 'richText',
			},
		] as Field[],
		slug: 'section',
	},
	{
		admin: { group: 'Layout' },
		fields: [
			{
				defaultValue: false,
				label: 'Full Height',
				name: 'fullHeight',
				type: 'checkbox',
			},
			{
				defaultValue: false,
				label: 'Force Overflow',
				name: 'forceOverflow',
				type: 'checkbox',
			},
			{
				editor: nestedRichTextEditorSafeBlocks,
				label: 'Conteúdo',
				name: 'content',
				required: true,
				type: 'richText',
			},
		] as Field[],
		slug: 'surface',
	},
];

export function createLexicalConfig(blocks: readonly Block[]) {
	return lexicalEditor({
		features: createLexicalFeatures(blocks),
	});
}

// Adds custom blocks to nested richText editors without infinite recursion.
export const lexicalEditorConfig = lexicalEditor({
	features: ({ defaultFeatures }) => ([
		...createLexicalFeaturesNoBlocks()({ defaultFeatures }),
		BlocksFeature({ blocks: FULL_NESTED_BLOCKS }),
	]),
});

export const lexicalEditorConfigColumn = lexicalEditorConfig;
