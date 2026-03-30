'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

import styles from './styles.module.css';

/* * */

interface TableProps {
	children: LexicalNode[]
}

/* * */

export function Table({ children }: TableProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<tbody>
					{children.map((child, idx) => renderLexicalNode(child, idx))}
				</tbody>
			</table>
		</div>
	);

	//
}
