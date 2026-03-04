'use client';
/* * */

import type { LexicalNode, LexicalRichText } from '@/types/lexical-node.types';

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

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
				<details key={item.id || index} className={styles.item}>
					<summary className={styles.summary}>
						{item.title}
					</summary>
					<div className={styles.content}>
						{renderContent(item.content)}
					</div>
				</details>
			))}
		</div>
	);

	//
}
