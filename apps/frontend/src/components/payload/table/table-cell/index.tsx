'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

import styles from './styles.module.css';

/* * */

interface TableCellProps {
	backgroundColor?: string
	children: LexicalNode[]
	headerState?: number
}

/* * */

export function TableCell({ backgroundColor, children, headerState = 0 }: TableCellProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const Tag = headerState > 0 ? 'th' : 'td';
	const style = backgroundColor ? { backgroundColor } : undefined;

	//
	// B. Render components

	return (
		<Tag className={styles.cell} style={style}>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</Tag>
	);

	//
}
