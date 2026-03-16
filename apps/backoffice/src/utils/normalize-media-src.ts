/* * */

/**
 * Normalize media URLs returned by Payload to a same-origin path when possible.
 * This avoids Next.js remote image allowlist issues in production environments.
 */
export function normalizeMediaSrc(src: string): string {
	if (!src) return src;

	const normalizePath = (path: string) => {
		if (path.startsWith('/admin/api/media')) return path;
		if (path.startsWith('/api/media')) return `/admin${path}`;
		return path;
	};

	if (src.startsWith('/')) return normalizePath(src);

	try {
		const parsed = new URL(src);
		const normalizedPath = normalizePath(parsed.pathname);
		return `${normalizedPath}${parsed.search}${parsed.hash}`;
	}
	catch {
		return src;
	}
}

/* * */
