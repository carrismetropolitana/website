'use client';
/* * */

import React, { type ReactElement } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	height?: number | string
}

/* * */

export function Spacer({ height = 20 }: Props): ReactElement {
	const px = typeof height === 'number' && !Number.isNaN(height) ? height : Number(height) || 20;

	return (
		<div className={styles.root} style={{ height: `${px}px`, width: '100%' }} />
	);
}
