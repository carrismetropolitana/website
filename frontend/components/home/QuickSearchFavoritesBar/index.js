'use client';

/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeQuickSearchFavoritesBar');

	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<p className={styles.emptyMessage}>{t('empty')}</p>
		</div>
	);

	//
}
