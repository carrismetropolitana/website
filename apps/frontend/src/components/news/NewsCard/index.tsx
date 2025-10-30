/* * */

import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface NewsCardProps {
	_id: string
	coverImageSrc: string
	publishDate: string
	title: string
}

/* * */

export function NewsCard({ _id, coverImageSrc, publishDate, title }: NewsCardProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NewsCard');

	const publishDateObject = DateTime.fromISO(publishDate).toJSDate();

	//
	// B. Render components

	return (
		<Link className={styles.container} href={`/news/${_id}`}>
			<Image alt={title} className={styles.coverImage} fallbackSrc="/assets/common/placeholder.png" src={coverImageSrc} />
			<p className={styles.publishDate}>{t('publish_date', { publishDate: publishDateObject })}</p>
			<p className={styles.title} dangerouslySetInnerHTML={{ __html: title || 'title' }} />
		</Link>
	);

	//
}
