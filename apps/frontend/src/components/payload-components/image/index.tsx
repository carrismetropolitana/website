'use client';
/* * */

import { Image } from '@mantine/core';

/* * */

interface ImageProps {
	alt?: string
	src?: string
}

/* * */

export function ImageComponent({ alt, src }: ImageProps) {
	//

	//
	// A. Render components

	return (
		<Image alt={alt || ''} fallbackSrc="/assets/common/placeholder.png" src={src} />
	);

	//
}
