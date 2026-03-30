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

async function processSurfaceBackgroundImage(block: any, prevBlock?: any) {
	const f = block?.fields;
	if (!f?.hasBackgroundImage) return block;
	if (!f?.backgroundImage) return block;

	if (hasImageUrl(f.backgroundImage)) return block;

	const prevBg = prevBlock?.fields?.backgroundImage;
	if (prevBg && hasImageUrl(prevBg)) {
		return { ...block, fields: { ...f, backgroundImage: prevBg } };
	}

	const id = getImageId(f.backgroundImage);
	if (!id) return block;

	const media = await fetchMedia(id);
	return media ? { ...block, fields: { ...f, backgroundImage: media } } : block;
}

/**
 * Walks the full Lexical tree (including nested blocks inside section/surface content)
 * so surface backgrounds and uploads resolve everywhere, not only at the document root.
 */
async function processLexicalNode(node: any, prevNode: any): Promise<any> {
	if (!node || typeof node !== 'object') return node;

	let result = node;

	if (result.fields?.content?.root?.children) {
		const prevContent = prevNode?.fields?.content;
		const processedContent = await processLexicalBody(result.fields.content, prevContent);
		result = { ...result, fields: { ...result.fields, content: processedContent } };
	}

	if (result.type === 'upload') {
		return processUploadNode(result);
	}

	if (result.type === 'block') {
		const f = result.fields;
		if (f?.blockType === 'gallery' && f?.images) {
			const prevImages = prevNode?.fields?.images || [];
			const images = await processGalleryImages(f.images, prevImages);
			result = { ...result, fields: { ...result.fields, images } };
		}
		if (f?.blockType === 'surface') {
			result = await processSurfaceBackgroundImage(result, prevNode);
		}
		if (f?.blockType === 'spacer') {
			return result;
		}
	}

	if (Array.isArray(result.children)) {
		const prevChildren = prevNode?.children;
		result = {
			...result,
			children: await Promise.all(
				result.children.map((child: any, i: number) => processLexicalNode(child, prevChildren?.[i])),
			),
		};
	}

	return result;
}

async function processLexicalBody(body: any, prevBody: any): Promise<any> {
	if (!body?.root?.children) return body;
	const prevChildren = prevBody?.root?.children || [];
	const children = await Promise.all(
		body.root.children.map((c: any, i: number) => processLexicalNode(c, prevChildren[i])),
	);
	return { ...body, root: { ...body.root, children } };
}

/* * */

export async function processBodyImages(body: any, prevBody?: any): Promise<any> {
	if (!body?.root?.children) return body;
	return processLexicalBody(body, prevBody);
}
