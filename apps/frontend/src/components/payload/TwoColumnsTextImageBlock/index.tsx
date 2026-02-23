'use client';
/* * */

import { ImageComponent } from '@/components/payload/image';
import { resolveImageProps } from '@/utils/media';
import { getLexicalRoot, useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextImageBlockProps {
	image?: number | { filename?: string, id?: string, url?: string }
	imagePosition?: 'left' | 'right'
	text?: unknown
}

/* * */

export function TwoColumnsTextImageBlock({ image, imagePosition = 'right', text }: TwoColumnsTextImageBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();
	const { alt: imageAlt, url: imageUrl } = resolveImageProps(image);
	const rootNode = getLexicalRoot(text);
	const textContent = rootNode ? renderLexicalNode(rootNode) : null;

	const textColumn = <div className={styles.column}>{textContent}</div>;
	const imageColumn = (
		<div className={styles.column}>
			{imageUrl ? <ImageComponent alt={imageAlt} src={imageUrl} /> : null}
		</div>
	);

	return (
		<div className={styles.container}>
			{imagePosition === 'left' ? (
				<>
					{imageColumn}
					{textColumn}
				</>
			) : (
				<>
					{textColumn}
					{imageColumn}
				</>
			)}
		</div>
	);
}
