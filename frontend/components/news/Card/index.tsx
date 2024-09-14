/* * */

import { Link } from '@/i18n/routing';
import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface NewsCardProps {
	_id: string
	coverImageSrc: string
	publishDate: string
	title: string
}

/* * */

export default function Component({ _id, coverImageSrc, publishDate, title }: NewsCardProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NewsCard');

	const publishDateObject = DateTime.fromISO(publishDate).toJSDate();

	//
	// B. Render Components

	return (
		<Link className={styles.container} href={`/news/${_id}`}>
			<Image alt={title} className={styles.coverImage} fallbackSrc="/news/placeholder.png" src={coverImageSrc} />
			<p className={styles.publishDate}>{t('publish_date', { publishDate: publishDateObject })}</p>
			<h4 className={styles.title}>{title}</h4>
		</Link>
	);

	//
}
