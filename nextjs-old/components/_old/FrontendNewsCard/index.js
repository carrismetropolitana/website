/* * */

import { Link } from '@/translations/navigation';
import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ _id, coverImageSrc, publishDate, title }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendNewsCard');

	const publishDateObject = DateTime.fromISO(publishDate).toJSDate();

	//
	// C. Render Components

	return (
		<Link className={styles.container} href={`/news/${_id}`}>
			<Image alt={title} className={styles.coverImage} fallbackSrc="/news/placeholder.png" src={coverImageSrc} />
			<p className={styles.publishDate}>{t('publish_date', { publishDate: publishDateObject })}</p>
			<h4 className={styles.title}>{title}</h4>
		</Link>
	);

	//
}
