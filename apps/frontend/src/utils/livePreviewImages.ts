/* eslint-disable @typescript-eslint/no-explicit-any */
/* * */

export async function fetchMedia(id: number | string): Promise<any> {
	try {
		const response = await fetch(`/api/media/${String(id)}`);
		if (response.ok) return await response.json();
	}
	catch (error) {
		console.error(`[LivePreview] Failed to fetch media ${id}:`, error);
	}
	return null;
}

/* * */

function getImageId(item: any): null | string {
	if (!item) return null;
	if (typeof item === 'string') return item;
	if (typeof item === 'number') return String(item);
	return item?.id || item?.value?.id || item?.file?.id || null;
}

function hasImageUrl(item: any): boolean {
	return Boolean(item && typeof item === 'object' && (item.url || item.value?.url || item.file?.url));
}

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
			if (hasImageUrl(item)) return item;

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
		if (value && typeof value === 'object' && typeof value.url === 'string') return node;

		// Payload sometimes wraps uploaded media in `file` or `value`.
		if (value && typeof value === 'object') {
			if (value.file && typeof value.file.url === 'string') return { ...node, value: value.file };
			if (value.value && typeof value.value.url === 'string') return { ...node, value: value.value };
		}

		const id = getImageId(value);
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
