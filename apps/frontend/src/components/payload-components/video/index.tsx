'use client';
/* * */

interface VideoBlockFields {
	caption?: string
	source?: 'external' | 'upload'
	video?: {
		relationTo?: string
		value?: {
			url?: string
		}
	}
	videoUrl?: string
}

interface VideoProps {
	fields?: VideoBlockFields
}

/* * */

export function Video({ fields }: VideoProps) {
	//

	if (!fields) return null;

	const source = fields.source ?? 'media';

	let src: string | undefined;

	if (source === 'media') {
		const videoRel = fields.video;
		const videoValue = videoRel?.value;
		src = videoValue?.url;
	}
	else if (source === 'external') {
		src = fields.videoUrl;
	}

	const caption = fields.caption;

	if (!src) {
		return null;
	}

	//
	// A. Render components

	return (
		<figure style={{ margin: '1.5rem 0' }}>
			<video style={{ borderRadius: 8, maxWidth: '100%' }} controls>
				<source src={src} />
				Your browser does not support the video tag.
			</video>
			{caption ? (
				<figcaption style={{ color: '#555', fontSize: '0.875rem', marginTop: '0.5rem' }}>
					{caption}
				</figcaption>
			) : null}
		</figure>
	);

	//
}
