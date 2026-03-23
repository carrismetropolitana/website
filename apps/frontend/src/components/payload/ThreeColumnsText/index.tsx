'use client';
/* * */

import type { LexicalRichText } from '@/types/lexical-node.types';

import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface ThreeColumnsTextBlockProps {
	centerColumn?: LexicalRichText | string
	leftColumn?: LexicalRichText | string
	rightColumn?: LexicalRichText | string
}

/* * */

export function ThreeColumnsText({ centerColumn, leftColumn, rightColumn }: ThreeColumnsTextBlockProps) {
	//

	//
	// A. Setup Variables

	const renderLexicalNode = useRenderLexicalNode();
	const leftNode = getLexicalRoot(leftColumn);
	const centerNode = getLexicalRoot(centerColumn);
	const rightNode = getLexicalRoot(rightColumn);

	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{centerNode ? renderLexicalNode(centerNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);

	//
}
