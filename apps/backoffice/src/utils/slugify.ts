/* * */

/**
 * Convert a string to a URL-friendly slug
 * Removes accents, converts to lowercase, replaces spaces and special chars with hyphens
 */
export function slugify(text: string): string {
	return text
		.normalize('NFD') // Decompose unicode characters
		.replace(/[\u0300-\u036F]/g, '') // Remove accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 -]/g, '') // Remove special characters except spaces and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
