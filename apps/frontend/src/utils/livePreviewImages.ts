/* eslint-disable @typescript-eslint/no-explicit-any */
/* * */

import { fetchMedia, getImageId, hasMediaUrl } from '@/utils/media';

/* * */

function toGalleryImageFormat(media: any) {
	return {
		value: {
			filename: media.filename,
			height: media.height,
			id: media.id,
			mimeType: media.mimeType,
			url: media.url,
			width: media.width,
		},
	};
}

/* * */

export async function processGalleryImages(images: any[], prevImages: any[]): Promise<any[]> {
	return Promise.all(
		images.map(async (item) => {
			if (hasMediaUrl(item)) return item;

			const id = getImageId(item);
			if (!id) return item;

			const matched = prevImages?.find(old => getImageId(old) === id);
			if (matched) return matched;

			const media = await fetchMedia(id);
			return media ? toGalleryImageFormat(media) : item;
		}),
	);
}

/* * */

export async function processUploadNode(node: any): Promise<any> {
	if (!node) return node;

	if (node.type === 'upload') {
		const value = node.value;
		if (value && typeof value === 'object' && value.url) return node;

		const id = value != null ? (typeof value === 'object' ? value?.id : String(value)) : null;
		if (id) {
			const media = await fetchMedia(id);
			if (media) return { ...node, value: media };
		}
		return node;
	}

	if (Array.isArray(node.children)) {
		const processedChildren = await Promise.all(node.children.map(processUploadNode));
		return { ...node, children: processedChildren };
	}

	return node;
}

/* * */

export async function processLayoutImages(layout: any[], prevLayout?: any[]): Promise<any[]> {
	if (!Array.isArray(layout)) return layout;

	return Promise.all(
		layout.map(async (block, index) => {
			if (block?.blockType !== 'two-columns-text-image' || !block.image) return block;

			const image = block.image;
			if (hasMediaUrl(image)) return block;

			const id = getImageId(image);
			if (!id) return block;

			const prevBlock = prevLayout?.[index];
			const prevImage = prevBlock?.blockType === 'two-columns-text-image' ? prevBlock.image : undefined;
			if (prevImage && getImageId(prevImage) === id && hasMediaUrl(prevImage)) {
				return { ...block, image: prevImage };
			}

			const media = await fetchMedia(id);
			return media ? { ...block, image: media } : block;
		}),
	);
}

/* * */

export async function processBodyImages(body: any, prevBody?: any): Promise<any> {
	if (!body?.root?.children) return body;

	const prevGalleryBlocks = prevBody?.root?.children?.filter(
		(c: any) => c.type === 'block' && c.fields?.blockType === 'gallery',
	) || [];

	const processedChildren = await Promise.all(
		body.root.children.map(async (block: any, index: number) => {
			const isGallery = block.type === 'block' && block.fields?.blockType === 'gallery' && block.fields?.images;

			if (isGallery) {
				const prevBlock = prevGalleryBlocks[index] ?? prevGalleryBlocks.find((b: any) => b.fields?.blockType === 'gallery');
				const prevImages = prevBlock?.fields?.images || [];
				const images = await processGalleryImages(block.fields.images, prevImages);
				return { ...block, fields: { ...block.fields, images } };
			}

			return processUploadNode(block);
		}),
	);

	return { ...body, root: { ...body.root, children: processedChildren } };
}
