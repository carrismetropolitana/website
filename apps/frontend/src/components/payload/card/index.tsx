'use client';
/* * */

import { type CSSProperties, useMemo, useState } from 'react';

import styles from '@/components/review-2024/Review2024Card/styles.module.css';

interface PayloadCardProps {
	borderColor?: unknown
	cards?: unknown
	primaryColor?: unknown
	textColor?: unknown
}

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

function getRelationshipImageUrl(value: unknown): string | undefined {
	if (!value || typeof value !== 'object') return undefined;

	const v = value as {
		file?: { url?: string }
		url?: string
		value?: {
			file?: { url?: string }
			url?: string
		}
	};

	return v.url ?? v.value?.url ?? v.file?.url ?? v.value?.file?.url;
}

function StackCardItem({
	card,
	colors,
	isFirstChild,
	isLastChild,
}: {
	card: PayloadCardItem
	colors: CustomCSSProperties
	isFirstChild: boolean
	isLastChild: boolean
}) {
	const [isOpen, setIsOpen] = useState(false);

	const titleText = typeof card.title === 'string' ? card.title : '';
	const numberText = typeof card.number === 'string' ? card.number : '';
	const descriptionText = typeof card.description === 'string' ? card.description : '';
	const imageUrl = getRelationshipImageUrl(card.image);

	const handleToggleIsOpen = () => setIsOpen(prev => !prev);

	const descriptionLines = useMemo(() => descriptionText.split('\n'), [descriptionText]);

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
}

export function PayloadCard({ borderColor, cards, primaryColor, textColor }: PayloadCardProps) {
	// A. Transform data
	const primary = typeof primaryColor === 'string' ? primaryColor : undefined;
	const text = typeof textColor === 'string' ? textColor : undefined;
	const border = typeof borderColor === 'string' ? borderColor : undefined;

	const cardItems: PayloadCardItem[] = Array.isArray(cards)
		? cards
			.map((c: unknown) => {
				if (!c || typeof c !== 'object') return undefined;
				return c as PayloadCardItem;
			})
			.filter((v): v is PayloadCardItem => Boolean(v))
		: [];

	// B. Render components
	if (!cardItems.length || !primary || !text) return null;

	const colors: CustomCSSProperties = {
		'--color-border': border ?? primary,
		'--color-primary': primary,
		'--color-text': text,
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
			{cardItems.map((card, index) => (
				<StackCardItem
					key={index}
					card={card}
					colors={colors}
					isFirstChild={index === 0}
					isLastChild={index === cardItems.length - 1}
				/>
			))}
		</div>
	);
}
