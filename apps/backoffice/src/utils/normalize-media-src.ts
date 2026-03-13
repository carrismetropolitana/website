/* * */

/**
 * Normalize media URLs returned by Payload to a same-origin path when possible.
 * This avoids Next.js remote image allowlist issues in production environments.
 */
export function normalizeMediaSrc(src: string): string {
	if (!src) return src;
	if (src.startsWith('/')) return src;

	try {
		const parsed = new URL(src);
		return `${parsed.pathname}${parsed.search}${parsed.hash}`;
	}
	catch {
		return src;
	}
}

/* * */
