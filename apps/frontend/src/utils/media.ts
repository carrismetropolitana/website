/* * */

/**
 * Extract ID from various image/media reference structures.
 */
export function getImageId(obj: unknown): null | string {
	if (!obj) return null;
	if (typeof obj === 'string') return obj;
	if (typeof obj === 'number') return String(obj);
	const o = obj as Record<string, unknown>;
	const val = o?.value as Record<string, unknown> | undefined;
	return (o?.id as string) ?? (val?.id as string) ?? (o?.file as Record<string, unknown>)?.id ?? (val?.value as Record<string, unknown>)?.id ?? null;
}

/**
 * Check if an image/media reference already has URL data (populated).
 */
export function hasMediaUrl(item: unknown): boolean {
	if (!item || typeof item === 'number') return false;
	const obj = item as Record<string, unknown>;
	return Boolean(obj?.url ?? (obj?.value as Record<string, unknown>)?.url ?? (obj?.file as Record<string, unknown>)?.url);
}

/**
 * Resolve image props for display: { url, alt } from various media reference formats.
 */
export function resolveImageProps(image: unknown): { alt?: string, url?: string } {
	if (!image || typeof image === 'number') return {};
	const obj = image as Record<string, unknown>;
	const value = obj?.value as Record<string, unknown> | undefined;
	const source = value ?? obj;
	return {
		alt: (source?.filename as string) ?? (source?.alt as string),
		url: source?.url as string,
	};
}

/**
 * Fetch full media object by ID (for live preview when payload sends ID-only refs).
 */
export async function fetchMedia(id: number | string): Promise<null | Record<string, unknown>> {
	try {
		const res = await fetch(`/api/media/${String(id)}`);
		if (res.ok) return await res.json();
	}
	catch (error) {
		console.error(`[LivePreview] Failed to fetch media ${id}:`, error);
	}
	return null;
}
