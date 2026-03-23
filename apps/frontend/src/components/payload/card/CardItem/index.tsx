'use client';

/* * */

import { CSSProperties, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface PayloadCardItem {
	description?: unknown
	image?: unknown
	number?: unknown
	title?: unknown
}

interface CustomCSSProperties extends CSSProperties {
	'--color-border'?: string
	'--color-primary': string
	'--color-text': string
}

/* * */

export function CardItem({ card, colors, isFirstChild, isLastChild }: { card: PayloadCardItem, colors: CustomCSSProperties, isFirstChild: boolean, isLastChild: boolean }) {
	//

	//
	// A. Setup Variables

	const [isOpen, setIsOpen] = useState(false);

	const titleText = typeof card.title === 'string' ? card.title : '';
	const numberText = typeof card.number === 'string' ? card.number : '';
	const descriptionText = typeof card.description === 'string' ? card.description : '';
	const imageUrl = getRelationshipImageUrl(card.image);

	const handleToggleIsOpen = () => setIsOpen(prev => !prev);

	const descriptionLines = useMemo(() => descriptionText.split('\n'), [descriptionText]);

	//
	// B. Render Components

	return (
		<div
			className={styles.container}
			data-is-first={isFirstChild}
			data-is-last={isLastChild}
			data-open={isOpen}
			style={colors}
		>
			<div className={styles.header} onClick={handleToggleIsOpen}>
				<p className={styles.headerTitle}>{titleText}</p>
				{numberText ? <p className={styles.headerNumber}>{numberText}</p> : null}
			</div>

			<div className={styles.content}>
				<div className={styles.innerWrapper}>
					{imageUrl ? (
						<div className={styles.contentLottie}>
							<img
								alt={titleText}
								src={imageUrl}
								style={{ height: 'auto', maxHeight: 220, objectFit: 'contain', width: '100%' }}
							/>
						</div>
					) : null}

					{descriptionText ? (
						<p className={styles.contentDescription}>
							{descriptionLines.map((line, idx) => (
								<span key={`${idx}-${line}`}>
									{line}
									{idx < descriptionLines.length - 1 ? <br /> : null}
								</span>
							))}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);

	//
}
