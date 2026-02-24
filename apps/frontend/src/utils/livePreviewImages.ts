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

export async function processBodyImages(body: any, prevBody?: any): Promise<any> {
	if (!body?.root?.children) return body;

	const prevGalleryBlocks = prevBody?.root?.children?.filter(
		(c: any) => c.type === 'block' && c.fields?.blockType === 'gallery',
	) || [];

	const prevTwoColumnsBlocks = prevBody?.root?.children?.filter(
		(c: any) => c.type === 'block' && c.fields?.blockType === 'two-columns-text-image',
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

			const isTwoColumnsImage = block.type === 'block' && block.fields?.blockType === 'two-columns-text-image' && block.fields?.image;

			if (isTwoColumnsImage) {
				const image = block.fields.image;
				if (hasMediaUrl(image)) return block;

				const id = getImageId(image);
				if (!id) return processUploadNode(block);

				const prevBlock = prevTwoColumnsBlocks[index] ?? prevTwoColumnsBlocks.find((b: any) => b.fields?.blockType === 'two-columns-text-image');
				const prevImage = prevBlock?.fields?.image;
				if (prevImage && getImageId(prevImage) === id && hasMediaUrl(prevImage)) {
					return { ...block, fields: { ...block.fields, image: prevImage } };
				}

				const media = await fetchMedia(id);
				return media ? { ...block, fields: { ...block.fields, image: media } } : processUploadNode(block);
			}

			return processUploadNode(block);
		}),
	);

	return { ...body, root: { ...body.root, children: processedChildren } };
}
