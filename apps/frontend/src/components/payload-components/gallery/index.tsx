/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* * */

import { Image } from '@mantine/core';

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

	// Debug: log the fields to see the structure
	console.log('Gallery component - fields:', fields);
	console.log('Gallery component - fields.images:', fields?.images);

	if (!fields || !fields.images || fields.images.length === 0) {
		console.log('Gallery: No images found');
		return null;
	}

	const images = fields.images;
	const title = fields.title;

	//
	// A. Render components

	return (
		<div style={{ margin: '2rem 0' }}>
			{title && (
				<h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
					{title}
				</h3>
			)}
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: 'repeat(auto-fill, 200px)',
					justifyContent: 'start',
				}}
			>
				{images.map((imageRel, i) => {
					// Handle different possible structures
					// Try value first, then file, then direct object
					let imageValue = imageRel?.value;

					if (!imageValue && 'file' in imageRel) {
						imageValue = (imageRel as any).file;
					}

					if (!imageValue && imageRel && typeof imageRel === 'object' && ('url' in imageRel || 'thumbnailURL' in imageRel)) {
						imageValue = imageRel as any;
					}

					if (!imageValue) {
						console.log(`Gallery: Skipping image ${i} - no imageValue`);
						return null;
					}

					const imageUrl = imageValue.url;

					return (
						<div
							key={imageValue.id || i}
							style={{
								alignItems: 'center',
								aspectRatio: '1',
								background: '#f5f5f5',
								borderRadius: '8px',
								display: 'flex',
								height: '200px',
								justifyContent: 'center',
								overflow: 'hidden',
								position: 'relative',
								width: '200px',
							}}
						>
							<Image
								alt={imageValue.filename || `Gallery image ${i + 1}`}
								fallbackSrc="/assets/common/placeholder.png"
								height={200}
								src={imageUrl}
								width={200}
								style={{
									height: 'auto',
									maxHeight: '100%',
									maxWidth: '100%',
									objectFit: 'contain',
									width: 'auto',
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);

	//
}
