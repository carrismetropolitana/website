'use client';
/* * */

import { useField } from '@payloadcms/ui';

/* * */

export function LinkFieldPreview() {
	//

	//
	// A. Setup variables

	const { value } = useField<string>({ path: 'url' });

	//
	// B. Render components

	if (!value || typeof value !== 'string' || value.trim() === '') {
		return null;
	}

	// Extract domain from URL for display
	let displayUrl = value;
	try {
		const url = new URL(value);
		displayUrl = url.hostname + url.pathname;
		if (url.search) {
			displayUrl += url.search;
		}
	}
	catch {
		// If URL parsing fails, use the original value
		displayUrl = value;
	}

	return (
		<div style={{ marginTop: '8px' }}>
			<a
				href={value}
				rel="noreferrer noopener"
				style={{
					alignItems: 'center',
					background: '#f5f5f5',
					border: '1px solid #e0e0e0',
					borderRadius: '4px',
					color: '#0066cc',
					display: 'flex',
					fontSize: '12px',
					gap: '8px',
					padding: '8px 12px',
					textDecoration: 'none',
				}}
				target="_blank"
			>
				<svg
					fill="none"
					height="14"
					style={{ flexShrink: 0 }}
					viewBox="0 0 24 24"
					width="14"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
				<span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
					{displayUrl}
				</span>
			</a>
		</div>
	);

	//
}
