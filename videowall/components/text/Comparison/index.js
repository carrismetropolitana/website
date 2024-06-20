/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ direction = 'row', level = 1, type = 'normal', value = -1 }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('Comparison');

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${styles[`level_${level}`]} ${styles[`type_${type}`]} ${styles[`direction_${direction}`]}`}>
			<p className={styles.value}>{t('value', { value: value })}</p>
		</div>
	);

	//
}
