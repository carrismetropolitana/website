'use client';
/* * */

import { Image } from '@mantine/core';

/* * */

interface ImageProps {
	alt?: string
	height?: number
	src?: string
	width?: number
}

/* * */

export function ImageComponent({ alt, height, src, width }: ImageProps) {
	//

	//
	// A. Render components

	return (
		<Image alt={alt || ''} fallbackSrc="/assets/common/placeholder.png" height={height} src={src} width={width} />
	);

	//
}
