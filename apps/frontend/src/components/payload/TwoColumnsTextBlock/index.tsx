'use client';
/* * */

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextBlockProps {
	leftColumn?: unknown
	rightColumn?: unknown
}

export function TwoColumnsTextBlock({ leftColumn, rightColumn }: TwoColumnsTextBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();
	const leftRoot = typeof leftColumn === 'string' ? JSON.parse(leftColumn) : leftColumn;
	const rightRoot = typeof rightColumn === 'string' ? JSON.parse(rightColumn) : rightColumn;
	const leftNode = leftRoot?.root ?? leftRoot;
	const rightNode = rightRoot?.root ?? rightRoot;

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);
}
