'use client';
/* * */

import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface ThreeColumnsTextBlockProps {
	centerColumn?: unknown
	leftColumn?: unknown
	rightColumn?: unknown
}

export function ThreeColumnsTextBlock({ centerColumn, leftColumn, rightColumn }: ThreeColumnsTextBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();
	const leftNode = getLexicalRoot(leftColumn);
	const centerNode = getLexicalRoot(centerColumn);
	const rightNode = getLexicalRoot(rightColumn);

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{centerNode ? renderLexicalNode(centerNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);
}
