'use client';
/* * */

import type { LexicalNode, LexicalRichText } from '@/types/lexical-node.types';

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface AccordionItem {
	content: LexicalRichText | string
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
	// A. Setup

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Helper to render content

	function renderContent(content: LexicalRichText | string) {
		if (typeof content === 'string') {
			return content;
		}

		if (content && typeof content === 'object' && 'root' in content) {
			return renderLexicalNode(content.root as unknown as LexicalNode);
		}

		return null;
	}

	//
	// C. Render components

	return (
		<div>
			{items.map((item, index) => (
				<details key={item.id || index} style={{ marginBottom: '1rem' }}>
					<summary style={{ cursor: 'pointer', fontWeight: 'bold', padding: '0.5rem 0' }}>
						{item.title}
					</summary>
					<div style={{ padding: '1rem 0', paddingLeft: '1rem', whiteSpace: 'pre-wrap' }}>
						{renderContent(item.content)}
					</div>
				</details>
			))}
		</div>
	);

	//
}
