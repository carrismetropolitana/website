'use client';
/* * */

import type { CSSProperties, ReactNode } from 'react';

import styles from './styles.module.css';
import layoutStyles from '@/components/layout/Surface/styles.module.css';

/* * */

interface Props {
	backgroundImageUrl?: string
	backgroundOverlay?: boolean
	children?: ReactNode
	forceOverflow?: boolean
	fullHeight?: boolean
	variant?: 'alerts' | 'brand2' | 'brand' | 'debug' | 'default' | 'muted' | 'persistent' | 'standout' | 'success' | 'warning'
}

/* * */

export function Surface({
	backgroundImageUrl,
	backgroundOverlay,
	children,
	forceOverflow,
	fullHeight,
	variant = 'default',
}: Props) {
	const hasBackgroundImage = Boolean(backgroundImageUrl);
	const containerClass = [
		layoutStyles.container,
		forceOverflow && layoutStyles.forceOverflow,
		fullHeight && layoutStyles.fullHeight,
		hasBackgroundImage && styles.withBackgroundImage,
		variant && layoutStyles[variant],
	]
		.filter(Boolean)
		.join(' ');

	const containerStyle = hasBackgroundImage
		? ({
			'--surface-background-image': `url("${backgroundImageUrl}")`,
			'position': 'relative',
		} as unknown as CSSProperties)
		: ({ position: 'relative' } as CSSProperties);

	return (
		<div className={containerClass} style={containerStyle}>
			{hasBackgroundImage && <div className={styles.backgroundImageLayer} />}
			{hasBackgroundImage && backgroundOverlay && <div className={styles.backgroundOverlayLayer} />}
			<div className={styles.contentLayer}>{children}</div>
		</div>
	);
}
