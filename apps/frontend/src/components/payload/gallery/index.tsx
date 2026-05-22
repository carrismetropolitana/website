/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import { GalleryCarousel } from '@/components/payload/gallery/GalleryCarousel';
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

interface ResolvedGalleryImage {
	filename?: string
	id?: string
	url?: string
}

interface GalleryBlockFields {
	images?: GalleryImage[]
	isCarousel?: boolean
	title?: string
}

interface GalleryProps {
	fields?: GalleryBlockFields
}

/* * */

function resolveGalleryImage(imageRel: GalleryImage | string): null | ResolvedGalleryImage {
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

	if (!imageValue?.url) {
		return null;
	}

	return {
		filename: imageValue.filename,
		id: imageValue.id,
		url: imageValue.url,
	};
}

/* * */

export function Gallery({ fields }: GalleryProps) {
	//

	if (!fields?.images?.length) {
		return null;
	}

	const resolvedImages = fields.images
		.map(resolveGalleryImage)
		.filter((img): img is ResolvedGalleryImage => img !== null);

	if (!resolvedImages.length) {
		return null;
	}

	const title = fields.title;
	const isCarousel = fields.isCarousel === true;

	//
	// A. Render components

	return (
		<div className={styles.wrapper}>
			{title && (
				<h3 className={styles.title}>
					{title}
				</h3>
			)}
			{isCarousel ? (
				<GalleryCarousel
					slides={resolvedImages.map((imageValue, i) => ({
						_id: imageValue.id ?? String(i),
						component: (
							<div className={styles.carouselSlide}>
								<Image
									alt={imageValue.filename || `Gallery image ${i + 1}`}
									fallbackSrc="/assets/common/placeholder.png"
									fit="cover"
									h="100%"
									src={imageValue.url}
									w="100%"
								/>
							</div>
						),
					}))}
				/>
			) : (
				<div className={styles.grid}>
					{resolvedImages.map((imageValue, i) => (
						<div key={imageValue.id || i} className={styles.item}>
							<Image
								alt={imageValue.filename || `Gallery image ${i + 1}`}
								fallbackSrc="/assets/common/placeholder.png"
								fit="cover"
								h="100%"
								src={imageValue.url}
								w="100%"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);

	//
}
