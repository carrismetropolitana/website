/* * */

import { CSSProperties } from 'react';

/* * */

export function parseStyleString(styleStr: string): CSSProperties {
	//

	//
	// A. Setup variables

	const styles: Record<string, string> = {};
	const parts = styleStr.split(';').filter(Boolean);

	//
	// B. Render components

	for (const part of parts) {
		const colonIndex = part.indexOf(':');

		if (colonIndex === -1) continue;

		const key = part.slice(0, colonIndex).trim();
		const value = part.slice(colonIndex + 1).trim();

		if (key && value) {
			const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
			styles[camelKey] = value;
		}
	}
	return styles as CSSProperties;

	//
}
