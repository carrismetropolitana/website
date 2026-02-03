'use client';
/* * */

import { useField } from '@payloadcms/ui';
import { useEffect, useState } from 'react';

/* * */

interface ImageValue {
	filename?: string
	height?: number
	id?: string
	thumbnailURL?: null | string
	url?: string
	width?: number
}

export function GalleryFieldPreview() {
	//

	//
	// A. Setup variables

	const { value } = useField<(ImageValue | string)[]>({ path: 'images' });
	const [images, setImages] = useState<ImageValue[]>([]);

	//
	// B. Fetch Data

	useEffect(() => {
		if (!value || !Array.isArray(value) || value.length === 0) {
			setImages([]);
			return;
		}

		const ids = value.filter((item): item is string => typeof item === 'string');

		if (ids.length === 0) {
			const imageObjects = value.filter((item): item is ImageValue =>
				typeof item === 'object' && item !== null && ('url' in item || 'thumbnailURL' in item),
			) as ImageValue[];
			setImages(imageObjects);
			return;
		}

		const fetchImages = async () => {
			try {
				const payloadApiPath = '/admin/api/media';

				const imagePromises = ids.map(async (id) => {
					try {
						const response = await fetch(`${payloadApiPath}/${id}`);
						if (!response.ok) return null;
						const data = await response.json();
						return data;
					}
					catch (error) {
						console.error(`Error fetching image ${id}:`, error);
						return null;
					}
				});

				const fetchedImages = await Promise.all(imagePromises);
				const validImages = fetchedImages.filter((img): img is ImageValue => img !== null);

				setImages(validImages);
			}
			catch (error) {
				console.error('Error fetching images:', error);
				setImages([]);
			}
		};

		fetchImages();
	}, [value]);

	//
	// B. Render components

	if (!value || !Array.isArray(value) || value.length === 0) {
		return null;
	}

	if (images.length === 0) {
		return (
			<div style={{ background: '#f5f5f5', borderRadius: '4px', color: '#999', fontSize: '12px', marginTop: '8px', padding: '8px' }}>
				Loading image previews... ({value.length} image{value.length !== 1 ? 's' : ''} selected)
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
			{images.map((imageValue, i) => {
				return (
					<div
						key={imageValue.id || i}
						style={{ border: '1px solid #e0e0e0', borderRadius: '4px', height: '60px', overflow: 'hidden', position: 'relative', width: '60px' }}
					>
						<img alt={imageValue.filename || `Image ${i + 1}`} src={imageValue.thumbnailURL || imageValue.url} style={{ height: '100%', objectFit: 'cover', width: '100%' }} />
					</div>
				);
			})}
		</div>
	);
};
