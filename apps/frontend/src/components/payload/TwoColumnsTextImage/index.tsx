'use client';
/* * */

import type { LexicalRichText, RelationshipMedia } from '@/types/lexical-node.types';

import { ImageComponent } from '@/components/payload/image';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextImageBlockProps {
	image?: RelationshipMedia
	imagePosition?: 'left' | 'right'
	text?: LexicalRichText | string
}

/* * */

export function TwoColumnsTextImage({ image, imagePosition = 'right', text }: TwoColumnsTextImageBlockProps) {
	//

	//
	// A. Setup Variables

	const renderLexicalNode = useRenderLexicalNode();
	const rootNode = getLexicalRoot(text);
	const textContent = rootNode ? renderLexicalNode(rootNode) : null;

	//
	// B. Render Components

	return (
		<div className={styles.container}>

			{imagePosition === 'left' && (
				<>
					<div className={styles.column}>
						{image ? <ImageComponent alt={image.alt ?? ''} src={image.url ?? ''} /> : null}
					</div>
					<div className={styles.column}>{textContent}</div>
				</>
			)}

			{imagePosition === 'right' && (
				<>
					<div className={styles.column}>{textContent}</div>
					<div className={styles.column}>
						{image ? <ImageComponent alt={image.alt ?? ''} src={image.url ?? ''} /> : null}
					</div>
				</>
			)}

		</div>
	);

	//
}
