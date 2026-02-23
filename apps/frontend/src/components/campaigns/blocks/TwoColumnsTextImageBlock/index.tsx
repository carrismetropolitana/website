'use client';
/* * */

import { ImageComponent } from '@/components/payload/image';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

import styles from './styles.module.css';

/* * */

interface TwoColumnsTextImageBlockProps {
	image?: number | { filename?: string, id?: string, url?: string }
	imagePosition?: 'left' | 'right'
	text?: unknown
}

function resolveImage(image: TwoColumnsTextImageBlockProps['image']): { alt?: string, url?: string } {
	if (!image || typeof image === 'number') return {};
	const obj = image as Record<string, unknown>;
	const value = obj.value as Record<string, unknown> | undefined;
	const source = value ?? obj;
	return {
		alt: (source.filename as string) ?? (source.alt as string),
		url: source.url as string,
	};
}

export function TwoColumnsTextImageBlock({ image, imagePosition = 'right', text }: TwoColumnsTextImageBlockProps) {
	const renderLexicalNode = useRenderLexicalNode();
	const textJson = typeof text === 'string' ? JSON.parse(text) : text;
	const rootNode = textJson?.root ?? textJson;
	const textContent = rootNode ? renderLexicalNode(rootNode) : null;
	const { alt: imageAlt, url: imageUrl } = resolveImage(image);

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
