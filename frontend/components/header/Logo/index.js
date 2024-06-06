/* * */

import { Link } from '@/translations/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HeaderLogo');

	//
	// B. Render Components

	return (
		<Link className={styles.container} href="/">
			<theme-light>
				<img alt={t('logo.alt')} height={40} src="/brand/carris-metropolitana-light.svg" />
			</theme-light>
			<theme-dark>
				<img alt={t('logo.alt')} height={40} src="/brand/carris-metropolitana-dark.svg" />
			</theme-dark>
		</Link>
	);

	//
}
