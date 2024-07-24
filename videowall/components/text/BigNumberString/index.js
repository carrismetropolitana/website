/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ direction = 'row', label = '', level = 1, type = 'normal', value = '-' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('BigNumber');

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${styles[`level_${level}`]} ${styles[`type_${type}`]} ${styles[`direction_${direction}`]}`}>
			<p className={styles.value}>{value}</p>
			<p className={styles.label}>{label}</p>
		</div>
	);

	//
}
