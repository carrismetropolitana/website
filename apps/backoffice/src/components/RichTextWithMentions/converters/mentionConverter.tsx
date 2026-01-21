/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSXConverters } from '@payloadcms/richtext-lexical/react';

export const mentionConverter: JSXConverters = {
	inline: {
		mention: ({ node }) => {
			const label = (node as any).label ?? '';
			return <span className="mention">@{label}</span>;
		},
	},
};
