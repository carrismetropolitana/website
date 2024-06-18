'use client';

/* * */

import { IconClockCog } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppUnavailable');

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconClockCog className={styles.icon} size={75} />
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
		</div>
	);

	//
}
