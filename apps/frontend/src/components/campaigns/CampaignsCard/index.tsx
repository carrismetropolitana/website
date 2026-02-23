/* * */

import { Image } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface FeaturedImageSrc {
	filename?: string
	thumbnailURL?: string
	url?: string
}

interface CampaignsCardProps {
	featuredImageSrc?: FeaturedImageSrc
	id: string
	title: string
}

/* * */

export function CampaignsCard({ featuredImageSrc, id, title }: CampaignsCardProps) {
	//

	//
	// A. Render components
	return (
		<Link className={styles.container} href={`campaigns/${id}`}>
			<Image
				alt={featuredImageSrc?.filename}
				className={styles.coverImage}
				fallbackSrc="/assets/common/placeholder.png"
				loading="lazy"
				src={featuredImageSrc?.thumbnailURL ?? featuredImageSrc?.url}
			/>
			<p className={styles.title}>{title}</p>
		</Link>
	);

	//
}
