'use client';
/* * */

import { useField } from '@payloadcms/ui';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
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
	const { value: isCarousel } = useField<boolean>({ path: 'isCarousel' });
	const [images, setImages] = useState<ImageValue[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const activeImage = images?.[activeIndex];

	//
	// B. Fetch data

	useEffect(() => {
		if (!value?.length) return setImages([]);
		const ids = value.filter((item): item is string => typeof item === 'string');
		Promise.all(
			ids.map(id =>
				fetch(`/admin/api/media/${id}`).then(res => (res.ok ? res.json() : null)),
			),
		).then(results => setImages(results.filter(Boolean)));
	}, [value]);

	useEffect(() => {
		setActiveIndex(0);
	}, [images.length, isCarousel]);

	//
	// D. Render components

	if (!value?.length) return null;
	if (!images.length) return <div className={styles.loadingContainer}>Loading...</div>;

	return (
		<div className={styles.galleryContainer}>
			{images.map((img, i) => (
				<div key={img.id ?? i} className={styles.imageContainer}>
					<img
						alt={img.filename ?? `Image ${i + 1}`}
						className={styles.image}
						src={img.thumbnailURL ?? img.url}
					/>
				</div>
			))}
		</div>
	);

	//
}
