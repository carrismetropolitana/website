'use client';
/* * */

import type { LexicalRichText } from '@/types/lexical-node.types';

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { getLexicalRoot } from '@/utils/getLexicalRoot';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextBlockProps {
	leftColumn?: LexicalRichText | string
	rightColumn?: LexicalRichText | string
}

export function TwoColumnsText({ leftColumn, rightColumn }: TwoColumnsTextBlockProps) {
	//

	//
	// A. Setup Variables

	const renderLexicalNode = useRenderLexicalNode();
	const leftNode = getLexicalRoot(leftColumn);
	const rightNode = getLexicalRoot(rightColumn);

	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.column}>{leftNode ? renderLexicalNode(leftNode) : null}</div>
			<div className={styles.column}>{rightNode ? renderLexicalNode(rightNode) : null}</div>
		</div>
	);

	//
}
