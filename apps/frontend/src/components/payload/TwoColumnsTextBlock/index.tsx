'use client';
/* * */

import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextBlockProps {
	leftColumn?: unknown
	rightColumn?: unknown
}

export function TwoColumnsTextBlock({ leftColumn, rightColumn }: TwoColumnsTextBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();
	const leftNode = getLexicalRoot(leftColumn);
	const rightNode = getLexicalRoot(rightColumn);

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);
}
