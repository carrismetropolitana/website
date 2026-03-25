'use client';
/* * */

import React, { type CSSProperties, type ReactElement } from 'react';

/* * */

interface Props {
	height?: number | string
}

/* * */

export function Spacer({ height = 20 }: Props): ReactElement {
	const px = typeof height === 'number' && !Number.isNaN(height) ? height : Number(height) || 20;

	// Padding survives flex layouts better than height on empty boxes (Section.childrenWrapper is flex).
	const style: CSSProperties = {
		alignSelf: 'stretch',
		boxSizing: 'border-box',
		flexShrink: 0,
		minWidth: 0,
		paddingTop: `${px}px`,
		width: '100%',
	};

	return <div style={style} aria-hidden />;
}
