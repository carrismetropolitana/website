'use client';
/* * */

import type { CSSProperties } from 'react';

import { CardItem } from '@/components/payload/card/CardItem';

/* * */

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

export function Card({ borderColor, cards, primaryColor, textColor }: PayloadCardProps) {
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
				<CardItem
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
