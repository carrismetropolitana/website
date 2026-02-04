'use client';
/* * */

import { useField } from '@payloadcms/ui';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ImageValue {
	filename?: string
	height?: number
	id?: string
	thumbnailURL?: string
	url?: string
	width?: number
}

/* * */

export function GalleryFieldPreview() {
	//

	//
	// A. Setup variables

	const { value } = useField<(ImageValue | string)[]>({ path: 'images' });
	const [images, setImages] = useState<ImageValue[]>([]);

	//
	// B. Fetch data

	useEffect(() => {
		if (!value?.length) return setImages([]);

		const ids = value.filter((item): item is string => typeof item === 'string');

		Promise.all(ids.map(async (id) => {
			const response = await fetch(`/admin/api/media/${id}`);
			return response.ok ? response.json() : null;
		})).then(results => setImages(results.filter(Boolean)));
	}, [value]);

	//
	// C. Render components

	if (!value?.length) return null;

	if (!images.length) {
		return <div className={styles.loadingContainer}>Loading...</div>;
	}

	return (
		<div className={styles.galleryContainer}>
			{images.map((image, i) => (
				<div key={image.id || i} className={styles.imageContainer}>
					<img
						alt={image.filename || `Image ${i + 1}`}
						className={styles.image}
						src={image.thumbnailURL || image.url}
					/>
				</div>
			))}
		</div>
	);

	//
}
