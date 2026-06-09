'use client';
/* * */

import styles from './styles.module.css';

/* * */

interface VideoProps {
	fields?: {
		caption?: string
		source?: 'external' | 'media'
		video?: { url?: string }
		videoUrl?: string
	}
}

/* * */

export function Video({ fields }: VideoProps) {
	//

	const src = fields?.source === 'external' ? fields?.videoUrl : fields?.video?.url;

	if (!src) return null;

	//
	// A. Render components

	return (
		<figure className={styles.figure}>
			<video className={styles.video} controls>
				<source src={src} />
			</video>
			{fields?.caption && <figcaption className={styles.caption}>{fields?.caption}</figcaption>}
		</figure>
	);

	//
}
