'use client';
/* * */

import { ImageComponent } from '@/components/payload/image';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextImageBlockProps {
	image?: { alt?: string, filename?: string, id?: string, url?: string }
	imagePosition?: 'left' | 'right'
	text?: unknown
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
