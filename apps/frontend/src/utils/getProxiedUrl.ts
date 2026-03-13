/* * */

export function getProxiedUrl(url: string): string {
	const filename = url.split('/').pop();
	if (!filename) return url;
	return `/api/media/file/${encodeURIComponent(filename)}`;
}

/* * */
