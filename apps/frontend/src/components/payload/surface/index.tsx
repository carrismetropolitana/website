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
	const containerClass = [layoutStyles.container, forceOverflow && layoutStyles.forceOverflow, fullHeight && layoutStyles.fullHeight && styles.withBackgroundImage, variant && layoutStyles[variant]].join(' ');
	const containerStyle = { backgroundImage: `url("${backgroundImageUrl}")`, backgroundSize: 'cover' };
	return (
		<div className={containerClass} style={containerStyle}>
			{backgroundImageUrl && <div className={styles.backgroundImageLayer} />}
			{backgroundOverlay && <div className={styles.backgroundOverlayLayer} />}
			<div className={styles.contentLayer}>{children}</div>
		</div>
	);
}
