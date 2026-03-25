'use client';
/* * */

import React, { type CSSProperties, type ReactElement } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	height?: number | string
}

/* * */

export function Spacer({ height = 20 }: Props): ReactElement {
	const px = typeof height === 'number' && !Number.isNaN(height) ? height : Number(height) || 20;

	const style = {
		'--spacer-height': `${px}px`,
	} as CSSProperties;

	return <div className={styles.root} style={style} aria-hidden />;
}
