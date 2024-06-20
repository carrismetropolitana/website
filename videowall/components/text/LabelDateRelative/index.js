'use client';

/* * */

import { useFormatter, useNow, useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ date = '' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('LabelDateRelative');

	const dateFormatter = useFormatter();
	const now = useNow({ updateInterval: 1000 });

	//
	// B. Render components

	if (!date) return <></>;

	return <p className={styles.container}>{t('default', { diff: dateFormatter.relativeTime(date, now) })}</p>;

	//
}
