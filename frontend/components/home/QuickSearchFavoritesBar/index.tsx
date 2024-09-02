'use client';

/* * */

import LineBadge from '@/components/lines/LineBadge';
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

	// return (
	// 	<div className={styles.container}>
	// 		<p className={styles.emptyMessage}>{t('empty')}</p>
	// 	</div>
	// );

	return (
		<div className={styles.container}>
			<LineBadge onClick={() => { alert('here'); }} shortName="1234" withAlertIcon />
			<LineBadge onClick={() => { alert('here'); }} shortName="1234" withAlertIcon />
			<LineBadge onClick={() => { alert('here'); }} shortName="1234" withAlertIcon />
		</div>
	);

	//
}
