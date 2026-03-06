/* * */

import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface FeaturedImageSrc {
	filename?: string
	thumbnailURL?: string
	url?: string
}

interface NewsCardProps {
	featuredImageSrc?: FeaturedImageSrc
	id: string
	publishedAt: string
	slug?: string
	title: string
}

/* * */

export function NewsCard({ featuredImageSrc, id, publishedAt, slug, title }: NewsCardProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NewsCard');

	const formattedDate = DateTime.fromISO(publishedAt).toJSDate();

	//
	// B. Render components
	return (
		<Link className={styles.container} href={`news/${slug || id}`}>
			<Image
				alt={featuredImageSrc?.filename}
				className={styles.coverImage}
				fallbackSrc="/assets/common/placeholder.png"
				loading="lazy"
				src={featuredImageSrc?.thumbnailURL ?? featuredImageSrc?.url}
			/>
			<p className={styles.publishDate}>{t('publish_date', { published_at: formattedDate })}</p>
			<p className={styles.title}>{title}</p>
		</Link>
	);

	//
}
