'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

import styles from './styles.module.css';
/* * */

interface ListItemProps {
	children: LexicalNode[]
}

/* * */

export function ListItem({ children }: ListItemProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<li className={styles.listItem}>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</li>
	);

	//
}
