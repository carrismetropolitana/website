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

	const style: CSSProperties = {
		flexShrink: 0,
		height: `${px}px`,
		minHeight: `${px}px`,
		width: '100%',
	};

	return <div style={style} aria-hidden />;
}
