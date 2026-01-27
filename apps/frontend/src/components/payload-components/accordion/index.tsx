'use client';
/* * */

/* * */

interface AccordionItem {
	content: string
	id?: string
	title: string
}

interface AccordionProps {
	items: AccordionItem[]
}

/* * */

export function Accordion({ items }: AccordionProps) {
	//
	//
	// A. Render components

	return (
		<div>
			{items.map((item, index) => (
				<details key={item.id || index} style={{ marginBottom: '1rem' }}>
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
