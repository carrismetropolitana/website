'use client';
/* * */

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface ThreeColumnsTextBlockProps {
	centerColumn?: unknown
	leftColumn?: unknown
	rightColumn?: unknown
}

export function ThreeColumnsTextBlock({ centerColumn, leftColumn, rightColumn }: ThreeColumnsTextBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();

	const parseAndGetRoot = (content: unknown) => {
		if (!content) return null;
		const json = typeof content === 'string' ? JSON.parse(content) : content;
		return json?.root ?? json;
	};

	const leftNode = parseAndGetRoot(leftColumn);
	const centerNode = parseAndGetRoot(centerColumn);
	const rightNode = parseAndGetRoot(rightColumn);

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{centerNode ? renderLexicalNode(centerNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);
}
