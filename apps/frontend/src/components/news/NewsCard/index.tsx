/* * */

import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface CoverImageSrc {
	alt?: string
	thumbnailURL?: string
	url?: string
}

interface NewsCardProps {
	coverImageSrc?: CoverImageSrc
	id: string
	published_at: string
	title: string
}

/* * */

export function NewsCard({ coverImageSrc, id, published_at, title }: NewsCardProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NewsCard');

	const publishDateObject = DateTime.fromISO(published_at).toFormat('dd/MM/yyyy');

	//
	// B. Render components

	return (
		<Link className={styles.container} href={`news/${id}`}>
			<Image alt={coverImageSrc.alt} className={styles.coverImage} fallbackSrc="/assets/common/placeholder.png" src={coverImageSrc.url} />
			<p className={styles.publishDate}>{t('publish_date', { published_at: publishDateObject })}</p>
			<p className={styles.title} dangerouslySetInnerHTML={{ __html: title || 'title' }} />
		</Link>
	);

	//
}
