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
export function Surface({ backgroundImageUrl, backgroundOverlay, children, forceOverflow, fullHeight, variant = 'default' }: Props) {
	const containerClass = [
		layoutStyles.container,
		forceOverflow && layoutStyles.forceOverflow,
		fullHeight && layoutStyles.fullHeight,
		(backgroundImageUrl || backgroundOverlay) && styles.withBackgroundImage,
		(backgroundImageUrl || backgroundOverlay) && styles.edgeToEdge,
		variant && layoutStyles[variant],
	].filter(Boolean).join(' ');
	const containerStyle = backgroundImageUrl
		? {
			['--surface-background-image' as keyof CSSProperties]: `url("${backgroundImageUrl}")`,
			['--surface-offset' as keyof CSSProperties]: '24px',
		}
		: undefined;
	return (
		<div className={containerClass} style={containerStyle}>
			{backgroundImageUrl && <div className={styles.backgroundImageLayer} />}
			{backgroundOverlay && <div className={styles.backgroundOverlayLayer} />}
			<div className={styles.contentLayer}>{children}</div>
		</div>
	);
}
