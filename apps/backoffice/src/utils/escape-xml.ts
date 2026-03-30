/* * */

/**
 * Escape XML characters in a string
 * @param value - The value to escape
 * @returns The escaped value
 */
export function escapeXml(value: unknown): string {
	//

	//
	// A. Setup variables

	if (value === null || value === undefined) return '';

	//
	// B. Transform data

	const escapedValue = String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&apos;');

	//
	// C. Return

	return escapedValue;

	//
}
