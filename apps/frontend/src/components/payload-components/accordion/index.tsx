'use client';
/* * */

import { AccordionData } from '@/types/accordion.types';

/* * */

interface AccordionProps {
	items: AccordionData
}

/* * */

export function Accordion({ items }: AccordionProps) {
	//
	//
	// A. Render components

	return (
		<div>
			{items.map(item => (
				<details key={item.id} style={{ marginBottom: '1rem' }}>
					<summary style={{ cursor: 'pointer', fontWeight: 'bold', padding: '0.5rem 0' }}>
						{item.title}
					</summary>
					<div style={{ padding: '1rem 0', paddingLeft: '1rem', whiteSpace: 'pre-wrap' }}>
						{item.content}
					</div>
				</details>
			))}
		</div>
	);

	//
}
