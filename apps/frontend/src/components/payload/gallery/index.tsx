/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface GalleryImage {
	file?: {
		filename?: string
		height?: number
		id?: string
		mimeType?: string
		url?: string
		width?: number
	}
	relationTo?: string
	value?: {
		filename?: string
		height?: number
		id?: string
		mimeType?: string
		url?: string
		width?: number
	}
}

interface GalleryBlockFields {
	images?: GalleryImage[]
	title?: string
}

interface GalleryProps {
	fields?: GalleryBlockFields
}

/* * */

export function Gallery({ fields }: GalleryProps) {
	//

	if (!fields || !fields.images || fields.images.length === 0) {
		console.log('Gallery: No images found');
		return null;
	}

	const images = fields.images;
	const title = fields.title;

	//
	// A. Render components

	return (
		<div className={styles.wrapper}>
			{title && (
				<h3 className={styles.title}>
					{title}
				</h3>
			)}
			<div className={styles.grid}>
				{images.map((imageRel, i) => {
					if (!imageRel || typeof imageRel === 'string') {
						return null;
					}

					let imageValue = imageRel?.value;

					if (!imageValue && typeof imageRel === 'object' && 'file' in imageRel) {
						imageValue = (imageRel as any).file;
					}

					if (!imageValue && imageRel && typeof imageRel === 'object' && ('url' in imageRel || 'thumbnailURL' in imageRel)) {
						imageValue = imageRel as any;
					}

					if (!imageValue) {
						return null;
					}

					const imageUrl = imageValue.url;

					return (
						<div key={imageValue.id || i} className={styles.item}>
							<Image
								alt={imageValue.filename || `Gallery image ${i + 1}`}
								fallbackSrc="/assets/common/placeholder.png"
								fit="cover"
								h="100%"
								src={imageUrl}
								w="100%"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);

	//
}
