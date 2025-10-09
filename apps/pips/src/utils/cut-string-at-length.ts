/* * */

/**
 * Cuts a string at a certain length and adds '...' at the end
 * @param value The string to cut
 * @param length The length to cut the string at
 * @returns The cut string with '...' at the end
 */
export function cutStringAtLength(value: null | string | undefined, length: number): string {
	if (value && value.length > length) {
		return `${value.substring(0, length)}...`;
	}
	return value ?? '';
}
