/* * */

import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//
	// A. Setup variables
	const t = useTranslations('profile.sync');

	//
	// C. Render components
	return (
		<Section>
			<div className={`${styles.container} ${styles.pb_20}`}>
				<h3 className={styles.title}>{t('loading')}</h3>
			</div>
		</Section>
	);
}
