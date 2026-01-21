/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSXConverters } from '@payloadcms/richtext-lexical/react';

export const mentionConverter: JSXConverters = {
	inline: {
		mention: ({ node }) => {
			const id = (node as any).id ?? '';
			const label = (node as any).label ?? '';
			return (
				<a
					className="mention__link"
					href={`https://carrismetropolitana.pt/lines/${id}`}
					rel="noreferrer noopener"
					target="_blank"
				>
					<span className="mention">line:{label}</span>
				</a>
			);
		},
	},
};
