/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ endDate = '', startDate = '' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('LabelDateFromTo');

	//
	// B. Render components

	return startDate && endDate ? <p className={styles.container}>{t('default', { end_date: new Date(endDate), start_date: new Date(startDate) })}</p> : <p className={styles.dateRange}>{t('no_data')}</p>;

	//
}
